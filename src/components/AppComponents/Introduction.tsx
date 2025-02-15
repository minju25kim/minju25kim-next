'use client'

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function Introduction() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scene = new THREE.Scene();
      const container = containerRef.current;

      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(300, 300);
      containerRef.current?.appendChild(renderer.domElement);
      camera.position.z = 5;

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      renderer.render(scene, camera);

      const renderScene = () => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.rotation.z += 0.005;
        renderer.render(scene, camera);
        requestAnimationFrame(renderScene);
      };

      renderScene();

      return () => {
        container?.removeChild(renderer.domElement);
      };
    }
  }, []);

  return (
    <div className="h-[500px] w-full border border-gray-200 flex flex-col items-center justify-center">
      <div ref={containerRef} />
    </div>
  )
}
