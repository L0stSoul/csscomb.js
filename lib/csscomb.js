/**
 * Starts rules sorting process.
 *
 * @name Comb
 */
var fs = require('fs'),
    cssp = require('cssp'),
    Comb = function() {
        this._indent = 4;
    };

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

        styles = this.processText(styles);

        /*
        try {
            fs.writeFileSync(output || input, styles);
        } catch (e) {
            throw new Error('Error while writing output ' + e.message);
        }
        */
    },

    /**
     * Processes stylesheet text.
     *
     * @param {String} styles Input file data
     * @returns {String}
     */
    processText: function(styles) {
        var tree, text;
        try {
            tree = this.processTree(cssp.parse(styles));
        } catch (e) {
            throw new Error('Input file parsing error ' + e.message);
        }
        text = cssp.translate(cssp.transform(tree));
        console.log(text);
    },

    /**
     * Processes stylesheet tree node.
     * @param {Array} tree Parsed tree
     * @returns {Array}
     */
    processTree: function(tree) {
        this.processNode(['tree', tree]);
        return tree;
    },

    /**
     * Processes tree node.
     * @param {Array} node AST node
     * @param {Number} [level] Indentation level
     * @returns {Array}
     */
    processNode: function(node, level) {
        var comb = this;

        level = level || 1;

        node.forEach(function(node) {
            if (!Array.isArray(node)) return;

            var nodeType = node.shift();

            if (nodeType === 'stylesheet') {
                if (node[node.length - 1][0] === 's') node.pop();
                node.push(['s', '\n']);
            }

            if (nodeType === 'simpleselector') {
                if (node[node.length - 1][0] === 's') node.pop();
                node.push(['s', '\n']);
            }

            if (nodeType === 'block') {
                if (node[0][0] === 's') node.shift();
                node.unshift(['s', '\n']);
                if (node[node.length - 1][0] === 's') node.pop();
                node.push(['s', '\n']);
            }

            node.unshift(nodeType);

            comb.processNode(node, level);
        });
    }

};

module.exports = Comb;
