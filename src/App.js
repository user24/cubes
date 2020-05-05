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
  }

  renderCube(color) {

    // Cube shape
    const geometry = new THREE.BoxGeometry();

    // Colour
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color(color || randColour()),
      opacity: 0.5,
      side: THREE.DoubleSide,
      transparent: true
    });

    // Start off at a random rotation and position
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = randBetween(-5, 5) + Math.random();
    cube.position.y = randBetween(-8, -5);
    this.scene.add(cube);

    // Each cube has its own speed
    const factor = Math.random() * (0.02) + 0.01;

    // Animate the cube
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate
      cube.rotation.x -= 0.01;
      cube.rotation.y += 0.01;

      // Drift upwards, wrapping to bottom when reach top
      cube.position.y += factor;
      if (cube.position.y > 6) {
        cube.position.y = -6;
      }

      this.renderer.render(this.scene, this.camera);
    };
    animate();
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

    // Render some cubes
    let numCubes = 7;
    while (numCubes--) {
      this.renderCube();
    }
  }

  render() {
    return (
      <div ref={ref => this.ref = ref}></div>
    );
  }
}

export default App;
