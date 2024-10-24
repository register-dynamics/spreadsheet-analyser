import os
import re
import sqlite3
import pandas as pd
from urllib.parse import urlparse

def is_url(url):
    """ Not a perfect validator, use with caution """
    #ignore lines with whitespace
    if ' ' in url:
        return False
    parsed = urlparse(url)
    # A valid URL should have a scheme and netloc
    return all([parsed.scheme, parsed.netloc])

def create_url_list(filepath):
    with open(filepath) as file:
        lines = file.readlines()
        urls = [url.rstrip() for url in lines if is_url(url)]
        return urls
    
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
    
def insert_url(conn, url):
    """
    Inserts a URL into the 'files' table and detects filetype.
    Other columns, including request_time, will be set to NULL by default.
    """
    cur = conn.cursor()
    
    # Insert the URL without a request time (NULL by default)
    cur.execute('''
        INSERT INTO files (url, file_type) 
        VALUES (?,?)
    ''', (url,extract_file_type(url)))
    
    # Commit the transaction
    conn.commit()