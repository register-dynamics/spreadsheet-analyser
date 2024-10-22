import requests
import tempfile
import string
import re
from urllib.parse import urlparse
from random import sample

def printURLinfo(url):
    parsedUrl = urlparse(url)
    print(f"url: {url}")
    print(f"scheme: {parsedUrl.scheme}")
    print(f"netloc: {parsedUrl.netloc}")
    print(f"path: {parsedUrl.path}")
    print(f"query: {parsedUrl.query}")
    print(f"fragment: {parsedUrl.fragment}")

def createSampleList (filepath):
    with open (filepath) as file:
        urls = file.readlines()
    sampleList = sample(urls, 100)
    for i in range(len(sampleList)):
        if endsWithCsv(sampleList[i]):
            print(f"url {i} is a csv: {sampleList[i]}")
            fileName = createFileName(sampleList[i])
            print(f"file_name: {fileName}")
            inspectHeaders(sampleList[i])
        else:
            print(f"url {i} is not a csv: {sampleList[i]}")

def inspectHeaders (url):
    try:
        response = requests.head(url, timeout=5)
        if response.status_code == requests.codes.ok:
            print(f"headers content: {response.headers}")
    except requests.RequestException as e:
        print(f"Exception: {e}")

def createFileName(url, fileType='csv'):
    #assumes file extension is at end of url
    filepath_string = ''
    punctuation = string.punctuation
    parsedUurl = urlparse(url)
    filepath_string += parsedUurl.netloc
    filepath_string += parsedUurl.path
    #remove file extension and 'www'
    newstring = filepath_string.removesuffix('.'+ fileType).replace('www.', "")
    #create translation table for replacing punctuation
    translator = str.maketrans(punctuation, '_'*len(punctuation))
    #add extension
    return newstring.translate(translator) + '.' + fileType

def endsWithCsv(url):
    p = re.compile("^.*\.csv(\?.*)?")
    return p.match(url)





if __name__ == "__main__":
    filepath = "valid_urls.txt"
    #createSampleList(filepath)
    # create a temporary file and write some data to it

    fp = tempfile.TemporaryFile()
    print(f"fp is type: {type(fp)}")
    fp.write(b'Hello world!')
    # read data from file
    fp.seek(0)
    fp.read()
    print(type(fp.read()))
    # close the file, it will be removed
    print(f"file {fp} has been read: {fp.read()}")
    fp.close()


