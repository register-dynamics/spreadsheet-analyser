import re
import sqlite3
from urllib.parse import urlparse
import string
import os
import requests
import sys
import datetime
import multiprocessing

#create the directory for storing spreadsheet files (in current working directory)
cwd = os.getcwd()
full_path = os.path.join(cwd, 'spreadsheet_files')
if not os.path.exists(full_path):
    os.mkdir(full_path)

# Define the epoch our timestamps are measured relative to
epoch = datetime.datetime(1970, 1, 1, tzinfo=datetime.UTC)

def create_filename(id, url):
    """ Create a filename based on the url path """
    parsed_url = urlparse(url)
    punctuation = string.punctuation
    url_netloc = parsed_url.netloc
    url_path = parsed_url.path
    filename = url_netloc+url_path
    translator = str.maketrans(punctuation, "_" * len(punctuation))
    filename = filename.translate(translator)
    return "%d__%s" % (id,filename)

def download_file(row):
    (id, url) = row
    filename = create_filename(id, url)
    file_path = os.path.join(full_path, filename)
    print(f"{url}: Attempting download")
    try:
        r = requests.get(url, timeout=5)  # Add a timeout to the request
        if r.status_code == 200:
            with open(file_path, "wb") as file:
                file.write(r.content)

                print(f"{url}: Success! Got {file_path}")
                return [url, "SUCCESS", r, filename]
        else:
            print(f"{url}: Failure! Got {r.status_code} / {r.reason}")
            return [url, "FAILURE", r]

    except:
        e = sys.exc_info()[0]
        print(f"{url}: Error: {e}")
        return [url, "ERROR", str(e)]

def update_db(cursor, result):
    now = (datetime.datetime.now(datetime.UTC) - epoch).total_seconds()
    print(f"Storing result: {result} at {now}")

    if result[1] == "SUCCESS":
        url = result[0]
        r = result[2]
        filename = result[3]
        cursor.execute('''UPDATE files SET file_name = ?, http_response_code = ?, response_headers = ?, 
        content_length = ?, content_type = ?, status_reason = ?, error_message = NULL, last_modified = ? 
        WHERE url = ?''', 
                        (filename, r.status_code, str(r.headers), 
                         len(r.content), r.headers.get('Content-Type'), r.reason, now, url))
    elif result[1] == "FAILURE":
        url = result[0]
        r = result[2]
        cursor.execute("UPDATE files SET file_name = NULL, http_response_code = ?, status_reason = ?, error_message = NULL, last_modified = ? WHERE url = ?", 
                        (r.status_code, r.reason, now, url))

    elif result[1] == "ERROR":
        url = result[0]
        e = result[2]
        cursor.execute("UPDATE files SET error_message = ?, last_modified = ? WHERE url = ?", (e, now, url))

    return result

def download_batch(pool,con,batchsize):
    cursor = con.cursor()
    cursor2 = con.cursor()
    #olgibbons delete after testing
    for row in cursor.execute("SELECT url FROM files WHERE file_name IS NULL LIMIT 100"):
        print(row)

    # Only retry failed attempts if they failed more than 3,600 seconds (an hour) ago
    old_error_time_limit = (datetime.datetime.now(datetime.UTC) - epoch).total_seconds() - 3600

    print(f"Fetching batch of {batchsize} URLs...")
    # ORDER BY random() because the original list is kinda sorted by domain
    # name, and we'd like to not hammer any particular web server exclusively
    batch = cursor.execute("SELECT file_id, url FROM files WHERE file_name IS NULL AND (last_modified < ? OR last_modified IS NULL) ORDER BY random() LIMIT ?", (old_error_time_limit, batchsize)).fetchall()
    if len(batch) == 0:
        # Returned no rows, so stop trying
        print("Found no URLs left to try, stopping...")
        pool.close()
        return False

    print(f"Found {len(batch)} URLs to try")
    for result in pool.map(download_file, batch):
        update_db(cursor2, result)

    print("Batch completed! Committing updates to the database.")
    cursor.close()
    cursor2.close()
    con.commit()
    return True

if __name__ == '__main__':
    # Download up to 10 files at a time, in batches of 1000
    poolsize = 10
    batchsize = 100

    con = sqlite3.connect('spreadsheets.db', timeout=10)
    con.autocommit = False

    with multiprocessing.Pool(poolsize) as pool:
        urls_left = True
        while urls_left:
            urls_left = download_batch(pool, con, batchsize)

    print(f"Waiting for pool shutdown...")
    pool.close()
    pool.join()
    # Close down DB connection
    con.close()
