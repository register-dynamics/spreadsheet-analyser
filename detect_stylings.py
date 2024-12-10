from openpyxl import load_workbook

def check_merged_cells_xlsx(file_path):
    workbook = load_workbook(file_path)
    merged_cells_info = []

    for sheet_name in workbook.sheetnames:
        sheet = workbook[sheet_name]
        for merged_range in sheet.merged_cells.ranges:
            print(f"Merged cells found in sheet '{sheet_name}': {merged_range}")
            merged_cells_info.append((sheet_name, str(merged_range)))

    return merged_cells_info

def check_colored_cells_xlsx(file_path):
    wb = load_workbook(file_path)  
    has_color = False  
    for sheet_name in wb.sheetnames:
        sheet = wb[sheet_name]
        for row in sheet.iter_rows():
            for cell in row:
                if cell.fill.start_color.index != '00000000':
                    print(f"Styling color {cell.fill.start_color.index} found in cell {cell.coordinate} of sheet '{sheet_name}'")
                    has_styling = True

    return has_color

def check_styles_xlsx(file_path):
    workbook = load_workbook(file_path)
    has_styling = False

    for sheet_name in workbook.sheetnames:
        sheet = workbook[sheet_name]
        for row in sheet.iter_rows():
            for cell in row:
                if cell.font.bold or cell.fill.patternType != 'none' or cell.fill.start_color.index != '00000000':
                    print(f"Styling found in cell {cell.coordinate} of sheet '{sheet_name}'")
                    has_styling = True

    return has_styling
    
if __name__ == '__main__':
    # Example usage:
    file_path = "/Users/gibbons/registerdynamics/python_projects/url_tester/test_sheet_colored.xlsx" 
    '''merged_cells = check_merged_cells_xlsx(file_path)
    if merged_cells:
        print("Merged cells detected:")
        for sheet_name, merged_range in merged_cells:
            print(f"- {merged_range} in sheet '{sheet_name}'")
    else:
        print("No merged cells found.")'''
    check_colored_cells_xlsx(file_path)