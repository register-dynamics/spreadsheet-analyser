import sqlite3

class Database:
    def __init__(this):
        this.con = sqlite3.connect('spreadsheets.db', timeout=10)
        this.con.autocommit = False

    def scanFiles(this, whereClause, batchSize, callback):
        scanCursor = this.con.cursor()
        updateCursor = this.con.cursor()
        for row in scanCursor.execute(f"SELECT file_id, url, file_name, file_type, content_type, content_length FROM files WHERE {whereClause} ORDER BY random() LIMIT ?", (batchSize,)):
            (file_id, url, file_name, file_type, content_type, content_length) = row
            action = callback(file_id, url, file_name, {
                'file_type': file_type,
                'content_type': content_type,
                'content_length': content_length
            })
            if action:
                if action[0] == "update-file":
                    arguments = list(action[2])
                    arguments.append(file_id)
                    updateCursor.execute(f"UPDATE files SET {action[1]} WHERE file_id = ?", arguments)
                elif action[0] == "insert-spreadsheet":
                    arguments = list(action[2])
                    arguments.append(file_id)
                    arguments.append(file_name)
                    params = ",".join("?"*len(arguments))
                    updateCursor.execute(f"INSERT INTO spreadsheets ({action[1]}, file_id, file_name) VALUES ({params})", arguments)
                else:
                    print(f"ERROR: Unknown action from callback {action}")
        updateCursor.close()
        scanCursor.close()
        this.con.commit()

    def scanSheets(this, whereClause, batchSize, callback):
        scanCursor = this.con.cursor()
        updateCursor = this.con.cursor()
        for row in scanCursor.execute(f"SELECT sheet_id, file_id, file_name, sheet_type, number_of_rows, percent_nan, percent_bulk, empty_top_rows, empty_bottom_rows, title_row, subtitles FROM spreadsheets WHERE {whereClause} ORDER BY random() LIMIT ?", (batchSize,)):
            (sheet_id, file_id, file_name, sheet_type, number_of_rows, percent_nan, percent_bulk, empty_top_rows, empty_bottom_rows, title_row, subtitles) = row
            action = callback(sheet_id, file_id, file_name, {
                'sheet_type': sheet_type,
                'number_of_rows': number_of_rows,
                'percent_nan': percent_nan,
                'percent_bulk': percent_bulk,
                'empty_top_rows': empty_top_rows,
                'empty_bottom_rows': empty_bottom_rows,
                'title_row': title_row,
                'subtitles': subtitles
            })
            if action:
                if action[0] == "update-spreadsheet":
                    arguments = list(action[2])
                    arguments.append(sheet_id)
                    updateCursor.execute(f"UPDATE spreadsheets SET {action[1]} WHERE sheet_id = ?", arguments)
                else:
                    print(f"ERROR: Unknown action from callback {action}")
        updateCursor.close()
        scanCursor.close()
        this.con.commit()

# SAMPLE USAGE:

# import database_patterns

# db = Database()

# 1) Scan through files, updating files (eg, when downloading files from URLs)

# def handle_file_1(file_id, url, file_name):
#     return ("update-file", "http_method=?", ("test",))
# db.scanFiles("content_type like 'text/csv%' or file_type like '%.csv'", 100, handle_file_1)

# 2) Scan through files, creating spreadsheet entries (eg, when parsing files)

# def handle_file_2(file_id, url, file_name):
#     return ("insert-spreadsheet", "sheet_type", ("test",))
# db.scanFiles("file_name is not null", 100, handle_file_2)

# 3) Scan through spreadsheets, updating the records

# def handle_sheet_1(sheet_id, file_id, file_name, extras):
#     return ("update-spreadsheet", "sheet_type = ?", ("test2",))
# db.scanSheets("sheet_type='test'", 100, handle_sheet_1)
