import React, { PureComponent } from 'react';
import * as THREE from "three";
import './App.css';

class App extends PureComponent {

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  renderCube(color) {

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = Math.random() * 2;
    cube.position.y = Math.random() * 2;
    this.scene.add(cube);
    this.camera.position.z = 5;
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
    };
    setTimeout(animate, Math.random() * 2000);
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
    this.renderCube(0x00cc00);
    this.renderCube(0xcc00cc);
    this.renderCube(0xcc0000);
  }

  render() {
    return (
      <div ref={ref => this.ref = ref}></div>
    );
  }
}

export default App;
