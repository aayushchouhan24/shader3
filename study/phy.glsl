#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
varying vec3 vWorldPosition
#endif
#include<common>
#include<batching_pars_vertex>
#include<uv_pars_vertex>
#include<displacementmap_pars_vertex>
#include<color_pars_vertex>
#include<fog_pars_vertex>
#include<normal_pars_vertex>
#include<morphtarget_pars_vertex>
#include<skinning_pars_vertex>
#include<shadowmap_pars_vertex>
#include<logdepthbuf_pars_vertex>
#include<clipping_planes_pars_vertex>
void main(){
    //#include <uv_vertex>
    #if defined(USE_UV)||defined(USE_ANISOTROPY)
    vUv=vec3(uv,1).xy;
    #endif
    #ifdef USE_MAP
    vMapUv=(mapTransform*vec3(MAP_UV,1)).xy
    #endif
    #ifdef USE_ALPHAMAP
    vAlphaMapUv=(alphaMapTransform*vec3(ALPHAMAP_UV,1)).xy;
    #endif
    #ifdef USE_LIGHTMAP
    vLightMapUv=(lightMapTransform*vec3(LIGHTMAP_UV,1)).xy;
    #endif
    #ifdef USE_AOMAP
    vAoMapUv=(aoMapTransform*vec3(AOMAP_UV,1)).xy;
    #endif
    #ifdef USE_BUMPMAP
    vBumpMapUv=(bumpMapTransform*vec3(BUMPMAP_UV,1)).xy;
    #endif
    #ifdef USE_NORMALMAP
    vNormalMapUv=(normalMapTransform*vec3(NORMALMAP_UV,1)).xy;
    #endif
    #ifdef USE_DISPLACEMENTMAP
    vDisplacementMapUv=(displacementMapTransform*vec3(DISPLACEMENTMAP_UV,1)).xy;
    #endif
    #ifdef USE_EMISSIVEMAP
    vEmissiveMapUv=(emissiveMapTransform*vec3(EMISSIVEMAP_UV,1)).xy;
    #endif
    #ifdef USE_METALNESSMAP
    vMetalnessMapUv=(metalnessMapTransform*vec3(METALNESSMAP_UV,1)).xy;
    #endif
    #ifdef USE_ROUGHNESSMAP
    vRoughnessMapUv=(roughnessMapTransform*vec3(ROUGHNESSMAP_UV,1)).xy;
    #endif
    #ifdef USE_ANISOTROPYMAP
    vAnisotropyMapUv=(anisotropyMapTransform*vec3(ANISOTROPYMAP_UV,1)).xy;
    #endif
    #ifdef USE_CLEARCOATMAP
    vClearcoatMapUv=(clearcoatMapTransform*vec3(CLEARCOATMAP_UV,1)).xy;
    #endif
    #ifdef USE_CLEARCOAT_NORMALMAP
    vClearcoatNormalMapUv=(clearcoatNormalMapTransform*vec3(CLEARCOAT_NORMALMAP_UV,1)).xy;
    #endif
    #ifdef USE_CLEARCOAT_ROUGHNESSMAP
    vClearcoatRoughnessMapUv=(clearcoatRoughnessMapTransform*vec3(CLEARCOAT_ROUGHNESSMAP_UV,1)).xy;
    #endif
    #ifdef USE_IRIDESCENCEMAP
    vIridescenceMapUv=(iridescenceMapTransform*vec3(IRIDESCENCEMAP_UV,1)).xy;
    #endif
    #ifdef USE_IRIDESCENCE_THICKNESSMAP
    vIridescenceThicknessMapUv=(iridescenceThicknessMapTransform*vec3(IRIDESCENCE_THICKNESSMAP_UV,1)).xy;
    #endif
    #ifdef USE_SHEEN_COLORMAP
    vSheenColorMapUv=(sheenColorMapTransform*vec3(SHEEN_COLORMAP_UV,1)).xy;
    #endif
    #ifdef USE_SHEEN_ROUGHNESSMAP
    vSheenRoughnessMapUv=(sheenRoughnessMapTransform*vec3(SHEEN_ROUGHNESSMAP_UV,1)).xy;
    #endif
    #ifdef USE_SPECULARMAP
    vSpecularMapUv=(specularMapTransform*vec3(SPECULARMAP_UV,1)).xy;
    #endif
    #ifdef USE_SPECULAR_COLORMAP
    vSpecularColorMapUv=(specularColorMapTransform*vec3(SPECULAR_COLORMAP_UV,1)).xy;
    #endif
    #ifdef USE_SPECULAR_INTENSITYMAP
    vSpecularIntensityMapUv=(specularIntensityMapTransform*vec3(SPECULAR_INTENSITYMAP_UV,1)).xy;
    #endif
    #ifdef USE_TRANSMISSIONMAP
    vTransmissionMapUv=(transmissionMapTransform*vec3(TRANSMISSIONMAP_UV,1)).xy;
    #endif
    #ifdef USE_THICKNESSMAP
    vThicknessMapUv=(thicknessMapTransform*vec3(THICKNESSMAP_UV,1)).xy;
    #endif
    //#include <color_vertex>
    #if defined(USE_COLOR_ALPHA)
    vColor=vec4(1.);
    #elif defined(USE_COLOR)||defined(USE_INSTANCING_COLOR)||defined(USE_BATCHING_COLOR)
    vColor=vec3(1.);
    #endif
    #ifdef USE_COLOR
    vColor*=color;
    #endif
    #ifdef USE_INSTANCING_COLOR
    vColor.xyz*=instanceColor.xyz;
    #endif
    #ifdef USE_BATCHING_COLOR
    vec3 batchingColor=getBatchingColor(getIndirectIndex(gl_DrawID));
    vColor.xyz*=batchingColor.xyz;
    #endif
    
    //#include <morphinstance_vertex>
    #ifdef USE_INSTANCING_MORPH
    float morphTargetInfluences[MORPHTARGETS_COUNT];
    float morphTargetBaseInfluence=texelFetch(morphTexture,ivec2(0,gl_InstanceID),0).r;
    for(int i=0;i<MORPHTARGETS_COUNT;i++){
        morphTargetInfluences[i]=texelFetch(morphTexture,ivec2(i+1,gl_InstanceID),0).r;
    }
    #endif
    
    //#include <morphcolor_vertex>
    #if defined(USE_MORPHCOLORS)
    vColor*=morphTargetBaseInfluence;
    for(int i=0;i<MORPHTARGETS_COUNT;i++){
        #if defined(USE_COLOR_ALPHA)
        if(morphTargetInfluences[i]!=0.)vColor+=getMorph(gl_VertexID,i,2)*morphTargetInfluences[i];
        #elif defined(USE_COLOR)
        if(morphTargetInfluences[i]!=0.)vColor+=getMorph(gl_VertexID,i,2).rgb*morphTargetInfluences[i];
        #endif
    }
    #endif
    
    //#include <batching_vertex>
    #ifdef USE_BATCHING
    mat4 batchingMatrix=getBatchingMatrix(getIndirectIndex(gl_DrawID));
    #endif
    
    //#include <beginnormal_vertex>
    vec3 objectNormal=vec3(normal);
    #ifdef USE_TANGENT
    vec3 objectTangent=vec3(tangent.xyz);
    #endif
    
    //#include <morphnormal_vertex>
    #ifdef USE_MORPHNORMALS
    objectNormal*=morphTargetBaseInfluence;
    for(int i=0;i<MORPHTARGETS_COUNT;i++){
        if(morphTargetInfluences[i]!=0.)objectNormal+=getMorph(gl_VertexID,i,1).xyz*morphTargetInfluences[i];
    }
    #endif
    
    //#include <skinbase_vertex>
    #ifdef USE_SKINNING
    mat4 boneMatX=getBoneMatrix(skinIndex.x);
    mat4 boneMatY=getBoneMatrix(skinIndex.y);
    mat4 boneMatZ=getBoneMatrix(skinIndex.z);
    mat4 boneMatW=getBoneMatrix(skinIndex.w);
    #endif
    
    //#include <skinnormal_vertex>
    #ifdef USE_SKINNING
    mat4 skinMatrix=mat4(0.);
    skinMatrix+=skinWeight.x*boneMatX;
    skinMatrix+=skinWeight.y*boneMatY;
    skinMatrix+=skinWeight.z*boneMatZ;
    skinMatrix+=skinWeight.w*boneMatW;
    skinMatrix=bindMatrixInverse*skinMatrix*bindMatrix;
    objectNormal=vec4(skinMatrix*vec4(objectNormal,0.)).xyz;
    #ifdef USE_TANGENT
    objectTangent=vec4(skinMatrix*vec4(objectTangent,0.)).xyz;
    #endif
    #endif
    
    //#include <defaultnormal_vertex>
    vec3 transformedNormal=objectNormal;
    #ifdef USE_TANGENT
    vec3 transformedTangent=objectTangent;
    #endif
    #ifdef USE_BATCHING
    mat3 bm=mat3(batchingMatrix);
    transformedNormal/=vec3(dot(bm[0],bm[0]),dot(bm[1],bm[1]),dot(bm[2],bm[2]));
    transformedNormal=bm*transformedNormal;
    #ifdef USE_TANGENT
    transformedTangent=bm*transformedTangent;
    #endif
    #endif
    #ifdef USE_INSTANCING
    mat3 im=mat3(instanceMatrix);
    transformedNormal/=vec3(dot(im[0],im[0]),dot(im[1],im[1]),dot(im[2],im[2]));
    transformedNormal=im*transformedNormal;
    #ifdef USE_TANGENT
    transformedTangent=im*transformedTangent;
    #endif
    #endif
    transformedNormal=normalMatrix*transformedNormal;
    #ifdef FLIP_SIDED
    transformedNormal=-transformedNormal;
    #endif
    #ifdef USE_TANGENT
    transformedTangent=(modelViewMatrix*vec4(transformedTangent,0.)).xyz;
    #ifdef FLIP_SIDED
    transformedTangent=-transformedTangent;
    #endif
    #endif
    
    //#include <normal_vertex>
    #ifndef FLAT_SHADED
    vNormal=normalize(transformedNormal);
    #ifdef USE_TANGENT
    vTangent=normalize(transformedTangent);
    vBitangent=normalize(cross(vNormal,vTangent)*tangent.w);
    #endif
    #endif
    
    //#include <begin_vertex>
    vec3 transformed=vec3(position);
    #ifdef USE_ALPHAHASH
    vPosition=vec3(position);
    #endif
    
    //#include <morphtarget_vertex>
    #ifdef USE_MORPHTARGETS
    transformed*=morphTargetBaseInfluence;
    for(int i=0;i<MORPHTARGETS_COUNT;i++){
        if(morphTargetInfluences[i]!=0.)transformed+=getMorph(gl_VertexID,i,0).xyz*morphTargetInfluences[i];
    }
    #endif
    
    //#include <skinning_vertex>
    #ifdef USE_SKINNING
    vec4 skinVertex=bindMatrix*vec4(transformed,1.);
    vec4 skinned=vec4(0.);
    skinned+=boneMatX*skinVertex*skinWeight.x;
    skinned+=boneMatY*skinVertex*skinWeight.y;
    skinned+=boneMatZ*skinVertex*skinWeight.z;
    skinned+=boneMatW*skinVertex*skinWeight.w;
    transformed=(bindMatrixInverse*skinned).xyz;
    #endif
    
    //#include <displacementmap_vertex>
    #ifdef USE_DISPLACEMENTMAP
    transformed+=normalize(objectNormal)*(texture2D(displacementMap,vDisplacementMapUv).x*displacementScale+displacementBias);
    #endif
    
    //#include <project_vertex>
    vec4 mvPosition=vec4(transformed,1.);
    #ifdef USE_BATCHING
    mvPosition=batchingMatrix*mvPosition;
    #endif
    #ifdef USE_INSTANCING
    mvPosition=instanceMatrix*mvPosition;
    #endif
    mvPosition=modelViewMatrix*mvPosition;
    gl_Position=projectionMatrix*mvPosition;
    
    //#include <logdepthbuf_vertex>
    #ifdef USE_LOGDEPTHBUF
    vFragDepth=1.+gl_Position.w;
    vIsPerspective=float(isPerspectiveMatrix(projectionMatrix));
    #endif
    
    //#include <clipping_planes_vertex>
    #if NUM_CLIPPING_PLANES>0
    vClipPosition=-mvPosition.xyz;
    #endif
    
    vViewPosition=-mvPosition.xyz;
    
    //#include <worldpos_vertex>
    #if defined(USE_ENVMAP)||defined(DISTANCE)||defined(USE_SHADOWMAP)||defined(USE_TRANSMISSION)||NUM_SPOT_LIGHT_COORDS>0
    vec4 worldPosition=vec4(transformed,1.);
    #ifdef USE_BATCHING
    worldPosition=batchingMatrix*worldPosition;
    #endif
    #ifdef USE_INSTANCING
    worldPosition=instanceMatrix*worldPosition;
    #endif
    worldPosition=modelMatrix*worldPosition;
    #endif
    
    //#include <shadowmap_vertex>
    
    #if(defined(USE_SHADOWMAP)&&(NUM_DIR_LIGHT_SHADOWS>0||NUM_POINT_LIGHT_SHADOWS>0))||(NUM_SPOT_LIGHT_COORDS>0)
    vec3 shadowWorldNormal=inverseTransformDirection(transformedNormal,viewMatrix);
    vec4 shadowWorldPosition;
    #endif
    #if defined(USE_SHADOWMAP)
    #if NUM_DIR_LIGHT_SHADOWS>0
    #pragma unroll_loop_start
    for(int i=0;i<NUM_DIR_LIGHT_SHADOWS;i++){
        shadowWorldPosition=worldPosition+vec4(shadowWorldNormal*directionalLightShadows[i].shadowNormalBias,0);
        vDirectionalShadowCoord[i]=directionalShadowMatrix[i]*shadowWorldPosition;
    }
    #pragma unroll_loop_end
    #endif
    #if NUM_POINT_LIGHT_SHADOWS>0
    #pragma unroll_loop_start
    for(int i=0;i<NUM_POINT_LIGHT_SHADOWS;i++){
        shadowWorldPosition=worldPosition+vec4(shadowWorldNormal*pointLightShadows[i].shadowNormalBias,0);
        vPointShadowCoord[i]=pointShadowMatrix[i]*shadowWorldPosition;
    }
    #pragma unroll_loop_end
    #endif
    #endif
    
    #if NUM_SPOT_LIGHT_COORDS>0
    #pragma unroll_loop_start
    for(int i=0;i<NUM_SPOT_LIGHT_COORDS;i++){
        shadowWorldPosition=worldPosition;
        #if(defined(USE_SHADOWMAP)&&UNROLLED_LOOP_INDEX<NUM_SPOT_LIGHT_SHADOWS)
        shadowWorldPosition.xyz+=shadowWorldNormal*spotLightShadows[i].shadowNormalBias;
        #endif
        vSpotLightCoord[i]=spotLightMatrix[i]*shadowWorldPosition;
    }
    #pragma unroll_loop_end
    #endif
    
    //#include <fog_vertex>
    #ifdef USE_FOG
    vFogDepth=-mvPosition.z;
    #endif
    
    #ifdef USE_TRANSMISSION
    vWorldPosition=worldPosition.xyz;
    #endif
}