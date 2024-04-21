import * as THREE from 'three';

let renderer, cube, scene, camera, cubes, geometry;

function main() {
    const canvas = document.querySelector('#c');
    renderer = new THREE.WebGLRenderer({antialias: true, canvas});

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    
    camera.position.z = 2;

    scene = new THREE.Scene();

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const loader = new THREE.TextureLoader();
    const texture = loader.load( 'resources/images/wall.jpg' );
    texture.colorSpace = THREE.SRGBColorSpace;

    // const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
    // const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  // greenish blue

    // const material1 = new THREE.MeshPhongMaterial({color: 0x44aa88});
    const material1 = new THREE.MeshBasicMaterial({map: texture});
    const material2 = new THREE.MeshPhongMaterial({color: 0x8844aa});
    const material3 = new THREE.MeshPhongMaterial({color: 0xaa8844});

    
    
    // const material = new THREE.MeshBasicMaterial({
    //   map: texture,
    // });

    // cube = new THREE.Mesh(geometry, material);
    // cubes = new THREE.Mesh(geometry, material);

    cubes = [
      makeInstance(geometry, material1,  0),
      makeInstance(geometry, material2, -2),
      makeInstance(geometry, material3,  2),
    ];
    


    // scene.add(cube);
    // scene.add(cubes);

    renderer.render(scene, camera);
  }


function render(time) {
  time *= 0.001;  // convert time to seconds
 
  // cube.rotation.x = time;
  // cube.rotation.y = time;

  cubes.forEach((cube, ndx) => {
    const speed = 1 + ndx * .1;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });
 
  renderer.render(scene, camera);
 
  requestAnimationFrame(render);
}

main();

requestAnimationFrame(render);

const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

function makeInstance(geometry, texture, x) {
  // const material = new THREE.MeshPhongMaterial({color});
 
  const cube = new THREE.Mesh(geometry, texture);
  scene.add(cube);
  cube.position.x = x;
 
  return cube;
}



