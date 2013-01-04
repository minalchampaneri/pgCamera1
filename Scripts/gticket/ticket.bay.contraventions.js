$(document).on("pageinit", "#bayContraventionsPage", function () {
    var contraventionsList = $('#contraventionsList');

    // Fill Bay PVT contraventions
    dataService.getContraventions(function (data) {
        var output = '';
        contraventionsList.empty();

        $.each(data, function (index, value) {
            if (value.contraventionId > 200 && value.contraventionId < 206) {
                output += '<li><a href="TicketBayContraventionSelected.html" data-contravention="' + value.contraventionId + '">' + value.displayName + '</a></li>';
            }
        });

        contraventionsList.html(output);
        contraventionsList.listview('refresh');
    });


    // when a user selects a Bay PVT contravention
    contraventionsList.on('click', 'li', function () {
        var item = $(this);
        localStorage.ContraventionName = item[0].textContent;
        localStorage.ContraventionId = item.find('a').data('contravention');
    });

});