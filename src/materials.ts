import * as THREE from 'three';
import { processShader } from './utils';
import { essential } from './noise';

interface ShaderMaterialParams extends THREE.ShaderMaterialParameters {
  uniforms?: { [uniform: string]: THREE.IUniform };
  vertexShader?: string;
  fragmentShader?: string;
}

interface PhysicalShaderMaterialParams extends THREE.MeshPhysicalMaterialParameters, ShaderMaterialParams { }
interface StandardShaderMaterialParams extends THREE.MeshStandardMaterialParameters, ShaderMaterialParams { }
interface DepthShaderMaterialParams extends THREE.MeshDepthMaterialParameters, ShaderMaterialParams { }


export class PhysicalShaderMaterial extends THREE.MeshPhysicalMaterial {
  constructor(parameters?: PhysicalShaderMaterialParams) {
    super();
    parameters && configureShaderMaterial(this, parameters);
  }
}

export class StandardShaderMaterial extends THREE.MeshStandardMaterial {
  constructor(parameters?: StandardShaderMaterialParams) {
    super();
    parameters && configureShaderMaterial(this, parameters);
  }
}

export class DepthShaderMaterial extends THREE.MeshDepthMaterial {
  constructor(parameters?: DepthShaderMaterialParams) {
    super();
    parameters && configureShaderMaterial(this, parameters);
  }
}

function configureShaderMaterial(material: { [key: string]: any }, obj: ShaderMaterialParams) {

  Object.assign(material, obj);

  const { uniforms: objUniforms = {}, vertexShader = '', fragmentShader = '' } = obj || {};

  Object.keys(objUniforms).forEach(key => (!(key in material)) && (material[key] = objUniforms[key]));

  material.onBeforeCompile = (shader: any) => {
    const { uniforms: shaderUniforms } = shader;

    Object.keys(objUniforms).forEach(key => (!(key in shaderUniforms)) && (shaderUniforms[key] = material[key]));

    if (vertexShader) {

      const { header, mainBody } = processShader(vertexShader, 'vertex');
      shader.vertexShader = `${essential}\n${header}\n${shader.vertexShader}`.replace('#include <project_vertex>', `
              vec3 s3_position = transformed;
              ${mainBody}
              transformed = s3_position;
              #include <project_vertex>`
      ).replace('#include <normal_vertex>', `{
              vec3 s3_normal = transformedNormal;
              ${mainBody.replace(/s3_position/g, 's3_normal')}
              transformedNormal = s3_normal;
              #include <normal_vertex>
          }`)
    }

    if (fragmentShader) {
      const { header, mainBody } = processShader(fragmentShader, 'fragment');
      shader.fragmentShader = `${header} \n ${shader.fragmentShader.trim().slice(0, -1)} ${mainBody}}`;
    }
  }
}