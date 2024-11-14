# Spreadsheet Analyser

## Dependencies

This project requires Python 3.10 or greater, and a working installation of
Poetry. You can install poetry the usual way with:

```
curl -sSL https://install.python-poetry.org | python3 -
```

## Running scripts

### Check URLs

Check URLs will filter a list of URLs that purport to be spreadsheet files of
some description. It checks that the URL works and outputs a file with the
working URLs.

You can run the script with

```
poetry run python check_urls.py
```

## Extra tools

These tools can be used on the command line but may be better in future in a
pre-commit hook.

### Ruff

You can run 'Ruff' to lint with `poetry run ruff check` and to format you can
use `poetry run ruff format`.

### isort

You can use isort to keep your imports organised with `poetry run isort .`
