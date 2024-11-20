# Spreadsheet Analyser

## Setup

The analyser uses anaconda, and so one first use you will need to set up an
anaconda environment using the enclosed `environment.yml`

### Install anaconda

You should install anaconda using the
[instructions for your platform](https://docs.anaconda.com/anaconda/install/#basic-install-instructions).

### Create an environment on first use

If you do not already have an environment ready to run the analysis, you can
create one from this repository with the following command, replacing `ssa` with
the name you wish to use for the environment.

```
conda env create -n ssa -f environment.yml
```

### Activating the environment

When you want to work on the project you should use (remembering to replace
`ssa` with your chosen name previously):

```
conda activate ssa
```

and when finished

```
conda deactivate
```

### Updating the environment

If the dependencies in the environment change, then you can update the
environment using the following command - **when the environment is activated**

```
conda env update --file environment.yml --prune
```
