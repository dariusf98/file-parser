# Spring File Parser

Spring File Parser is a Spring application that splits the files of a project based on their functionality. File Parser is able to detect the type of and functionality of a file by reading it's contents and checking for type-specific annotations.

## Installation

### From Github
To install Insider from Github, please download from the [latest release](https://github.com/dxworks/insider/releases) from Github, the `insider.zip` archive and unzip it to a specific location.
The contents of this archive are:
* `insider-*.jar` - the executable jar file
* `insider.bat` - a batch script for executing Insider on Windows
* `insider.sh` - a shell script for executing insider on Windows
* `config` - a folder for configuration files, described more in the [Configuration Section](#Configuration)
* `results` - a folder where Insider will output the results.

### From Docker
...

### From Code
Clone the repository from [here](https://github.com/dariusf98/file-parser/tree/master).

Run `npm i -g` to obtain a clean installation.

## Configuration
After you decide which project you wish to analyze, copy it's root folder to File Parser's **project** folder.
Edit the configuration file (*config/insider-conf.properties*), to **specify the root folder** of the project's sources.

## Commands

### Find Command
* In order to parse the files contained in a project, use the following command :
```
node index.js --baseFolder {*Your Project Folder Name*}\
```

* Detect Simple Code Smells. Use the following command (run Insider using the **insider.bat** or **insider.sh** script):
```
insider.sh find config/code_smells.json
```

* You can also run the *find* command with both files at once: 
```
insider.sh find config/libraries.json config/code_smells.json
```

The commands will generate two *.json* files (**_PROJECT_ID-libraries.json_** and **_PROJECT_ID-code_smells.json_**) in the **results** folder.

## Acknowledgements

The `inspect` command is inspired by the [Application Inspector](https://github.com/microsoft/ApplicationInspector) project created by Microsoft.
Insider even uses the same input files as Application Inspector.
