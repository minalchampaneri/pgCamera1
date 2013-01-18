// Store Manager Singleton class
// Implemented using revealing module design pattern
// Author: Gokuldas C.
// Last Update: 23/01/2012

var tsk_ns = tsk_ns || {};

tsk_ns.storage = function () {
    // create instance of local storage
    var local = window.localStorage,
    // Save to local storage
        saveItem = function (key, item) {
            local.setItem(key, item);
        },
        getItem = function (key) {
            return local.getItem(key);
        },
        hasLocalStorage = function () {
            return ('localStorage' in window && window['localStorage'] != null);
        },
        deleteItem = function (key) {
            local.removeItem(key);
        }
    ;

    // public members
    return {
        saveItem: saveItem,
        getItem: getItem,
        hasLocalStorage: hasLocalStorage,
        deleteItem: deleteItem
    };
}();