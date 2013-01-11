var app = {
    initialize: function () {
        this.bindEvents();
    },

    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function (id) {
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
    }
};

// --------------------------------------------
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var picsCollection = new Array();

// Called when a photo is successfully retrieved
function onPhotoURISuccess(imageURI) {
    picsCollection.push(imageURI);
    mLog('Image selected successfully!!!');
    document.getElementById('camera_status').innerHTML = "Image selected successfully!!!";

    refreshPicList();
}
function refreshPicList() {

    var dHTML = "";

    for (i = 0; i < picsCollection.length; i++) {

        dHTML += "<div style='width:100%;float:left;'><div style='float:left'><img src='"+ picsCollection[i] +"' height='80px' width='80px' /></div><div style='float:left'><input type='checkbox' id='"+i+"' style='width:15px;'/>Image "+ (i+1) +"</div></div>";
    }
    document.getElementById("divPicList").innerHTML = dHTML;
}

// Called if something bad happens.
function onFail(message) {
    document.getElementById('camera_status').innerHTML = "Error getting picture.";
    mLog('Error: ' + message);
}

function uploadPicture() {

    var parent = document.getElementById("divPicList");
    var chkList = parent.getElementsByTagName("input");
    server = document.getElementById('serverUrl').value;

    var imageURI = "";
    for (j = 0; j < chkList.length; j++) {
        if (chkList[j].checked) {
            imageURI = picsCollection[j];

            alert(imageURI);

            // Specify transfer options
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            options.chunkedMode = false;

            // Transfer picture to server
            var ft = new FileTransfer();
            ft.upload(imageURI, server, function (r) {
                document.getElementById('camera_status').innerHTML = "Upload successful: " + r.bytesSent + " bytes uploaded.[" + r.responseCode + "]-[" + r.response + "]";
            }, function (error) {
                document.getElementById('camera_status').innerHTML = "Upload failed: Code = " + error.code + "-" + error.source + "-" + error.target;
            }, options);

        }
    }
    return;       
}

function win(r) {
    mLog("Code = " + r.responseCode);
    mLog("Response = " + r.response); 
    mLog("Sent = " + r.bytesSent);
}

function fail(error) {
//    switch (error.code) {
//        case FileTransferError.FILE_NOT_FOUND_ERR:
//            mLog("Photo file not found");
//            break;
//        case FileTransferError.INVALID_URL_ERR:
//            mLog("Bad Photo URL");
//            break;
//        case FileTransferError.CONNECTION_ERR:
//            mLog("Connection error");
//            break;
//    }

    mLog("An error has occurred: Code = " + error.code + "-" + error.source + "-" + error.target);
}

function reset() {
    document.getElementById("camera").style.display = "block";
    document.getElementById("picList").style.display = "none";
}

function mLog(msg) {
    //alert(msg);
    console.log(msg);
}

function clearList() {
    picsCollection.splice(0, picsCollection.length);
    associatePhotos();
}
