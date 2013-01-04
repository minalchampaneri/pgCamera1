$(document).on("pageshow", "#pageTicketBayContraventionSelected", function () {
    $('#plateNumber').text(localStorage.PlateNumber);
    $('#contraventionDetails').text(localStorage.ContraventionName);
});