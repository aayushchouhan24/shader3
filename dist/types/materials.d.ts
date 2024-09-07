import * as THREE from 'three';
interface ShaderMaterialParams extends THREE.ShaderMaterialParameters {
    uniforms?: {
        [uniform: string]: THREE.IUniform;
    };
    vertexShader?: string;
    fragmentShader?: string;
}
interface PhysicalShaderMaterialParams extends THREE.MeshPhysicalMaterialParameters, ShaderMaterialParams {
}
interface StandardShaderMaterialParams extends THREE.MeshStandardMaterialParameters, ShaderMaterialParams {
}
interface DepthShaderMaterialParams extends THREE.MeshDepthMaterialParameters, ShaderMaterialParams {
}
export declare class PhysicalShaderMaterial extends THREE.MeshPhysicalMaterial {
    constructor(parameters?: PhysicalShaderMaterialParams);
}
export declare class StandardShaderMaterial extends THREE.MeshStandardMaterial {
    constructor(parameters?: StandardShaderMaterialParams);
}
export declare class DepthShaderMaterial extends THREE.MeshDepthMaterial {
    constructor(parameters?: DepthShaderMaterialParams);
}
export {};
