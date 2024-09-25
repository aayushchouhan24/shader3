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
    stripCountMultiplier?: number;
    fresnelExponent?: number;
    holographicOffsetAmount?: number;
    smoothstepEdgeStart?: number;
    smoothstepEdgeEnd?: number;
    glitchStrength?: number;
    glitchMin?: number;
    glitchMax?: number;
    glitchFrequencyLow?: number;
    glitchFrequencyMid?: number;
    glitchFrequencyHigh?: number;
}
declare class MeshStandardMaterial extends THREE.MeshStandardMaterial {
    constructor(parameters?: MeshStandardMaterialParams);
}
declare class MeshPhysicalMaterial extends THREE.MeshPhysicalMaterial {
    constructor(parameters?: MeshPhysicalMaterialParams);
}
declare class MeshDepthMaterial extends THREE.MeshDepthMaterial {
    constructor(parameters?: MeshDepthMaterialParams);
}
declare class MeshMatcapMaterial extends THREE.MeshMatcapMaterial {
    constructor(parameters?: MeshMatcapMaterialParameters);
}
declare class MeshHolographicMaterial extends THREE.ShaderMaterial {
    frame?: number;
    map?: THREE.Texture;
    color?: string;
    stripCountMultiplier?: number;
    fresnelExponent?: number;
    holographicOffsetAmount?: number;
    smoothstepEdgeStart?: number;
    smoothstepEdgeEnd?: number;
    glitchStrength?: number;
    glitchMin?: number;
    glitchMax?: number;
    glitchFrequencyLow?: number;
    glitchFrequencyMid?: number;
    glitchFrequencyHigh?: number;
    constructor(parameters?: MeshHolographicMaterialParams);
    private setupUniformProperties;
}

var truchetPattern = "vec2 truchetPattern(vec2 s,float i){i=fract((i-.5)*2.);return mix(mix(s,vec2(1.)-s,step(.5,i)),vec2(1.-s.x,s.y),step(.75,i));}";

