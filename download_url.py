import re
import sqlite3
from urllib.parse import urlparse
import string
import os
import requests
import sys

def extract_file_type(url):
    """ Uses Regex to determine filetype, not perfect so use with caution """
    # Regex pattern to match multi-part file extensions, ignoring queries or fragments
    pattern = r"\.[a-zA-Z]+(?:\.[a-zA-Z]+)*(?:\?.*|#.*)?$"
    
    # Find the match
    match = re.search(pattern, url)
    
    if match:
        # Extract the full extension (ignore query or fragment)
        return match.group().split('?')[0].split('#')[0]  # Clean the result
    else:
        return None
    
def create_filename(url):
    """ Create a filename based on the url path """
    parsed_url = urlparse(url)
    punctuation = string.punctuation
    url_netloc = parsed_url.netloc
    url_path = parsed_url.path
    filename = url_netloc+url_path
    translator = str.maketrans(punctuation, "_" * len(punctuation))
    filename = filename.translate(translator)
    return filename

def download_func():
    con = sqlite3.connect('spreadsheets.db', timeout=10)
    con.autocommit = False
    #create the directory for storing spreadsheet files (in current working directory)
    cwd = os.getcwd()
    full_path = os.path.join(cwd, 'spreadsheet_files')
    if not os.path.exists(full_path):
        os.mkdir(full_path)
        
    cursor = con.cursor()

    for row in cursor.execute("SELECT url FROM files WHERE file_name IS NULL LIMIT 100"):
        url = row[0]
        filetype = extract_file_type(url)
        filename = create_filename(url)
        file_path = os.path.join(full_path, filename)
        
        try:
            r = requests.get(url)  # Add a timeout to the request
            if r.status_code == 200:
                print('Downloading file...')
                with open(file_path, "wb") as file:
                    file.write(r.content)
                
                # Update file details in the database
                cursor.execute('''UPDATE files SET file_name = ?, http_response_code = ?, response_headers = ?, 
                                content_length = ?, content_type = ?, status_reason = ? 
                                WHERE url = ?''', 
                            (filename, r.status_code, str(r.headers), 
                                len(r.content), r.headers.get('Content-Type'), r.reason, url))
            else:
                print(f"Bad status code ({r.status_code}). Setting filename to None.")
                cursor.execute("UPDATE files SET file_name = NULL, http_response_code = ? WHERE url = ?", 
                            (r.status_code, url))

        except:
            e = sys.exc_info()[0]
            print(f"Error occured for {url}: {e}")
            cursor.execute("UPDATE files SET error_message = ? WHERE url = ?", (str(e), url))

    # Close the cursor and connection
    cursor.close()
    con.commit()
    con.close()

if __name__ == '__main__':
    download_func()
