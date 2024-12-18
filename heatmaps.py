import os
import matplotlib.pyplot as plt
import pandas as pd
from table import Table

def generate_heatmaps(df_with_filenames, color='cool', file_column='file_name', file_id_column='file_id',sheet_index_column='sheet_index', max_files=36):
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
    sheet_indexes = []
    
    for idx, row in enumerate(df_with_filenames.itertuples(index=False)):
        if idx >= max_files:
            break  # Stop if we reach the max_files limit
        
        # Build the full file path
        file_name = getattr(row, file_column)
        file_id = getattr(row, file_id_column)
        file_ids.append(file_id)
        sheet_index = getattr(row, sheet_index_column) if hasattr(row, sheet_index_column) else 0
        sheet_indexes.append(sheet_index)
        file_path = os.path.join('spreadsheet_files', file_name)

        # Load the file as a DataFrame, handling _csv, xls, xlsx and ods suffixes
        try:
            if file_path.lower().endswith('_csv'):
                file_df = pd.read_csv(file_path, encoding="ISO-8859-1") 
            elif file_path.lower().endswith('_xls'):
                file_df = pd.read_excel(file_path, sheet_name=sheet_index)
            elif file_path.lower().endswith(('_xlsx','_ods')):
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
        ax.imshow(nan_mask, cmap=color, aspect='auto', vmin=0, vmax=1,interpolation='none')
        ax.axis('off')  # Turn off axis ticks for a cleaner look

    # Hide any remaining unused axes (if fewer than 12 files)
    for j in range(idx + 1, len(axes)):
        axes[j].axis('off')

    # Adjust layout
    plt.tight_layout()

    print(f"file ids: {file_ids}")
    print(f'sheet indexes: {sheet_indexes}')
    return fig