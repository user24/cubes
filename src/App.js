import React, { PureComponent } from 'react';
import * as THREE from "three";
import './App.css';

const randBetween = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

const randColour = () => {
  const r = randBetween(0, 255);
  const g = randBetween(0, 255);
  const b = randBetween(0, 255);
  return new THREE.Color(`rgb(${r}, ${g}, ${b})`);
}

class App extends PureComponent {

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  renderCube(color) {

    const geometry = new THREE.BoxGeometry();

    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color(color || randColour()),
      opacity: 0.5,
      side: THREE.DoubleSide,
      transparent: true
    });

    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = randBetween(-5, 5);
    cube.position.y = randBetween(-5, 5);
    this.scene.add(cube);
    this.camera.position.z = 7;
    // Start off at a random rotation
    cube.rotation.x += Math.random();
    cube.rotation.y += Math.random();
    // Animate rotation
    //console.log(animationSpeed, color);
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
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
    const skyColor = 0xB1E1FF;
    const groundColour = 0xB97A20;
    const intensity = 1;
    const hLight = new THREE.HemisphereLight(skyColor, groundColour, intensity);
    this.scene.add(hLight);

    const color = 0xFFFFFF;
    const dLight = new THREE.DirectionalLight(color, intensity);
    dLight.position.set(0, 10, 0);
    dLight.target.position.set(-5, 0, 0);
    this.scene.add(dLight);
    this.scene.add(dLight.target);

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
