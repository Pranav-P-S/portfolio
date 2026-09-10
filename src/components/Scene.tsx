"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { MeshSurfaceSampler, mergeBufferGeometries } from "three-stdlib";

// --- GENERIC PARTICLES SHADERS ---
const genericVertexShader = `
  attribute vec3 color;
  attribute float aRandom;
  varying vec3 vColor;
  uniform float uCollapse;
  uniform float uTime;
  
  mat2 rotate2d(float _angle){
      return mat2(cos(_angle),-sin(_angle),
                  sin(_angle),cos(_angle));
  }
  
  void main() {
    vColor = color;
    vec3 pos = position;
    
    // Floating noise
    pos.y += sin(uTime * 2.0 + pos.x * 2.0) * 0.2;
    
    // Swirl (reduced further)
    float dist = length(pos.xz);
    float angle = (uTime * (0.05 + uCollapse * 0.1)) + (uCollapse * 0.5 / (dist + 1.0)); 
    pos.xz = rotate2d(angle) * pos.xz;
    
    // Collapse to center with ease-in
    float ease = pow(uCollapse, 3.0);
    pos = mix(pos, vec3(0.0), ease);
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Density reduction & size increase
    if (aRandom < uCollapse * 0.95) {
        // Hide 95% of particles as collapse nears 1.0
        gl_Position = vec4(0.0);
        gl_PointSize = 0.0;
    } else {
        // Remaining particles grow significantly larger
        gl_PointSize = (25.0 / -mvPosition.z) * (1.0 + ease * 4.0);
    }
  }
`;

const genericFragmentShader = `
  varying vec3 vColor;
  void main() {
    // Soft circular particle
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    // Thicker core and brighter bloom multiplier
    float alpha = smoothstep(0.5, 0.1, dist);
    gl_FragColor = vec4(vColor * 2.5, alpha);
  }
`;

// --- LIDAR SWEEP SHADERS ---
const pointVertexShader = `
  attribute vec3 color;
  varying vec3 vColor;
  varying vec3 vPosition;
  
  void main() {
    vColor = color;
    vPosition = position;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size attenuation based on distance for high fidelity feel
    gl_PointSize = (6.0 / -mvPosition.z); 
  }
`;

