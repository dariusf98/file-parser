#!/usr/bin/env node

class Component {
    constructor(fullyQualifiedName, files) {
        this.fullyQualifiedName = fullyQualifiedName
        this.files = files
    }
}

const yargs = require("yargs");
const fs = require('fs');

const options = yargs
    .usage("Usage: file-parser --of <outputFile> --ftg <filesToGroup> --baseFolder")
    .option("of", {
        alias: "outputFile",
        describe: "Output file to write your results to",
        type: "string",
        demandOption: true
    })
    .option("ftg", {
        alias: "filesToGroup",
        describe: "A file containing all files the plugin should group into components (one file per line)",
        type: "string",
        demandOption: true
    })
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

const filesToGroup = options.ftg
const baseFolder = options.baseFolder

const allFiles = fs.readFileSync(filesToGroup, {encoding: 'UTF-8'}).toString().split("\n").filter(file => file.length !== 0)


allFiles.forEach(currentFile => {
    fs.readFile(baseFolder+currentFile, "UTF-8", function (err, contents) {
        if (contents.includes("@RestController")) {
            controllersComponent.files.push(currentFile)
        } else if (contents.includes("@Service")) {
            servicesComponent.files.push(currentFile)
        } else if (contents.includes("JpaRepository")) {
            repositoriesComponent.files.push(currentFile)
        } else {
            defaultComponent.files.push(currentFile)
        }
    })
})

components.push(controllersComponent)
components.push(servicesComponent)
components.push(repositoriesComponent)
components.push(defaultComponent)


setTimeout(function () {
    fs.writeFileSync(options.of, JSON.stringify(components))
}, 1000)

