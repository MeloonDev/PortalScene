import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import {
  shaderMaterial,
  Sparkles,
  useTexture,
  useGLTF,
  OrbitControls,
  Center,
} from "@react-three/drei";
import portalVertexShader from "./shaders/portal/vertex.js";
import portalFragmentShader from "./shaders/portal/fragment.js";
import { useRef } from "react";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#c9f0f5"),
    uColorEnd: new THREE.Color("#333"),
  },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalMaterial });

export default function Experience() {
  const portalMaterial = useRef();

  const { nodes } = useGLTF("./model/portalBaked.glb");
  // console.log(nodes);
  const bakedTexture = useTexture("./model/portalBaked.jpg");
  bakedTexture.flipY = false;

  useFrame((state, delta) => {
    portalMaterial.current.uTime += delta * 3;
  });

  return (
    <>
      <color args={["#201919"]} attach="background" />

      <OrbitControls makeDefault />

      <Center>
        <mesh
          geometry={nodes.baked.geometry}
          position={nodes.baked.position}
          rotation={nodes.baked.rotation}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>

        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color="#F6EFA6" />
        </mesh>
        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color="#F6EFA6" />
        </mesh>

        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          {/* <shaderMaterial
            vertexShader={portalVertexShader}
            fragmentShader={portalFragmentShader}
            uniforms={{
              uTime: { value: 0 },
              uColorStart: { value: new THREE.Color("#C7EEF3") },
              uColorEnd: { value: new THREE.Color("#000000") },
            }}
          /> */}
          <portalMaterial side={THREE.DoubleSide} ref={portalMaterial} />
        </mesh>

        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.3}
          count={40}
        />
      </Center>
    </>
  );
}
