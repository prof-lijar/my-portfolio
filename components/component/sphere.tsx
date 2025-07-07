"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const skills = [
  "문창선 목사님",
  "권숙연 교수님",
  "정해영 선생님",
  "박성수 선생님",
  "엄마",
  "김미선 교수님",
  "오빠",
  "동생",
  "친구",
  "친구의 아빠",
  "친구의 엄마",
  "친구의 동생",
  "친구의 친구",
  "Django",
  "Flask",
  "Java",
  "Spring Boot",
  "SQL",
  "MongoDB",
  "Git",
  "GitHub",
  "Docker",
  "AWS",
  "Azure",
  "GCP",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Bootstrap",
];

const Sphere = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const frameId = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const autoRotate = useRef(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    // Transparent background
    scene.background = null;
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 10;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create invisible sphere for positioning
    const sphereGeometry = new THREE.SphereGeometry(6, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x333333,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Create text sprites
    const textGroup = new THREE.Group();
    scene.add(textGroup);

    skills.forEach((skill, index) => {
      // Calculate position on sphere using Fibonacci spiral
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const y = 1 - (index / (skills.length - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = goldenAngle * index;

      const x = Math.cos(theta) * radius * 6;
      const z = Math.sin(theta) * radius * 6;
      const yPos = y * 6;

      // Create text sprite
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
      const fontSize = 72;
      context.font = `${fontSize}px Inter, sans-serif`;
      context.fillStyle = "#ffffff";
      context.textAlign = "center";
      context.textBaseline = "middle";

      const textWidth = context.measureText(skill).width;
      canvas.width = textWidth + 40;
      canvas.height = fontSize + 20;

      // Redraw with proper canvas size
      context.font = `${fontSize}px Inter, sans-serif`;
      context.fillStyle = "#ffffff";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.shadowColor = "rgba(0, 0, 0, 0.8)";
      context.shadowBlur = 4;
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      context.fillText(skill, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
      });
      const sprite = new THREE.Sprite(spriteMaterial);

      sprite.position.set(x, yPos, z);
      sprite.scale.set(1.5, 0.75, 1);

      textGroup.add(sprite);
    });

    // Mouse/Touch interaction
    const handleMouseDown = (event: MouseEvent | TouchEvent) => {
      isDragging.current = true;
      autoRotate.current = false;

      const clientX =
        "touches" in event ? event.touches[0].clientX : event.clientX;
      const clientY =
        "touches" in event ? event.touches[0].clientY : event.clientY;

      mouseRef.current = { x: clientX, y: clientY };
    };

    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;

      const clientX =
        "touches" in event ? event.touches[0].clientX : event.clientX;
      const clientY =
        "touches" in event ? event.touches[0].clientY : event.clientY;

      const deltaX = clientX - mouseRef.current.x;
      const deltaY = clientY - mouseRef.current.y;

      sphere.rotation.y += deltaX * 0.01;
      sphere.rotation.x += deltaY * 0.01;
      textGroup.rotation.y += deltaX * 0.01;
      textGroup.rotation.x += deltaY * 0.01;

      mouseRef.current = { x: clientX, y: clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      setTimeout(() => {
        autoRotate.current = true;
      }, 2000);
    };

    // Add event listeners
    const canvas = renderer.domElement;
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("touchstart", handleMouseDown);
    canvas.addEventListener("touchmove", handleMouseMove);
    canvas.addEventListener("touchend", handleMouseUp);

    // Animation loop
    const animate = () => {
      frameId.current = requestAnimationFrame(animate);

      if (autoRotate.current) {
        sphere.rotation.y += 0.005;
        textGroup.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }

      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("touchstart", handleMouseDown);
      canvas.removeEventListener("touchmove", handleMouseMove);
      canvas.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("resize", handleResize);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-white text-xs sm:text-sm mb-4">
        These people made me.
      </p>
      <div className="flex justify-center items-center flex-1">
        <div
          ref={mountRef}
          className="w-[380px] h-[380px] sm:w-[550px] sm:h-[550px] lg:w-[700px] lg:h-[700px] cursor-grab active:cursor-grabbing"
        />
      </div>

      {/* Instructions */}
      <div className="text-white/70 text-center px-4 mt-4">
        <p className="text-xs sm:text-sm">Drag to spin • Touch to rotate</p>
      </div>
    </div>
  );
};

export default Sphere;
