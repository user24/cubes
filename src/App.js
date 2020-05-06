import React, { PureComponent } from 'react';
import * as THREE from "three";
import './App.css';

const randBetween = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

const randColour = () => {
  const r = randBetween(50, 200);
  const g = randBetween(50, 200);
  const b = randBetween(50, 200);
  return new THREE.Color(`rgb(${r}, ${g}, ${b})`);
}

class App extends PureComponent {

  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.numCubes = 0;
    this.animations = [];
  }

  addCube(color) {
    this.numCubes++;

    // Cube shape
    //const geometry = new THREE.SphereGeometry(0.5, 30, 30, 0, Math.PI * 2, 0, Math.PI * 2);
    const geometry = new THREE.BoxGeometry();

    // Colour
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color(color || randColour()),
      opacity: 0.8,
      side: THREE.DoubleSide,
      transparent: true
    });

    // Start off at a random rotation and position
    const cube = new THREE.Mesh(geometry, material);
    // Trigger initialisation
    cube.factor = Math.random() * 0.04 + 0.01;
    cube.shouldInit = true;

    cube.click = () => {
      //cube.shouldInit = true;
      //const color = material.color;
      //material.color = new THREE.Color(`rgb(${color.r + 10},${color.g + 10},${color.b + 10})`);
      //cube.geometry = new THREE.SphereGeometry(0.5, 15, 15);
      //material.transparent = false;
      //material.opacity = 1;
      //material.side = THREE.FrontSide;
      cube.factor = 0 - cube.factor;
    };

    this.scene.add(cube);

    // Animate the cube
    const animate = () => {
      // Rotate
      cube.rotation.x -= 0.01 + Math.abs(cube.factor) / 4;
      cube.rotation.y += 0.01 + Math.abs(cube.factor) / 4;
      // Drift away from camera
      cube.position.z -= cube.factor;

      if (cube.position.z < -25) {
        // init when cubes get too far away
        cube.shouldInit = true;
      }

      if (cube.factor < 0 && cube.position.z > 5) {
        // reverse direction if cube is coming towards us and gets too close
        cube.factor = 0 - cube.factor;
      }

      if (cube.shouldInit) {
        cube.position.x = randBetween(-5, 5) + Math.random();
        cube.position.y = randBetween(-5, 5) + Math.random();
        cube.position.z = randBetween(5, 20);
        cube.rotation.x = Math.random();
        cube.rotation.y = Math.random();
        cube.shouldInit = false;
      }
    };
    // Push to animation queue
    this.animations.push(animate);
  }

  componentDidMount() {
    // Create basic scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth - 10, window.innerHeight - 10);
    this.ref.appendChild(this.renderer.domElement);

    // Add lighting
    const skyColor = 0xFFFFFF;
    const groundColour = 0x000000;
    const intensity = 1;
    const hLight = new THREE.HemisphereLight(skyColor, groundColour, intensity);
    this.scene.add(hLight);

    const color = 0xFFFFFF;
    const dLight = new THREE.DirectionalLight(color, intensity);
    dLight.position.set(0, 10, 0);
    dLight.target.position.set(-5, 0, 0);
    this.scene.add(dLight);
    this.scene.add(dLight.target);
    this.camera.position.z = 7;

    // Maybe animate light here?

    // Render some cubes
    let numCubes = 50;
    while (numCubes--) {
      this.addCube();
    }

    // Start animating and rendering.
    const animate = () => {
      this.animations.forEach(anim => anim());
      // Now there's only 1 render no matter how many things are being animated
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Start listening for clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    this.ref.addEventListener('mousedown', (event) => {

      event.preventDefault();

      mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, this.camera);

      const intersects = raycaster.intersectObjects(this.scene.children);

      // run click on all
      //intersects.filter(inter => 'click' in inter.object).forEach(inter => inter.object.click());

      // run click just on the foremost 
      if (intersects.length > 0) {
        if (intersects[0].object.click) {
          intersects[0].object.click();
        }
      }
    });
  }

  render() {
    return (
      <div ref={ref => this.ref = ref}></div>
    );
  }
}

export default App;
