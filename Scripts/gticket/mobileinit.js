// When jQuery Mobile starts, it triggers a mobileinit event on the document object
// If changes to the default jQuery Mobile settings are needed, they are easy to configure.

$(document).on("mobileinit", function () {

    // natively style all buttons
    //$.mobile.page.prototype.options.keepNative = 'button';

    // allow cross-domain requests for PhoneGap apps that must "phone home" by loading assets off a remote server 
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;

    
});