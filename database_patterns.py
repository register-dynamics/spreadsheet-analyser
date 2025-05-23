import os
import sqlite3
import magic

from isort import file
import pandas as pd
import xlrd
import openpyxl

from table import Table


class Database:
    def __init__(this, db):
        this.db = db

    def __enter__(this):
        this.con = sqlite3.connect(this.db, timeout=10)
        this.con.autocommit = False
        return this

    def __exit__(this, *args):
        if this.con:
            this.con.close()

    def scanFiles(this, whereClause, batchSize, callback):
        scanCursor = this.con.cursor()
        updateCursor = this.con.cursor()
        #iterating row by row is memory efficient because it fetches rows lazily (one at a time). Reach row is returned as a tuple
        for row in scanCursor.execute(
            f"SELECT file_id, url, file_name, file_type, content_type, content_length FROM files WHERE {whereClause} ORDER BY random() LIMIT ?",
            (batchSize,),
        ):
            (file_id, url, file_name, file_type, content_type, content_length) = row
            action = callback(
                file_id,
                url,
                file_name,
                {
                    "file_type": file_type,
                    "content_type": content_type,
                    "content_length": content_length,
                },
            )
            if action:
                if action[0] == "update-file":
                    arguments = list(action[2])
                    arguments.append(file_id)
                    updateCursor.execute(
                        f"UPDATE files SET {action[1]} WHERE file_id = ?", arguments
                    )
                elif action[0] == "insert-spreadsheet":
                    arguments = list(action[2])
                    arguments.append(file_id)
                    arguments.append(file_name)
                    params = ",".join("?" * len(arguments))
                    updateCursor.execute(
                        f"INSERT INTO spreadsheets ({action[1]}, file_id, file_name) VALUES ({params})",
                        arguments,
                    )
                elif action[0] == "insert-spreadsheets":
                    multi_arguments = list(action[2])
                    print(f'olgibbons debug: multi_arguments = {multi_arguments}')
                    for arguments in multi_arguments:
                        arguments.append(file_id)
                        arguments.append(file_name)
                        params = ",".join("?" * len(arguments))
                        updateCursor.execute(
                            f"INSERT INTO spreadsheets ({action[1]}, file_id, file_name) VALUES ({params})",
                            arguments,
                        )
                else:
                    print(f"ERROR: Unknown action from callback {action}")
        updateCursor.close()
        scanCursor.close()
        this.con.commit()

    def scanSheets(this, whereClause, batchSize, callback):
        scanCursor = this.con.cursor()
        updateCursor = this.con.cursor()
        for row in scanCursor.execute(
            f"SELECT sheet_id, file_id, file_name, sheet_type, number_of_rows, percent_nan, percent_bulk, empty_top_rows, empty_bottom_rows, title_row, subtitles, sheet_index, sheet_name FROM spreadsheets WHERE {whereClause} ORDER BY random() LIMIT ?",
            (batchSize,),
        ):
            (
                sheet_id,
                file_id,
                file_name,
                sheet_type,
                number_of_rows,
                percent_nan,
                percent_bulk,
                empty_top_rows,
                empty_bottom_rows,
                title_row,
                subtitles,
                sheet_index,
                sheet_name,
            ) = row
            action = callback(
                sheet_id,
                file_id,
                file_name,
                {
                    "sheet_type": sheet_type,
                    "number_of_rows": number_of_rows,
                    "percent_nan": percent_nan,
                    "percent_bulk": percent_bulk,
                    "empty_top_rows": empty_top_rows,
                    "empty_bottom_rows": empty_bottom_rows,
                    "title_row": title_row,
                    "subtitles": subtitles,
                    "sheet_index": sheet_index,
                    "sheet_name": sheet_name,
                },
            )
            if action:
                if action[0] == "update-spreadsheet":
                    arguments = list(action[2])
                    arguments.append(sheet_id)
                    updateCursor.execute(
                        f"UPDATE spreadsheets SET {action[1]} WHERE sheet_id = ?",
                        arguments,
                    )
                else:
                    print(f"ERROR: Unknown action from callback {action}")
        updateCursor.close()
        scanCursor.close()
        this.con.commit()

    def close_con(this):
        this.con.close()


# SAMPLE USAGE:
"""
# 1) Scan through files, updating files (eg, when downloading files from URLs)
def handle_file_1(file_id, url, file_name, extras):
     return ("update-file", "http_method=?", ("test",))

# import database_patterns

with Database('spreadsheets.db') as db:
    db.scanFiles("content_type like 'text/csv%' or file_type like '%.csv'", 100, handle_file_1)



# 2) Scan through files, creating spreadsheet entries (eg, when parsing files)

def handle_file_2(file_id, url, file_name, extras):
    return ("insert-spreadsheet", "sheet_type", ("test",))

with Database('spreadsheets.db') as db:
    db.scanFiles("file_name is not null", 100, handle_file_2)

# 3) Scan through spreadsheets, updating the records

def handle_sheet_1(sheet_id, file_id, file_name, extras):
    return ("update-spreadsheet", "sheet_type = ?", ("test2",))

with Database('spreadsheets.db') as db:
    db.scanSheets("sheet_type='test'", 100, handle_sheet_1)

# 4) Scan through files creating multiple spreadsheet entries

def handle_file_3(file_id, url, file_name, extras):
    return ("insert-spreadsheets", "sheet_type,sheet_index,sheet_name", (("test1",0,"hello"), ("test2",1,"goodbye")))

with Database('spreadsheets.db') as db:
    db.scanFiles("file_name is not null", 100, handle_file_3)

"""
EXCELFILETYPES = ['xls', 'xlsx', 'xlsb', 'xlsm', 'odf', 'ods', 'odt']

