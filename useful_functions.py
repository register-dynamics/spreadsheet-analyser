from database_patterns import Database
from IPython.display import display, Markdown
from table import Table
import pandas as pd
import os
import matplotlib.pyplot as plt


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
            
def generate_heatmaps(df_with_filenames, file_column='file_name', file_id_column='file_id',sheet_index_column='sheet_index', max_files=36):
    """
    Generate basic heatmaps for each file in the given DataFrame within a single figure.
    
    Parameters:
        df_with_filenames (pd.DataFrame): DataFrame containing a column with file names.
        file_column (str): Name of the column containing the file names.
        max_files (int): Maximum number of files to process (default is 12).
    """
    # Set up the figure and axis grid for a 3x4 layout (3 rows, 4 columns)
    fig, axes = plt.subplots(6, 6, figsize=(6, 6))  # Adjust size as needed
    axes = axes.flatten()  # Flatten the 2D grid to a 1D array for easy indexing
    file_ids = []
    
    for idx, row in enumerate(df_with_filenames.itertuples(index=False)):
        if idx >= max_files:
            break  # Stop if we reach the max_files limit
        
        # Build the full file path
        file_name = getattr(row, file_column)
        file_id = getattr(row, file_id_column)
        file_ids.append(file_id)
        sheet_index = getattr(row, sheet_index_column) if hasattr(row, sheet_index_column) else 0
        file_path = os.path.join('spreadsheet_files', file_name)

        # Load the file as a DataFrame, handling _csv and _xls suffixes
        try:
            if file_path.lower().endswith('_csv'):
                file_df = pd.read_csv(file_path, encoding="ISO-8859-1") 
            elif file_path.lower().endswith('_xls'):
                file_df = pd.read_excel(file_path, sheet_name=sheet_index)
            else:
                print(f"Unsupported file type for {file_path}. Skipping.")
                continue
        except Exception as e:
            print(f"Error loading {file_path} with file id {file_id}: {e}")
            continue

        # Create a Table instance and generate the heatmap on the specific axis
        table = Table(name=file_name, dataframe=file_df)
        ax = axes[idx]  # Select the current axis
        nan_mask = table.dataframe.isna().astype(int)
        
        # Plot the heatmap on the current axis without antialiasing
        ax.imshow(nan_mask, cmap='cool', aspect='auto', vmin=0, vmax=1,interpolation='none')
        ax.axis('off')  # Turn off axis ticks for a cleaner look

    # Hide any remaining unused axes (if fewer than 12 files)
    for j in range(idx + 1, len(axes)):
        axes[j].axis('off')

    # Adjust layout
    plt.tight_layout()
    plt.show()

    print(f"file ids: {file_ids}")


def db_query(query):
    with Database('spreadsheets.db') as db:
        df = pd.read_sql(query, db.con)
        display(df.reset_index(drop=True))
        return df

if __name__ == '__main__':
    db_query('SELECT * from files LIMIT 1')