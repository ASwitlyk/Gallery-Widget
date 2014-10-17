/*
* Gallery Widget constructor creates an image gallery from JSON data and offers two modes of display, 
* a single image mode and a thumbnail mode
*
* takes three parameters:
* data: an array of objects. Each object should have an image property which will contain the src data for the 
*       gallery's img tag's src attributes
* mode: a string which will indicate the gallery mode to be displayed. "thumbnail" mode or "single", defaults to single
* divId: the ID of the div which will serve as the container of the gallery
* (this last parameter was added to display multiple gallerys in one HTML page for demonstration purposes)
*  
*/

function GalleryWidget(data, mode, divId) {

	// gallery will be inserted into container div with the id designated by divId parameter
	var containerDiv = document.getElementById(divId);
	containerDiv.setAttribute("class", "gallery-container");

	// default mode is Single Image layout unless user indicated thumbnail mode
	mode === "thumbnail" ? this.thumbnailMode(containerDiv, data) : this.singleImage(containerDiv, data);

}

// Method creates two divs to display images from data parameter, 
// a large image container and an x-axis scrollable thumbnail filmstrip container

GalleryWidget.prototype.thumbnailMode = function(node, data) {

	// div to display the large version of current image
	var displayDiv = document.createElement("div");
	displayDiv.setAttribute("class", "large-img-container");

	// div to display scrollable thumbnail versions of images in gallery
	var thumbnailDiv = document.createElement("div");
	thumbnailDiv.setAttribute("class", "thumbnail-container");

	// append both divs to user designated gallery div
	node.appendChild(displayDiv);
	node.appendChild(thumbnailDiv);

	// Array of img tags whose src attributes are provided from user's JSON data  
	var imgTagArray = data.map(function(value) {
		var imgTag = document.createElement("img");
		imgTag.setAttribute("src", value.image);
		imgTag.setAttribute("class", "thumbnail-Img");

		// When each image is clicked, replace largeImg with thumbnail clicked
		imgTag.addEventListener("click", function(item) {

			largeImg = item.toElement.cloneNode();
			largeImg.setAttribute("class", "large-img");
			displayDiv.firstElementChild.remove();
			displayDiv.appendChild(largeImg);

		});

		return imgTag;
	});

	// set initial large image to the first image in the gallery by default
	var largeImg = imgTagArray[0].cloneNode();
	largeImg.setAttribute("class", "large-img");
	displayDiv.appendChild(largeImg);

	// populate thumbnail div with all image tags created from user's JSON data
	imgTagArray.forEach(function(value) {
		thumbnailDiv.appendChild(value);
	});

}


// Method creates one div to display images from user's JSON data, one image at a time which
// and which can be cycled through by clicking on the current image displayed

GalleryWidget.prototype.singleImage = function(node, data) {


	// next image to display when current image clicked, initiazed at 1 since first image displayed at index 0
	var nextIndex = 1;

	// div to display the images one at a time 
	var galleryDiv = document.createElement("div");
	galleryDiv.setAttribute("class", "single-img-gallery-container");

	// append div to user defined gallery container block element
	node.appendChild(galleryDiv);

	// Populate array with img tags which will be cycled through when user clicks on them
	var imgTagArray = data.map(function(value) {

		var imgTag = document.createElement("img");
		imgTag.setAttribute("src", value.image);
		imgTag.setAttribute("class", "single-img");

		// Add an event handler to each img tag when clicked, gallery div
		// will remove current pic and add new pic
		imgTag.addEventListener("click", function() {

			galleryDiv.firstElementChild.remove();
			galleryDiv.appendChild(imgTagArray[nextIndex]);

			// cycle through images, when displaying last img tag nextIndex reset to zero to cycle back through images
			if(nextIndex < imgTagArray.length - 1) {
				nextIndex++;
			} else {
				nextIndex = 0;
			}
		});

		return imgTag;
	});

	// display first image in imgTagArray by default when gallery created
	galleryDiv.appendChild(imgTagArray[0]);

}