def df_by_file_id(file_id, sheet_index=None):
    csv_content_types = ['text/csv', 'application/octet-stream']
    xls_content_types = ['application/vnd.ms-excel','text/html','application/octet-stream','application/vnd.openxmlformats-officedoc',
                        'application/vnd.oasis.opendoc']
    with Database('spreadsheets.db') as db:
        cur = db.con.cursor()
        res = cur.execute('SELECT file_name, file_type, content_type from files WHERE file_id == ?', (file_id,)).fetchall()
        file_name = res[0][0]
        file_path = os.path.join('spreadsheet_files', file_name)
        print(res)
        if (res[0][1].lower().endswith('.csv') or res[0][2].startswith(tuple(csv_content_types))and not res[0][1].lower().endswith('.xls')):
            print('olgibbons succeeded! to read csv')
            try:
                # Attempt to read as a CSV
                df = pd.read_csv(file_path, encoding="ISO-8859-1", header=None)
                print("File read as CSV successfully.")
                return df
            except pd.errors.ParserError as e:
                # If there's an error, handle it by reading the file as plain text
                print(f"Error reading CSV: {e}")
                print("Attempting to read as plain text instead...")
            
                # Open the file as plain text and read the first few lines for inspection
                with open(file_path, 'r', encoding="ISO-8859-1") as f:
                    lines = [next(f) for _ in range(10)]  # Read the first 10 lines
            
                # Display contents to check the file type
                print("File content preview:")
                for line in lines:
                    print(line)
        elif res[0][1].lower().endswith('.xls') or res[0][2].startswith(tuple(xls_content_types)):
            print('Reading as Excel...')
            try:
                with pd.ExcelFile(file_path) as xls:
                    sheet_to_read = sheet_index if sheet_index is not None else 0  # Default to the first sheet
                    df = pd.read_excel(xls, sheet_name=sheet_to_read, header=None)
                    print(f"File read as Excel successfully. Sheets available: {xls.sheet_names}")
                    return df
            except ValueError as e:
                print(f"Error reading Excel file: {e}")
                return None
            else:
                print(f"File type {file_type} or content type {content_type} is not supported.")
                return None


def db_query(query):
    with Database('spreadsheets.db') as db:
        df = pd.read_sql(query, db.con)
        display(df.reset_index(drop=True))
        return df