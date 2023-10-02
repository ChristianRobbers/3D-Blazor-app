function Example() {
	const loader = new THREE.TextureLoader();
	const earth = loader.load('earth.jpg');
	const mars = loader.load('mars.jpg');
	const stars = loader.load('stars.jpg');

	const scene = new THREE.Scene();
	scene.background = stars;
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	const geoearth = new THREE.SphereGeometry(16, 16, 16);
	const matearth = new THREE.MeshBasicMaterial({ map: earth });
	const sphereearth = new THREE.Mesh(geoearth, matearth);
	scene.add(sphereearth);

	sphereearth.position.y = 20;

	const geomars = new THREE.SphereGeometry(16, 16, 16);
	const matmars = new THREE.MeshBasicMaterial({ map: mars });
	const child = new THREE.Mesh(geomars, matmars);
	sphereearth.add(child);

	child.position.y = 20;
	child.position.x = 45;


	const controls = new THREE.OrbitControls(camera, renderer.domElement);

	//controls.update() must be called after any manual changes to the camera's transform
	camera.position.set(0, 20, 100);
	controls.update();

	const size = 10;
	const divisions = 10;

	const gridHelper = new THREE.GridHelper(size, divisions);
	scene.add(gridHelper);

	//FLOOR

	const geoplane = new THREE.PlaneGeometry(10, 10);
	const matplane = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
	const plane = new THREE.Mesh(geoplane, matplane);
	scene.add(plane);

	plane.rotation.x = Math.PI / 2;

	//Player

	const geoplayer = new THREE.BoxGeometry(1, 1, 1);
	const matplayer = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	const player = new THREE.Mesh(geoplayer, matplayer);
	scene.add(player);

	player.position.y = 0.55;


	function animate() {
		requestAnimationFrame(animate);

		sphereearth.rotation.y += 0.001;

		child.rotateY(0.002)

		controls.update();

		renderer.render(scene, camera);

	}

	animate();
	Movement(player)
   
 
}

function Movement(player) {

	window.addEventListener('keypress', function (e) {
		if (e.key === 'w') {
			player.position.z += -0.05
		}

		if (e.key === 's') {
			player.position.z += 0.05
		}

		if (e.key === 'a') {
			player.position.x -= 0.05
		}

		if (e.key === 'd') {
			player.position.x += 0.05
		}

		if (e.key === ' ') {
			player.position.y += 0.80
		
			setTimeout(function () {
				player.position.y -= 0.80
			}, 800);
			
        }
	});


}




