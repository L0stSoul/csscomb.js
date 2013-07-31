/**
 * Command line implementation for CSScomb
 *
 * Usage example:
 * ./node_modules/.bin/csscomb file1 [dir1 [fileN [dirN]]]
 */
var fs = require('fs'),
    program = require('commander');

program
    .version(require('../package.json').version)
    .usage('[options] <file ...>')
    .option('-c, --config [path]', 'configuration file path')
    .option('-i, --input [path]', 'file needs to be sorted')
    //.option('-o, --output [path]', 'sort result file; default: created or overwritten if existed')
    .parse(process.argv);

var Comb = require('./csscomb'),
    comb = new Comb(),
    configPath = program.config || (process.cwd() + '/.csscomb.json'),
    inputPath = program.input,
    outputPath = program.output;

if (fs.existsSync(configPath)) {
    try {
        var config = require(configPath);
        if (!inputPath) {
            console.log('No input files specified. Try option --help for usage information.');
            process.exit(0);
        }
    } catch (e) {
        throw new Error('Configuration file reading error ' + e.message);
    }
    comb.process(config, inputPath, outputPath);
} else {
    console.log('Configuration file ' + configPath + ' was not found.');
    process.exit(1);
}
