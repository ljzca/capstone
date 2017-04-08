var camera, scene, renderer, mesh, loader;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    scene = new THREE.Scene();

    loader = new THREE.JSONLoader();

    loader.load( "scripts/model.js", function( geometry ) {
        mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
        mesh.scale.set( 10, 10, 10 );
        mesh.position.y = 150;
        mesh.position.x = 0;
    } );

    scene.add( mesh );

    var ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

}

function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += 0.05;

    renderer.render( scene, camera );
}