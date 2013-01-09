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
function onPhotoDataSuccess(imageData) {

    var largeImage = document.getElementById('largeImage');
    largeImage.style.display = 'block';
    largeImage.src = imageData;
    picsCollection.push(imageData);
    mLog('Image captured successfully!!!');
}

// Called when a photo is successfully retrieved
function onPhotoURISuccess(imageURI) {

    var largeImage = document.getElementById('largeImage');
    largeImage.style.display = 'block';
    largeImage.src = imageURI;
    picsCollection.push(imageURI);
    mLog('Image selected successfully!!!');
}
// A button will call this function
function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 10,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: true
    });
}

// A button will call this function
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
    });
}
// Called if something bad happens.
function onFail(message) {
    mLog('Failed because: ' + message);
}

function associatePhotos() {
    mLog("associatePhotos");
    var pList = document.getElementById('pList');
    var divCam = document.getElementById('camera');

    divCam.style.display = "none";

    var dHTML = "";

    for (i = 0; i < picsCollection.length; i++) {

        dHTML += "<input type='checkbox' id='" + i + "' /><img width='100px' height='100px' src='" + picsCollection[i] + "'/> <hr/>";
    }

    pList.innerHTML = dHTML;
    document.getElementById('picList').style.display = "block";
}

function uploadImages() {

    mLog("uploadImage");
    if (picsCollection.length <= 0) {
        mLog('No photos selected to upload.');
        return;
    }

    var imageURI = picsCollection[0];
    mLog(imageURI);
    var options = new FileUploadOptions();
    options.fileKey = "recFile";
    options.fileName = Number(new Date()) + ".jpg"; //imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg;base64";

    mLog(options.fileName);

//    var params = new Object();
//    params.value1 = "AD00012345";

//    options.params = params;
    options.chunkedMode = false;

    mLog("for file transfer");
    var ft = new FileTransfer();
    mLog("After initialiing ft");
    //var sURL = "http://213.94.214.248/HHUploadPhoto/Home/UploadPhoto";
    var sURL = encodeURI("http://213.94.214.248/hhImageService/ImageService.asmx/SaveImage");

    if (confirm('Are you sure to upload image?'))
        ft.upload(imageURI, sURL, win, fail, options);
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
    associatePhotos();
}

// --------------------------------------------------------
function TcapturePhoto() {
    navigator.camera.getPicture(
       function(uri){
          $('#camera_image').show();
          var img = document.getElementById('camera_image');
                  img.style.visibility = "visible"; 
                      img.style.display = "block";
                      img.src = uri;
                      TuploadPhoto(img);
                    alert("Success");
        },
        function (e) {
            console.log("Error getting picture: " + e);
        },
        { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI }
        
        );

          // Get URI of picture to upload 
        var img = document.getElementById('camera_image');
        var imageURI = img.src;
        if (!imageURI || (img.style.display == "none")) 
        {
            alert("Take picture or select picture from library first.");
            return; 
        } 
}

function TchoosePhoto() { 
    navigator.camera.getPicture(
          function(uri) 
          {
              $('#camera_image').show();
              var img = document.getElementById('camera_image');
              img.style.visibility = "visible"; 
              img.style.display = "block";
              img.src = uri;
              TuploadPhoto(img);
          },
          function(e) 
          {
              console.log("Error getting picture: " + e);
          },
          { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType:navigator.camera.PictureSourceType.SAVEDPHOTOALBUM}
          );

      // Get URI of picture to upload
      var img = document.getElementById('camera_image');
      var imageURI = img.src;
      
      if (!imageURI || (img.style.display == "none")) 
      {
          alert("please select a pic first");
          return;
      } 
}

function TuploadPhoto(imageURI) {
    mLog(imageURI);
            var options = new FileUploadOptions(); 
            options.fileKey="recFile"; 
            var imagefilename = Number(new Date())+".jpg"; 
            options.fileName=imagefilename; 
            options.mimeType="image/jpeg;base64"; 

            var params = new Object(); 
            params.value1 = "test"; 
            params.value2 = "param"; 

            options.params = params; 

            var ft = new FileTransfer();
            ft.upload(imageURI, "http://213.94.214.248/hhImageService/ImageService.asmx/SameImage", Twin, Tfail, options); 
        } 

function Twin(r) { 
            //console.log("Code = " + r.responseCode); 
            //console.log("Response = " + r.response); 
            alert("Sent = " + r.bytesSent); 
        }

        function Tfail(error) {
            //JSON.stringify(error);
            alert("An error has occurred: Code = " + error.code + "-" + error.source + "-" + error.target); 
        }