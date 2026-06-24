import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Graph3DCanvas - Interactive 3D WebGL Visualization for Graphs and Trees
 * 
 * Props:
 * - mode: 'graph' | 'tree'
 * - nodes: Array of nodes (either {id, x, y} or {name, x, y, parentX, parentY})
 * - edges: Array of edges ({from, to, weight}) - only for 'graph' mode
 * - activeNode: ID/name of current active node
 * - visitedNodes: Array of visited node IDs/names
 * - highlightNode: ID/name of highlighted node
 * - mstEdges: Array of edges in MST
 * - activeEdges: Array of edges in active traversal path
 */
export default function Graph3DCanvas({
  mode = 'graph',
  nodes = [],
  edges = [],
  activeNode = null,
  visitedNodes = [],
  highlightNode = null,
  mstEdges = [],
  activeEdges = []
}) {
  const containerRef = useRef(null);

  // Helper to create high-quality billboard text sprites
  const createTextSprite = (text, color = '#111111') => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Draw white circular background border for legibility
    ctx.clearRect(0, 0, 128, 128);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.arc(64, 64, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#e1f3fe';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw text centered
    ctx.font = 'Bold 28px Outfit, -apple-system, sans-serif';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text.toString(), 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(8.5, 8.5, 1);
    return sprite;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || 500;
    const height = containerRef.current.clientHeight || 300;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F7F6F3'); // Match --bg-main

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 0, 220);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    
    // Clear any previous canvas element
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true;
    controls.maxPolarAngle = Math.PI; // Full rotation
    controls.minDistance = 50;
    controls.maxDistance = 450;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(50, 150, 100);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.3, 300);
    pointLight.position.set(0, 0, 150);
    scene.add(pointLight);

    // Grid helper (subtle, aligned horizontally)
    const gridHelper = new THREE.GridHelper(500, 50, 0xeaeaea, 0xf0f0f0);
    gridHelper.position.y = -220;
    scene.add(gridHelper);

    // 6. Coordinates & Object Construction
    const sphereGeometry = new THREE.SphereGeometry(7, 32, 32);
    const nodeMeshes = [];
    const edgeMeshes = [];

    // Helper: Map 2D container coordinates (0-500, 0-300) to centered 3D positions
    const mapCoordinates = (x, y, index) => {
      const scaleX = 0.55;
      const scaleY = -0.55;
      
      const x3d = (x - 250) * scaleX;
      const y3d = (y - 150) * scaleY + 20; // Shift up slightly
      
      // Introduce depth z3d
      let z3d = 0;
      if (mode === 'graph') {
        // Spiral/sinusoidal depth for graphs
        z3d = Math.sin(index * 1.5) * 35;
      } else {
        // Cone tree branching depth: map based on relative horizontal shifts
        const relativeX = x - 250;
        const relativeY = y - 150;
        z3d = Math.sin(relativeX * 0.04) * Math.cos(relativeY * 0.04) * 20;
      }

      return new THREE.Vector3(x3d, y3d, z3d);
    };

    // Construct Nodes
    if (mode === 'graph') {
      nodes.forEach((n, idx) => {
        const pos = mapCoordinates(n.x, n.y, idx);

        // Determine node status colors
        let nodeColor = 0xffffff;
        let emissiveColor = 0x111111;
        const isVisited = visitedNodes.includes(n.id);
        const isActive = activeNode === n.id;
        const isHighlight = highlightNode === n.id;

        if (isActive) {
          nodeColor = 0xe1f3fe; // Pale Blue
          emissiveColor = 0x1f6c9f;
        } else if (isVisited) {
          nodeColor = 0xedf3ec; // Pale Green
          emissiveColor = 0x346538;
        } else if (isHighlight) {
          nodeColor = 0xfbf3db; // Pale Yellow
          emissiveColor = 0x956400;
        }

        const material = new THREE.MeshStandardMaterial({
          color: nodeColor,
          emissive: emissiveColor,
          emissiveIntensity: isActive || isVisited || isHighlight ? 0.4 : 0.05,
          roughness: 0.2,
          metalness: 0.1
        });

        const mesh = new THREE.Mesh(sphereGeometry, material);
        mesh.position.copy(pos);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
        nodeMeshes.push({ id: n.id, pos, mesh });

        // Add 3D Floating label
        const spriteColor = isActive ? '#1F6C9F' : (isVisited ? '#346538' : '#111111');
        const textSprite = createTextSprite(n.id, spriteColor);
        textSprite.position.set(pos.x, pos.y + 11, pos.z);
        scene.add(textSprite);
      });

      // Construct Edges for graph mode
      edges.forEach((e) => {
        const fromNode = nodeMeshes.find(nm => nm.id === e.from);
        const toNode = nodeMeshes.find(nm => nm.id === e.to);
        if (!fromNode || !toNode) return;

        const isMst = mstEdges.some(me => 
          (me.from === e.from && me.to === e.to) || 
          (me.from === e.to && me.to === e.from)
        );
        const isActiveEdge = activeEdges.some(ae =>
          (ae.from === e.from && ae.to === e.to) ||
          (ae.from === e.to && ae.to === e.from)
        );

        let edgeColor = 0xeaeaea;
        let thickness = 0.55;
        if (isMst) {
          edgeColor = 0x346538; // Muted Green
          thickness = 1.6;
        } else if (isActiveEdge) {
          edgeColor = 0x1f6c9f; // Muted Blue
          thickness = 1.4;
        }

        // Draw 3D Cylinder line between spheres
        const start = fromNode.pos;
        const end = toNode.pos;
        const distance = start.distanceTo(end);
        const position = start.clone().add(end).multiplyScalar(0.5);

        const cylinderGeom = new THREE.CylinderGeometry(thickness, thickness, distance, 8);
        const cylinderMat = new THREE.MeshBasicMaterial({ color: edgeColor });
        const cylinder = new THREE.Mesh(cylinderGeom, cylinderMat);

        // Rotate cylinder to point from start to end
        cylinder.position.copy(position);
        
        const direction = new THREE.Vector3().subVectors(end, start).normalize();
        const up = new THREE.Vector3(0, 1, 0);
        cylinder.quaternion.setFromUnitVectors(up, direction);

        scene.add(cylinder);
        edgeMeshes.push(cylinder);

        // Draw text sprite for weights (if weighted)
        if (e.weight !== undefined) {
          const weightSprite = createTextSprite(e.weight, isMst ? '#346538' : '#787774');
          weightSprite.scale.set(6.5, 6.5, 1);
          weightSprite.position.copy(position).add(new THREE.Vector3(0, 4, 0));
          scene.add(weightSprite);
        }
      });

    } else {
      // Tree Mode (Parent coordinate system: nodesList)
      nodes.forEach((n, idx) => {
        const pos = mapCoordinates(n.x, n.y, idx);

        const material = new THREE.MeshStandardMaterial({
          color: 0xe1f3fe, // Default clean pale blue for BST/AST nodes
          emissive: 0x1f6c9f,
          emissiveIntensity: 0.15,
          roughness: 0.2,
          metalness: 0.1
        });

        const mesh = new THREE.Mesh(sphereGeometry, material);
        mesh.position.copy(pos);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
        nodeMeshes.push({ name: n.name, pos, mesh });

        // Floating label
        const textSprite = createTextSprite(n.name, '#1F6C9F');
        textSprite.position.set(pos.x, pos.y + 11, pos.z);
        scene.add(textSprite);

        // Draw connection to parent
        if (n.parentX !== null && n.parentY !== null) {
          // Estimate parent index in nodes list
          const parentIdx = nodes.findIndex(pn => pn.x === n.parentX && pn.y === n.parentY);
          const parentPos = mapCoordinates(n.parentX, n.parentY, parentIdx >= 0 ? parentIdx : 0);

          const distance = pos.distanceTo(parentPos);
          const position = pos.clone().add(parentPos).multiplyScalar(0.5);

          const cylinderGeom = new THREE.CylinderGeometry(0.6, 0.6, distance, 8);
          const cylinderMat = new THREE.MeshBasicMaterial({ color: 0x333333 }); // Sharp connections
          const cylinder = new THREE.Mesh(cylinderGeom, cylinderMat);

          cylinder.position.copy(position);
          const direction = new THREE.Vector3().subVectors(parentPos, pos).normalize();
          const up = new THREE.Vector3(0, 1, 0);
          cylinder.quaternion.setFromUnitVectors(up, direction);

          scene.add(cylinder);
          edgeMeshes.push(cylinder);
        }
      });
    }

    // 7. Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update(); // only required if controls.enableDamping = true
      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      sphereGeometry.dispose();
    };
  }, [nodes, edges, activeNode, visitedNodes, highlightNode, mstEdges, activeEdges, mode]);

  return (
    <div 
      ref={containerRef} 
      className="canvas-container-3d" 
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative', 
        minHeight: '280px',
        backgroundColor: '#F7F6F3',
        borderRadius: '8px',
        border: '1px solid #EAEAEA',
        overflow: 'hidden'
      }} 
    />
  );
}