var perlin = "\n#define M_PI 3.14159265358979323846\nfloat mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}vec4 perm(vec4 x){return mod289(((x*34.0)+1.0)*x);}float hash(float n){return fract(sin(n)*1e4);}float hash(vec2 p){return fract(1e4*sin(17.0*p.x+p.y*0.1)*(0.1+abs(sin(p.y*13.0+p.x))));}float random(float n){return fract(sin(n)*43758.5453123);}float random(vec2 co){return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);}float random(vec2 co,float l){return random(vec2(random(co),l));}float random(vec2 co,float l,float t){return random(vec2(random(co,l),t));}float permute(float x){return floor(mod(((x*34.)+1.)*x,289.));}vec3 permute(vec3 x){return mod(((x*34.)+1.)*x,289.);}vec4 permute(vec4 x){return mod(((x*34.)+1.)*x,289.);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}float taylorInvSqrt(float r){return 1.79284291400159-.85373472095314*r;}vec2 fade(vec2 t){return t*t*t*(t*(t*6.-15.)+10.);}vec3 fade(vec3 t){return t*t*t*(t*(t*6.-15.)+10.);}float perlin(vec2 P){vec4 Pi=floor(P.xyxy)+vec4(0.,0.,1.,1.);vec4 Pf=fract(P.xyxy)-vec4(0.,0.,1.,1.);Pi=mod(Pi,289.);vec4 ix=Pi.xzxz;vec4 iy=Pi.yyww;vec4 fx=Pf.xzxz;vec4 fy=Pf.yyww;vec4 i=permute(permute(ix)+iy);vec4 gx=2.*fract(i*.0243902439)-1.;vec4 gy=abs(gx)-.5;vec4 tx=floor(gx+.5);gx=gx-tx;vec2 g00=vec2(gx.x,gy.x);vec2 g10=vec2(gx.y,gy.y);vec2 g01=vec2(gx.z,gy.z);vec2 g11=vec2(gx.w,gy.w);vec4 norm=1.79284291400159-.85373472095314*vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11));g00*=norm.x;g01*=norm.y;g10*=norm.z;g11*=norm.w;float n00=dot(g00,vec2(fx.x,fy.x));float n10=dot(g10,vec2(fx.y,fy.y));float n01=dot(g01,vec2(fx.z,fy.z));float n11=dot(g11,vec2(fx.w,fy.w));vec2 fade_xy=fade(Pf.xy);vec2 n_x=mix(vec2(n00,n01),vec2(n10,n11),fade_xy.x);float n_xy=mix(n_x.x,n_x.y,fade_xy.y);return 2.3*n_xy;}float perlin(vec3 P){vec3 Pi0=floor(P);vec3 Pi1=Pi0+vec3(1.);Pi0=mod(Pi0,289.);Pi1=mod(Pi1,289.);vec3 Pf0=fract(P);vec3 Pf1=Pf0-vec3(1.);vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x);vec4 iy=vec4(Pi0.yy,Pi1.yy);vec4 iz0=Pi0.zzzz;vec4 iz1=Pi1.zzzz;vec4 ixy=permute(permute(ix)+iy);vec4 ixy0=permute(ixy+iz0);vec4 ixy1=permute(ixy+iz1);vec4 gx0=ixy0/7.;vec4 gy0=fract(floor(gx0)/7.)-.5;gx0=fract(gx0);vec4 gz0=vec4(.5)-abs(gx0)-abs(gy0);vec4 sz0=step(gz0,vec4(0.));gx0-=sz0*(step(0.,gx0)-.5);gy0-=sz0*(step(0.,gy0)-.5);vec4 gx1=ixy1/7.;vec4 gy1=fract(floor(gx1)/7.)-.5;gx1=fract(gx1);vec4 gz1=vec4(.5)-abs(gx1)-abs(gy1);vec4 sz1=step(gz1,vec4(0.));gx1-=sz1*(step(0.,gx1)-.5);gy1-=sz1*(step(0.,gy1)-.5);vec3 g000=vec3(gx0.x,gy0.x,gz0.x);vec3 g100=vec3(gx0.y,gy0.y,gz0.y);vec3 g010=vec3(gx0.z,gy0.z,gz0.z);vec3 g110=vec3(gx0.w,gy0.w,gz0.w);vec3 g001=vec3(gx1.x,gy1.x,gz1.x);vec3 g101=vec3(gx1.y,gy1.y,gz1.y);vec3 g011=vec3(gx1.z,gy1.z,gz1.z);vec3 g111=vec3(gx1.w,gy1.w,gz1.w);vec4 norm0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));g000*=norm0.x;g010*=norm0.y;g100*=norm0.z;g110*=norm0.w;vec4 norm1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));g001*=norm1.x;g011*=norm1.y;g101*=norm1.z;g111*=norm1.w;float n000=dot(g000,Pf0);float n100=dot(g100,vec3(Pf1.x,Pf0.yz));float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z));float n110=dot(g110,vec3(Pf1.xy,Pf0.z));float n001=dot(g001,vec3(Pf0.xy,Pf1.z));float n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));float n011=dot(g011,vec3(Pf0.x,Pf1.yz));float n111=dot(g111,Pf1);vec3 fade_xyz=fade(Pf0);vec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);vec2 n_yz=mix(n_z.xy,n_z.zw,fade_xyz.y);float n_xyz=mix(n_yz.x,n_yz.y,fade_xyz.x);return 2.2*n_xyz;}float perlin(vec3 P,vec3 rep){vec3 Pi0=mod(floor(P),rep);vec3 Pi1=mod(Pi0+vec3(1.),rep);Pi0=mod289(Pi0);Pi1=mod289(Pi1);vec3 Pf0=fract(P);vec3 Pf1=Pf0-vec3(1.);vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x);vec4 iy=vec4(Pi0.yy,Pi1.yy);vec4 iz0=Pi0.zzzz;vec4 iz1=Pi1.zzzz;vec4 ixy=permute(permute(ix)+iy);vec4 ixy0=permute(ixy+iz0);vec4 ixy1=permute(ixy+iz1);vec4 gx0=ixy0*(1./7.);vec4 gy0=fract(floor(gx0)*(1./7.))-.5;gx0=fract(gx0);vec4 gz0=vec4(.5)-abs(gx0)-abs(gy0);vec4 sz0=step(gz0,vec4(0.));gx0-=sz0*(step(0.,gx0)-.5);gy0-=sz0*(step(0.,gy0)-.5);vec4 gx1=ixy1*(1./7.);vec4 gy1=fract(floor(gx1)*(1./7.))-.5;gx1=fract(gx1);vec4 gz1=vec4(.5)-abs(gx1)-abs(gy1);vec4 sz1=step(gz1,vec4(0.));gx1-=sz1*(step(0.,gx1)-.5);gy1-=sz1*(step(0.,gy1)-.5);vec3 g000=vec3(gx0.x,gy0.x,gz0.x);vec3 g100=vec3(gx0.y,gy0.y,gz0.y);vec3 g010=vec3(gx0.z,gy0.z,gz0.z);vec3 g110=vec3(gx0.w,gy0.w,gz0.w);vec3 g001=vec3(gx1.x,gy1.x,gz1.x);vec3 g101=vec3(gx1.y,gy1.y,gz1.y);vec3 g011=vec3(gx1.z,gy1.z,gz1.z);vec3 g111=vec3(gx1.w,gy1.w,gz1.w);vec4 norm0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));g000*=norm0.x;g010*=norm0.y;g100*=norm0.z;g110*=norm0.w;vec4 norm1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));g001*=norm1.x;g011*=norm1.y;g101*=norm1.z;g111*=norm1.w;float n000=dot(g000,Pf0);float n100=dot(g100,vec3(Pf1.x,Pf0.yz));float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z));float n110=dot(g110,vec3(Pf1.xy,Pf0.z));float n001=dot(g001,vec3(Pf0.xy,Pf1.z));float n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));float n011=dot(g011,vec3(Pf0.x,Pf1.yz));float n111=dot(g111,Pf1);vec3 fade_xyz=fade(Pf0);vec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);vec2 n_yz=mix(n_z.xy,n_z.zw,fade_xyz.y);float n_xyz=mix(n_yz.x,n_yz.y,fade_xyz.x);return 2.2*n_xyz;}";

