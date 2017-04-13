
//These are the variables that are being used to create the 
//display of the model
var container;
var camera,
	scene,
	renderer,
	myObj;
var mouseX = 0,
	mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var pitch = 45;
var roll = 10;
var yaw = 45;

//This method is setting the pitch yaw and roll of  the
// model. Once these are set, the model will change its values.s
var setEuler = function(pitch, roll, yaw) {
	this.pitch = pitch;
	this.roll = roll;
	this.yaw = yaw;
}


//This is the init function that initializes the set up
// of the reder window. It also imports the model and 
// sets its initial settings.
var init = function() {
	//Creates a container to hold the display
	container = document.createElement('div');
	container.setAttribute("id", "eulerDisplay");
	document.getElementById("euler").appendChild(container);
	camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 2000);
	camera.position.z = 250;
	// Creates the scene
	scene = new THREE.Scene();
	var ambient = new THREE.AmbientLight(0x101030);
	scene.add(ambient);
	var directionalLight = new THREE.DirectionalLight(0xffeedd);
	directionalLight.position.set(0, 0, 1);
	scene.add(directionalLight);

	// Adds a texture to the model
	// This will currently display the model of its default white
	var manager = new THREE.LoadingManager();
	manager.onProgress = function(item, loaded, total) {
		console.log(item, loaded, total);
	};
	var texture = new THREE.Texture();
	var onProgress = function(xhr) {
		if (xhr.lengthComputable) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log(Math.round(percentComplete, 2) + '% downloaded');
		}
	};
	var onError = function(xhr) {};
	var loader = new THREE.ImageLoader(manager);
	loader.load('obj/SUIT.jpg', function(image) {
		texture.image = image;
		texture.needsUpdate = true;
	});
	// This loads the model to the render scene
	// It also initializess its original values
	var loader = new THREE.OBJLoader(manager);
	loader.load('obj/wingsuit3.obj', function(object) {
		myObj = object;
		object.traverse(function(child) {
			if (child instanceof THREE.Mesh) {
				child.material.map = texture;
			}
		});

		object.rotation.y = 90 * (Math.PI / 180);
		scene.add(object);
	}, onProgress, onError);

	//This calls the renderer to adjust the size that is
	// being displayed to the screen
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(711, 400);
	container.appendChild(renderer.domElement);
	document.getElementById("euler").setAttribute("style", "background-color: black");

}
//This is the render function that renders the model
// and adjust their euler angles appropriately.
var render = function() {
	myObj.rotation.y = (roll + 90) * (Math.PI / 180);
	myObj.rotation.x = pitch * (Math.PI / 180);
	myObj.rotation.z = yaw * (Math.PI / 180);
	camera.lookAt(scene.position);
	renderer.render(scene, camera);
}