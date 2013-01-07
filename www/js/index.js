var app = {
    initialize: function() {
        this.bindEvents();
    },
    
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
    }
};

// --------------------------------------------
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var picsCollection = new Array();


// Called when a photo is successfully retrieved       
function onPhotoDataSuccess(imageData) {
    
    var largeImage = document.getElementById('largeImage');
    largeImage.style.display = 'block';
    largeImage.src = imageData;
    picsCollection.push(imageData);
    alert('Image captured successfully!!!');
}

// Called when a photo is successfully retrieved
function onPhotoURISuccess(imageURI) {
    
    var largeImage = document.getElementById('largeImage');
    largeImage.style.display = 'block';
    largeImage.src = imageURI;
    picsCollection.push(imageURI);
    alert('Image selected successfully!!!');
}
// A button will call this function
function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 100,
        destinationType: destinationType.FILE_URI,
        saveToPhotoAlbum: true
        });
}

// A button will call this function
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}
// Called if something bad happens.
function onFail(message) {
    alert('Failed because: ' + message);
}

function associatePhotos()
{
    var pList = document.getElementById('pList');
    var divCam = document.getElementById('camera');

    divCam.style.display = "none";

    var dHTML = "";

    for (i = 0; i < picsCollection.length; i++) {

        dHTML += "<input type='checkbox' /><img width='100px' height='100px' src='" + picsCollection[i] + "'/> <hr/>";
    }

    pList.innerHTML = dHTML;
    document.getElementById('picList').style.display = "block";
}

function uploadImages() {

    if (picsCollection.length <= 0) {
        alert('No photos selected to upload.');
        return;
    }

    var imageURI = picsCollection[0];
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    var params = new Object();
    params.value1 = "AD00012345";

    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    if(confirm('Are you sure to upload?'))
        ft.upload(imageURI, "http://213.94.214.248/hhImageService/ImageService.asmx/SaveImage", win, fail, options);
}

function win(r) {
    //console.log("Code = " + r.responseCode); 
            //console.log("Response = " + r.response); 
            alert("Sent = " + r.bytesSent); 
}

function fail(error) {
     switch (error.code) { 
                    case FileTransferError.FILE_NOT_FOUND_ERR: 
                        alert("Photo file not found"); 
                        break; 
                    case FileTransferError.INVALID_URL_ERR: 
                        alert("Bad Photo URL"); 
                        break; 
                    case FileTransferError.CONNECTION_ERR: 
                        alert("Connection error"); 
                        break; 
                } 

            alert("An error has occurred: Code = " + error.code); 
}

function reset() {
    document.getElementById("camera").style.display = "block";
    document.getElementById("picList").style.display = "none";
}