var fbm = "\n#define M_PI 3.14159265358979323846\nfloat mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}vec4 perm(vec4 x){return mod289(((x*34.0)+1.0)*x);}float hash(float n){return fract(sin(n)*1e4);}float hash(vec2 p){return fract(1e4*sin(17.0*p.x+p.y*0.1)*(0.1+abs(sin(p.y*13.0+p.x))));}float random(float n){return fract(sin(n)*43758.5453123);}float random(vec2 co){return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);}float random(vec2 co,float l){return random(vec2(random(co),l));}float random(vec2 co,float l,float t){return random(vec2(random(co,l),t));}float permute(float x){return floor(mod(((x*34.)+1.)*x,289.));}vec3 permute(vec3 x){return mod(((x*34.)+1.)*x,289.);}vec4 permute(vec4 x){return mod(((x*34.)+1.)*x,289.);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}float taylorInvSqrt(float r){return 1.79284291400159-.85373472095314*r;}vec2 fade(vec2 t){return t*t*t*(t*(t*6.-15.)+10.);}vec3 fade(vec3 t){return t*t*t*(t*(t*6.-15.)+10.);}float o=8.;float f(float x){float v=0.,a=.5,s=100.;for(int i=0;i<o;++i){v+=a*noise(x);x=x*2.+s;a*=.5;}return v;}float f(vec2 x){float v=0.,a=.5;vec2 s=vec2(100.);mat2 r=mat2(cos(.5),sin(.5),-sin(.5),cos(.5));for(int i=0;i<o;++i){v+=a*noise(x);x=r*x*2.+s;a*=.5;}return v;}float f(vec3 x){float v=0.,a=.5;vec3 s=vec3(100.);for(int i=0;i<o;++i){v+=a*noise(x);x=x*2.+s;a*=.5;}return v;}const mat2 m=mat2(.8,-.6,.6,.8);float f(vec2 p){float f=0.;f+=.5*noise(p);p=m*p*2.02;f+=.25*noise(p);p=m*p*2.03;f+=.125*noise(p);p=m*p*2.01;f+=.0625*noise(p);return f/.9375;}";

