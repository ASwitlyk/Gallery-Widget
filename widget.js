console.log('yes');
// Display image gallery in two different modes
	// Thumbnail mode = widget comprised of two main areas, first area displays a large version of the current image, 
	// second area displays a scrollable filmstrip of thumbnails for each image in the gallery. Clicking on a thumbnail makes that 
	// image the current image and displays it in the first area (replace image)

	// Single Image mode - single area, image displayed one at a time in main area, clicking on image changes to next image, when last image
	// reached, should cycle back

// Widget takes two piece of data for its configuration, list of images and its mode (can take JSON string)

// create constructor, when created will put either one or two div elements into page

function GalleryWidget(data, mode) {

	// gallery will be inserted into container div (div which user gave an id of gallery)
	var containerDiv = document.getElementById("gallery");
	containerDiv.setAttribute("class", "gallery-container");

	// default mode is Single Image layout unless user indicated thumbnail mode
	mode === "thumbnail" ? this.thumbnailMode(containerDiv, data) : this.singleImage(containerDiv, data);

}

GalleryWidget.prototype.thumbnailMode = function(node, data) {

	// div to display the large version of current image
	var displayDiv = document.createElement("div");
	displayDiv.setAttribute("class", "large-img-container");

	// div to display scrollable thumbnail versions of images in gallery
	var thumbnailDiv = document.createElement("div");
	thumbnailDiv.setAttribute("class", "thumbnail-container");

	var aChild = node.appendChild(displayDiv);
	var bChild = node.appendChild(thumbnailDiv);

	// place all data into img tags with a thumbnail class
	// which will limit the size of the pics and display them inline
	var imgTagArray = data.map(function(value) {
		var imgTag = document.createElement("img");
		imgTag.setAttribute("src", value.image);
		imgTag.setAttribute("class", "thumbnail-Img");

		// When each image clicked, replace largeImg with thumbnail clicked
		imgTag.addEventListener("click", function(item) {
			console.log("clicked item is: ", item);
			largeImg = item.toElement.cloneNode();
			largeImg.setAttribute("class", "large-img");
			console.log('largeImg is now: ', largeImg);
			displayDiv.firstElementChild.remove();
			displayDiv.appendChild(largeImg);
		});

		return imgTag;
	});

	// set initial large image to the first image in the gallery by default
	var largeImg = imgTagArray[0].cloneNode();
	largeImg.setAttribute("class", "large-img");
	displayDiv.appendChild(largeImg);
	console.log('dupNode is: ', largeImg);


	// create another img element
	var testImg = document.createElement("img");
	testImg.setAttribute("src", data[0].image);
	// insert into displayDiv
	// displayDiv.appendChild(testImg);

	// bigImg[0].setAttribute("class", "main-img");

	// var bigImg = aChild.appendChild(imgTagArray[0]);
	// bigImg.setAttribute("class", "main-img");

	imgTagArray.forEach(function(value) {
		console.log('value is: ', value);
		thumbnailDiv.appendChild(value);
	});



}

GalleryWidget.prototype.singleImage = function(node, data) {


	// currentIndex variable, will increase upto imgTagArray.length - 1
	// then reset to zero
	var nextIndex = 1;

	// create a div with a class styled to contain one image at a time
	var galleryDiv = document.createElement("div");
	galleryDiv.setAttribute("class", "singleImgGallery");

	// insert one area into user defined gallery container node
	node.appendChild(galleryDiv);

	// Populate array with img tags
	var imgTagArray = data.map(function(value) {
		var imgTag = document.createElement("img");
		imgTag.setAttribute("src", value.image);
		imgTag.setAttribute("class", "single-Img");

		// Add an event handler to each img tag when clicked, gallery div
		// will remove current pic and add new pic
		imgTag.addEventListener("click", function() {

			galleryDiv.firstElementChild.remove();
			galleryDiv.appendChild(imgTagArray[nextIndex]);
			// On click will display the next photo in the imgTagArray, when
			// at last photo, will cycle back to first image
			if(nextIndex < imgTagArray.length - 1) {
				nextIndex++;
			} else {
				nextIndex = 0;
			}
		});

		return imgTag;
	});

	// Place first image in set into galleryDiv
	galleryDiv.appendChild(imgTagArray[0]);
	console.log('imgTagArray ', imgTagArray);

}









