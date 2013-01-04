var plateCountries, plateCategories, plateTypes, bayTypes;

$(document).on("pageinit", "#plateDetailsPage", function () {
    
    plateCountries = $('select[name=plateCountry]');
    plateCategories = $('select[name=plateCategory]');
    plateTypes = $('select[name=plateType]');
    bayTypes = $('select[name=bayType]');

    fillCountryList();

    // cascading drop-downs
    plateCountries.change(function () {
        var selectedCountry = $(this).val();

        if (selectedCountry == "0") {
            fillCountryList();
        }
        else {
            fillCategoryList();
        }
    });

    plateCategories.change(function () {
        var selectedCategory = $(this).val();

        if (selectedCategory == "0") {
            fillCategoryList();
        } else {
            fillVehicleTypeList();
        }
    });

    plateTypes.change(function () {
        var selectedVehicleType = $(this).val();

        if (selectedVehicleType == "0") {
            fillVehicleTypeList();
        } else {
            fillBayTypeList();
        }
    });

});

$('#plateDetailsPage').on('click', '#goToBayContraventions', function () {
    var plateNumber = $('#plateNumber').val();

    // we really really need this data
    if (plateNumber === "") {
        return false;
    }

    // save selected vehicle country, type, etc. before moving further
    localStorage.PlateNumber = $('#plateNumber').val();
    localStorage.VehicleCountry = plateCountries.find(':selected').text();
    localStorage.VehicleCountryId = plateCountries.find(':selected').val();
    localStorage.VehicleCategory = plateCategories.find(':selected').text();
    localStorage.VehicleCategoryId = plateCategories.find(':selected').val();
    localStorage.VehicleType = plateTypes.find(':selected').text();
    localStorage.VehicleTypeId = plateTypes.find(':selected').val();
    localStorage.BayType = bayTypes.find(':selected').text();
    localStorage.BayTypeId = bayTypes.find(':selected').val();

    //$.mobile.changePage("bayContraventionsPage.html");
});


function fillCountryList() {
    resetVehicleCategories();
    
    plateCountries.html('<option value="0">Fetching Countries...</option>');
    plateCountries.selectmenu('refresh');

    dataService.getVehiclePlateCountries(function (data) {
        plateCountries.html('<option value="0">Select Country...</option>');

        $.each(data, function (index, value) {
            plateCountries.append('<option value="' + value.countryId + '">' + value.countryName + '</option>');
        });

        plateCountries.selectmenu('refresh');
    });
}

function fillCategoryList() {
    resetPlateTypes();

    var plateCountryId = $('select[name=plateCountry]').val();

    plateCategories.html('<option value="0">Fetching categories...</option>');
    plateCategories.selectmenu('refresh');

    dataService.getVehiclePlateCategories(plateCountryId, function (data) {
        plateCategories.html('<option value="0">Select Category...</option>');

        $.each(data, function (index, value) {
            plateCategories.append('<option value="' + value.categoryId + '">' + value.categoryName + '</option>');
        });

        plateCategories.selectmenu('enable');
        plateCategories.selectmenu('refresh');
    });
}

function fillVehicleTypeList() {
    resetBayTypes();
    
    var plateCategoryId = $('select[name=plateCategory]').val();

    plateTypes.html('');
    plateTypes.html('<option value="0">Select Type...</option>');

    dataService.getVehiclePlateTypes(plateCategoryId, function (data) {
        $.each(data, function (index, value) {
            plateTypes.append('<option value="' + value.typeId + '">' + value.typeName + '</option>');
        });
    });

    plateTypes.selectmenu('enable');
    plateTypes.selectmenu('refresh');
}

function fillBayTypeList() {    
    bayTypes.html('');
    bayTypes.html('<option value="0">Select Bay Type...</option>');

    bayTypes.append('<option value="1">Standard</option>');
    bayTypes.append('<option value="2">Premium</option>');
    bayTypes.append('<option value="3">Villa</option>');

    bayTypes.selectmenu('enable');
}

function resetVehicleCategories() {
    plateCategories.html('<option value="0">Select Category...</option>');
    plateCategories.selectmenu('disable');
    plateCategories.selectmenu('refresh');

    resetPlateTypes();
    resetBayTypes();
}

function resetPlateTypes() {

    plateTypes.html('<option value="0">Select Type...</option>');
    plateTypes.selectmenu('disable');
    plateTypes.selectmenu('refresh');

    resetBayTypes();
}

function resetBayTypes() {
    bayTypes.html('<option value="0">Select Bay Type...</option>');
    bayTypes.selectmenu('disable');
    bayTypes.selectmenu('refresh');
}