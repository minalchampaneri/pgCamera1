var dataService = function () {

    var serviceBase = (location.hostname === "localhost")
        ? 'http://localhost/gTicketServices/api/'
        : 'http://213.94.214.245/gTicketServices/api/';

    var addTicket = function(ticket, callback) {
        $.ajax({
            url: serviceBase + 'UploadedTickets',
            data: JSON.stringify(ticket),
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            statusCode: {
                201: function (data) {
                    callback(data);
                }
            }
        });
    };

    var getColours = function(callback) {
        $.getJSON(serviceBase + 'Colours', function (data) {
            callback(data);
        });
    };

    var getContraventions = function (callback) {
        $.getJSON(serviceBase + 'Contraventions', function (data) {
            callback(data);
        });
    };

    var getMakes = function (callback) {
        $.getJSON(serviceBase + 'VehicleManufacturer', function (data) {
            callback(data);
        });
    };

    var getModels = function (makeId, callback) {
        $.getJSON(serviceBase + 'VehicleManufacturer', { makeId: makeId }, function (data) {
            callback(data);
        });
    };

    var getNextAvailableTicketNumber = function (callback) {  
        $.getJSON(serviceBase + 'Tickets', {organisationId: 2}, function(data) {
            callback(data);
        });
    };

    var getVehiclePlateCountries = function (callback) {
        $.getJSON(serviceBase + 'VehiclePlates', function (data) {
            callback(data);
        });
    };

    var getVehiclePlateCategories = function (countryId, callback) {
        $.getJSON(serviceBase + 'VehiclePlates', { countryId: countryId }, function (data) {
            callback(data);
        });
    };

    var getVehiclePlateTypes = function (categoryId, callback) {
        $.getJSON(serviceBase + 'VehiclePlates', { categoryId: categoryId }, function (data) {
            callback(data);
        });
    };

    return {
        addTicket: addTicket,
        getColours: getColours,
        getContraventions: getContraventions,
        getMakes: getMakes,
        getModels: getModels,
        getNextAvailableTicketNumber: getNextAvailableTicketNumber,
        getVehiclePlateCountries: getVehiclePlateCountries,
        getVehiclePlateCategories: getVehiclePlateCategories,
        getVehiclePlateTypes: getVehiclePlateTypes
    };
}();