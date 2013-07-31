/**
 * Starts Code Style checking process.
 *
 * @name Comb
 */
var Comb = function() {
    this._rules = [];
    this._activeRules = [];
    this._excludes = null;
};

Comb.prototype = {

    /**
     * Loads configuration from JSON.
     *
     * @param {Object} config
     */
    configure: function(config) {
        console.log(config);
    }

};

module.exports = Comb;
