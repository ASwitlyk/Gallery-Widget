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

	// default mode is Single Image layout unless user indicated thumbnail mode
	mode === "thumbnail" ? this.thumbnailMode(containerDiv, data) : this.singleImage(containerDiv, data);


	console.log('data is: ', data);

}

GalleryWidget.prototype.thumbnailMode = function(node) {

	// div to display the large version of current image
	var displayDiv = document.createElement("div");

	// div to display scrollable thumbnail versions of images in gallery
	var thumbNailDiv = document.createElement("div");

	var aChild = node.appendChild(displayDiv);
	var bChild = node.appendChild(thumbNailDiv);

}

GalleryWidget.prototype.singleImage = function(node, data) {

	// create a div with a class styled to contain one image at a time
	var galleryDiv = document.createElement("div");

	// insert one area into user defined gallery container node
	var aChild = node.appendChild(galleryDiv);

	//test image
	var img = document.createElement("img");
	img.setAttribute('src', data[0].image);
	var bChild = node.appendChild(img);


}