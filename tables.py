class Tables:
    def __init__(self, directory ):
        self.tables = {}
        self.errors = []
        self.empty_rows = {
            'empty_row_count': {'has_empty_rows': 0, 'no_empty_rows': 0},
            'empty_row_files':[]
        }
    
        # Get the JSON file path from glob
        json_folder = os.path.join(directory, 'json')
        json_files = glob.glob(os.path.join(json_folder, "*_json*"))
        if json_files:
            with open(json_files[0], 'r') as f:  # Open the first file found
                self.sample_json = json.load(f)
        else:
            self.sample_json = {}

        self.load_csv_files(directory)

    #helper function (olgibbons optimise this later)
    def _locate_url(self, json, filename):
        for key, value in json.items():
            if value['file_name'] == filename:
                return key

    def load_csv_files(self, directory):
        """Load all CSV files in a directory into Table objects."""
        csv_files = glob.glob(os.path.join(directory, "*.csv*"))
        
        for file_path in csv_files:
            file_name = os.path.basename(file_path)
            delimiter = []
            try:
                """#Use sniffer to detect delimiter
                with open(file_path, newline='', encoding='latin1') as csvfile:
                    dialect = csv.Sniffer().sniff(csvfile.read(1024))
                    csvfile.seek(0)
                    d = dialect.delimiter
                    delimiter.append(d)"""
                # Load the CSV file into a dataframe and don't infer header
                df = pd.read_csv(file_path, encoding="ISO-8859-1", header=None, index_col=False, low_memory=False)
                self.tables[file_name] = Table(file_name, df)  
                #add delimiter to Table instance
                self.tables[file_name].delimiter = delimiter
                
            except Exception as e:
                # Store the error in the errors list with context
                self.errors.append({
                    'file_name': file_name,
                    'file_path': file_path,
                    'url': self._locate_url(self.sample_json, file_name),
                    'error': str(e)  # Capture the exception message
                })
                print(f"Problem reading file {file_name}: {e}")
                
    def check_empty_rows_in_all_tables(self):
        """Check if any table has empty rows."""
        self.empty_rows['empty_row_files'] = []
        has_empty_rows = 0
        no_empty_rows = 0
        
        for name, table in self.tables.items():
            has_empty = table.check_for_empty_rows()
            if has_empty:
                has_empty_rows += 1
                #add table name to list
                self.empty_rows['empty_row_files'].append(table)
            else:
                no_empty_rows += 1
    
        self.empty_rows['empty_row_count']['has_empty_rows'] = has_empty_rows
        self.empty_rows['empty_row_count']['no_empty_rows'] = no_empty_rows

    def display_empty_row_data(self):
        """Plot the summary of empty rows as a bar chart."""
        self.check_empty_rows_in_all_tables()
                
        labels = ['Tables with Empty Rows', 'Tables without Empty Rows']
        counts = [self.empty_rows['empty_row_count']['has_empty_rows'], self.empty_rows['empty_row_count']['no_empty_rows']]
        
        #data
        x = labels
        y = counts

        fig, ax = plt.subplots()

        rects = ax.bar(x, y, color = ['red', 'green'])
        ax.set_ylabel('Counts')
        ax.bar_label(rects, padding=3)
        plt.show()      

    def show_empty_tables(self):
        """View the tables with missing rows"""
        for table in self.empty_rows['empty_row_files']:
            display(Markdown(f"DataFrame: {table.name}"))
            display(table.dataframe)
            

    def display_metadata(self):
        """Plot the summary data of the downloaded files"""
        labels = self.sample_json['metadata'].keys()
        counts = self.sample_json['metadata'].values()

        fig, ax = plt.subplots()

        rects = ax.bar(labels, counts, color = ['red', 'green', 'blue', 'yellow'])
        ax.bar_label(rects, padding=3)
        plt.show()

    def show_tables_filter(self,heatmap=False, **flags):
        """
        Display the dataframes of tables where the specified fingerprint_flags match the given values.
        :param flags: Keyword arguments representing flag names and the values to check (e.g., title_row=True)
        """
        tables = []
        for table_name, table in self.tables.items():  
            # Check if all specified flags match the corresponding values in fingerprint_flags
            if all(table.fingerprint_flags.get(flag, False) == value for flag, value in flags.items()):
                print(f"Displaying table: {table.name} with flags {flags}")
                display(table.dataframe)
                tables.append(table)
            if heatmap ==True:
                table.heatmap()
        return tables

    def create_data_table(self):
        """Generate a dataframe with metadata for each table."""
        metadata = [table.get_metadata_row() for table in self.tables.values()]
        return pd.DataFrame(metadata)
        
    def get_error_log(self):
        """Return the list of errors encountered during CSV loading."""
        return self.errors

    def display_unread_tables(self):
        """ Show the raw file data for the csvs that could not be read """
        for error_file in self.errors:
            #Olgibbons still need to do this
            pass