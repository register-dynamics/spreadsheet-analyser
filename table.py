import matplotlib.pyplot as plt
import pandas as pd


class Table:
    def __init__(self, name, dataframe):
        self.name = name
        self.dataframe = dataframe
        self.shape = self.dataframe.shape
        self.percent_nan = self.nan_percentage()
        self.percent_bulk = 100
        self.fingerprint_flags = {
            "full_table": False,
            "empty_top_rows": False,
            "empty_bottom_rows": False,
            "title_row": False,
            "subtitles": False,
            "percent_bulk": None,
        }
        self.fingerprint = self.fingerprint()
        self.fingerprint_analyse()
        self.empty_rows = pd.Series()
        self.empty_row_indices = []
        self.delimiter = []
        self.check_for_empty_rows()

    def check_for_empty_rows(self):
        nan_series = self.dataframe.isna().all(axis=1)
        empty_row_indices = self.dataframe.index[nan_series]
        self.empty_row_indices.append(empty_row_indices)
        if nan_series.any() is True:
            empty_rows = nan_series[nan_series is True]
            self.empty_rows = pd.Series(empty_rows)
            return True
        else:
            self.empty_rows = 0
            return False

    def nan_percentage(self):
        """Percentage of dataframe that is NaN"""
        total_cells = self.dataframe.size
        total_nan = self.dataframe.isna().sum().sum()
        return 100 * (total_nan / total_cells)

    def fingerprint(self):
        """Create a fingerprint of empty and non empty rows as a list of tuples"""
        """The fingerprint is best understood as each tuple representing (n blank rows, followed by n non blank rows)"""
        # Create a series/list of value counts where count > 0 is a non empty row
        value_count = self.dataframe.notna().sum(axis=1)

        fingerprint = []
        blank_row_count = 0
        filled_row_count = 0
        blank_row = False

        # First check if top row is empty
        if value_count[0] == 0:
            blank_row = True

        for count in value_count:
            # new blank row detected, update the fingerprint list
            if count == 0 and blank_row is False:
                fingerprint.append((blank_row_count, filled_row_count))
                # reset counts
                blank_row_count = 1
                filled_row_count = 0
                blank_row = True
            # An additional (or top) blank row detected, increment the count
            elif count == 0 and blank_row is True:
                blank_row_count += 1
            # non empty row detected, update fingerprint list
            elif count != 0 and blank_row is True:
                # reset the counts
                filled_row_count = 1
                blank_row = False
            # An additional non empty row detected, increment the count
            elif count != 0 and blank_row is False:
                filled_row_count += 1
        # add last tuple
        fingerprint.append((blank_row_count, filled_row_count))
        return fingerprint

    def fingerprint_analyse(self):
        # Find bulk data
        bulk = max([item[1] for item in self.fingerprint])
        self.percent_bulk = 100 * bulk / self.dataframe.shape[0]

        # Store percent_bulk in fingerprint_flags
        self.fingerprint_flags["percent_bulk"] = self.percent_bulk

        # Check for empty top rows, regardless of fingerprint length
        if self.fingerprint[0][0] > 0:
            self.fingerprint_flags["empty_top_rows"] = True

        # Handle full table case
        if len(self.fingerprint) == 1 and self.fingerprint[0][0] == 0:
            self.fingerprint_flags["full_table"] = True

        # Split data if there are multiple sections
        if len(self.fingerprint) > 1:
            # Check if the non-nan rows are less than the bulk data
            if self.fingerprint[0][1] > 1 and self.fingerprint[0][1] < bulk:
                self.fingerprint_flags["title_row"] = True
            if self.fingerprint[-1][0] > 0 and self.fingerprint[-1][1] > 1:
                self.fingerprint_flags["empty_bottom_rows"] = True
            # Try to find potential subtitles, ignoring first tuple and last tuple
            for i in range(1, len(self.fingerprint) - 2):
                if self.fingerprint[i][1] < bulk:
                    self.fingerprint_flags["subtitles"] = True

    def get_metadata_row(self):
        """Return a dictionary of metadata for this table in sqlite compatible types."""
        metadata_row = {
            "name": self.name,
            # olgibbons: duplicate here:
            "number_of_rows": self.dataframe.shape[0],
            "percent_nan": self.percent_nan,
            "percent_bulk": self.fingerprint_flags.get("percent_bulk", None),
            "title_row": self.fingerprint_flags.get("title_row", False),
            "subtitles": self.fingerprint_flags.get("subtitles", False),
            "full_table": self.fingerprint_flags.get("full_table", False),
            "empty_top_rows": self.fingerprint_flags.get("empty_top_rows", False),
            "empty_bottom_rows": self.fingerprint_flags.get("empty_bottom_rows", False),
            "empty_rows_count": len(self.empty_row_indices[0]),
            "empty_rows": self.empty_rows,
            "fingerprint": self.fingerprint,  # convert to string as SQLITE hates lists
            "row_count": self.dataframe.shape[0],
            "column_count": self.dataframe.shape[1],
            # Add more fields as needed
        }
        return metadata_row

    def heatmap(self):
        """Display a heatmap of the table contents"""
        # Create a mask where NaNs are 1 and non-NaNs are 0
        df = self.dataframe
        nan_mask = df.isna().astype(int)

        # Plotting the mask
        plt.figure(figsize=(6, 4))
        plt.imshow(
            nan_mask, cmap="cool", aspect="auto"
        )  # Red for NaN (1), Green for non-NaN (0)
        plt.colorbar(label="Non-empty cells (0) / Empty cells (1)")
        plt.xticks(ticks=range(df.shape[1]), labels=df.columns)
        plt.title(f"NaN vs Non-NaN values in DataFrame {self.name}")
        plt.show()
