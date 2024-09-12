# Shader3 - Material Lab

![Shader3-Logo](https://bit.ly/shader3-banner)

`Shader3` is a library that extends and customizes built-in Three.js materials, providing enhanced flexibility and control over 3D rendering. With support for shader customization and a suite of noise functions, it enables the creation of unique visual effects for advanced 3D experiences.

## ✨ Features

- **Custom Shader Materials:** Extend and customize materials like `MeshPhysicalMaterial` , `MeshDepthMaterial` for your 3D objects.
- **Shader Customization:** Modify vertex and fragment shaders with ease for fine-tuned rendering effects.
- **Noise Functions:** A range of noise functions (e.g., Perlin, Simplex) for adding dynamic visual effects to your shaders.

## 📦 Installation

Install `Shader3` using your preferred package manager:

```bash
npm install shader3
```

or

```bash
yarn add shader3
```

### Importing Shader3

You can import the full library or specific materials depending on your project needs:

```typescript
import * as Shader3 from "shader3"; // import all
```

Or for selective imports:

```typescript
import { PhysicalShaderMaterial } from "shader3"; // import specific material
```

Alternatively use the standalone version found in ./dist locally

```html
<script
  type="text/javascript"
  src="https://unpkg.com/shader3/dist/shader3.js"
></script>

<!-- This will give Shader3 -->
```

## 🛠️ Usage

### Creating Custom Materials

![Shader3-Demo](https://bit.ly/shader3-demo)

#### [![Usage](https://img.shields.io/badge/Click%20to%20view%20demo-Usage-green?style=for-the-badge&logo=github)](https://shader3.vercel.app/)

To create and use a custom material, follow the example below:

```typescript
import * as Shader3 from "shader3"; // import all

const material = new Shader3.PhysicalShaderMaterial({
  vertexShader: `
    uniform float time; 
    void main () {
      s3_position.y += sin(s3_position.x + time);
    }
  `,
  fragmentShader: `
    uniform float time;
    void main () {
      gl_FragColor = gl_FragColor * 1.5;
    }
  `,
  uniforms: {
    time: { value: 0.0 },
  },
});
```

In this example, the `PhysicalShaderMaterial` is extended with custom vertex and fragment shaders to create a dynamic effect.

### Updating Uniforms

Updating uniforms is as simple as modifying material properties, just like adjusting roughness:

```typescript
material.time = elapsedTime; // Dynamically update time uniform
```

## 📜 Material APIs

Shader3 provides several extended material classes, each supporting custom shaders and uniforms:

### `PhysicalShaderMaterial`

- Extends `THREE.MeshPhysicalMaterial`.
- Supports custom vertex and fragment shaders with additional uniform handling.

### `StandardShaderMaterial`

- Extends `THREE.MeshStandardMaterial`.
- Customizable vertex and fragment shaders.

### `DepthShaderMaterial`

- Extends `THREE.MeshDepthMaterial`.
- Allows shader customization for depth rendering.

### `MatcapShaderMaterial`

- Extends `THREE.MeshMatcapMaterial`.
- Full shader and uniform customization support.

## 🌐 Noise Functions

Shader3 provides a variety of noise functions to enhance your visual effects. Here's an example using Perlin noise in a vertex shader:

```typescript
import { perlin } from "shader3";

const vertexShader = `
${perlin}  // Add Perlin noise function
void main () {
  s3_position.y += perlin(s3_position);  // Apply noise
}`;
```

The following noise functions are included by default in Shader3:

### `perlin`

- **Description**: Implements Perlin noise for 2D and 3D vectors.
- **Functions**:
  - `perlin(P: vec2): float`  
    Returns the Perlin noise value for a 2D input vector.
  - `perlin(P: vec3): float`  
    Returns the Perlin noise value for a 3D input vector.
  - `perlin(P: vec3, rep: vec3): float`  
    Returns repeatable Perlin noise for a 3D input vector with repetition.

### `fbm`

- **Description**: Implements fractal Brownian motion (fBm) noise.
- **Functions**:
  - `fbm(P: float): float`  
    Returns fBm noise for a 1D input.
  - `fbm(P: vec2): float`  
    Returns fBm noise for a 2D input.
  - `fbm(P: vec3): float`  
    Returns fBm noise for a 3D input.
  - `fbm(P: vec4): float`  
    Returns fBm noise for a 4D input.

### `simplex`

- **Description**: Implements Simplex noise for generating smooth gradients in 2D or 3D space.
- **Functions**:
  - `simplex(P: vec2): float`  
    Returns the Simplex noise value for a 2D input vector.
  - `simplex(P: vec3): float`  
    Returns the Simplex noise value for a 3D input vector.
  - `simplex(P: vec4): float`  
    Returns the Simplex noise value for a 4D input vector.
  - `simplexFractal(P: vec3): float`  
    Returns the Simplex Fractal noise value for a 3D input vector.

### `truchetPattern`

- **Description**: Generates a Truchet pattern based on the input values.
- **Parameters**:

  - `s`: A 2D vector input.
  - `i`: A floating-point index to determine the pattern variation.

  ```glsl
  float pattern = truchetPattern(vec2(0.5, 0.8), 2.0);
  ```

## 🤝 Contributing

We welcome contributions! If you have ideas for new features, bug fixes, or improvements, feel free to open an issue or submit a pull request on our [GitHub repository](https://github.com/aayushchouhan24/shader3).

## 📄 License

`Shader3` is licensed under the MIT License. For more information, refer to the [LICENSE](LICENSE) file.

## 🙌 Acknowledgements

- **[Three.js](https://threejs.org/):** The core library for 3D rendering.
- **[GLSL](https://en.wikipedia.org/wiki/OpenGL_Shading_Language):** The language used for shader programming.
