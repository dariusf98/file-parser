# Spring File Parser

Spring File Parser is a Spring application that splits the files of a project based on their functionality. File Parser is able to detect the type of and functionality of a file by reading it's contents and checking for type-specific annotations.

## Installation

### From Github
To install Spring File Parser from Github, please download from the [latest release](https://github.com/dariusf98/file-parser/releases) from Github, the `Source code.zip` archive and unzip it to a specific location.
The contents of this archive are:
* `input` folder - the folder containing filesToGroup.txt
* `project` folder - the folder containing the root folder of the project you want to analyze
* `result` folder - a folder where Spring File Paser will output the results in, under a result.json file
* `filesToGroup.txt` - a text file containing the paths to the folders to be grouped in collections
* `Dockerfile` - the file containing the Docker configuration
* `index.js` - the file containing the main source code of the Spring File Parser
* `plugin-info.json` - the file containing the configuration for DxPlatform
* `deploy.sh` -  a shell script for copying **plugin-info.json** to the **.dxplatform** folder on Windows

### From Docker
Run Docker on your machine, and open a terminal.
To run File Parser from Docker, go [here](https://hub.docker.com/r/bencehach/website) and run the Docker Pull command in the terminal:
```
docker pull bencehach/website:1.0
```
After this, run
```
docker image ls
```
and search for the **REPOSITORY** bencehach/website with the associated **TAG 1.0** and copy the **IMAGE ID** (you will need it later). 
Create a folder on your desktop (e.g. Spring_FP) then navigate inside it. You will need to create two folders here, named **project** and **result**, and a text file named **filesToGroup.txt** (named exactly like this).

Inside the **project** folder you need to copy **the root folder** of the project you wish to analyze.
For example, if you download a branch as a .zip from GitHub, the unzipped folder has to be copied here.
Inside the **result** folder a result.json file will be generated, containing the output results.
In the **filesToGroup.txt** file you will need to provide the paths to the files you wish to group (starting after the path of the root folder of the project, placed in the **project** folder).

From the terminal, navigate inside the newly created folder on the Desktop (e.g. Spring_FP) and run the following command
```
docker run -v %cd%:/app/input -v %cd%/result:/app/result -v %cd%/project:/app/project -it *IMAGE_ID* --baseFolder {*Your Project Folder Name from the **project** folder*}
```
E.g.
```
docker run -v %cd%:/app/input -v %cd%/result:/app/result -v %cd%/project:/app/project -it *IMAGE_ID* --baseFolder online-shop-bencehSpring-develop/
```

**IMAGE_ID** is the Id of the image copied from before, and all the * represent placeholders, so they should not be included.

For MAC Users, the command is:
```
docker run -v $PWD:/app/input -v $PWD/result:/app/result -v $PWD/project:/app/project -it *IMAGE_ID* --baseFolder {*Your Project Folder Name from the **project** folder*}
```

### From Code
Clone the repository from [here](https://github.com/dariusf98/file-parser/tree/master2) (Branch **master2**).

After you decide which project you wish to analyze, copy it's root folder to File Parser's **project** folder.

In the **filesToGroup.txt** file you will need to provide the paths to the files you wish to group (starting after the path of the root folder of the project, placed in the **project** folder).

Run `npm i -g`.

* In order to parse the files contained in a project, use the following command :
```
node index.js --baseFolder {*Your Project Folder Name*}\
```