const pointFragmentShader = `
  varying vec3 vColor;
  varying vec3 vPosition;
  uniform float uScrollProgress;
  uniform float uMinY;
  uniform float uMaxY;
  
  void main() {
    // Scroll progress 0 -> 1 maps to max Y -> min Y
    float range = uMaxY - uMinY;
    float currentY = uMaxY + (range * 0.1) - (uScrollProgress * range * 1.2);
    
    if (vPosition.y < currentY) {
      discard;
    }
    
    // Scan line glow at the leading edge
    float distanceToScan = vPosition.y - currentY;
    vec3 finalColor = vColor;
    
    if (distanceToScan > 0.0 && distanceToScan < 0.25) {
      float glow = 1.0 - (distanceToScan / 0.25);
      // Bright laser cyan glow at the edge
      finalColor = mix(vColor, vec3(0.0, 1.0, 1.0), glow * 0.9);
    }
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// --- COMPONENTS ---

function GenericParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  
  const [geometryData] = useState(() => {
    const count = 3500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    
    for(let i=0; i<count; i++) {
      const r = 12 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i*3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i*3+2] = r * Math.cos(phi);
      
      const color = new THREE.Color();
      color.lerpColors(new THREE.Color("#00f3ff"), new THREE.Color("#b026ff"), Math.random());
      colors[i*3] = color.r;
      colors[i*3+1] = color.g;
      colors[i*3+2] = color.b;
      
      randoms[i] = Math.random();
    }
    return { positions, colors, randoms };
  });
  
  const uniforms = useMemo(() => ({
    uCollapse: { value: 0 },
    uTime: { value: 0 }
  }), []);
  
  useFrame((state) => {
    if (!pointsRef.current || !materialRef.current) return;
    const t = state.clock.elapsedTime;
    materialRef.current.uniforms.uTime.value = t;
    
    // Safely calculate scroll progress
    const scrollH = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollH > 0 ? window.scrollY / scrollH : 0;
    
    // Map scroll 0 -> 0.08 (8% of page) to 0 -> 1 collapse
    const collapseThreshold = 0.08;
    let collapse = scrollProgress / collapseThreshold;
    collapse = Math.max(0, Math.min(collapse, 1.0));
    
    materialRef.current.uniforms.uCollapse.value = collapse;
    pointsRef.current.visible = scrollProgress < collapseThreshold; // Hide fully when collapsed
    
    // Additional ambient rotation (slowed down significantly)
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.z = t * 0.01;
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={3500} array={geometryData.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={3500} array={geometryData.colors} itemSize={3} />
        <bufferAttribute attach="attributes-aRandom" count={3500} array={geometryData.randoms} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={genericVertexShader}
        fragmentShader={genericFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}


function LidarSweep() {
  const { nodes, scene } = useGLTF('/helmet.glb');
  const pointsRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  
  const [geometryData, setGeometryData] = useState<{ positions: Float32Array, colors: Float32Array, minY: number, maxY: number } | null>(null);

  useEffect(() => {
    scene.updateMatrixWorld(true);

    const geometries: THREE.BufferGeometry[] = [];
    scene.traverse((child: any) => {
      if (child.isMesh) {
        const geometry = child.geometry.clone();
        geometry.applyMatrix4(child.matrixWorld);
        geometries.push(geometry);
      }
    });

    if (geometries.length === 0) return;

    let mergedGeometry = mergeBufferGeometries(geometries);
    
    mergedGeometry.computeBoundingBox();
    const box = mergedGeometry.boundingBox!;
    const center = new THREE.Vector3();
    box.getCenter(center);
    mergedGeometry.translate(-center.x, -center.y, -center.z);
    
    mergedGeometry.scale(4, 4, 4);
    mergedGeometry.computeBoundingBox();
    
    const tempMesh = new THREE.Mesh(mergedGeometry, new THREE.MeshBasicMaterial());
    
    const sampler = new MeshSurfaceSampler(tempMesh).build();
    const count = 200000; 
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const tempPosition = new THREE.Vector3();
    const tempNormal = new THREE.Vector3();
    
    let minY = Infinity;
    let maxY = -Infinity;

    for (let i = 0; i < count; i++) {
      sampler.sample(tempPosition, tempNormal);
      
      const errorMagnitude = Math.random();
      const noise = errorMagnitude * 0.05; 
      
      tempPosition.add(tempNormal.multiplyScalar(noise));
      
      positions[i * 3] = tempPosition.x;
      positions[i * 3 + 1] = tempPosition.y;
      positions[i * 3 + 2] = tempPosition.z;
      
      if (tempPosition.y < minY) minY = tempPosition.y;
      if (tempPosition.y > maxY) maxY = tempPosition.y;
      
      const color = new THREE.Color();
      color.setHSL((1 - errorMagnitude) * 0.33, 1.0, 0.5);
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    setGeometryData({ positions, colors, minY, maxY });
  }, [nodes, scene]);

  useFrame((state) => {
    if (!pointsRef.current || !materialRef.current || !geometryData) return;
    const t = state.clock.elapsedTime;
    
    pointsRef.current.rotation.y = t * 0.1;
    
    const targetX = (state.pointer.x * 1.5);
    const targetY = (state.pointer.y * 1.5);
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.05;
    
    const scrollH = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollH > 0 ? window.scrollY / scrollH : 0;
    
    // The generic collapse finishes at 0.08 scroll.
    const revealStart = 0.08;
    const scaleEnd = 0.12;
    
    if (scrollProgress < revealStart) {
      pointsRef.current.visible = false;
      materialRef.current.uniforms.uScrollProgress.value = 0;
    } else {
      pointsRef.current.visible = true;
      
      // Scale logic: 0.08 to 0.12 scroll maps to 0.0 to 1.0 scale
      let scaleP = (scrollProgress - revealStart) / (scaleEnd - revealStart);
      scaleP = Math.max(0, Math.min(scaleP, 1.0));
      
      // Smooth smoothstep ease for scale
      const smoothScale = scaleP * scaleP * (3.0 - 2.0 * scaleP);
      pointsRef.current.scale.set(smoothScale, smoothScale, smoothScale);
      
      // Scan logic: sweeps down as you scroll from 0.08 to 1.0
      let scanP = (scrollProgress - revealStart) / (1.0 - revealStart);
      scanP = Math.max(0, Math.min(scanP, 1.0));
      
      materialRef.current.uniforms.uScrollProgress.value = scanP;
    }
  });

  const uniforms = useMemo(() => {
    if (!geometryData) return null;
    return {
      uScrollProgress: { value: 0 },
      uMinY: { value: geometryData.minY },
      uMaxY: { value: geometryData.maxY },
    };
  }, [geometryData]);

  if (!geometryData || !uniforms) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={geometryData.positions.length / 3}
          array={geometryData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={geometryData.colors.length / 3}
          array={geometryData.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={pointVertexShader}
        fragmentShader={pointFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Scene() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none bg-[#030305]">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <color attach="background" args={["#030305"]} />
        <GenericParticles />
        <LidarSweep />
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.1} 
            mipmapBlur 
            intensity={1.2} 
          />
          <ChromaticAberration 
            blendFunction={BlendFunction.NORMAL} 
            offset={new THREE.Vector2(0.002, 0.002)}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/helmet.glb');
