

var container;
			var camera, scene, renderer, myObj;
			var mouseX = 0, mouseY = 0;
			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;
			var pitch =  45;
			var roll =  10;
			var yaw =  45;
			init();
			animate();
			
			function setEuler(pitch, roll, yaw){
				this.pitch = pitch;
				this.roll = roll;
				this.yaw = yaw;
			}

			
			
			function init() {
				container = document.createElement( 'div' );
				document.getElementsByTagName("div")[3].appendChild( container );
				camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.z = 250;
				// scene
				scene = new THREE.Scene();
				var ambient = new THREE.AmbientLight( 0x101030 );
				scene.add( ambient );
				var directionalLight = new THREE.DirectionalLight( 0xffeedd );
				directionalLight.position.set( 0, 0, 1 );
				scene.add( directionalLight );
				
				// texture
				var manager = new THREE.LoadingManager();
				manager.onProgress = function ( item, loaded, total ) {
					console.log( item, loaded, total );
				};
				var texture = new THREE.Texture();
				var onProgress = function ( xhr ) {
					if ( xhr.lengthComputable ) {
						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round(percentComplete, 2) + '% downloaded' );
					}
				};
				var onError = function ( xhr ) {
				};
				var loader = new THREE.ImageLoader( manager );
				loader.load( 'obj/SUIT.jpg', function ( image ) {
					texture.image = image;
					texture.needsUpdate = true;
				} );
				// model
				var loader = new THREE.OBJLoader( manager );
				loader.load( 'obj/wingsuit3.obj', function ( object ) {
					myObj = object;
					object.traverse( function ( child ) {
						if ( child instanceof THREE.Mesh ) {
							child.material.map = texture;
						}
					} );
					
					object.rotation.x = 90 * (Math.PI/180);
					object.rotation.z = 180 * (Math.PI/180);	
					scene.add( object );
				}, onProgress, onError );
				//

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth/4, window.innerHeight/4);
				container.appendChild( renderer.domElement );
				//
			}

			//
			function animate() {
				requestAnimationFrame( animate );
				render();
			}
			function render() {
				myObj.rotation.y = roll * (Math.PI/180);
				myObj.rotation.x = pitch * (Math.PI/180) + (90 * (Math.PI/180));
				myObj.rotation.z = yaw * (Math.PI/180) + (180 * (Math.PI/180));
				camera.lookAt( scene.position );
				renderer.render( scene, camera );
			}