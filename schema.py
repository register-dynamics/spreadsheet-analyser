import sqlite3

con = sqlite3.connect("spreadsheets.db")

cur = con.cursor()

# Create the 'files' table
cur.execute(
    """
                CREATE TABLE IF NOT EXISTS files (
                    file_id INTEGER PRIMARY KEY,
                    url TEXT UNIQUE,
                    file_name TEXT UNIQUE,
                    file_type TEXT,
                    http_response_code INTEGER,
                    http_method TEXT,
                    response_headers TEXT,
                    request_time TIMESTAMP,
                    response_time_ms INTEGER,
                    content_length INTEGER,
                    content_type TEXT,
                    last_modified TIMESTAMP,
                    redirect_url TEXT,
                    error_message TEXT,
                    status_reason TEXT,
                    parse_error_message TEXT,
                    detected_file_type TEXT,
                    detected_mime_type TEXT
                )
            """
)

# Not sure if Boolean is a type in sqlite, so will use integer where 1 and 0 are True and False respectively
cur.execute(
    """
            CREATE TABLE IF NOT EXISTS spreadsheets (
                file_name TEXT,
                file_id INTEGER,
                sheet_id INTEGER PRIMARY KEY,
                sheet_type TEXT,
                number_of_rows INTEGER,
                percent_nan REAL,
                percent_bulk REAL,
                empty_top_rows BOOLEAN,
                empty_bottom_rows BOOLEAN,
                title_row BOOLEAN,
                subtitles BOOLEAN,
                full_table BOOLEAN,
                fingerprint TEXT,
                row_count INTEGER,
                column_count INTEGER,
                empty_rows_count INTEGER,
                empty_rows TEXT,
                sheet_index INTEGER,
                sheet_name STRING,
                FOREIGN KEY (file_name) REFERENCES files (file_name),
                FOREIGN KEY (file_id) REFERENCES files (file_id)
            )
            """
)


def insert_file_metadata(url, response_code, content_type, filename, file_type):
    cur.execute(
        """
        INSERT OR REPLACE INTO files (original_url, http_response_code, http_content_type, filename, file_type)
        VALUES (?, ?, ?, ?, ?)
    """,
        (url, response_code, content_type, filename, file_type),
    )
    con.commit()


# Step 4: Function to insert sheet metadata
def insert_sheet_metadata(
    filename,
    sheet,
    number_of_rows,
    percent_nan,
    percent_bulk,
    empty_top_rows,
    empty_bottom_rows,
    title_row,
    subtitles,
):
    cur.execute(
        """
        INSERT OR REPLACE INTO sheets (filename, sheet_type, number_of_rows, percent_nan, percent_bulk, empty_top_rows, empty_bottom_rows, title_row, subtitles)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """,
        (
            filename,
            sheet,
            number_of_rows,
            percent_nan,
            percent_bulk,
            empty_top_rows,
            empty_bottom_rows,
            title_row,
            subtitles,
        ),
    )
    con.commit()


# Commit the changes and close the connection
con.commit()
con.close()

if __name__ == "__main__":
    pass
