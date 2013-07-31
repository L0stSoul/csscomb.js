/**
 * Starts rules sorting process.
 *
 * @name Comb
 */
var fs = require('fs'),
    Comb = function() {};

Comb.prototype = {

    /**
     * Processes input file into output.
     *
     * @param {Object} config
     * @param {String} input Input file path
     * @param {String} [output] Output file path
     */
    process: function(config, input, output) {
        var styles;

        try {
            styles = fs.readFileSync(input, 'utf-8');
        } catch (e) {
            throw new Error('Input file reading error ' + e.message);
        }

        styles = this.sort(styles);

        /*
        try {
            fs.writeFileSync(output || input, styles);
        } catch (e) {
            throw new Error('Error while writing output ' + e.message);
        }
        */
    },

    /**
     * Sort rules.
     *
     * @param {String} styles Input file data
     * @returns {String}
     */
    sort: function(styles) {
        console.log(JSON.stringify(styles));
    }

};

module.exports = Comb;