var simplex = "\n#define M_PI 3.14159265358979323846\nfloat mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}vec4 perm(vec4 x){return mod289(((x*34.0)+1.0)*x);}float hash(float n){return fract(sin(n)*1e4);}float hash(vec2 p){return fract(1e4*sin(17.0*p.x+p.y*0.1)*(0.1+abs(sin(p.y*13.0+p.x))));}float random(float n){return fract(sin(n)*43758.5453123);}float random(vec2 co){return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);}float random(vec2 co,float l){return random(vec2(random(co),l));}float random(vec2 co,float l,float t){return random(vec2(random(co,l),t));}float permute(float x){return floor(mod(((x*34.)+1.)*x,289.));}vec3 permute(vec3 x){return mod(((x*34.)+1.)*x,289.);}vec4 permute(vec4 x){return mod(((x*34.)+1.)*x,289.);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}float taylorInvSqrt(float r){return 1.79284291400159-.85373472095314*r;}vec2 fade(vec2 t){return t*t*t*(t*(t*6.-15.)+10.);}vec3 fade(vec3 t){return t*t*t*(t*(t*6.-15.)+10.);}float simplex(vec2 v){const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1;i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.);vec3 p=permuteAlpha(permuteAlpha(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m=m*m;m=m*m;vec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;m*=1.79284291400159-.85373472095314*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.*dot(m,g);}float simplex(vec3 v){const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+1.*C.xxx;vec3 x2=x0-i2+2.*C.xxx;vec3 x3=x0-1.+3.*C.xxx;i=mod(i,289.);vec4 p=permuteAlpha(permuteAlpha(permuteAlpha(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));float n_=1./7.;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrtAlpha(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}vec4 grad4Alpha(float j,vec4 ip){const vec4 ones=vec4(1.,1.,1.,-1.);vec4 p,s;p.xyz=floor(fract(vec3(j)*ip.xyz)*7.)*ip.z-1.;p.w=1.5-dot(abs(p.xyz),ones.xyz);s=vec4(lessThan(p,vec4(0.)));p.xyz=p.xyz+(s.xyz*2.-1.)*s.www;return p;}float simplex(vec4 v){const vec2 C=vec2(.138196601125010504,.309016994374947451);vec4 i=floor(v+dot(v,C.yyyy));vec4 x0=v-i+dot(i,C.xxxx);vec4 i0;vec3 isX=step(x0.yzw,x0.xxx);vec3 isYZ=step(x0.zww,x0.yyz);i0.x=isX.x+isX.y+isX.z;i0.yzw=1.-isX;i0.y+=isYZ.x+isYZ.y;i0.zw+=1.-isYZ.xy;i0.z+=isYZ.z;i0.w+=1.-isYZ.z;vec4 i3=clamp(i0,0.,1.);vec4 i2=clamp(i0-1.,0.,1.);vec4 i1=clamp(i0-2.,0.,1.);vec4 x1=x0-i1+1.*C.xxxx;vec4 x2=x0-i2+2.*C.xxxx;vec4 x3=x0-i3+3.*C.xxxx;vec4 x4=x0-1.+4.*C.xxxx;i=mod(i,289.);float j0=permuteAlpha(permuteAlpha(permuteAlpha(permuteAlpha(i.w)+i.z)+i.y)+i.x);vec4 j1=permuteAlpha(permuteAlpha(permuteAlpha(permuteAlpha(i.w+vec4(i1.w,i2.w,i3.w,1.))+i.z+vec4(i1.z,i2.z,i3.z,1.))+i.y+vec4(i1.y,i2.y,i3.y,1.))+i.x+vec4(i1.x,i2.x,i3.x,1.));vec4 ip=vec4(1./294.,1./49.,1./7.,0.);vec4 p0=grad4Alpha(j0,ip);vec4 p1=grad4Alpha(j1.x,ip);vec4 p2=grad4Alpha(j1.y,ip);vec4 p3=grad4Alpha(j1.z,ip);vec4 p4=grad4Alpha(j1.w,ip);vec4 norm=taylorInvSqrtAlpha(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;p4*=taylorInvSqrtAlpha(dot(p4,p4));vec3 m0=max(.6-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.);vec2 m1=max(.6-vec2(dot(x3,x3),dot(x4,x4)),0.);m0=m0*m0;m1=m1*m1;return 49.*(dot(m0*m0,vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2)))+dot(m1*m1,vec2(dot(p3,x3),dot(p4,x4))));}vec3 random3Alpha(vec3 c){float j=4096.*sin(dot(c,vec3(17.,59.4,15.)));vec3 r;r.z=fract(512.*j);j*=.125;r.x=fract(512.*j);j*=.125;r.y=fract(512.*j);return r-.5;}const float F3Alpha=.3333333;const float G3Alpha=.1666667;float simplexFractal(vec3 m){return.5333333*simplex(m)+.2666667*simplex(2.*m)+.1333333*simplex(4.*m)+.0666667*simplex(8.*m);}";

export { MeshDepthMaterial, MeshHolographicMaterial, MeshMatcapMaterial, MeshPhysicalMaterial, MeshStandardMaterial, fbm, perlin, simplex, truchetPattern };
