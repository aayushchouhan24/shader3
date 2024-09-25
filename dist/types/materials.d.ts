import * as THREE from 'three';
interface ShaderMaterialParams extends THREE.ShaderMaterialParameters {
    uniforms?: {
        [uniform: string]: THREE.IUniform;
    };
    vertexShader?: string;
    fragmentShader?: string;
}
interface MeshPhysicalMaterialParams extends THREE.MeshPhysicalMaterialParameters, ShaderMaterialParams {
}
interface MeshStandardMaterialParams extends THREE.MeshStandardMaterialParameters, ShaderMaterialParams {
}
interface MeshDepthMaterialParams extends THREE.MeshDepthMaterialParameters, ShaderMaterialParams {
}
interface MeshMatcapMaterialParameters extends THREE.MeshMatcapMaterialParameters {
    uniforms?: {
        [uniform: string]: THREE.IUniform;
    };
    vertexShader?: string;
    fragmentShader?: string;
}
interface MeshHolographicMaterialParams extends THREE.ShaderMaterialParameters {
    frame?: number;
    useMap?: boolean;
    map?: THREE.Texture;
    color?: string;
    stripCount?: number;
    fresnelExponent?: number;
    holographicOffset?: number;
    smoothEdgeStart?: number;
    smoothEdgeEnd?: number;
    glitchStrength?: number;
    glitchMin?: number;
    glitchMax?: number;
    glitchFrequencyLow?: number;
    glitchFrequencyMid?: number;
    glitchFrequencyHigh?: number;
}
export declare class MeshStandardMaterial extends THREE.MeshStandardMaterial {
    constructor(parameters?: MeshStandardMaterialParams);
}
export declare class MeshPhysicalMaterial extends THREE.MeshPhysicalMaterial {
    constructor(parameters?: MeshPhysicalMaterialParams);
}
export declare class MeshDepthMaterial extends THREE.MeshDepthMaterial {
    constructor(parameters?: MeshDepthMaterialParams);
}
export declare class MeshMatcapMaterial extends THREE.MeshMatcapMaterial {
    constructor(parameters?: MeshMatcapMaterialParameters);
}
export declare class MeshHolographicMaterial extends THREE.ShaderMaterial {
    frame?: number;
    map?: THREE.Texture;
    color?: string;
    stripCount?: number;
    fresnelExponent?: number;
    holographicOffset?: number;
    smoothEdgeStart?: number;
    smoothEdgeEnd?: number;
    glitchStrength?: number;
    glitchMin?: number;
    glitchMax?: number;
    glitchFrequencyLow?: number;
    glitchFrequencyMid?: number;
    glitchFrequencyHigh?: number;
    constructor(parameters?: MeshHolographicMaterialParams);
    private setupUniformProperties;
}
export {};
