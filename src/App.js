import React, { PureComponent } from 'react';
import * as THREE from "three";
import './App.css';

const randBetween = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

const palette = [
  'rgb(142, 164, 210)',
  'rgb(98,121,184)',
  'rgb(162, 207, 166)',
  'rgb(73,111,93)',
  'rgb(98,121,184)',
  'rgb(76,159,112)',
];

const randColour = () => {
  return new THREE.Color(palette[randBetween(0, palette.length - 1)]);
}

class App extends PureComponent {

  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.numCubes = 0;
    this.animations = [];
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.addedEvents = [];
  }

  addEventListener(eventName, element, listener) {
    element.handlers = element.handlers || {};
    element.handlers[eventName] = element.handlers[eventName] || [];
    element.handlers[eventName].push(listener);

    if (this.addedEvents.indexOf(eventName) === -1) {
      this.addedEvents.push(eventName);
      this.ref.addEventListener(eventName, (event) => {
        event.preventDefault();

        this.mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(this.scene.children);

        // run on all (should do this for the 'up' events)
        //intersects.filter(inter => 'click' in inter.object).forEach(inter => inter.object.click());

        // run just on the foremost
        if (intersects.length > 0) {
          if (intersects[0].object.handlers) {
            intersects[0].object.handlers[eventName].forEach(handler => handler());
          }
        }
      });
    }
  };

  addCube(color) {
    this.numCubes++;

    // Cube shape
    //const geometry = new THREE.SphereGeometry(0.5, 5, 5);
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
    cube.shouldInit = true;
    // Factor defines drift and spin speed
    cube.factor = Math.random() * 0.04 + 0.01;

    this.addEventListener('mousedown', cube, () => {
      cube.origFactor = cube.factor;
      cube.factor = -0.01;
      //material.originalColor = material.color;
      //material.color = new THREE.Color(0xCC3333);
    });
    /*
    this.addEventListener('mouseup', cube, () => {
      cube.factor = cube.origFactor;
      //material.color = material.originalColor;
    });
    /*
        this.addEventListener('mouseleave', cube, () => {
          if (!material.originalColor) {
            return;
          }
          cube.factor = cube.origFactor;
          material.color = material.originalColor;
          delete material.originalColor;
        });
        */

    this.scene.add(cube);

    // Animate the cube
    const animate = () => {
      // Rotate
      if (cube.factor > 0) {
        cube.rotation.x -= 0.01 + Math.abs(cube.factor) / 4;
        cube.rotation.y += 0.01 + Math.abs(cube.factor) / 4;
      }
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
    this.scene.background = new THREE.Color(new THREE.Color('rgb(178, 212, 199)'));
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth - 10, window.innerHeight - 10);
    this.ref.appendChild(this.renderer.domElement);

    // Add lighting
    const skyColor = new THREE.Color('rgb(197, 219, 237)');
    const groundColour = new THREE.Color('rgb(58, 65, 95)');
    const intensity = 1;
    const hLight = new THREE.HemisphereLight(skyColor, groundColour, intensity);
    this.scene.add(hLight);

    const color = new THREE.Color('rgb(125, 147, 198)');
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
  }

  render() {
    return (
      <div ref={ref => this.ref = ref}></div>
    );
  }
}

export default App;
