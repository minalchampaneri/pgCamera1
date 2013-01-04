$(document).on('pageinit', '#pageLogin', function () {
    
    animateLogo();
    
    $('#formLoginForm').submit(function () {


        $.mobile.changePage('TicketMain.html');
    });

    //$('#pageLogin').on('click', '#buttonLoginStart', function () {
    //   // alert('You clicked me');

    //    //return false;
    //});
    
});

function animateLogo() {
    $('#loginLogo').hide().fadeIn(5000);
}

