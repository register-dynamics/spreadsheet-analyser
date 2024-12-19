import argparse
import os
import time

from urllib3.exceptions import LocationParseError
from urllib.parse import urlparse

import requests


def is_url_working(url):
    try:
        # Make a HEAD request to avoid downloading the body content
        response = requests.head(url, timeout=5)
        # Check if the response status code is 2xx or 3xx (success and redirects)
        return response.status_code < 400
    except requests.RequestException:
        return False
    except LocationParseError:
        return False


def is_valid_url(url):
    """Check if the string looks like a valid URL"""
    parsed_url = urlparse(url)
    return bool(parsed_url.scheme and parsed_url.netloc)


def filter_working_urls(file_path, delay=1):
    valid_urls = []

    # Read URLs from the file
    with open(file_path, "r") as file:
        urls = file.readlines()

    # Check each URL
    for url in urls:
        url = url.strip()  # Clean up any newline characters
        if not url or not is_valid_url(url):
            print(f"Skipping invalid or empty URL: {url}")
            continue  # Skip invalid or empty URLs

        if is_url_working(url):
            print(f"URL is working: {url}")
            valid_urls.append(url)
        else:
            print(f"URL is broken: {url}")

        # Introduce a delay to avoid overwhelming the server
        time.sleep(delay)

    # Write valid URLs to a new file
    with open("valid_urls.txt", "w") as output_file:
        for valid_url in valid_urls:
            output_file.write(valid_url + "\n")

    print(f"Filtered {len(valid_urls)} valid URLs.")


# Prompt the user for a file name and optional delay
if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        prog="check_urls",
        description="When provided a list of links, determines which are valid and writes to valid_urls.txt",
    )

    parser.add_argument(
        "-f",
        "--file",
        dest="filename",
        help="A newline separated list of links",
        metavar="FILE",
    )

    # Argparse type for allowing optional floats, if flag not present or not a float,
    # will return None
    def optional_float(x):
        try:
            x = float(x)
        except ValueError:
            return None
        return x

    parser.add_argument(
        "-d",
        "--delay",
        dest="delay",
        help="delay between requests, in seconds, default is 1",
        type=optional_float,
    )
    args = parser.parse_args()

    file_path = args.filename or input(
        "Please enter the path to the file containing URLs: "
    )

    try:
        delay = args.delay or float(
            input("Enter delay between requests (in seconds, default is 1 second): ")
        )
    except ValueError:
        delay = 1  # Default to 1 second if invalid input

    # Call the function with the user-provided file path and delay
    filter_working_urls(file_path, delay)
