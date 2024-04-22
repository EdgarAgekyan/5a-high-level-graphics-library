import * as THREE from 'three';

let renderer, cube, scene, camera, cubes, geometry, loader;

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

    loader = new THREE.TextureLoader();
    // const texture = loader.load( 'resources/images/wall.jpg' );
    // texture.colorSpace = THREE.SRGBColorSpace;

    // const material1 = new THREE.MeshBasicMaterial({map: texture});
    // const material2 = new THREE.MeshPhongMaterial({color: 0x8844aa});
    // const material3 = new THREE.MeshPhongMaterial({color: 0xaa8844});

    const materials = [
      new THREE.MeshBasicMaterial({map: loadColorTexture('resources/images/flower-1.jpeg')}),
      new THREE.MeshBasicMaterial({map: loadColorTexture('resources/images/flower-2.jpeg')}),
      new THREE.MeshBasicMaterial({map: loadColorTexture('resources/images/flower-3.jpeg')}),
      new THREE.MeshBasicMaterial({map: loadColorTexture('resources/images/flower-4.jpeg')}),
      new THREE.MeshBasicMaterial({map: loadColorTexture('resources/images/flower-5.jpeg')}),
      new THREE.MeshBasicMaterial({map: loadColorTexture('resources/images/flower-6.jpeg')}),
    ];

    cubes = [];

    // for (let i = 0; i < materials.length; i++) {
    //   let x, y;
    //   if (i < materials.length / 2) {
    //     y = 0;
    //   }
    //   else{
    //     y = 1;
    //   }
    //   // we want cubes 0, 1, 2 to be on y = _ and x = _
    //   cubes.push(makeInstance(geometry, materials[i],  i-1, y));
    // }
    for (let i = 0; i < materials.length/2; i++) {
      let y = 0.5;
      cubes.push(makeInstance(geometry, materials[i],  i-1, y));
    }
    for (let i = materials.length/2; i < materials.length; i++) {
      let y = -0.5;
      cubes.push(makeInstance(geometry, materials[i],  i-(materials.length/2) - 1, y));
    }


    // cubes = [
    //   makeInstance(geometry, material1,  0),
    //   makeInstance(geometry, material2, -2),
    //   makeInstance(geometry, material3,  2),
    // ];
    
    // scene.add(cubes);


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

function makeInstance(geometry, texture, x, y) {
  // const material = new THREE.MeshPhongMaterial({color});
 
  const cube = new THREE.Mesh(geometry, texture);
  scene.add(cube);
  cube.position.x = x;
  cube.position.y = y;
 
  return cube;
}

function loadColorTexture( path ) {
  const texture = loader.load( path );
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}



