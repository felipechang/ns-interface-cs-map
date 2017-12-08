/**
 * Country-ID & State-ID mapping for NetSuite. Accounts for the mismatch between address/country lists and address subrecord.
 *
 * @author Felipe Chang <felipechang@hardcake.org>
 *
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 */
define(["require", "exports", "[path to]/search"], function (require, exports, search_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Main Class
     */
    var CountryStateMap = (function () {
        /**
         * Constructor
         */
        function CountryStateMap() {
            this.search = new search_1.Search();
        }
        CountryStateMap.prototype.getStateById = function (obj, cb) {
            if (!obj.stateId) {
                throw "Parameter stateId is needed";
            }
            //Bring to scope
            var search = this.search;
            //Looking for state map
            search.setType("customrecord_state_map");
            //Get state by ID
            search.setFilters([
                { name: "isinactive", operator: "is", values: ["F"] },
                { name: "custrecord_state_map_id", operator: "is", values: [obj.stateId] }
            ]);
            //Get state and country values
            search.setColumns([
                { name: "name" },
                { name: "custrecord_state_map_abbr" },
                { name: "custrecord_state_map_id" },
                { name: "name", join: "custrecord_state_map_country" },
                { name: "custrecord_country_map_abbr", join: "custrecord_state_map_country" },
                { name: "custrecord_country_map_id", join: "custrecord_state_map_country" }
            ]);
            //We want the first result
            search.setRange({ start: 0, end: 1 });
            //Run query
            search.run(function (e) {
                if (e) {
                    cb({
                        stateName: e.getValue({
                            name: "name"
                        }),
                        stateAbbr: e.getValue({
                            name: "custrecord_state_map_abbr"
                        }),
                        stateId: e.getValue({
                            name: "custrecord_state_map_id"
                        }),
                        countryName: e.getValue({
                            name: "name",
                            join: "custrecord_state_map_country"
                        }),
                        countryAbbr: e.getValue({
                            name: "custrecord_country_map_abbr",
                            join: "custrecord_state_map_country"
                        }),
                        countryId: e.getValue({
                            name: "custrecord_country_map_id",
                            join: "custrecord_state_map_country"
                        })
                    });
                }
            });
        };
        CountryStateMap.prototype.getStateByAbbr = function (obj, cb) {
            if (!obj.stateAbbr) {
                throw "Parameter stateAbbr is needed";
            }
            if (!obj.countryAbbr) {
                throw "Parameter countryAbbr is needed";
            }
            //Bring to scope
            var search = this.search;
            //Looking for state map
            search.setType("customrecord_state_map");
            //Get state by ID
            search.setFilters([
                { name: "isinactive", operator: "is", values: ["F"] },
                { name: "custrecord_state_map_abbr", operator: "is", values: [obj.stateAbbr] },
                {
                    name: "custrecord_country_map_abbr",
                    join: "custrecord_state_map_country",
                    operator: "is",
                    values: [obj.countryAbbr]
                }
            ]);
            //Get state and country values
            search.setColumns([
                { name: "name" },
                { name: "custrecord_state_map_abbr" },
                { name: "custrecord_state_map_id" },
                { name: "name", join: "custrecord_state_map_country" },
                { name: "custrecord_country_map_abbr", join: "custrecord_state_map_country" },
                { name: "custrecord_country_map_id", join: "custrecord_state_map_country" }
            ]);
            //We want the first result
            search.setRange({ start: 0, end: 1 });
            //Run query
            search.run(function (e) {
                if (e) {
                    cb({
                        stateName: e.getValue({
                            name: "name"
                        }),
                        stateAbbr: e.getValue({
                            name: "custrecord_state_map_abbr"
                        }),
                        stateId: e.getValue({
                            name: "custrecord_state_map_id"
                        }),
                        countryName: e.getValue({
                            name: "name",
                            join: "custrecord_state_map_country"
                        }),
                        countryAbbr: e.getValue({
                            name: "custrecord_country_map_abbr",
                            join: "custrecord_state_map_country"
                        }),
                        countryId: e.getValue({
                            name: "custrecord_country_map_id",
                            join: "custrecord_state_map_country"
                        })
                    });
                }
            });
        };
        return CountryStateMap;
    }());
    exports.CountryStateMap = CountryStateMap;
});
