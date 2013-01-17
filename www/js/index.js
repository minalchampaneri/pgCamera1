var app = {
    initialize: function () {
        this.bindEvents();
    },

    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("online", this.onOnline, false);
        document.addEventListener("offline", this.onOffline, false);
    },
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    onOnline: function () {
        mLog("Device is online.");
        if (tsk_ns.storage.getItem("oImagesToUpload") != null) {
            if (confirm("You apear online now and you have unsent photos, do you want to send it now?")) {
                sendOfflineImages();
            }
        }
    },
    onOffline: function () {
        mLog("Device is offline.");
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

        dHTML += "<div style='width:100%;float:left;'><div style='float:left'><img src='" + picsCollection[i] + "' height='80px' width='80px' /></div><div style='float:left'><input type='checkbox' id='" + i + "' style='width:15px;'/>Image " + (i + 1) + "</div></div>";
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

    if (checkConnection) {
        mLog("Device is online and is about to start uploading");
    }
    else {
        mLog("Device is offline and can not send images to server.It will be sent when internet is available.");
    }
    var selectURIs = new Array();

    var imageURI = "";
    for (j = 0; j < chkList.length; j++) {
        if (chkList[j].checked) {
            imageURI = picsCollection[j];

            if (checkConnection) {
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
            else {
                selectURIs.push(imageURI);
            }
        }
    }

    if (selectURIs.length > 0) 
    {
        // Need to store them offline and will use when back to online.
        tsk_ns.storage.saveItem("oImagesToUpload", JSON.stringify(selectURIs));
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
    alert(msg);
    console.log(msg);
}

function clearList() {
    picsCollection.splice(0, picsCollection.length);
    checkConnection();
    refreshPicList();
}

function sendOfflineImages() {
    var chkList = JSON.parse(tsk_ns.storage.getItem("oImagesToUpload"));

    mLog(chkList.length + " images to upload");
    server = document.getElementById('serverUrl').value;

    var imageURI = "";
    for (j = 0; j < chkList.length; j++) {
        imageURI = chkList[j];
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

    tsk_ns.storage.deleteItem("oImagesToUpload");

    return;
}

function checkConnection() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.NONE] = 'No network connection';

    mLog('Connection type: ' + states[networkState]);

    if (networkState == Connection.UNKNOWN || networkState == Connection.NONE)
        return false;
    else
        return true;
}