# oj testing merged cells checker
def check_for_merged_cells(path, type, sheet):
    if type == 'xls':
        wb = xlrd.open_workbook(path, formatting_info=True)
        sheet = wb[sheet]
        return len(sheet.merged_cells)
    elif type == 'xlsx':
        wbook = open(path, "rb")
        wb = openpyxl.load_workbook(wbook)
        sheet = wb[sheet]
        return len(sheet.merged_cells.ranges)
    



# trying to analyse csv
def analyse_spreadsheet(file_id, url, file_name, extras):
    try:
        # olgibbons ask alaric about this:
        dir = "spreadsheet_files"
        file_path = os.path.join(dir, file_name)
        content_type = extras["content_type"]
        file_extension = extras["file_type"]

        #olgibbons: FIX LATER: We are naively assuming that filetypes correspond to their file extensions and ignoring content type for now
        if file_extension.endswith(".csv"):
            file_type = "csv"
        elif file_extension.endswith(".xls"):
            file_type = "xls"
        elif file_extension.endswith(".xlsx"):
            file_type = 'xlsx'
        elif file_extension.endswith(".ods"):
            file_type = "ods"
        else:
            file_type = "UNKNOWN"
        if file_type == "csv":
            df = pd.read_csv(
                file_path,
                encoding="ISO-8859-1",
                header=None,
                index_col=False,
                low_memory=False,
            )
            table = Table(file_name, df)
            results = table.get_metadata_row()
            print(f"The results are: {results}")
            return (
                "insert-spreadsheet",
                """
                   sheet_type,
                   number_of_rows,
                   percent_nan,
                   percent_bulk,
                   empty_top_rows,
                   empty_bottom_rows,
                   title_row,
                   subtitles,
                   full_table,
                   fingerprint,
                   row_count,
                   column_count,
                   empty_rows_count,
                   empty_rows,
                   sheet_index
                   """,
                (
                    "csv",
                    results["number_of_rows"],
                    results["percent_nan"],
                    results["percent_bulk"],
                    results["empty_top_rows"],
                    results["empty_bottom_rows"],
                    results["title_row"],
                    results["subtitles"],
                    results["full_table"],
                    str(results["fingerprint"]),
                    results["row_count"],
                    results["column_count"],
                    results["empty_rows_count"],
                    str(results["empty_rows"]),
                    0,
                ),
            )
        elif file_type in EXCELFILETYPES:
            print(f'olgibbons DEBUG: file type {file_type} detected...')
            #olgibbons: engine should be inferred, but if it doesn't work, we might need to handle the cases manually
            with pd.ExcelFile(file_path) as spreadsheet:
                sheet_names = spreadsheet.sheet_names
                sheet_summaries = []
                for index in range(len(sheet_names)):
                    df = pd.read_excel(spreadsheet, header=None, sheet_name=index)
                    table = Table(file_name, df)
                    results = table.get_metadata_row()
                    #oj testing for merged cells
                    merged_cells_count = check_for_merged_cells(file_path, file_type, sheet_names[index])

                    sheet_summaries.append(
                        [
                            file_type,
                            results["number_of_rows"],
                            results["percent_nan"],
                            results["percent_bulk"],
                            results["empty_top_rows"],
                            results["empty_bottom_rows"],
                            results["title_row"],
                            results["subtitles"],
                            results["full_table"],
                            str(results["fingerprint"]),
                            results["row_count"],
                            results["column_count"],
                            results["empty_rows_count"],
                            str(results["empty_rows"]),
                            index,
                            sheet_names[index],
                            merged_cells_count,
                        ]
                    )
                return [
                    "insert-spreadsheets",
                    """
                    sheet_type,
                    number_of_rows,
                    percent_nan,
                    percent_bulk,
                    empty_top_rows,
                    empty_bottom_rows,
                    title_row,
                    subtitles,
                    full_table,
                    fingerprint,
                    row_count,
                    column_count,
                    empty_rows_count,
                    empty_rows,
                    sheet_index,
                    sheet_name,
                    merged_cells_instances
                    """,
                    sheet_summaries,
                ]
        else:
            # Unknown file type
            print(
                f"ERROR: Unknown file type, skipping: {file_name} type={content_type} extension={file_extension}"
            )

    except Exception as e:
        print(f"olgibbons: error has occured: {str(e)}")
        return ("update-file", "parse_error_message=?", (str(e),))

def detect_file_type(file_id, url, file_name, extras):
    try:
        dir = "spreadsheet_files"
        file_path = os.path.join(dir, file_name)
        # Open and read the file to detect its type
        with open(file_path, 'rb') as f:
            mime_detector = magic.Magic(mime=True)
            type_detector = magic.Magic()
            
            detected_mime = mime_detector.from_buffer(f.read(2048))  # MIME type
            f.seek(0)  # Reset the file pointer
            detected_type = type_detector.from_buffer(f.read(2048))  # File type
        
        return (
            "update-file",
            "detected_file_type = ?, detected_mime_type = ?",
            (detected_type, detected_mime),
        )
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        return None
    except Exception as e:
        print(f"Error processing file {file_path}: {e}")
        return None

if __name__ == "__main__":
    '''with Database("spreadsheets.db") as db:
        db.scanFiles(
            "file_name is not null and file_type == '.xls'",
            391,
            analyse_spreadsheet,
        )'''
    with Database("spreadsheets.db") as db:
        db.scanFiles(
            "file_name is not null and file_type is null",
            2897,
            detect_file_type
        )

# scanfiles - where clause, batch size, callback
# for row in :
# SELECT file_id, url, file_name, file_type, content_type, content_length FROM files WHERE (content_type like 'text/csv%' or file_type like '%.csv') and file_name is not nul ORDER BY random() LIMIT ?", (batchSize,) single element tuple
