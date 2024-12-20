import os
import sqlite3

import pandas as pd

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
                    print(
                        f"olgibbons debug: arguments have been appended with file_id: {arguments}"
                    )
                    updateCursor.execute(
                        f"UPDATE files SET {action[1]} WHERE file_id = ?", arguments
                    )
                    print(
                        "olgibbons debug: if youre reading this the update files SET should have worked"
                    )
                elif action[0] == "insert-spreadsheet":
                    print("olgibbons debug: insert-spreadsheet has been selected")
                    arguments = list(action[2])
                    print(f"olgibbons debug: arguments = list(action[2]) : {arguments}")
                    arguments.append(file_id)
                    arguments.append(file_name)
                    print(
                        f"olgibbons debug: we have appended file_id and file_name to arguments: {arguments}"
                    )
                    params = ",".join("?" * len(arguments))
                    print(f"olgibbons len(arguments) = {len(arguments)}")
                    print(
                        f'olgibbons debug: we have set up params as ",".join("?"*len(arguments)) : {params}'
                    )
                    print(
                        f"""olgibbons debug: this is the sql statement we're trying to execute
                          updateCursor.execute(f"INSERT INTO spreadsheets ({action[1]}, file_id, file_name) VALUES ({params})", arguments)"""
                    )
                    updateCursor.execute(
                        f"INSERT INTO spreadsheets ({action[1]}, file_id, file_name) VALUES ({params})",
                        arguments,
                    )
                    print(
                        f"""olgibbons if youre reading this update was successful:\n
                          updateCursor.execute(f"INSERT INTO spreadsheets ({action[1]}, file_id, file_name) VALUES ({params})", arguments)"""
                    )
                elif action[0] == "insert-spreadsheets":
                    print("olgibbons debug: insert-spreadsheets has been selected")
                    multi_arguments = list(action[2])
                    for arguments in multi_arguments:
                        print(
                            f"olgibbons debug: arguments = list(action[2]) : {arguments}"
                        )
                        arguments.append(file_id)
                        arguments.append(file_name)
                        print(
                            f"olgibbons debug: we have appended file_id and file_name to arguments: {arguments}"
                        )
                        params = ",".join("?" * len(arguments))
                        print(f"olgibbons len(arguments) = {len(arguments)}")
                        print(
                            f'olgibbons debug: we have set up params as ",".join("?"*len(arguments)) : {params}'
                        )
                        print(
                            f"""olgibbons debug: this is the sql statement we're trying to execute
                          updateCursor.execute(f"INSERT INTO spreadsheets ({action[1]}, file_id, file_name) VALUES ({params})", arguments)"""
                        )
                        updateCursor.execute(
                            f"INSERT INTO spreadsheets ({action[1]}, file_id, file_name) VALUES ({params})",
                            arguments,
                        )
                        print(
                            f"""olgibbons if youre reading this update was successful:\n
                          updateCursor.execute(f"INSERT INTO spreadsheets ({action[1]}, file_id, file_name) VALUES ({params})", arguments)"""
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


# trying to analyse csv
def analyse_csv(file_id, url, file_name, extras):
    try:
        # olgibbons ask alaric about this:
        dir = "spreadsheet_files"
        file_path = os.path.join(dir, file_name)
        content_type = extras["content_type"]
        file_extension = extras["file_type"]

        if content_type.startswith("text/csv") or file_extension.endswith(".csv"):
            file_type = "csv"
        elif content_type.startswith(
            "application/vnd.ms-excel"
        ) or file_extension.endswith(".xls"):
            file_type = "xls"
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
        elif file_type == "xls":
            # TODO: open_xls doesn't exist
            thingy = open_xls(file_path)  # FIXME
            sheet_summaries = []
            for index in range(thingy.number_of_sheets):  # FIXME
                df = thingy.get_sheet_as_df(index)  # FIXME
                table = Table(file_name, df)
                results = table.get_metadata_row()
                sheet_summaries.push(
                    (
                        "xls",
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
                        thingy.get_sheet_name(index),
                    )
                )  # FIXME
            return (
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
                   sheet_name
                   """,
                sheet_summaries,
            )
        else:
            # Unknown file type
            print(
                f"ERROR: Unknown file type, skipping: {file_name} type={content_type} extension={file_extension}"
            )

    except Exception as e:
        print(f"olgibbons: error has occured: {str(e)}")
        return ("update-file", "parse_error_message=?", (str(e),))


if __name__ == "__main__":
    with Database("spreadsheets.db") as db:
        db.scanFiles(
            "(content_type like 'text/csv%' or file_type like '%.csv') and file_name is not null",
            100,
            analyse_csv,
        )

# scanfiles - where clause, batch size, callback
# for row in :
# SELECT file_id, url, file_name, file_type, content_type, content_length FROM files WHERE (content_type like 'text/csv%' or file_type like '%.csv') and file_name is not nul ORDER BY random() LIMIT ?", (batchSize,) single element tuple
