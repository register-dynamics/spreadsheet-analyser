import sqlite3

con = sqlite3.connect('spreadsheets.db')

cur = con.cursor()

#Create the 'files' table
cur.execute('''
            CREATE TABLE IF NOT EXISTS files (
                file_id INTEGER PRIMARY KEY,
                url TEXT NOT NULL,
                file_name TEXT UNIQUE,
                http_response_code INTEGER
            )
            ''')

#Not sure if Boolean is a type in sqlite, so will use integer where 1 and 0 are True and False respectively
cur.execute('''
            CREATE TABLE IF NOT EXISTS spreadsheets (
                file_name TEXT,
                file_id INTEGER,
                sheet_id INTEGER PRIMARY KEY,
                sheet TEXT,
                number_of_rows INTEGER,
                percent_nan REAL,
                percent_bulk REAL,
                empty_top_rows BOOLEAN,
                empty_bottom_rows BOOLEAN,
                title_row BOOLEAN,
                subtitles BOOLEAN,
                FOREIGN KEY (file_name) REFERENCES files (file_name),
                FOREIGN KEY (file_id) REFERENCES files (file_id)
            )
            ''')

def insert_file_metadata(url, response_code, content_type, filename, file_type):
    cur.execute('''
        INSERT OR REPLACE INTO files (original_url, http_response_code, http_content_type, filename, file_type)
        VALUES (?, ?, ?, ?, ?)
    ''', (url, response_code, content_type, filename, file_type))
    con.commit()

# Step 4: Function to insert sheet metadata
def insert_sheet_metadata(filename, sheet, number_of_rows, percent_nan, percent_bulk, empty_top_rows, empty_bottom_rows, title_row, subtitles):
    cur.execute('''
        INSERT OR REPLACE INTO sheets (filename, sheet, number_of_rows, percent_nan, percent_bulk, empty_top_rows, empty_bottom_rows, title_row, subtitles)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (filename, sheet, number_of_rows, percent_nan, percent_bulk, empty_top_rows, empty_bottom_rows, title_row, subtitles))
    con.commit()


# Commit the changes and close the connection
con.commit()
con.close()

if __name__ == "__main__":
    pass