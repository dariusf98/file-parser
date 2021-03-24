#!/usr/bin/env node

class Component {
    constructor(fullyQualifiedName, files) {
        this.fullyQualifiedName = fullyQualifiedName
        this.files = files
    }
}

const yargs = require("yargs");
const fs = require('fs');
const path = require("path");

const port = process.env.PORT || 8080;

const options = yargs
    .usage("Usage: file-parser --of <outputFile> --ftg <filesToGroup> --baseFolder")
    .option("baseFolder", {
        alias: "baseFolder",
        describe: "A file containing the prefix of the path to the analyzed project",
        type: "string",
        demandOption: true
    })
    .argv;

const components = []
const defaultComponent = new Component("@", [])
const controllersComponent = new Component("controllers", [])
const servicesComponent = new Component("services", [])
const repositoriesComponent = new Component("repositories", [])
const baseFolder = options.baseFolder
const baseFolder2 = './project/'.concat(baseFolder);

const allFiles = fs.readFileSync(path.resolve(__dirname, "./input/filesToGroup.txt"), {encoding: 'UTF-8'}).toString().split("\n").filter(file => file.length !== 0)

allFiles.forEach(currentFile => {

    fs.readFile(baseFolder2.concat(currentFile.slice(0,-1)), "UTF-8", function (err, contents) {
        if(contents!= undefined){
        if (contents.includes("@RestController")) {
            controllersComponent.files.push(currentFile.slice(0,-1))
        } else if (contents.includes("@Service")) {
            servicesComponent.files.push(currentFile.slice(0,-1))
        } else if (contents.includes("JpaRepository")) {
            repositoriesComponent.files.push(currentFile.slice(0,-1))
        } else {
            defaultComponent.files.push(currentFile.slice(0,-1))
        }
        }
    })
})

components.push(controllersComponent)
components.push(servicesComponent)
components.push(repositoriesComponent)
components.push(defaultComponent)

setTimeout(function () {
    fs.writeFileSync('./result/result.json', JSON.stringify(components))
}, 2000)

