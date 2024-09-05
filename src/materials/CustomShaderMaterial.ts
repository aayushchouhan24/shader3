import * as THREE from 'three';

export class CustomShaderMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        varying vec3 vPosition;
        void main() {
          gl_FragColor = vec4(vPosition, 1.0);
        }
      `,
        });
    }
}
