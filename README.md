# Overview

This interface map deals with a NetSuite mismatch between address/country on lists and  
the address subrecord, the first is handled by ID, and the later by abbreviations. 
The IDs used are universal to all NetSuite accounts (as far as I could test), 
so should work right after import.
 
 This interface map can be imported as a module from other scripts, and used match sources.

# Dependencies
 - ns-module-search
 
# Installation
- Make sure to have ns-module-search on your SuiteScripts folder.
- Place out/interface_cs_map.js in your SuiteScripts folder.
- Update the interface_cs_map.js dependencies to find the search.js module.
- Use SuiteCloud Developer Framework to upload the xml records.
- Import the CSV files, country goes first. 

# Usage
```javascript
//First we load the library
require(["N/log", "module/interface_cs_map"], function (log, Interface) {
 
    var sm = new Interface.CountryStateMap();
 
    sm.getStateById({
        stateId: "402"
    }, function (e) {
        log.debug("byId", e); 
        /*
        => {
              "stateName": "Northern Territory",
              "stateAbbr": "NT",
              "stateId": "402",
              "countryName": "Australia",
              "countryAbbr": "AU",
              "countryId": "14"
           } 
         */
    });
 
    sm.getStateByAbbr({
        stateAbbr: "PA",
        countryAbbr: "US"
    }, function (e) {
        log.debug("byAbbr", e); 
        /*
        => {
              "stateName": "Pennsylvania",
              "stateAbbr": "PA",
              "stateId": "38",
              "countryName": "United States",
              "countryAbbr": "US",
              "countryId": "230"
           } 
         */
    });
});
```

# License
GNU GPL see LICENSE.

**Use at your own discretion. Test before using in production.**

# Author
Felipe Chang <felipechang@hardcake.org> @mr_pepian

