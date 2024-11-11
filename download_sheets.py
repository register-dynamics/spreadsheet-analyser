import json
import os
import re
import string
from datetime import datetime
from random import sample
from urllib.parse import urlparse

import requests

url_data = {}


def printURLinfo(url):
    parsedUrl = urlparse(url)
    print(f"url: {url}")
    print(f"scheme: {parsedUrl.scheme}")
    print(f"netloc: {parsedUrl.netloc}")
    print(f"path: {parsedUrl.path}")
    print(f"query: {parsedUrl.query}")
    print(f"fragment: {parsedUrl.fragment}")


def inspectHeaders(url):
    response = requests.head(url, timeout=5)
    if response.status_code < 400:
        print(f"headers content: {response.headers}")
    else:
        print(f"status code {response.status_code} not ok")


def createFileName(url, fileType="csv"):
    # assumes file extension is at end of url
    filepath_string = ""
    punctuation = string.punctuation
    parsedUurl = urlparse(url)
    filepath_string += parsedUurl.netloc
    filepath_string += parsedUurl.path
    # remove file extension and 'www'
    newstring = filepath_string.removesuffix("." + fileType).replace("www.", "")
    # create translation table for replacing punctuation
    translator = str.maketrans(punctuation, "_" * len(punctuation))
    # add extension
    return newstring.translate(translator) + "." + fileType


def endsWithCsv(url):
    p = re.compile("^.*\.csv(\?.*)?")
    return p.match(url)


def endsWithXls(url):
    p = re.compile("^.*\.xls(\?.*)?")
    return p.match(url)


def createSampleList(filepath, csvs=0, xls=0, badfile=0, non_csv=0):
    with open(filepath) as file:
        # very important for removing newlines
        urls = [url.strip() for url in file.readlines()]
    sampleList = sample(urls, 1000)

    for i in range(len(sampleList)):
        if endsWithCsv(sampleList[i]):
            print(f"url {i} is a csv: {sampleList[i]}...Downloading to hard disk")
            csvs, badfile = downloadCsv(sampleList[i], csvs, badfile)
            url_data[sampleList[i]]["is_csv_Al_code"] = True
        elif endsWithXls(sampleList[i]):
            print(f"url {i} is an xls")
            # to do: add to json
            xls += 1
        else:
            print(f"url {i} is not a csv: {sampleList[i]}")
            non_csv += 1

    print(
        f"""{csvs} csv files were found and downloaded`\n
        {xls} files were found \n
        {badfile} could not be downloaded\n
        {non_csv} files were not csv or xls."""
    )
    url_data["metadata"] = {
        "csvs": csvs,
        "xls": xls,
        "badfiles": badfile,
        "non_csvs": non_csv,
    }

    print(f"Url Data: {json.dumps(url_data, indent=4)}")

    # use 'w' for writing json and dump for serialising to file
    with open(json_filepath, "w") as file:
        json.dump(url_data, file, indent=4)

    return csvs, badfile, non_csv


def downloadCsv(url, csvs, badfile):
    urlname = createFileName(url)
    file_path = os.path.join(directory, urlname)

    url_info = {
        "file_name": urlname,
        "status_code": None,
        "is_csv": False,
        "is_csv_Al_code": False,
        "downloaded": False,
        "error": None,
    }

    try:
        r = requests.get(url)
        url_info["status_code"] = r.status_code
        url_info["is_csv"] = r.headers.get("Content-Type", "").startswith("text/csv")
        if r.status_code < 400:
            with open(file_path, "wb") as file:
                file.write(r.content)
                csvs += 1
            url_info["downloaded"] = True
        else:
            print("bad status code")
            badfile += 1
    except requests.exceptions.RequestException as e:
        print(f"Unable to download file: {str(e)}")
        url_info["error"] = f"Exception error: {str(e)}"
        badfile += 1

    # Add the url info to the dictionary, keyed by the URL
    url_data[url] = url_info

    return csvs, badfile


timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
directory = f"sample_csvs_{timestamp}"
json_directory = os.path.join(directory, "json")
json_file = f"sample_csvs_{timestamp}_json"
# Create the 'json' directory if it doesn't exist
os.makedirs(json_directory, exist_ok=True)

# Full path for the json file
json_filepath = os.path.join(json_directory, json_file)


if not os.path.exists(directory):
    os.makedirs(directory)
    print(f"Directory '{directory}' created.")

if __name__ == "__main__":
    pass
