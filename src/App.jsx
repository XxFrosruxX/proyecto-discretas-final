import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Graph3DCanvas from './Graph3DCanvas';

// ============================================================================
// LOCAL PRECISE LIGHT SVG ICON COMPONENTS (STRICTLY COMPLYING WITH DESIGN SKILL)
// ============================================================================
const Binary = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <path d="M6 6h4v4H6zm8 0h4v4h-4zm-8 8h4v4H6zm8 0h4v4h-4z" />
  </svg>
);

const Video = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const Layers = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const Percent = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);

const Hash = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" />
    <line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);

const TrendingUp = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const Network = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="16" y="16" width="6" height="6" rx="1" />
    <rect x="2" y="16" width="6" height="6" rx="1" />
    <rect x="9" y="2" width="6" height="6" rx="1" />
    <path d="M12 8v8M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
  </svg>
);

const Eye = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const GitBranch = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="6" y1="3" x2="6" y2="15" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </svg>
);

const GitMerge = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="18" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <path d="M6 21V9a9 9 0 0 0 9 9" />
  </svg>
);

const Play = ({ size = 14, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const RotateCcw = ({ size = 14, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M1 4v6h6M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  </svg>
);

const Plus = ({ size = 14, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const Trash2 = ({ size = 14, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
  </svg>
);

const Search = ({ size = 14, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ArrowRight = ({ size = 14, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const Code = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const BookOpen = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const Info = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const Check = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const HelpCircle = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
  </svg>
);

const Activity = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const Award = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

// ============================================================================
// HELPER FUNCTIONS & ALGORITHM IMPLEMENTATIONS IN JAVASCRIPT
// ============================================================================

// 1. BST & AVL Trees
class AVLNode {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

function getHeight(node) {
  return node ? node.height : 0;
}

function getBalance(node) {
  return node ? getHeight(node.left) - getHeight(node.right) : 0;
}

function updateHeight(node) {
  if (node) {
    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
  }
}

function rotateRight(z) {
  let y = z.left;
  let T3 = y.right;
  y.right = z;
  z.left = T3;
  updateHeight(z);
  updateHeight(y);
  return y;
}

function rotateLeft(z) {
  let y = z.right;
  let T2 = y.left;
  y.left = z;
  z.right = T2;
  updateHeight(z);
  updateHeight(y);
  return y;
}

function avlInsert(node, key, log) {
  if (!node) {
    log.push(`Creado nodo hoja con clave ${key}`);
    return new AVLNode(key);
  }
  if (key < node.key) {
    node.left = avlInsert(node.left, key, log);
  } else if (key > node.key) {
    node.right = avlInsert(node.right, key, log);
  } else {
    log.push(`La clave ${key} ya existe. Ignorando.`);
    return node;
  }

  updateHeight(node);
  let balance = getBalance(node);

  if (balance > 1 && key < node.left.key) {
    log.push(`Desbalance LL detectado en nodo ${node.key}. Rotando simple a la derecha.`);
    return rotateRight(node);
  }
  if (balance < -1 && key > node.right.key) {
    log.push(`Desbalance RR detectado en nodo ${node.key}. Rotando simple a la izquierda.`);
    return rotateLeft(node);
  }
  if (balance > 1 && key > node.left.key) {
    log.push(`Desbalance LR detectado en nodo ${node.key}. Rotando doble: izquierda en ${node.left.key} y derecha en ${node.key}.`);
    node.left = rotateLeft(node.left);
    return rotateRight(node);
  }
  if (balance < -1 && key < node.right.key) {
    log.push(`Desbalance RL detectado en nodo ${node.key}. Rotando doble: derecha en ${node.right.key} e izquierda en ${node.key}.`);
    node.right = rotateRight(node.right);
    return rotateLeft(node);
  }

  return node;
}

function bstInsert(node, key, log) {
  if (!node) {
    log.push(`Creado nodo hoja con clave ${key}`);
    return new AVLNode(key);
  }
  if (key < node.key) {
    node.left = bstInsert(node.left, key, log);
  } else if (key > node.key) {
    node.right = bstInsert(node.right, key, log);
  } else {
    log.push(`La clave ${key} ya existe. Ignorando.`);
  }
  updateHeight(node);
  return node;
}

function bstSearch(node, key, path = []) {
  if (!node) {
    return { found: false, path };
  }
  path.push(node.key);
  if (node.key === key) {
    return { found: true, path };
  }
  if (key < node.key) {
    return bstSearch(node.left, key, path);
  } else {
    return bstSearch(node.right, key, path);
  }
}

function findMin(node) {
  let curr = node;
  while (curr.left) {
    curr = curr.left;
  }
  return curr;
}

function bstDelete(node, key, log) {
  if (!node) {
    log.push(`Clave ${key} no encontrada para eliminar.`);
    return null;
  }

  if (key < node.key) {
    node.left = bstDelete(node.left, key, log);
  } else if (key > node.key) {
    node.right = bstDelete(node.right, key, log);
  } else {
    log.push(`Clave ${key} encontrada. Aplicando caso correspondiente.`);
    if (!node.left) {
      log.push(`Nodo ${key} tiene 0 o 1 hijo (derecho). Reemplazando por su hijo.`);
      return node.right;
    }
    if (!node.right) {
      log.push(`Nodo ${key} tiene 1 hijo (izquierdo). Reemplazando por su hijo.`);
      return node.left;
    }
    let temp = findMin(node.right);
    log.push(`Nodo ${key} tiene 2 hijos. Buscando sucesor inorden (mínimo derecho): ${temp.key}. Reemplazando clave.`);
    node.key = temp.key;
    node.right = bstDelete(node.right, temp.key, log);
  }
  updateHeight(node);
  return node;
}

function avlDelete(node, key, log) {
  if (!node) {
    log.push(`Clave ${key} no encontrada para eliminar.`);
    return null;
  }

  if (key < node.key) {
    node.left = avlDelete(node.left, key, log);
  } else if (key > node.key) {
    node.right = avlDelete(node.right, key, log);
  } else {
    log.push(`Clave ${key} encontrada para eliminar.`);
    if (!node.left || !node.right) {
      let temp = node.left ? node.left : node.right;
      if (!temp) {
        log.push(`Nodo ${key} es hoja. Eliminando.`);
        node = null;
      } else {
        log.push(`Nodo ${key} tiene un hijo. Reemplazando.`);
        node = temp;
      }
    } else {
      let temp = findMin(node.right);
      log.push(`Nodo ${key} tiene dos hijos. Sucesor inorden es ${temp.key}. Reemplazando.`);
      node.key = temp.key;
      node.right = avlDelete(node.right, temp.key, log);
    }
  }

  if (!node) return null;

  updateHeight(node);
  let balance = getBalance(node);

  if (balance > 1 && getBalance(node.left) >= 0) {
    log.push(`Desbalance en eliminación (L >= 0). Rotación simple derecha.`);
    return rotateRight(node);
  }
  if (balance > 1 && getBalance(node.left) < 0) {
    log.push(`Desbalance en eliminación (L < 0). Rotación doble izquierda-derecha.`);
    node.left = rotateLeft(node.left);
    return rotateRight(node);
  }
  if (balance < -1 && getBalance(node.right) <= 0) {
    log.push(`Desbalance en eliminación (R <= 0). Rotación simple izquierda.`);
    return rotateLeft(node);
  }
  if (balance < -1 && getBalance(node.right) > 0) {
    log.push(`Desbalance en eliminación (R > 0). Rotación doble derecha-izquierda.`);
    node.right = rotateRight(node.right);
    return rotateLeft(node);
  }

  return node;
}

function cloneTree(node) {
  if (!node) return null;
  let newNode = { key: node.key, height: node.height };
  newNode.left = cloneTree(node.left);
  newNode.right = cloneTree(node.right);
  return newNode;
}

// 2. Combinatorics & Pascal
function getFactorial(n) {
  if (n <= 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

function getPermutations(n, r) {
  if (r > n || r < 0) return 0;
  let result = 1;
  for (let i = n; i >= (n - r + 1); i--) {
    result *= i;
  }
  return result;
}

function getCombinations(n, r) {
  if (r > n || r < 0) return 0;
  if (r > n - r) r = n - r;
  let result = 1;
  for (let i = 0; i < r; i++) {
    result *= (n - i);
    result /= (i + 1);
  }
  return Math.round(result);
}

function generateCombinationsBacktracking(elements, r) {
  let results = [];
  function backtrack(start, current) {
    if (current.length === r) {
      results.push([...current]);
      return;
    }
    for (let i = start; i < elements.length; i++) {
      current.push(elements[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  backtrack(0, []);
  return results;
}

function generatePascalTable(n) {
  let table = [];
  for (let i = 0; i <= n; i++) {
    table[i] = new Array(i + 1).fill(0);
    table[i][0] = 1;
    table[i][i] = 1;
    for (let j = 1; j < i; j++) {
      table[i][j] = table[i - 1][j - 1] + table[i - 1][j];
    }
  }
  return table;
}

// 3. Probability & Bayes
function runMonteCarloSimulation(n, k, iterations, prob = 0.5) {
  let successes = 0;
  for (let i = 0; i < iterations; i++) {
    let activeBits = 0;
    for (let j = 0; j < n; j++) {
      if (Math.random() < prob) activeBits++;
    }
    if (activeBits === k) successes++;
  }
  return successes / iterations;
}

// 4. AST Parser & Evaluator
function parseExpression(str) {
  let tokens = str.replace(/\s+/g, '').match(/(?:\d+(?:\.\d+)?)|[xyzepi]|\+|\-|\*|\/|\^|log|ln|sqrt|sin|cos|tan|\(|\)/g) || [];
  let pos = 0;

  function parsePrimary() {
    if (pos >= tokens.length) return { value: '0', left: null, right: null, isLeaf: true };
    let t = tokens[pos];
    if (t === '(') {
      pos++;
      let node = parseExpressionAdd();
      pos++; // Consume ')'
      return node;
    }
    if (['log','ln','sqrt','sin','cos','tan'].includes(t)) {
      pos++;
      let inner;
      if (tokens[pos] === '(') {
        pos++;
        inner = parseExpressionAdd();
        pos++;
      } else {
        inner = parsePrimary();
      }
      return { value: t, left: inner, right: null, isLeaf: false };
    }
    if (t === '-') { // Unary minus
      pos++;
      let inner = parsePrimary();
      return { value: 'u-', left: inner, right: null, isLeaf: false };
    }
    pos++;
    return { value: t, left: null, right: null, isLeaf: true };
  }

  function parsePower() {
    let node = parsePrimary();
    while (pos < tokens.length && tokens[pos] === '^') {
      let op = tokens[pos];
      pos++;
      let right = parsePrimary();
      node = { value: op, left: node, right: right, isLeaf: false };
    }
    return node;
  }

  function parseMulDiv() {
    let node = parsePower();
    while (pos < tokens.length && (tokens[pos] === '*' || tokens[pos] === '/')) {
      let op = tokens[pos];
      pos++;
      let right = parsePower();
      node = { value: op, left: node, right: right, isLeaf: false };
    }
    return node;
  }

  function parseExpressionAdd() {
    let node = parseMulDiv();
    while (pos < tokens.length && (tokens[pos] === '+' || tokens[pos] === '-')) {
      let op = tokens[pos];
      pos++;
      let right = parseMulDiv();
      node = { value: op, left: node, right: right, isLeaf: false };
    }
    return node;
  }

  return parseExpressionAdd();
}

function evaluateAST(node, log = []) {
  if (!node) return 0;
  if (node.isLeaf) {
    let valStr = node.value;
    let val;
    if (valStr === 'e') val = Math.E;
    else if (valStr === 'pi') val = Math.PI;
    else if (['x','y','z'].includes(valStr)) val = 1;
    else val = parseFloat(valStr);
    log.push(`Hoja detectada: valor = ${valStr}`);
    return val;
  }
  
  let leftVal = evaluateAST(node.left, log);
  let res = 0;
  
  if (['log','ln','sqrt','sin','cos','tan','u-'].includes(node.value)) {
    if (node.value === 'log') res = Math.log10(leftVal);
    else if (node.value === 'ln') res = Math.log(leftVal);
    else if (node.value === 'sqrt') res = Math.sqrt(leftVal);
    else if (node.value === 'sin') res = Math.sin(leftVal);
    else if (node.value === 'cos') res = Math.cos(leftVal);
    else if (node.value === 'tan') res = Math.tan(leftVal);
    else if (node.value === 'u-') res = -leftVal;
    log.push(`Operación Unaria: ${node.value}(${leftVal}) = ${res.toFixed(4)}`);
    return res;
  }
  
  let rightVal = evaluateAST(node.right, log);
  if (node.value === '+') res = leftVal + rightVal;
  else if (node.value === '-') res = leftVal - rightVal;
  else if (node.value === '*') res = leftVal * rightVal;
  else if (node.value === '/') res = leftVal / rightVal;
  else if (node.value === '^') res = Math.pow(leftVal, rightVal);
  
  log.push(`Operación [Postorden]: ${leftVal} ${node.value} ${rightVal} = ${res.toFixed(4)}`);
  return res;
}

function getTraversalOrder(node, type, list = []) {
  if (!node) return list;
  if (type === 'preorder') {
    list.push(node.key !== undefined ? node.key : node.value);
    getTraversalOrder(node.left, type, list);
    getTraversalOrder(node.right, type, list);
  } else if (type === 'inorder') {
    getTraversalOrder(node.left, type, list);
    list.push(node.key !== undefined ? node.key : node.value);
    getTraversalOrder(node.right, type, list);
  } else if (type === 'postorder') {
    getTraversalOrder(node.left, type, list);
    getTraversalOrder(node.right, type, list);
    list.push(node.key !== undefined ? node.key : node.value);
  }
  return list;
}

function getLevelOrder(node) {
  if (!node) return [];
  let result = [];
  let queue = [node];
  while (queue.length > 0) {
    let curr = queue.shift();
    result.push(curr.key !== undefined ? curr.key : curr.value);
    if (curr.left) queue.push(curr.left);
    if (curr.right) queue.push(curr.right);
  }
  return result;
}

function computeNodeCoordinates(node, x, y, dx, list = [], parentX = null, parentY = null) {
  if (!node) return;
  let name = node.key !== undefined ? node.key.toString() : node.value;
  list.push({ name, x, y, parentX, parentY, isLeaf: node.isLeaf });
  computeNodeCoordinates(node.left, x - dx, y + 60, dx * 0.5, list, x, y);
  computeNodeCoordinates(node.right, x + dx, y + 60, dx * 0.5, list, x, y);
}

const GRAPH_PRESETS = {
  microservices: {
    nodes: [
      { id: 'GW', label: 'Gateway (GW)', x: 150, y: 50 },
      { id: 'Auth', label: 'Auth Service', x: 70, y: 130 },
      { id: 'Cart', label: 'Cart API', x: 230, y: 130 },
      { id: 'Pay', label: 'Payment API', x: 100, y: 220 },
      { id: 'Notify', label: 'Notification', x: 200, y: 220 }
    ],
    edges: [
      { from: 'GW', to: 'Auth', weight: 2 },
      { from: 'GW', to: 'Cart', weight: 4 },
      { from: 'GW', to: 'Pay', weight: 5 },
      { from: 'Cart', to: 'Pay', weight: 1 },
      { from: 'Auth', to: 'Notify', weight: 8 },
      { from: 'Pay', to: 'Notify', weight: 3 }
    ]
  },
  datacenters: {
    nodes: [
      { id: 'HQ', label: 'HQ Center', x: 50, y: 150 },
      { id: 'S1', label: 'Subnet 1', x: 130, y: 70 },
      { id: 'S2', label: 'Subnet 2', x: 130, y: 230 },
      { id: 'S3', label: 'Subnet 3', x: 220, y: 70 },
      { id: 'S4', label: 'Subnet 4', x: 220, y: 230 },
      { id: 'S5', label: 'Subnet 5', x: 300, y: 150 },
      { id: 'S6', label: 'Subnet 6', x: 380, y: 70 },
      { id: 'S7', label: 'Subnet 7', x: 380, y: 230 }
    ],
    edges: [
      { from: 'HQ', to: 'S1', weight: 4 },
      { from: 'HQ', to: 'S2', weight: 7 },
      { from: 'S1', to: 'S2', weight: 3 },
      { from: 'S1', to: 'S3', weight: 6 },
      { from: 'S2', to: 'S3', weight: 4 },
      { from: 'S2', to: 'S4', weight: 8 },
      { from: 'S3', to: 'S5', weight: 4 },
      { from: 'S4', to: 'S5', weight: 3 },
      { from: 'S5', to: 'S6', weight: 1 },
      { from: 'S5', to: 'S7', weight: 6 },
      { from: 'S6', to: 'S7', weight: 5 }
    ]
  }
};

// ============================================================================
// APP COMPONENT
// ============================================================================

// Dynamically add usage instructions for all 9 sections
  const PSEUDOCODES = {
    'bst-avl': {
      title: 'Árboles BST y AVL',
      description: 'Los árboles binarios de búsqueda (BST) organizan las claves de tal forma que para cada nodo, los valores a su izquierda son menores y a su derecha son mayores. Los árboles AVL añaden auto-balanceo garantizando una altura logarítmica O(log n) mediante rotaciones simples y dobles.',
      instructions: 'Inserta números para ver cómo se añaden como hojas. Busca claves para trazar el camino de búsqueda. Elimina claves para ver cómo se reorganizan los nodos. Activa el modo AVL para visualizar cómo las rotaciones LL, RR, LR o RL equilibran el árbol de forma dinámica.',
      algorithms: [
        {
          name: 'Búsqueda en BST (Recursiva e Iterativa)',
          pseudo: `// Búsqueda recursiva en BST  O(h)
func buscar(nodo, clave): Nodo | nulo
    si nodo == nulo: retornar nulo
    si clave == nodo.clave: retornar nodo
    si clave < nodo.clave: retornar buscar(nodo.izq, clave)
    sino: retornar buscar(nodo.der, clave)
fin func

// Búsqueda iterativa  O(h)
func buscar_iter(raiz, clave): Nodo | nulo
    nodo = raiz
    mientras nodo != nulo:
        si clave == nodo.clave: retornar nodo
        si clave < nodo.clave: nodo = nodo.izq
        sino: nodo = nodo.der
    retornar nulo
fin func`,
          js: `function buscar(nodo, clave) {
  if (!nodo) return null;
  if (clave === nodo.key) return nodo;
  if (clave < node.key) return buscar(nodo.left, clave);
  return buscar(nodo.right, clave);
}

function buscarIter(raiz, clave) {
  let nodo = raiz;
  while (nodo !== null) {
    if (clave === nodo.key) return nodo;
    if (clave < nodo.key) nodo = nodo.left;
    else nodo = nodo.right;
  }
  return null;
}`
        },
        {
          name: 'Inserción en BST (Recursiva e Iterativa)',
          pseudo: `// Inserción en BST  O(h)
func insertar(raiz, clave): Nodo
    si raiz == nulo: retornar Nodo(clave)
    si clave < raiz.clave: raiz.izq = insertar(raiz.izq, clave)
    sino si clave > raiz.clave: raiz.der = insertar(raiz.der, clave)
    retornar raiz
fin func`,
          js: `function insertar(raiz, clave) {
  if (!raiz) return new AVLNode(clave);
  if (clave < raiz.key) raiz.left = insertar(raiz.left, clave);
  else if (key > raiz.key) raiz.right = insertar(raiz.right, clave);
  return raiz;
}`
        },
        {
          name: 'Eliminación en BST (3 Casos)',
          js: `function eliminar(nodo, clave) {
  if (!nodo) return null;
  if (clave < nodo.key) nodo.left = eliminar(nodo.left, clave);
  else if (clave > nodo.key) nodo.right = eliminar(nodo.right, clave);
  else {
    if (!nodo.left && !nodo.right) return null;
    if (!nodo.left) return nodo.right;
    if (!nodo.right) return nodo.left;
    let sucesor = minimo(nodo.right);
    nodo.key = sucesor.key;
    nodo.right = eliminar(nodo.right, sucesor.key);
  }
  return nodo;
}`,

          pseudo: `// Eliminar clave de BST  O(h)
func eliminar(nodo, clave): Nodo
    si nodo == nulo: retornar nulo
    si clave < nodo.clave: nodo.izq = eliminar(nodo.izq, clave)
    sino si clave > nodo.clave: nodo.der = eliminar(nodo.der, clave)
    sino:  // nodo.clave == clave -> ELIMINAR
        si nodo.izq == nulo y nodo.der == nulo: retornar nulo
        si nodo.izq == nulo: retornar nodo.der
        si nodo.der == nulo: retornar nodo.izq
        sucesor = minimo(nodo.der)
        nodo.clave = sucesor.clave
        nodo.der = eliminar(nodo.der, sucesor.clave)
    retornar nodo
fin func`
        },
        {
          name: 'Rotaciones en Árboles AVL',
          js: `function rotarDerecha(z) {
  let y = z.left;
  let T3 = y.right;
  y.right = z;
  z.left = T3;
  actualizarAltura(z);
  actualizarAltura(y);
  return y;
}`,

          pseudo: `// Rotación Simple DERECHA (Caso LL)  O(1)
func rotar_derecha(z):
    y = z.izq; T3 = y.der
    y.der = z; z.izq = T3
    actualizar_altura(z); actualizar_altura(y)
    retornar y
fin func`
        }
      ]
    },
    'combinatoria': {
      title: 'Combinatoria y Pascal',
      description: 'La combinatoria estudia el conteo, organización y selección de elementos. Las permutaciones consideran el orden de selección, mientras que las combinaciones descartan el orden. El Teorema Binomial y el Triángulo de Pascal proporcionan coeficientes combinatorios calculados eficientemente usando programación dinámica.',
      instructions: 'Introduce valores de n y r para calcular factoriales, permutaciones y combinaciones exactas. Puedes generar la lista completa de combinaciones de elementos ingresados (separados por coma) o generar la matriz dinámica del Triángulo de Pascal.',
      algorithms: [
        {
          name: 'Cálculo de Permutaciones Optimizado P(n,r)',
          pseudo: `// Calcula P(n,r) = n! / (n-r)!
func permutacion(n, r: int): long
    resultado = 1
    para i desde n hasta (n-r+1) paso -1 hacer
        resultado = resultado * i
    fin para
    retornar resultado
fin func`,
          js: `function permutacion(n, r) {
  if (r > n || r < 0) return 0;
  let resultado = 1;
  for (let i = n; i >= (n - r + 1); i--) {
    resultado *= i;
  }
  return resultado;
}`
        },
        {
          name: 'Combinaciones por Backtracking',
          pseudo: `// Genera todos los subconjuntos de tamaño r por backtracking
func generar_clusters(nodos[], inicio, r, actual[]):
    si r == 0 entonces
        imprimir(actual)
        retornar
    fin si
    para i desde inicio hasta len(nodos)-1 hacer
        actual.agregar(nodos[i])
        generar_clusters(nodos, i+1, r-1, actual)
        actual.quitar_ultimo()
    fin para
fin func`,
          js: `function generarClusters(nodos, inicio, r, actual, res = []) {
  if (r === 0) {
    res.push([...actual]);
    return res;
  }
  for (let i = inicio; i < nodos.length; i++) {
    actual.push(nodos[i]);
    generarClusters(nodos, i + 1, r - 1, actual, res);
    actual.pop();
  }
  return res;
}`
        },

        {
          name: 'Coeficientes Binomiales (Programación Dinámica)',
          js: `function coefBinomialDP(n, k) {
  let C = Array(k + 1).fill(0);
  C[0] = 1;
  for (let i = 1; i <= n; i++) {
    for (let j = Math.min(i, k); j > 0; j--) {
      C[j] = C[j] + C[j - 1];
    }
  }
  return C[k];
}`,
          pseudo: `// Triángulo de Pascal DP  O(n*k)
func coef_binomial(n, k):
    C = arreglo de ceros[k+1]
    C[0] = 1
    para i desde 1 hasta n hacer
        para j desde min(i, k) hasta 1 paso -1 hacer
            C[j] = C[j] + C[j-1]
    retornar C[k]
fin func`
        },
        {
          name: 'Combinaciones con Repetición O(k)',
          js: `function combinacionRepeticion(n, k) {
  // C(n+k-1, k)
  return coefBinomialDP(n + k - 1, k);
}`,
          pseudo: `// Número de soluciones a x1 + x2 + ... + xn = k
func combinacion_repeticion(n, k):
    retornar coef_binomial(n + k - 1, k)
fin func`
        }
]
    },
    'probabilidad': {
      title: 'Probabilidad y Bayes',
      description: 'La probabilidad clásica mide la frecuencia teórica de eventos. En informática, se aplica para analizar fallos de hardware, confiabilidad de microservicios y clasificar alertas de seguridad. La ley de probabilidad total y el Teorema de Bayes permiten actualizar la probabilidad de una causa (diagnóstico de fallos) a partir de evidencias observadas.',
      instructions: 'Realiza simulaciones estadísticas de Monte Carlo y contrástalas con la probabilidad exacta analítica. Calcula la disponibilidad total de microservicios independientes o diagnostica la causa de fallo de un servidor ingresando probabilidades de Red, CPU y Disco con el clasificador Bayesiano.',
      algorithms: [
        {
          name: 'Simulación de Monte Carlo',
          js: `function monteCarlo(n, k, iter) {
  let exitos = 0;
  for (let i = 0; i < iter; i++) {
    let llegaron = contarBits1(lanzarN(n));
    if (llegaron === k) exitos++;
  }
  return exitos / iter;
}`,

          pseudo: `// Estimación de probabilidad O(n * iter)
func monte_carlo(n, k, iter: int): float
    exitos = 0
    para i desde 1 hasta iter hacer
        llegaron = contar bits 1 en lanzar_n(n)
        si llegaron == k: exitos++
    fin para
    retornar exitos / iter
fin func`
        },
        {
          name: 'Teorema de Bayes y Naive Bayes Diagnóstico',
          js: `function diagnostico(prior, p_ev_dado) {
  let p_ev = 0.0;
  for (let i = 0; i < prior.length; i++) {
    p_ev += prior[i] * p_ev_dado[i];
  }
  let max_post = -1.0; let causa_max = -1;
  for (let i = 0; i < prior.length; i++) {
    let post = (prior[i] * p_ev_dado[i]) / p_ev;
    if (post > max_post) {
      max_post = post; causa_max = i;
    }
  }
  return causa_max;
}`,

          pseudo: `// Naive Bayes: n causas, 1 evidencia  O(n)
func diagnostico(prior[], p_ev_dado[]): int
    p_ev = 0.0
    para i desde 0 hasta len(prior)-1 hacer
        p_ev += prior[i] * p_ev_dado[i]
    fin para
    max_post = -1.0; causa_max = -1
    para i desde 0 hasta len(prior)-1 hacer
        post = prior[i]*p_ev_dado[i] / p_ev
        si post > max_post:
            max_post = post; causa_max = i
    fin para
    retornar causa_max
fin func`
        },

        {
          name: 'Paquetes de red: P(A) Analíticamente',
          js: `function probabilidadAnalitica(n, p_exito, k) {
  // Probabilidad de exactamente k éxitos (Binomial)
  let coef = coefBinomialDP(n, k);
  return coef * Math.pow(p_exito, k) * Math.pow(1 - p_exito, n - k);
}`,
          pseudo: `// Distribución Binomial exacta
func prob_binomial(n, k, p):
    C_nk = coef_binomial(n, k)
    retornar C_nk * (p^k) * ((1-p)^(n-k))
fin func`
        },
        {
          name: 'Redundancia Paralela',
          js: `function dispParalela(p_fallo_componente, num_componentes) {
  // P(al menos uno funcione) = 1 - P(todos fallen)
  return 1 - Math.pow(p_fallo_componente, num_componentes);
}`,
          pseudo: `// Calcula disponibilidad en configuración paralelo
func prob_paralelo(p_fallo, n):
    // Asume fallos estadísticamente independientes
    p_todos_fallan = p_fallo ^ n
    retornar 1 - p_todos_fallan
fin func`
        },
        {
          name: 'Ley Total + Bayes Básico',
          js: `function teoremaBayes(p_A, p_B_dado_A, p_B_dado_noA) {
  // Ley de probabilidad total para P(B)
  let p_B = (p_A * p_B_dado_A) + ((1 - p_A) * p_B_dado_noA);
  // Bayes para P(A|B)
  return (p_B_dado_A * p_A) / p_B;
}`,
          pseudo: `// Retorna P(A|B)
func bayes(P_A, P_B_A, P_B_noA):
    P_total_B = (P_A * P_B_A) + ((1 - P_A) * P_B_noA)
    retornar (P_B_A * P_A) / P_total_B
fin func`
        }
]
    },
    'palomar': {
      title: 'Principio de Palomar y Hash',
      description: 'El Principio del Palomar establece que si n objetos se colocan en m cajones y n > m, al menos un cajón tendrá más de un objeto. Esto fundamenta el análisis de colisiones en tablas hash e inspira algoritmos balanceados de asignación de recursos (como Round-Robin para servidores).',
      instructions: 'Ingresa el número de claves (n) y el número de buckets (m) en la tabla hash. Comprueba cómo se distribuyen las claves de manera aleatoria u ordenada. Al menos un bucket tendrá un número de claves de acuerdo con la fórmula del Palomar: ⌈n/m⌉. Los buckets con colisiones críticas se resaltarán en rojo.',
      algorithms: [
        {
          name: 'Detección de Colisiones Críticas',
          js: `function maxBucket(tabla, umbral, m) {
  let conteo = new Array(m).fill(0);
  for (let c of tabla) {
    let b = hash(c) % m;
    conteo[b]++;
  }
  for (let b = 0; b < m; b++) {
    if (conteo[b] >= umbral) return true;
  }
  return false;
}`,

          pseudo: `// Verifica si algún bucket supera un umbral dado
func max_bucket(tabla[], umbral): bool
    conteo = arreglo de ceros [0..m-1]
    para cada clave c en tabla hacer
        b = hash(c) mod m
        conteo[b]++
    fin para
    para b desde 0 hasta m-1 hacer
        si conteo[b] >= umbral entonces retornar verdadero
    fin para
    retornar falso
fin func`
        }
      ]
    },
    'recurrencias': {
      title: 'Recurrencias y Trabajo',
      description: 'El análisis de algoritmos recursivos divide-y-vencerás (como MergeSort) se plantea en términos de ecuaciones de recurrencia T(n). El Teorema Maestro nos permite resolver de forma directa estas recurrencias y verificar la complejidad asintótica comparando el trabajo local de división contra el número de llamadas recursivas.',
      instructions: 'Introduce una potencia de 2 en el tamaño del problema (n). El simulador expandirá la recurrencia T(n) = 4T(n/2) + n² paso a paso, mostrando el árbol de llamadas, el costo computacional local en cada nivel y sumando el trabajo total para verificar la complejidad teórica Θ(n² log n).',
      algorithms: [
        {
          name: 'Medición de Trabajo de Recurrencias T(n)=4T(n/2)+n^2',
          js: `let contador = 0;
function T_medido(n) {
  if (n <= 1) return 1;
  contador += n * n;
  T_medido(n / 2); T_medido(n / 2);
  T_medido(n / 2); T_medido(n / 2);
  return contador;
}`,

          pseudo: `// Medidor de operaciones de recurrencia en O(n^2 log n)
var contador = 0
func T_medido(n): int
    si n <= 1: retornar 1
    contador += n * n
    T_medido(n/2)
    T_medido(n/2)
    T_medido(n/2)
    T_medido(n/2)
    retornar contador
fin func`
        },

        {
          name: 'MergeSort y Complejidad',
          js: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let izq = mergeSort(arr.slice(0, mid));
  let der = mergeSort(arr.slice(mid));
  return merge(izq, der);
}
// T(n) = 2T(n/2) + O(n) -> O(n log n) por Teorema Maestro`,
          pseudo: `// MergeSort divide y vencerás  O(n log n)
func merge_sort(A[]):
    si longitud(A) <= 1: retornar A
    mitad = longitud(A) / 2
    izq = merge_sort(A[0..mitad])
    der = merge_sort(A[mitad..fin])
    retornar mezclar(izq, der)
fin func`
        }
]
    },
    'grafos': {
      title: 'Grafos y Representación',
      description: 'Un grafo no dirigido o dirigido modela relaciones estructuradas entre servicios o computadores. Se representa en memoria mediante matrices de adyacencia u ordenadas listas de adyacencia. El teorema del Apretón de Manos y el análisis de caminos de Euler auditan la topología de forma dinámica.',
      instructions: 'Elige un tipo de red preestablecida y cambia entre la vista de Lista de Adyacencia y la vista de Matriz de Adyacencia. El grafo se renderizará automáticamente en 2D en base a su topología. El sistema calculará el grado de cada vértice para comprobar de forma interactiva el Teorema del Apretón de Manos.',
      algorithms: [
        {
          name: 'Operaciones sobre Grafos en Lista de Adyacencia',
          js: `function crearGrafoLA(n) {
  let G = { vertices: [], adj: [] };
  for (let i = 1; i <= n; i++) {
    G.vertices.push(i);
    G.adj[i] = [];
  }
  return G;
}`,
          pseudo: `// Creación y consultas sobre listas de adyacencia (LA)
func crear_grafo_LA(n):
    G.vertices = [1..n]
    G.adj = arreglo de listas vacias [1..n]
    retornar G
fin func`
        },
        {
          name: 'Calcular Grados (Lista de Adyacencia)',
          js: `function calcularGradosLA(G) {
  let grados = {};
  for (let u of G.vertices) {
    grados[u] = G.adj[u].length;
  }
  return grados;
}`,
          pseudo: `// Calcula el grado de cada vértice desde LA  O(V)
func calcular_grados(G):
    grados = Mapa()
    para cada u en G.vertices hacer
        grados[u] = longitud(G.adj[u])
    retornar grados
fin func`
        },
        {
          name: 'Isomorfismo por Invariantes',
          js: `function checkIsomorfismo(G1, G2) {
  if (G1.vertices.length !== G2.vertices.length) return false;
  
  let deg1 = Object.values(calcularGradosLA(G1)).sort((a,b)=>a-b);
  let deg2 = Object.values(calcularGradosLA(G2)).sort((a,b)=>a-b);
  
  for (let i = 0; i < deg1.length; i++) {
    if (deg1[i] !== deg2[i]) return false;
  }
  return true; // (Heurística de invariantes)
}`,
          pseudo: `// Comprueba invariantes (necesario pero no suficiente)
func es_isomorfo_invariantes(G1, G2):
    si |G1.V| != |G2.V|: retornar falso
    si |G1.E| != |G2.E|: retornar falso
    seq1 = ordenar_grados(G1)
    seq2 = ordenar_grados(G2)
    si seq1 != seq2: retornar falso
    retornar verdadero
fin func`
        },
        {
          name: 'Conectividad y Circuito de Euler',
          js: `function existeCircuitoEuler(G) {
  let grados = calcularGradosLA(G);
  // Todos los grados deben ser pares
  for (let u in grados) {
    if (grados[u] % 2 !== 0) return false;
  }
  return true; // Asumiendo grafo conexo
}`,
          pseudo: `// Grafo no dirigido conexo -> Circuito Euler
func tiene_circuito_euler(G):
    grados = calcular_grados(G)
    para cada g en grados hacer
        si g es impar: retornar falso
    retornar verdadero
fin func`
        }
      ]
    },
    'bfs-dfs': {
      title: 'Búsquedas BFS y DFS',
      description: 'BFS (Búsqueda en Anchura) recorre nivel a nivel usando una cola FIFO, resultando en caminos mínimos sin pesos. DFS (Búsqueda en Profundidad) recorre por profundidad con una pila (o recursión) y es excelente para la detección de ciclos o deadlocks.',
      instructions: 'Carga una red y presiona "Ejecutar BFS" o "Ejecutar DFS". El visualizador animará paso a paso la exploración de los nodos en tiempo real, coloreando los nodos en proceso y mostrando los punteros de los caminos descubiertos en el árbol de recorrido resultante.',
      algorithms: [
        {
          name: 'Búsqueda en Anchura (BFS)',
          js: `function BFS(G, s) {
  let color = {}, dist = {}, padre = {};
  for (let v of G.V) {
    color[v] = 'BLANCO'; dist[v] = Infinity; padre[v] = null;
  }
  color[s] = 'GRIS'; dist[s] = 0;
  let cola = [s];
  while (cola.length > 0) {
    let u = cola.shift();
    for (let v of vecinos(G, u)) {
      if (color[v] === 'BLANCO') {
        color[v] = 'GRIS'; dist[v] = dist[u] + 1; padre[v] = u;
        cola.push(v);
      }
    }
    color[u] = 'NEGRO';
  }
}`,

          pseudo: `// BFS desde un nodo s. Complejidad: O(V + E)
func BFS(G, s):
    para v en G.V hacer
        color[v] = BLANCO; dist[v] = infinito; padre[v] = nulo
    color[s] = GRIS; dist[s] = 0
    cola = Cola_vacia()
    encolar(cola, s)
    mientras cola no este vacia hacer
        u = desencolar(cola)
        para v en vecinos(G, u) hacer
            si color[v] == BLANCO:
                color[v] = GRIS; dist[v] = dist[u] + 1; padre[v] = u
                encolar(cola, v)
        color[u] = NEGRO
fin func`
        },

        {
          name: 'Búsqueda en Profundidad (DFS)',
          js: `function DFS(G, s) {
  let visitado = new Set();
  let pila = [s];
  
  while (pila.length > 0) {
    let u = pila.pop();
    if (!visitado.has(u)) {
      visitado.add(u);
      // Agregar vecinos en orden inverso para priorizar correctitud LIFO
      for (let v of vecinos(G, u).reverse()) {
        if (!visitado.has(v)) pila.push(v);
      }
    }
  }
  return visitado;
}`,
          pseudo: `// Búsqueda Depth-First (Iterativa con Pila)
func DFS(G, s):
    visitado = Set()
    pila = Pila()
    pila.push(s)
    mientras pila no vacia hacer
        u = pila.pop()
        si u no esta en visitado:
            visitado.add(u)
            para cada v en vecinos(G, u) hacer
                si v no en visitado:
                    pila.push(v)
    retornar visitado
fin func`
        }
]
    },
    'mst': {
      title: 'Árbol Expansión Mínima (MST)',
      description: 'El Árbol de Expansión Mínima (MST) es un subgrafo conexo y acíclico que interconecta todos los data centers con el mínimo peso total de aristas. El algoritmo de Prim crece radialmente desde una raíz, mientras que Kruskal selecciona aristas mínimas usando la estructura Union-Find.',
      instructions: 'Selecciona la topología de "Data Centers". Presiona "Ejecutar Prim" o "Ejecutar Kruskal". El simulador mostrará de forma gráfica cómo se construye el MST, iluminando en verde brillante las conexiones finales y calculando la suma total de las aristas del árbol mínimo.',
      algorithms: [
        {
          name: 'Algoritmo de Prim',
          js: `function Prim(G, r) {
  let key = {}, padre = {}, en_MST = {};
  for (let v of G.V) {
    key[v] = Infinity; padre[v] = null; en_MST[v] = false;
  }
  key[r] = 0;
  let pq = new PriorityQueue();
  pq.insert(0, r);
  while (!pq.isEmpty()) {
    let { k, u } = pq.extractMin();
    if (en_MST[u]) continue;
    en_MST[u] = true;
    for (let { v, w_uv } of vecinos(G, u)) {
      if (!en_MST[v] && w_uv < key[v]) {
        key[v] = w_uv; padre[v] = u;
        pq.insert(w_uv, v);
      }
    }
  }
  return padre;
}`,

          pseudo: `// Prim con cola de prioridad  O((V+E) log V)
func Prim(G, r, w): padre[]
    para v en G.V hacer
        key[v] = infinito; padre[v] = nulo; en_MST[v] = falso
    key[r] = 0
    pq = ColaPrioridad()
    pq.insertar((0, r))
    mientras pq no este vacia hacer
        (k, u) = pq.extraer_min()
        si en_MST[u]: continuar
        en_MST[u] = verdadero
        para (v, w_uv) en vecinos(G, u) hacer
            si no en_MST[v] y w_uv < key[v]:
                key[v] = w_uv; padre[v] = u
                pq.insertar((w_uv, v))
    retornar padre
fin func`
        },

        {
          name: 'Algoritmo de Kruskal (Union-Find)',
          js: `function Kruskal(G) {
  let MST = [];
  let aristas = G.aristas.sort((a,b) => a.peso - b.peso);
  let parent = {};
  
  G.vertices.forEach(v => parent[v] = v);
  
  function find(i) {
    if (parent[i] === i) return i;
    return parent[i] = find(parent[i]);
  }
  
  for (let edge of aristas) {
    let rootU = find(edge.u);
    let rootV = find(edge.v);
    if (rootU !== rootV) {
      MST.push(edge);
      parent[rootU] = rootV; // Union
    }
  }
  return MST;
}`,
          pseudo: `// Kruskal para MST O(E log V)
func Kruskal(G):
    MST = []
    aristas = ordenar(G.E por peso ascendente)
    UF = inicializar_union_find(G.V)
    
    para cada (u, v, peso) en aristas hacer
        si UF.find(u) != UF.find(v):
            MST.agregar(u, v, peso)
            UF.union(u, v)
    retornar MST
fin func`
        }
]
    },
    'arboles-recorridos': {
      title: 'Árboles y AST',
      description: 'Los árboles libres y enraizados organizan la información jerárquica de forma acíclica. Los recorridos en profundidad y BFS leen linealmente su información. Los árboles de sintaxis abstracta (AST) representan expresiones aritméticas evaluadas bottom-up en recorrido Postorden.',
      instructions: 'Visualiza la traza de los cuatro recorridos sobre un árbol binario. Escribe tu propia expresión aritmética (ej: (3+4)*(5-2)) para generar su AST correspondiente de forma gráfica. Al hacer clic en "Evaluar", el simulador calculará la expresión paso a paso aplicando un recorrido Postorden.',
      algorithms: [
        {
          name: 'Recorridos Recursivos',
          js: `function preorden(nodo) {
  if (nodo === null) return;
  console.log(nodo.valor);
  preorden(nodo.izq);
  preorden(nodo.der);
}`,

          pseudo: `// Recorrido en profundidad recursivo
func preorden(nodo):
    si nodo == nulo: retornar
    imprimir(nodo.valor); preorden(nodo.izq); preorden(nodo.der)
fin func`
        },

        {
          name: 'Verificar Árbol, Altura y Hojas',
          js: `function altura(nodo) {
  if (!nodo) return 0;
  return 1 + Math.max(altura(nodo.izq), altura(nodo.der));
}

function contarHojas(nodo) {
  if (!nodo) return 0;
  if (!nodo.izq && !nodo.der) return 1;
  return contarHojas(nodo.izq) + contarHojas(nodo.der);
}`,
          pseudo: `// Altura de árbol binario O(N)
func altura(nodo):
    si nodo == nulo: retornar 0
    retornar 1 + max(altura(nodo.izq), altura(nodo.der))
    
// Conteo de Hojas O(N)
func contar_hojas(nodo):
    si nodo == nulo: retornar 0
    si nodo.izq == nulo y nodo.der == nulo: retornar 1
    retornar contar_hojas(nodo.izq) + contar_hojas(nodo.der)`
        },
        {
          name: 'Recorridos Preorden e Inorden',
          js: `function inorden(nodo, res=[]) {
  if (nodo) {
    inorden(nodo.izq, res);
    res.push(nodo.valor);
    inorden(nodo.der, res);
  }
  return res;
}`,
          pseudo: `// Inorden (I-N-D) útil para ordenar BST
func inorden(nodo):
    si nodo == nulo: retornar
    inorden(nodo.izq)
    imprimir(nodo.valor)
    inorden(nodo.der)
fin func`
        },
        {
          name: 'Postorden y Evaluación de AST',
          js: `function evaluarAST(nodo) {
  if (typeof nodo.valor === 'number' || ['x','e','pi'].includes(nodo.valor)) 
    return obtenerValor(nodo.valor);
  
  let valIzq = evaluarAST(nodo.izq);
  
  // Operadores Unarios
  if (['log','ln','sqrt','sin','cos'].includes(nodo.valor)) {
    if (nodo.valor === 'log') return Math.log10(valIzq);
    if (nodo.valor === 'ln') return Math.log(valIzq);
    if (nodo.valor === 'sqrt') return Math.sqrt(valIzq);
  }

  let valDer = evaluarAST(nodo.der);
  
  // Operadores Binarios
  switch(nodo.valor) {
    case '+': return valIzq + valDer;
    case '-': return valIzq - valDer;
    case '*': return valIzq * valDer;
    case '/': return valIzq / valDer;
    case '^': return Math.pow(valIzq, valDer);
  }
}`,
          pseudo: `// Recorrido Bottom-Up (Postorden I-D-N)
func evaluar_AST(nodo):
    si nodo es hoja (numero, variable, constante): 
        retornar su valor numérico
    
    val_izq = evaluar_AST(nodo.izq)
    
    si nodo.valor es funcion_unaria (log, ln, sqrt...):
        retornar aplicar_funcion(nodo.valor, val_izq)

    val_der = evaluar_AST(nodo.der)
    
    retornar operar_binario(nodo.valor, val_izq, val_der)
fin func`
        },
        {
          name: 'Recorrido por Niveles (BFS en Árbol)',
          js: `function recorridoNiveles(raiz) {
  if (!raiz) return [];
  let cola = [raiz];
  let niveles = [];
  
  while(cola.length > 0) {
    let nodo = cola.shift();
    niveles.push(nodo.valor);
    if (nodo.izq) cola.push(nodo.izq);
    if (nodo.der) cola.push(nodo.der);
  }
  return niveles;
}`,
          pseudo: `// Breadth-First en Árbol O(N)
func recorrido_niveles(raiz):
    cola = Cola_vacia()  // FIFO
    encolar(cola, raiz)
    
    mientras cola no vacia:
        nodo = desencolar(cola)
        imprimir(nodo.valor)
        si nodo.izq != nulo: encolar(cola, nodo.izq)
        si nodo.der != nulo: encolar(cola, nodo.der)
fin func`
        }
]
    }
  };

PSEUDOCODES['bst-avl'].usageSteps = [
  "Escribe un valor numérico en el campo de entrada.",
  "Presiona 'Insertar' para ver cómo se añade al árbol. Puedes activar el balanceo automático marcando 'Modo AVL'.",
  "Escribe un número y presiona 'Buscar' o 'Eliminar' para rastrear operaciones paso a paso.",
  "Revisa la consola derecha ('Historial de Operaciones') para ver el reporte paso a paso.",
  "Usa los botones [ 2D | 3D ] para cambiar de perspectiva. En 3D, arrastra con el cursor para rotar el espacio."
];
PSEUDOCODES['combinatoria'].usageSteps = [
  "Cálculos Rápidos: Introduce los valores de n y r para calcular factoriales, permutaciones y combinaciones exactas al instante.",
  "Agrupaciones (Backtracking): Escribe los elementos separados por comas (ej. A,B,C) e introduce el tamaño r de grupo. Presiona 'Generar Subconjuntos' para ver el backtracking en vivo.",
  "Triángulo de Pascal: Presiona 'Calcular Pascal' para llenar y visualizar la matriz de programación dinámica con las combinaciones resaltadas."
];
PSEUDOCODES['probabilidad'].usageSteps = [
  "Simulación de Monte Carlo: Introduce los parámetros del sistema (usuarios, probabilidad de fallo, iteraciones) y haz clic en 'Simular Monte Carlo' para comparar la frecuencia empírica con la probabilidad teórica.",
  "Disponibilidad del Sistema: Revisa la disponibilidad combinada de componentes independientes en paralelo.",
  "Diagnóstico Bayesian (Naive Bayes): Configura las probabilidades prior de fallo por Red, CPU o Disco, e ingresa las latencias condicionales. Pulsa 'Diagnosticar con Bayes' para calcular la causa raíz más probable."
];
PSEUDOCODES['palomar'].usageSteps = [
  "Establece el número de Claves (palomas) y Buckets (nidos) en los campos de entrada.",
  "Presiona 'Simular Hasheo' para repartir las claves aleatoriamente en los nidos.",
  "Los buckets con colisiones (más de un elemento) se resaltarán en rojo. Abajo se desplegará el análisis de la cota superior matemática ceil(n/m) comprobando el principio del palomar."
];
PSEUDOCODES['recurrencias'].usageSteps = [
  "Escribe el tamaño inicial del problema n en el simulador (debe ser potencia de 2, ej. 64).",
  "Presiona 'Simular Recurrencia' para desglosar el coste recursivo del problema T(n) = 4T(n/2) + n^2.",
  "La consola desglosará el coste local por nivel y el coste total acumulativo, facilitando la comprensión matemática del Teorema Maestro."
];
PSEUDOCODES['grafos'].usageSteps = [
  "Escribe los nombres de los nodos (ej. origen 'A', destino 'B') y el peso numérico de la arista.",
  "Haz clic en 'Agregar Arista' para ir conectando y dibujando el grafo interactivo.",
  "Usa el botón de reset para limpiar el lienzo. Alterna entre 'Matriz Adj.' y 'Lista Adj.' para ver cómo se estructuran las adyacencias en memoria.",
  "Usa los botones [ 2D | 3D ] para visualizar la red en un espacio tridimensional interactivo."
];
PSEUDOCODES['bfs-dfs'].usageSteps = [
  "Selecciona el nodo inicial de la búsqueda (ej. 'A') en el control desplegable.",
  "Haz clic en 'Ejecutar BFS' para búsqueda en anchura o en 'Ejecutar DFS' para búsqueda en profundidad.",
  "El simulador animará paso a paso la visita de nodos. Revisa la consola inferior para observar en tiempo real la cola FIFO (para BFS) o la pila LIFO (para DFS) utilizada por el algoritmo.",
  "Usa los botones [ 2D | 3D ] para interactuar con la animación del grafo en 3D."
];
PSEUDOCODES['mst'].usageSteps = [
  "El panel muestra un grafo precargado de centros de datos intercomunicados.",
  "Haz clic en 'Ejecutar Prim' para expandir el árbol partiendo de un nodo, o en 'Ejecutar Kruskal' para ordenar las aristas y fusionar componentes en un bosque.",
  "El Árbol de Expansión Mínima se pintará en color verde bosque y se desplegará el peso acumulado óptimo en la parte inferior."
];
PSEUDOCODES['arboles-recorridos'].usageSteps = [
  "Expresión AST: Escribe una expresión matemática válida (ej. (3+5)*2-8) y presiona 'Generar AST' para construir y visualizar su árbol de sintaxis abstracta.",
  "Evaluación: Presiona 'Evaluar' para computar el resultado en recorrido Postorden.",
  "Recorridos del Árbol: Observa las cadenas resultantes en Preorden, Inorden, Postorden y BFS (por niveles).",
  "Usa los botones [ 2D | 3D ] para explorar el árbol sintáctico en un espacio interactivo de 3 dimensiones."
];

function App() {
  const [activeTab, setActiveTab] = useState('bst-avl');
  const [showHelp, setShowHelp] = useState(false);


  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <Binary className="sidebar-logo" size={26} />
          <div>
            <h1 className="sidebar-title">DISCRETAS</h1>
            <div className="sidebar-subtitle">Simulador Algorítmico</div>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'bst-avl' ? 'active' : ''}`} onClick={() => setActiveTab('bst-avl')}>
            <GitBranch className="nav-item-icon" size={16} />
            <span>BST y Árboles AVL</span>
          </button>
          <button className={`nav-item ${activeTab === 'combinatoria' ? 'active' : ''}`} onClick={() => setActiveTab('combinatoria')}>
            <Layers className="nav-item-icon" size={16} />
            <span>Combinatoria y Pascal</span>
          </button>
          <button className={`nav-item ${activeTab === 'probabilidad' ? 'active' : ''}`} onClick={() => setActiveTab('probabilidad')}>
            <Percent className="nav-item-icon" size={16} />
            <span>Probabilidad y Bayes</span>
          </button>
          <button className={`nav-item ${activeTab === 'palomar' ? 'active' : ''}`} onClick={() => setActiveTab('palomar')}>
            <Hash className="nav-item-icon" size={16} />
            <span>Palomar y Hashing</span>
          </button>
          <button className={`nav-item ${activeTab === 'recurrencias' ? 'active' : ''}`} onClick={() => setActiveTab('recurrencias')}>
            <TrendingUp className="nav-item-icon" size={16} />
            <span>Recurrencias y Trabajo</span>
          </button>
          <button className={`nav-item ${activeTab === 'grafos' ? 'active' : ''}`} onClick={() => setActiveTab('grafos')}>
            <Network className="nav-item-icon" size={16} />
            <span>Grafos y Conexión</span>
          </button>
          <button className={`nav-item ${activeTab === 'bfs-dfs' ? 'active' : ''}`} onClick={() => setActiveTab('bfs-dfs')}>
            <Eye className="nav-item-icon" size={16} />
            <span>Búsquedas (BFS/DFS)</span>
          </button>
          <button className={`nav-item ${activeTab === 'mst' ? 'active' : ''}`} onClick={() => setActiveTab('mst')}>
            <GitMerge className="nav-item-icon" size={16} />
            <span>MST (Prim/Kruskal)</span>
          </button>
          <button className={`nav-item ${activeTab === 'arboles-recorridos' ? 'active' : ''}`} onClick={() => setActiveTab('arboles-recorridos')}>
            <Activity className="nav-item-icon" size={16} />
            <span>Árboles y AST</span>
          </button>
          <button className={`nav-item ${activeTab === 'videos' ? 'active' : ''}`} onClick={() => setActiveTab('videos')}>
            <Video className="nav-item-icon" size={16} />
            <span>Recursos y Videos</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div>Estructuras Discretas © 2026</div>
          <div style={{fontSize: '9px', marginTop: '4px', opacity: 0.5}}>Vanguard UX System</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="header">
          <span className="theme-badge">Unidad Temática</span>
          <h2 className="main-title">{PSEUDOCODES[activeTab].title}</h2>
          <p className="main-description">{PSEUDOCODES[activeTab].description}</p>
          
          <div style={{ marginTop: '16px' }}>
            <button 
              onClick={() => setShowHelp(!showHelp)} 
              className="btn btn-secondary btn-sm"
              style={{ padding: '6px 12px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <HelpCircle size={14} />
              {showHelp ? 'Ocultar Guía de Uso' : 'Mostrar Guía de Uso'}
            </button>
            
            {showHelp && PSEUDOCODES[activeTab].usageSteps && (
              <div 
                className="math-block" 
                style={{ 
                  textAlign: 'left', 
                  padding: '20px', 
                  marginTop: '12px', 
                  backgroundColor: 'var(--info-glow)', 
                  borderColor: 'rgba(31, 108, 159, 0.15)',
                  animation: 'fadeIn 0.3s ease'
                }}
              >
                <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: 'var(--info)', fontFamily: 'var(--font-sans)', fontWeight: '700' }}>
                  Guía de Uso del Simulador:
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.7', color: 'var(--text-main)', fontFamily: 'var(--font-sans)' }}>
                  {PSEUDOCODES[activeTab].usageSteps.map((step, idx) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="card-grid">
          {/* Double-Bezel Card (Outer Shell) */}
          <section className="card-shell">
            {/* Card Core (Inner Core) */}
            <div className="card-core">
              <div className="card-header-bar">
                <div className="card-title-group">
                  <h3 className="card-title">Ejecución en Vivo</h3>
                  <p className="card-subtitle">Prueba los algoritmos introduciendo tus propios datos.</p>
                </div>
                <span className="theme-badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                  Interactivo
                </span>
              </div>
              <p className="card-desc" style={{ marginTop: '-8px' }}>{PSEUDOCODES[activeTab].instructions}</p>
              
              {activeTab === 'bst-avl' && <BSTAVLPanel />}
              {activeTab === 'combinatoria' && <CombinatoricsPanel />}
              {activeTab === 'probabilidad' && <ProbabilityPanel />}
              {activeTab === 'palomar' && <PigeonholePanel />}
              {activeTab === 'recurrencias' && <RecurrencePanel />}
              {activeTab === 'grafos' && <GraphRepresentationPanel />}
              {activeTab === 'bfs-dfs' && <GraphSearchPanel />}
              {activeTab === 'mst' && <MSTPanel />}
              {activeTab === 'arboles-recorridos' && <TreeASTPanel />}
              {activeTab === 'videos' && <VideoResourcesPanel />}
            </div>
          </section>

          {/* Double-Bezel Card (Outer Shell) */}
          <section className="card-shell">
            {/* Card Core (Inner Core) */}
            <div className="card-core">
              <div className="card-header-bar">
                <div className="card-title-group">
                  <h3 className="card-title">Biblioteca de Pseudocódigos</h3>
                  <p className="card-subtitle">Estructuras formales de los algoritmos de este tema.</p>
                </div>
                <span className="theme-badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', color: '#3b82f6', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
                  Código
                </span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {PSEUDOCODES[activeTab].algorithms.map((algo, i) => (
                  <CodeViewer key={i} name={algo.name} pseudo={algo.pseudo} js={algo.js} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// ============================================================================
// SUB-PANEL COMPONENTS
// ============================================================================


// --- SCIENTIFIC KEYBOARD COMPONENT ---
function ScientificKeyboard({ onKeyPress }) {
  const keys = [
    '(', ')', '^', 'sqrt', 'log', 'ln', 'C', 'DEL',
    '7', '8', '9', '/', 'sin', 'cos', 'x', 'y',
    '4', '5', '6', '*', 'tan', 'pi', 'z', 'e',
    '1', '2', '3', '-', '!', '%', '[', ']',
    '0', '.', '=', '+', '{', '}', '|', ','
  ];
  return (
    <div className="sci-keyboard">
      {keys.map(k => (
        <button key={k} type="button" onClick={() => onKeyPress(k)} className={`sci-key ${['+','-','*','/','^','!','(',')','='].includes(k) ? 'op' : ''} ${['C','DEL'].includes(k) ? 'clear' : ''}`}>
          {k}
        </button>
      ))}
    </div>
  );
}

// --- 1. BST & AVL PANEL ---
function BSTAVLPanel() {
  const [displayMode, setDisplayMode] = useState('2D');
  const [tree, setTree] = useState(null);
  const [val, setVal] = useState('');
  const [mode, setMode] = useState('avl');
  const [history, setHistory] = useState(['Árbol inicializado vacío.']);

  const handleInsert = (e) => {
    e.preventDefault();
    let num = parseInt(val);
    if (isNaN(num)) return;
    let log = [];
    let root = tree ? cloneTree(tree) : null;
    if (mode === 'avl') {
      root = avlInsert(root, num, log);
    } else {
      root = bstInsert(root, num, log);
    }
    setTree(cloneTree(root));
    setHistory(prev => [...prev, ...log]);
    setVal('');
  };

  const handleDelete = () => {
    let num = parseInt(val);
    if (isNaN(num)) return;
    let log = [];
    let root = tree ? cloneTree(tree) : null;
    if (mode === 'avl') {
      root = avlDelete(root, num, log);
    } else {
      root = bstDelete(root, num, log);
    }
    setTree(cloneTree(root));
    setHistory(prev => [...prev, ...log]);
    setVal('');
  };

  const handleSearch = () => {
    let num = parseInt(val);
    if (isNaN(num)) return;
    let { found, path } = bstSearch(tree, num);
    if (found) {
      setHistory(prev => [...prev, `Búsqueda de ${num}: ENCONTRADO. Ruta recorrida: ${path.join(' -> ')}`]);
    } else {
      setHistory(prev => [...prev, `Búsqueda de ${num}: NO EXISTE en el árbol.`]);
    }
    setVal('');
  };

  const handleClear = () => {
    setTree(null);
    setHistory(['Árbol vaciado.']);
  };

  let nodesList = [];
  if (tree) {
    computeNodeCoordinates(tree, 250, 40, 110, nodesList);
  }

  return (
    <div className="demo-layout">
      <div className="demo-panel">
        <form onSubmit={handleInsert} className="form-group">
          <label className="form-label">Valor del nodo (Número)</label>
          <div className="input-row">
            <input 
              type="number" 
              className="input-control" 
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="Ej: 15"
            />
            {/* Nested Button-in-button design */}
            <button type="submit" className="btn btn-premium btn-sm">
              <span>Insertar</span>
              <span className="btn-icon-circle"><Plus size={12} /></span>
            </button>
            <button type="button" onClick={handleSearch} className="btn btn-secondary btn-sm">
              <Search size={12} /> Buscar
            </button>
            <button type="button" onClick={handleDelete} className="btn btn-danger btn-sm">
              <Trash2 size={12} /> Eliminar
            </button>
          </div>
        </form>

        <div className="input-row" style={{ gap: '20px', margin: '8px 0' }}>
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="radio" name="tree-mode" checked={mode === 'bst'} onChange={() => setMode('bst')} />
            <span>Modo BST puro</span>
          </label>
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="radio" name="tree-mode" checked={mode === 'avl'} onChange={() => setMode('avl')} />
            <span>Modo AVL auto-balanceado</span>
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span className="form-label" style={{ margin: 0 }}>Visualización</span>
          <div className="view-toggle-container">
            <button type="button" className={`view-toggle-btn ${displayMode === '2D' ? 'active' : ''}`} onClick={() => setDisplayMode('2D')}>2D</button>
            <button type="button" className={`view-toggle-btn ${displayMode === '3D' ? 'active' : ''}`} onClick={() => setDisplayMode('3D')}>3D</button>
          </div>
        </div>
        {displayMode === '2D' ? (
          <div className="canvas-container">
            <svg className="svg-canvas" viewBox="0 0 500 280">
              {/* Premium Grid Pattern Background */}
              <defs>
                <pattern id="dot-grid-1" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.8" fill="rgba(0, 0, 0, 0.06)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dot-grid-1)" />

              {/* Edges */}
              {nodesList.map((n, i) => {
                if (n.parentX !== null && n.parentY !== null) {
                  return (
                    <line 
                      key={`e-${i}`}
                      x1={n.parentX} 
                      y1={n.parentY} 
                      x2={n.x} 
                      y2={n.y} 
                      className="edge-line active" 
                    />
                  );
                }
                return null;
              })}
              
              {/* Nodes */}
              {nodesList.map((n, i) => (
                <g key={`n-${i}`} transform={`translate(${n.x},${n.y})`}>
                  <circle r="16" className="node-circle active" />
                  <text className="node-text">{n.name}</text>
                </g>
              ))}

              {nodesList.length === 0 && (
                <text x="250" y="140" fill="#64748b" textAnchor="middle" fontSize="13" fontWeight="500">
                  El árbol está vacío. Inserta un nodo para comenzar.
                </text>
              )}
            </svg>
          </div>
        ) : (
          <div style={{ height: '300px', width: '100%', position: 'relative', marginBottom: '12px' }}>
            <Graph3DCanvas mode="tree" nodes={nodesList} />
          </div>
        )}
        
        <button onClick={handleClear} className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }}>
          <RotateCcw size={12} /> Reiniciar Árbol
        </button>
      </div>

      <div className="demo-panel">
        <div className="demo-title">
          <Activity size={14} /> Historial de Operaciones
        </div>
        <div className="output-box" style={{ flexGrow: 1, minHeight: '300px' }}>
          {history.map((h, i) => (
            <div key={i} style={{ marginBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.02)', paddingBottom: '4px' }}>
              <span style={{ color: '#64748b', marginRight: '8px' }}>[{i}]:</span>
              {h}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- 2. COMBINATORICS PANEL ---
function CombinatoricsPanel() {
  const [n, setN] = useState(6);
  const [r, setR] = useState(3);
  const [elementsStr, setElementsStr] = useState('A, B, C, D');
  const [permResult, setPermResult] = useState(120);
  const [combResult, setCombResult] = useState(20);
  const [generatedList, setGeneratedList] = useState([]);
  const [pascalN, setPascalN] = useState(5);
  const [pascalTable, setPascalTable] = useState(generatePascalTable(5));

  useEffect(() => {
    setPermResult(getPermutations(n, r));
    setCombResult(getCombinations(n, r));
  }, [n, r]);

  const handleGenerateCombinations = () => {
    let list = elementsStr.split(',').map(e => e.trim()).filter(e => e.length > 0);
    let subsets = generateCombinationsBacktracking(list, r);
    setGeneratedList(subsets);
  };

  const handlePascalGen = (val) => {
    let num = Math.min(10, Math.max(0, parseInt(val) || 0));
    setPascalN(num);
    setPascalTable(generatePascalTable(num));
  };

  return (
    <div className="demo-layout">
      <div className="demo-panel">
        <div className="demo-title">
          <BookOpen size={14} /> Calculadora P(n,r) y C(n,r)
        </div>
        
        <div className="input-row">
          <div className="form-group">
            <label className="form-label">Valor n (Objetos totales)</label>
            <input 
              type="number" 
              className="input-control" 
              value={n} 
              onChange={(e) => setN(Math.max(0, parseInt(e.target.value) || 0))}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Valor r (Objetos a elegir)</label>
            <input 
              type="number" 
              className="input-control" 
              value={r} 
              onChange={(e) => setR(Math.max(0, parseInt(e.target.value) || 0))}
            />
          </div>
        </div>

        <div className="math-block">
          <div>Permutaciones (Orden importa):</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--primary)', margin: '8px 0' }}>
            P({n}, {r}) = {permResult}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Fórmula: n! / (n - r)!</div>
        </div>

        <div className="math-block">
          <div>Combinaciones (Orden NO importa):</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--secondary)', margin: '8px 0' }}>
            C({n}, {r}) = {combResult}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Fórmula: n! / (r! * (n - r)!)</div>
        </div>

        <div className="math-block" style={{ marginTop: '12px' }}>
          <div>Combinaciones con Repetición:</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--accent)', margin: '8px 0' }}>
            CR({n}, {r}) = {getCombinations(n + r - 1, r) || 0}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Fórmula: C(n + r - 1, r)</div>
        </div>

        <div className="demo-title" style={{ marginTop: '16px' }}>
          <Layers size={14} /> Enumerador por Backtracking
        </div>
        <div className="form-group">
          <label className="form-label">Elementos del conjunto (separados por coma)</label>
          <div className="input-row">
            <input 
              type="text" 
              className="input-control" 
              value={elementsStr}
              onChange={(e) => setElementsStr(e.target.value)}
            />
            {/* Button-in-button nested design */}
            <button onClick={handleGenerateCombinations} className="btn btn-premium btn-sm">
              <span>Generar subconjuntos</span>
              <span className="btn-icon-circle"><ArrowRight size={12} /></span>
            </button>
          </div>
        </div>
        
        <div className="output-box" style={{ maxHeight: '120px' }}>
          {generatedList.length > 0 ? (
            <div>
              <strong>Subconjuntos generados (Total: {generatedList.length}):</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                {generatedList.map((item, idx) => (
                  <span key={idx} style={{ background: 'var(--border)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>
                    {`{${item.join(', ')}}`}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            'Presiona generar para ver la lista por backtracking...'
          )}
        </div>
      </div>

      <div className="demo-panel">
        <div className="demo-title">
          <Activity size={14} /> Triángulo de Pascal (Matriz DP)
        </div>
        
        <div className="form-group">
          <label className="form-label">Tamaño n para la tabla (máx 10)</label>
          <input 
            type="number" 
            className="input-control" 
            style={{ width: '80px' }} 
            value={pascalN}
            onChange={(e) => handlePascalGen(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table className="pascal-table">
            <thead>
              <tr>
                <th>Fila (i)</th>
                {Array.from({ length: pascalN + 1 }).map((_, idx) => (
                  <th key={idx}>c={idx}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pascalTable.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 'bold', backgroundColor: 'var(--bg-sidebar)' }}>i={i}</td>
                  {Array.from({ length: pascalN + 1 }).map((_, j) => {
                    let val = row[j] !== undefined ? row[j] : '';
                    let isCoefficient = val !== '';
                    return (
                      <td key={j} className={isCoefficient ? 'pascal-cell-active' : ''}>
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.4' }}>
          La celda i, j se calcula sumando las dos celdas de la fila superior: <code>tabla[i][j] = tabla[i-1][j-1] + tabla[i-1][j]</code> (Relación de recurrencia de Pascal).
        </div>
      </div>
    </div>
  );
}

// --- 3. PROBABILITY PANEL ---
function ProbabilityPanel() {
  const [mcN, setMcN] = useState(3);
  const [mcK, setMcK] = useState(2);
  const [mcP, setMcP] = useState(0.5);
  const [mcIter, setMcIter] = useState(10000);
  const [exactProb, setExactProb] = useState(0.375);
  const [mcProb, setMcProb] = useState(null);
  const [mcRunning, setMcRunning] = useState(false);

  const [probsStr, setProbsStr] = useState('0.10, 0.20, 0.05');
  const [availResult, setAvailResult] = useState(null);

  const [priorRed, setPriorRed] = useState(0.60);
  const [priorCPU, setPriorCPU] = useState(0.30);
  const [priorDisco, setPriorDisco] = useState(0.10);
  const [condRed, setCondRed] = useState(0.90);
  const [condCPU, setCondCPU] = useState(0.40);
  const [condDisco, setCondDisco] = useState(0.20);
  const [bayesLog, setBayesLog] = useState('');

  useEffect(() => {
    let exact = getCombinations(mcN, mcK) * Math.pow(mcP, mcK) * Math.pow(1 - mcP, mcN - mcK);
    setExactProb(isNaN(exact) ? 0 : exact);
  }, [mcN, mcK, mcP]);

  const handleMonteCarlo = () => {
    setMcRunning(true);
    setTimeout(() => {
      let p = runMonteCarloSimulation(mcN, mcK, mcIter, mcP);
      setMcProb(p);
      setMcRunning(false);
    }, 100);
  };

  const handleAnalizarConfiabilidad = () => {
    let list = probsStr.split(',').map(p => parseFloat(p.trim())).filter(p => !isNaN(p));
    let todosOk = 1.0;
    for (let i = 0; i < list.length; i++) {
      todosOk *= (1.0 - list[i]);
    }
    setAvailResult({
      todosOk: todosOk.toFixed(4),
      alMenosUnoFalla: (1.0 - todosOk).toFixed(4)
    });
  };

  const handleBayesDiagnosticar = () => {
    let sum = priorRed + priorCPU + priorDisco;
    let pR = priorRed / sum;
    let pC = priorCPU / sum;
    let pD = priorDisco / sum;

    let pEv = (pR * condRed) + (pC * condCPU) + (pD * condDisco);

    let postRed = (pR * condRed) / pEv;
    let postCPU = (pC * condCPU) / pEv;
    let postDisco = (pD * condDisco) / pEv;

    let causas = ['Red', 'CPU', 'Disco'];
    let posteriors = [postRed, postCPU, postDisco];
    let maxIdx = posteriors.indexOf(Math.max(...posteriors));

    let log = `Probabilidades Prior (normalizadas si no sumaban 1):
- P(Red) = ${pR.toFixed(3)}
- P(CPU) = ${pC.toFixed(3)}
- P(Disco) = ${pD.toFixed(3)}

P(Evidencia = Latencia Alta L) por Ley de Probabilidad Total:
P(L) = P(L|R)·P(R) + P(L|C)·P(C) + P(L|D)·P(D)
P(L) = (${condRed}×${pR.toFixed(3)}) + (${condCPU}×${pC.toFixed(3)}) + (${condDisco}×${pD.toFixed(3)})
P(L) = ${(condRed*pR).toFixed(4)} + ${(condCPU*pC).toFixed(4)} + ${(condDisco*pD).toFixed(4)} = ${pEv.toFixed(4)}

Probabilidades Posteriores actualizadas por Bayes:
- P(Red | L) = P(L|R)·P(R)/P(L) = ${(condRed*pR).toFixed(4)}/${pEv.toFixed(4)} = ${(postRed*100).toFixed(2)}%
- P(CPU | L) = P(L|C)·P(C)/P(L) = ${(condCPU*pC).toFixed(4)}/${pEv.toFixed(4)} = ${(postCPU*100).toFixed(2)}%
- P(Disco | L) = P(L|D)·P(D)/P(L) = ${(condDisco*pD).toFixed(4)}/${pEv.toFixed(4)} = ${(postDisco*100).toFixed(2)}%

Diagnóstico (argmax): La causa más probable de fallo es: ${causas[maxIdx].toUpperCase()} (${(posteriors[maxIdx]*100).toFixed(1)}%)`;
    setBayesLog(log);
  };

  return (
    <div className="demo-layout">
      <div className="demo-panel">
        <div className="demo-title">
          <Activity size={14} /> Probabilidad Clásica y Monte Carlo
        </div>
        
        <div className="input-row">
          <div className="form-group" style={{ flexGrow: 1 }}>
            <label className="form-label">n (Lanzamientos)</label>
            <input 
              type="number" 
              className="input-control" 
              value={mcN} 
              onChange={(e) => setMcN(Math.max(1, parseInt(e.target.value) || 0))}
            />
          </div>
          <div className="form-group" style={{ flexGrow: 1 }}>
            <label className="form-label">k (Éxitos)</label>
            <input 
              type="number" 
              className="input-control" 
              value={mcK} 
              onChange={(e) => setMcK(Math.max(0, parseInt(e.target.value) || 0))}
            />
          </div>
          <div className="form-group" style={{ flexGrow: 1 }}>
            <label className="form-label">p (Prob Éxito)</label>
            <input 
              type="number" 
              step="0.01"
              className="input-control" 
              value={mcP} 
              onChange={(e) => setMcP(Math.max(0, Math.min(1, parseFloat(e.target.value) || 0)))}
            />
          </div>
          <div className="form-group" style={{ flexGrow: 1 }}>
            <label className="form-label">Simulaciones</label>
            <input 
              type="number" 
              className="input-control" 
              value={mcIter} 
              onChange={(e) => setMcIter(Math.max(10, parseInt(e.target.value) || 0))}
            />
          </div>
        </div>

        {/* Button-in-button design */}
        <button onClick={handleMonteCarlo} disabled={mcRunning} className="btn btn-premium btn-sm" style={{ alignSelf: 'flex-start' }}>
          <span>{mcRunning ? 'Ejecutando...' : 'Ejecutar Monte Carlo'}</span>
          <span className="btn-icon-circle"><Play size={12} /></span>
        </button>

        <div className="demo-layout" style={{ margin: '16px 0 0 0' }}>
          <div className="math-block" style={{ margin: 0 }}>
            <div style={{fontSize: '12px'}}>Probabilidad Teórica</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--primary)', marginTop: '8px' }}>
              {(exactProb * 100).toFixed(3)}%
            </div>
          </div>
          <div className="math-block" style={{ margin: 0 }}>
            <div style={{fontSize: '12px'}}>Simulación</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--secondary)', marginTop: '8px' }}>
              {mcProb !== null ? `${(mcProb * 100).toFixed(3)}%` : '---'}
            </div>
          </div>
        </div>

        <div className="demo-title" style={{ marginTop: '24px' }}>
          <HelpCircle size={14} /> Confiabilidad de Microservicios
        </div>
        <div className="form-group">
          <label className="form-label">Probabilidades de Fallo (separadas por comas)</label>
          <div className="input-row">
            <input 
              type="text" 
              className="input-control" 
              value={probsStr}
              onChange={(e) => setProbsStr(e.target.value)}
            />
            <button onClick={handleAnalizarConfiabilidad} className="btn btn-secondary btn-sm">
              Analizar
            </button>
          </div>
        </div>

        {availResult && (
          <div className="output-box" style={{ padding: '10px 14px' }}>
            <div>Disponibilidad total: <strong>{(availResult.todosOk * 100).toFixed(2)}%</strong></div>
            <div>Riesgo de fallo: <strong style={{ color: 'var(--danger)' }}>{(availResult.alMenosUnoFalla * 100).toFixed(2)}%</strong></div>
          </div>
        )}
      </div>

      <div className="demo-panel">
        <div className="demo-title">
          <Award size={14} /> Clasificador de Bayes (Diagnóstico)
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)' }}>1. PROBABILIDADES PRIOR (P)</div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">P(Red)</label>
              <input type="number" step="0.05" className="input-control" value={priorRed} onChange={(e) => setPriorRed(parseFloat(e.target.value) || 0)} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">P(CPU)</label>
              <input type="number" step="0.05" className="input-control" value={priorCPU} onChange={(e) => setPriorCPU(parseFloat(e.target.value) || 0)} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">P(Disco)</label>
              <input type="number" step="0.05" className="input-control" value={priorDisco} onChange={(e) => setPriorDisco(parseFloat(e.target.value) || 0)} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)' }}>2. P(L|CAUSA) - LATENCIA ALTA</div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">P(Latencia | Red)</label>
              <input type="number" step="0.05" className="input-control" value={condRed} onChange={(e) => setCondRed(parseFloat(e.target.value) || 0)} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">P(Latencia | CPU)</label>
              <input type="number" step="0.05" className="input-control" value={condCPU} onChange={(e) => setCondCPU(parseFloat(e.target.value) || 0)} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">P(Latencia | Disco)</label>
              <input type="number" step="0.05" className="input-control" value={condDisco} onChange={(e) => setCondDisco(parseFloat(e.target.value) || 0)} />
            </div>
          </div>
        </div>

        <button onClick={handleBayesDiagnosticar} className="btn btn-primary btn-sm" style={{ marginTop: '8px' }}>
          Ejecutar Diagnóstico de Causa
        </button>

        <div className="output-box" style={{ flexGrow: 1, minHeight: '180px', marginTop: '12px' }}>
          {bayesLog || 'Configura las probabilidades y pulsa en "Diagnosticar" para ver el procedimiento matemático.'}
        </div>
      </div>
    </div>
  );
}

// --- 4. PIGEONHOLE PANEL ---
function PigeonholePanel() {
  const [nKeys, setNKeys] = useState(15);
  const [mBuckets, setMBuckets] = useState(6);
  const [bucketsData, setBucketsData] = useState([]);
  const [collisionDetected, setCollisionDetected] = useState(false);
  const [allocationLog, setAllocationLog] = useState('');

  const handleSimular = () => {
    let buckets = Array.from({ length: mBuckets }).map((_, idx) => ({ id: idx, count: 0, keys: [] }));
    let log = [];
    
    for (let c = 1; c <= nKeys; c++) {
      let keyName = `K${c}`;
      let bucketIdx = (c * 17 + 5) % mBuckets;
      buckets[bucketIdx].count++;
      buckets[bucketIdx].keys.push(keyName);
      log.push(`Clave ${keyName} hasheada a bucket ${bucketIdx}`);
    }

    setBucketsData(buckets);

    let threshold = Math.ceil(nKeys / mBuckets);
    let hasCollision = nKeys > mBuckets;
    setCollisionDetected(hasCollision);

    let summary = `Resumen de Análisis del Palomar (Pigeonhole Principle):
- Número de claves (palomas) n = ${nKeys}
- Número de buckets (cajones) m = ${mBuckets}
- Relación: n / m = ${(nKeys/mBuckets).toFixed(2)}

Por el principio generalizado del Palomar:
Al menos un bucket tiene garantizado tener como mínimo ⌈n/m⌉ = ⌈${nKeys}/${mBuckets}⌉ = ${threshold} claves.

Verificación empírica:
- El bucket con mayor número de claves contiene ${Math.max(...buckets.map(b => b.count))} claves.
- ¿Se cumple la garantía matemática? ${Math.max(...buckets.map(b => b.count)) >= threshold ? 'SÍ ✓' : 'NO ✗'}
- ¿Existe al menos una colisión (bucket con >= 2 claves)? ${nKeys > mBuckets ? 'SÍ ✓ (Garantizado porque n > m)' : buckets.some(b => b.count >= 2) ? 'SÍ' : 'NO'}`;
    
    setAllocationLog(summary);
  };

  useEffect(() => {
    handleSimular();
  }, [nKeys, mBuckets]);

  return (
    <div className="demo-layout">
      <div className="demo-panel">
        <div className="demo-title">
          <Hash size={14} /> Distribución de Claves en Tabla Hash
        </div>

        <div className="input-row">
          <div className="form-group" style={{ flexGrow: 1 }}>
            <label className="form-label">n (Número de Claves)</label>
            <input 
              type="number" 
              className="input-control" 
              value={nKeys} 
              onChange={(e) => setNKeys(Math.max(1, parseInt(e.target.value) || 0))}
            />
          </div>
          <div className="form-group" style={{ flexGrow: 1 }}>
            <label className="form-label">m (Número de Buckets)</label>
            <input 
              type="number" 
              className="input-control" 
              value={mBuckets} 
              onChange={(e) => setMBuckets(Math.min(20, Math.max(1, parseInt(e.target.value) || 0)))}
            />
          </div>
        </div>

        {/* Button-in-button design */}
        <button onClick={handleSimular} className="btn btn-premium btn-sm" style={{ alignSelf: 'flex-start' }}>
          <span>Simular Distribución</span>
          <span className="btn-icon-circle"><ArrowRight size={12} /></span>
        </button>

        <div className="hash-grid" style={{ marginTop: '20px' }}>
          {bucketsData.map((b) => {
            let isCollision = b.count >= 2;
            return (
              <div key={b.id} className={`hash-bucket ${isCollision ? 'collision' : ''}`}>
                <div className="hash-bucket-num">Bucket {b.id}</div>
                <div className="hash-bucket-count">{b.count}</div>
                <div className="hash-bucket-keys" title={b.keys.join(', ')}>
                  {b.keys.length > 0 ? b.keys.join(',') : 'vacío'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="demo-panel">
        <div className="demo-title">
          <Info size={14} /> Garantías Teóricas del Palomar
        </div>
        <div className="output-box" style={{ flexGrow: 1, minHeight: '300px' }}>
          {allocationLog}
        </div>
      </div>
    </div>
  );
}

// --- 5. RECURRENCE PANEL ---
function RecurrencePanel() {
  const [sizeN, setSizeN] = useState(8);
  const [recursionTree, setRecursionTree] = useState([]);
  const [totalWork, setTotalWork] = useState(0);
  const [mergeArrStr, setMergeArrStr] = useState('38, 27, 43, 3, 9, 82, 10');
  const [mergeLog, setMergeLog] = useState([]);

  const handleMergeSort = () => {
    let arr = mergeArrStr.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    let log = [];
    const merge = (izq, der) => {
      let res = [], i = 0, j = 0;
      while (i < izq.length && j < der.length) {
        if (izq[i] < der[j]) res.push(izq[i++]);
        else res.push(der[j++]);
      }
      return res.concat(izq.slice(i)).concat(der.slice(j));
    };
    const sort = (A, depth) => {
      let indent = "  ".repeat(depth);
      log.push(`${indent}Dividiendo: [${A.join(', ')}]`);
      if (A.length <= 1) return A;
      let mid = Math.floor(A.length / 2);
      let izq = sort(A.slice(0, mid), depth + 1);
      let der = sort(A.slice(mid), depth + 1);
      let merged = merge(izq, der);
      log.push(`${indent}Mezclando:  [${izq.join(', ')}] y [${der.join(', ')}] -> [${merged.join(', ')}]`);
      return merged;
    };
    sort(arr, 0);
    setMergeLog(log);
  };

  const calculateRecursionTree = (n) => {
    let levels = [];
    let work = 0;
    let currentN = n;
    let numNodes = 1;
    let lvl = 0;
    
    while (currentN >= 1) {
      let nodeCost = currentN * currentN;
      let levelCost = numNodes * nodeCost;
      levels.push({
        level: lvl,
        nVal: currentN,
        nodes: numNodes,
        nodeCost: nodeCost,
        levelCost: levelCost
      });
      work += levelCost;
      
      currentN /= 2;
      numNodes *= 4;
      lvl++;
    }
    
    setRecursionTree(levels);
    setTotalWork(work);
  };

  useEffect(() => {
    if ((sizeN & (sizeN - 1)) !== 0) {
      let p = Math.pow(2, Math.round(Math.log2(sizeN)));
      setSizeN(p || 1);
    } else {
      calculateRecursionTree(sizeN);
    }
  }, [sizeN]);

  return (
    <div className="demo-layout">
      <div className="demo-panel">
        <div className="demo-title">
          <TrendingUp size={14} /> Árbol de Recursión para T(n) = 4T(n/2) + n²
        </div>
        
        <div className="form-group">
          <label className="form-label">Tamaño inicial n (Potencia de 2)</label>
          <input 
            type="number" 
            className="input-control" 
            value={sizeN}
            onChange={(e) => setSizeN(Math.max(1, parseInt(e.target.value) || 0))}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {recursionTree.map((lvl) => (
            <div key={lvl.level} className="math-block" style={{ margin: 0, padding: '10px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', borderBottom: '1px solid var(--border)', paddingBottom: '4px', marginBottom: '6px' }}>
                <span>Nivel {lvl.level} (n={lvl.nVal})</span>
                <span style={{ color: 'var(--primary)' }}>Costo Nivel: {lvl.levelCost}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-main)' }}>
                <span>Nodos: {lvl.nodes}</span>
                <span>Trabajo unitario: {lvl.nVal}² = {lvl.nodeCost}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="demo-panel">
        <div className="demo-title">
          <Info size={14} /> Análisis de Complejidad y Teorema Maestro
        </div>
        
        <div className="output-box" style={{ flexGrow: 1, minHeight: '300px' }}>
          {`Ecuación de Recurrencia:
T(n) = 4T(n/2) + n²

Parámetros del Teorema Maestro:
- a = 4 (Número de subproblemas)
- b = 2 (Factor de reducción de tamaño)
- f(n) = n² (Trabajo local de división)

Paso 1: Calcular n^(log_b a)
log_2 4 = 2  ==>  n^(log_b a) = n²

Paso 2: Comparar f(n) con n^(log_b a)
f(n) = n²  y  n^(log_b a) = n²
Ambos términos tienen el mismo orden de magnitud.

Paso 3: Aplicar Caso 2 del Teorema Maestro
Dado que f(n) = Θ(n^(log_b a)), la complejidad final es:
T(n) = Θ(n^(log_b a) · log n) = Θ(n² log n)

Verificación Experimental (n = ${sizeN}):
Suma total del trabajo por niveles:
${recursionTree.map(l => `${l.nodes}*${l.nodeCost}`).join(' + ')}
Total Operaciones Calculadas: ${totalWork}

Comparación asintótica teórica:
n² · log_2(n) = ${sizeN}² · log_2(${sizeN}) = ${sizeN * sizeN} · ${Math.log2(sizeN)} = ${sizeN * sizeN * Math.log2(sizeN)}
El trabajo total medido en la simulación es exactamente igual a la suma del trabajo por nivel.`}
        </div>
      </div>

      <div className="demo-panel">
        <div className="demo-title">
          <Activity size={14} /> Simulación MergeSort (O(n log n))
        </div>
        <div className="form-group">
          <label className="form-label">Arreglo inicial (separado por comas)</label>
          <div className="input-row">
            <input 
              type="text" 
              className="input-control" 
              value={mergeArrStr} 
              onChange={(e) => setMergeArrStr(e.target.value)} 
            />
            <button onClick={handleMergeSort} className="btn btn-premium btn-sm">
              <span>Ordenar</span>
            </button>
          </div>
        </div>
        <div className="output-box" style={{ flexGrow: 1, minHeight: '200px', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
          {mergeLog.length > 0 ? mergeLog.join('\n') : 'Ingresa números y presiona "Ordenar" para visualizar el árbol de llamadas.'}
        </div>
      </div>
    </div>
  );
}

// --- 6. GRAPH REPRESENTATION PANEL ---
function GraphRepresentationPanel() {
  const [displayMode, setDisplayMode] = useState('2D');
  const [viewMode, setViewMode] = useState('la');
  const [preset, setPreset] = useState('microservices');
  const [customGraphStr, setCustomGraphStr] = useState("A-B:5, B-C:10, A-C:2");
  const [graphData, setGraphData] = useState(GRAPH_PRESETS.microservices);
  const [isoGraphStr, setIsoGraphStr] = useState("1-2:5, 2-3:10, 1-3:2");
  const [isoResult, setIsoResult] = useState(null);

  const handleCheckIsomorphism = () => {
    let nodesSet = new Set();
    let edges = [];
    let parts = isoGraphStr.split(',').map(s => s.trim()).filter(s => s);
    parts.forEach(p => {
      let [link, w] = p.split(':');
      let weight = w ? parseInt(w) : 1;
      let [u, v] = link ? link.split('-') : [];
      if (u && v) {
        nodesSet.add(u.trim());
        nodesSet.add(v.trim());
        edges.push({ from: u.trim(), to: v.trim(), weight });
      }
    });
    
    let g2 = { nodes: Array.from(nodesSet).map(id => ({ id })), edges };

    let n1 = graphData.nodes.length;
    let e1 = graphData.edges.length;
    let n2 = g2.nodes.length;
    let e2 = g2.edges.length;
    let deg1 = {}; graphData.nodes.forEach(n => deg1[n.id] = 0);
    graphData.edges.forEach(e => { deg1[e.from]++; deg1[e.to]++; });
    let seq1 = Object.values(deg1).sort((a,b)=>a-b);
    let deg2 = {}; g2.nodes.forEach(n => deg2[n.id] = 0);
    g2.edges.forEach(e => { deg2[e.from]++; deg2[e.to]++; });
    let seq2 = Object.values(deg2).sort((a,b)=>a-b);
    
    let sameNodes = n1 === n2;
    let sameEdges = e1 === e2;
    let sameSeq = JSON.stringify(seq1) === JSON.stringify(seq2);
    setIsoResult({ n1, n2, e1, e2, seq1, seq2, sameNodes, sameEdges, sameSeq, isomorphicMaybe: sameNodes && sameEdges && sameSeq });
  };

  const parseCustomGraph = (str) => {
    let nodesSet = new Set();
    let edges = [];
    let parts = str.split(',').map(s => s.trim()).filter(s => s);
    parts.forEach(p => {
      let [link, w] = p.split(':');
      let weight = w ? parseInt(w) : 1;
      let [u, v] = link ? link.split('-') : [];
      if (u && v) {
        nodesSet.add(u.trim());
        nodesSet.add(v.trim());
        edges.push({ from: u.trim(), to: v.trim(), weight });
      }
    });
    
    let nodes = Array.from(nodesSet).map((id, i) => {
      let angle = (i / Math.max(1, nodesSet.size)) * 2 * Math.PI;
      return { id, x: 250 + 100 * Math.cos(angle), y: 150 + 100 * Math.sin(angle) };
    });
    
    if (nodes.length === 0) {
       nodes = [{ id: 'A', x: 250, y: 150 }];
    }
    return { nodes, edges };
  };

  useEffect(() => {
    if (preset === 'custom') {
      setGraphData(parseCustomGraph(customGraphStr));
    } else {
      setGraphData(GRAPH_PRESETS[preset] || GRAPH_PRESETS.microservices);
    }
  }, [preset, customGraphStr]);


  let degrees = {};
  graphData.nodes.forEach(n => {
    degrees[n.id] = 0;
  });
  graphData.edges.forEach(e => {
    degrees[e.from]++;
    degrees[e.to]++;
  });

  let sumDegrees = Object.values(degrees).reduce((a, b) => a + b, 0);
  let doubleEdges = 2 * graphData.edges.length;

  let adjListText = '';
  if (viewMode === 'la') {
    graphData.nodes.forEach(n => {
      let neighbors = [];
      graphData.edges.forEach(e => {
        if (e.from === n.id) neighbors.push(`${e.to} (w:${e.weight})`);
        if (e.to === n.id) neighbors.push(`${e.from} (w:${e.weight})`);
      });
      adjListText += `${n.id} : [ ${neighbors.join(', ')} ]\n`;
    });
  } else {
    adjListText += '    ' + graphData.nodes.map(n => n.id.padEnd(5)).join('') + '\n';
    graphData.nodes.forEach(rowNode => {
      adjListText += rowNode.id.padEnd(4);
      graphData.nodes.forEach(colNode => {
        let edge = graphData.edges.find(e => 
          (e.from === rowNode.id && e.to === colNode.id) || 
          (e.from === colNode.id && e.to === rowNode.id)
        );
        let val = edge ? edge.weight.toString() : '0';
        adjListText += val.padEnd(5);
      });
      adjListText += '\n';
    });
  }

  let isEulerianCircuit = Object.values(degrees).every(d => d % 2 === 0);
  let oddDegreeCount = Object.values(degrees).filter(d => d % 2 !== 0).length;
  let isEulerianPath = oddDegreeCount === 2;

  let eulerSummary = `Auditoría de Caminos y Circuitos de Euler:
- Vértices de grado impar: ${oddDegreeCount} ${oddDegreeCount > 0 ? `(${Object.entries(degrees).filter(([k,v]) => v%2!==0).map(([k,v]) => `${k}:${v}`).join(', ')})` : ''}

¿Tiene Circuito de Euler? ${isEulerianCircuit ? 'SÍ ✓ (Todos los grados son pares)' : 'NO ✗ (Tiene vértices de grado impar)'}
¿Tiene Camino de Euler? ${isEulerianPath ? 'SÍ ✓ (Tiene exactamente 2 de grado impar)' : 'NO ✗'}`;

  return (
    <div className="demo-layout">
      <div className="demo-panel">
        <div className="form-group">
          <label className="form-label">Seleccionar Topología de Grafo</label>
          <div className="input-row">
            <select className="input-control" value={preset} onChange={(e) => setPreset(e.target.value)}>
              <option value="microservices">Red de Microservicios (GW, Auth, Cart, Pay)</option>
              <option value="datacenters">Red de Data Centers (HQ, Subnets 1..7)</option>
              <option value="custom">Personalizado (Ingresar Manualmente)</option>
            </select>
            <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
              <button 
                type="button" 
                className={`btn btn-sm ${viewMode === 'la' ? 'btn-primary' : 'btn-secondary'}`} 
                onClick={() => setViewMode('la')}
                style={{ borderRadius: 0 }}
              >
                Lista Adj.
              </button>
              <button 
                type="button" 
                className={`btn btn-sm ${viewMode === 'ma' ? 'btn-primary' : 'btn-secondary'}`} 
                onClick={() => setViewMode('ma')}
                style={{ borderRadius: 0 }}
              >
                Matriz Adj.
              </button>
            </div>
          </div>
        </div>
        {preset === 'custom' && (
          <div className="form-group" style={{marginTop: '10px'}}>
             <label className="form-label">Aristas (ej: A-B:5, B-C:10)</label>
             <input type="text" className="input-control" value={customGraphStr} onChange={e => setCustomGraphStr(e.target.value)} placeholder="Ej: A-B:5, B-C:10" />
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span className="form-label" style={{ margin: 0 }}>Visualización del Grafo</span>
          <div className="view-toggle-container">
            <button type="button" className={`view-toggle-btn ${displayMode === '2D' ? 'active' : ''}`} onClick={() => setDisplayMode('2D')}>2D</button>
            <button type="button" className={`view-toggle-btn ${displayMode === '3D' ? 'active' : ''}`} onClick={() => setDisplayMode('3D')}>3D</button>
          </div>
        </div>
        {displayMode === '2D' ? (
          <div className="canvas-container" style={{ minHeight: '300px' }}>
            <svg className="svg-canvas" viewBox="0 0 500 300">
              {/* Premium Grid Pattern Background */}
              <defs>
                <pattern id="dot-grid-2" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.8" fill="rgba(0, 0, 0, 0.06)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dot-grid-2)" />

              {/* Draw edges */}
              {graphData.edges.map((e, idx) => {
                let fromNode = graphData.nodes.find(n => n.id === e.from);
                let toNode = graphData.nodes.find(n => n.id === e.to);
                if (!fromNode || !toNode) return null;
                let midX = (fromNode.x + toNode.x) / 2;
                let midY = (fromNode.y + toNode.y) / 2;
                return (
                  <g key={`e-${idx}`}>
                    <line x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} className="edge-line" />
                    <rect x={midX - 10} y={midY - 8} width="20" height="15" rx="3" fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1" />
                    <text x={midX} y={midY + 3} className="edge-text">{e.weight}</text>
                  </g>
                );
              })}

              {/* Draw nodes */}
              {graphData.nodes.map((n) => (
                <g key={n.id} transform={`translate(${n.x},${n.y})`}>
                  <circle r="16" className="node-circle active" />
                  <text className="node-text">{n.id}</text>
                </g>
              ))}
            </svg>
          </div>
        ) : (
          <div style={{ height: '300px', width: '100%', position: 'relative', marginBottom: '12px' }}>
            <Graph3DCanvas mode="graph" nodes={graphData.nodes} edges={graphData.edges} />
          </div>
        )}
      </div>

      <div className="demo-panel">
        <div className="demo-title">
          <Code size={16} /> Estructura en Memoria
        </div>
        <div className="output-box" style={{ fontFamily: 'var(--font-mono)', minHeight: '130px' }}>
          {adjListText}
        </div>

        <div className="demo-title" style={{ marginTop: '12px' }}>
          <Award size={14} /> Teorema Apretón de Manos (Handshake)
        </div>
        <div className="output-box" style={{ fontSize: '13px', padding: '10px 14px' }}>
          {`Grado de los vértices (deg):
${Object.entries(degrees).map(([k, v]) => `- deg(${k}) = ${v}`).join('\n')}

Suma de grados: ${Object.values(degrees).join(' + ')} = ${sumDegrees}
Fórmula Handshake: 2 * |E| = 2 * ${graphData.edges.length} = ${doubleEdges}
¿Coinciden los valores? ${sumDegrees === doubleEdges ? 'SÍ ✓ (Siempre debe ser igual)' : 'NO'}`}
        </div>
        
        <div className="output-box" style={{ fontSize: '13px', marginTop: '8px', color: 'var(--text-main)', borderColor: 'var(--border)' }}>
          {eulerSummary}
        </div>

        <div className="demo-title" style={{ marginTop: '16px' }}>
          <Activity size={14} /> Isomorfismo por Invariantes
        </div>
        <div className="form-group">
          <label className="form-label">Grafo 2 a comparar (ej: 1-2:5, 2-3:10, 1-3:2)</label>
          <div className="input-row">
            <input type="text" className="input-control" value={isoGraphStr} onChange={e => setIsoGraphStr(e.target.value)} />
            <button onClick={handleCheckIsomorphism} className="btn btn-secondary btn-sm">Verificar</button>
          </div>
        </div>
        {isoResult && (
          <div className="output-box" style={{ fontSize: '12px', padding: '10px 14px' }}>
            <div><strong>Nodos:</strong> Grafo1: {isoResult.n1} | Grafo2: {isoResult.n2} ({isoResult.sameNodes ? '✓' : '✗'})</div>
            <div><strong>Aristas:</strong> Grafo1: {isoResult.e1} | Grafo2: {isoResult.e2} ({isoResult.sameEdges ? '✓' : '✗'})</div>
            <div><strong>Secuencia de Grados:</strong></div>
            <div>G1: [{isoResult.seq1.join(', ')}]</div>
            <div>G2: [{isoResult.seq2.join(', ')}] ({isoResult.sameSeq ? '✓' : '✗'})</div>
            <div style={{ marginTop: '8px', color: isoResult.isomorphicMaybe ? 'var(--secondary)' : 'var(--danger)', fontWeight: 'bold' }}>
              {isoResult.isomorphicMaybe 
                ? 'INVARIANTES COINCIDEN: Posiblemente isomorfos.' 
                : 'INVARIANTES DISTINTOS: Los grafos NO son isomorfos.'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- 7. GRAPH SEARCH PANEL (BFS / DFS) ---
function GraphSearchPanel() {
  const [displayMode, setDisplayMode] = useState('2D');
    const [preset, setPreset] = useState('microservices');
  const [customGraphStr, setCustomGraphStr] = useState("A-B:5, B-C:10, A-C:2");
  const [graphData, setGraphData] = useState(GRAPH_PRESETS.microservices);

  const parseCustomGraph = (str) => {
    let nodesSet = new Set();
    let edges = [];
    let parts = str.split(',').map(s => s.trim()).filter(s => s);
    parts.forEach(p => {
      let [link, w] = p.split(':');
      let weight = w ? parseInt(w) : 1;
      let [u, v] = link ? link.split('-') : [];
      if (u && v) {
        nodesSet.add(u.trim());
        nodesSet.add(v.trim());
        edges.push({ from: u.trim(), to: v.trim(), weight });
      }
    });
    
    let nodes = Array.from(nodesSet).map((id, i) => {
      let angle = (i / Math.max(1, nodesSet.size)) * 2 * Math.PI;
      return { id, x: 250 + 100 * Math.cos(angle), y: 150 + 100 * Math.sin(angle) };
    });
    
    if (nodes.length === 0) {
       nodes = [{ id: 'A', x: 250, y: 150 }];
    }
    return { nodes, edges };
  };

  useEffect(() => {
    if (preset === 'custom') {
      setGraphData(parseCustomGraph(customGraphStr));
    } else {
      setGraphData(GRAPH_PRESETS[preset] || GRAPH_PRESETS.microservices);
    }
  }, [preset, customGraphStr]);

  const [visitedNodes, setVisitedNodes] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const [searchLog, setSearchLog] = useState([]);
  const [running, setRunning] = useState(false);
  const [queueOrStack, setQueueOrStack] = useState([]);
  const [searchType, setSearchType] = useState('BFS');

  const runSearch = async (type) => {
    if (running) return;
    setRunning(true);
    setSearchType(type);
    setVisitedNodes([]);
    setActiveNode(null);
    setQueueOrStack([]);
    
    let log = [];
    let visited = new Set();
    let startNode = 'GW';
    let qOrS = [startNode];
    
    setQueueOrStack([...qOrS]);
    log.push(`Iniciando ${type} desde nodo fuente: ${startNode}`);
    setSearchLog([...log]);

    while (qOrS.length > 0) {
      await new Promise(r => setTimeout(r, 1500));
      
      let curr;
      if (type === 'BFS') {
        curr = qOrS.shift();
        log.push(`Desencolando nodo ${curr} de la Cola FIFO.`);
      } else {
        curr = qOrS.pop();
        log.push(`Desapilando nodo ${curr} de la Pila LIFO.`);
      }
      
      setActiveNode(curr);
      
      if (!visited.has(curr)) {
        visited.add(curr);
        setVisitedNodes([...visited]);
        log.push(`Marcando nodo ${curr} como VISITADO.`);
        
        let neighbors = [];
        graphData.edges.forEach(e => {
          if (e.from === curr && !visited.has(e.to) && !qOrS.includes(e.to)) neighbors.push(e.to);
          if (e.to === curr && !visited.has(e.from) && !qOrS.includes(e.from)) neighbors.push(e.from);
        });

        if (neighbors.length > 0) {
          log.push(`Vecinos no visitados para ${curr}: [ ${neighbors.join(', ')} ]`);
          neighbors.forEach(n => {
            qOrS.push(n);
            log.push(`Añadiendo ${n} a la estructura de exploración.`);
          });
        } else {
          log.push(`No se encontraron vecinos no visitados para el nodo ${curr}.`);
        }
      } else {
        log.push(`El nodo ${curr} ya había sido visitado. Saltando.`);
      }
      
      setQueueOrStack([...qOrS]);
      setSearchLog([...log]);
    }
    
    await new Promise(r => setTimeout(r, 1000));
    setActiveNode(null);
    log.push(`Estructura vacía. Exploración por ${type} completada exitosamente.`);
    setSearchLog([...log]);
    setRunning(false);
  };

  return (
    <div className="demo-layout">
      <div className="demo-panel">

        <div className="form-group" style={{marginTop: '12px'}}>
          <label className="form-label">Seleccionar Topología</label>
          <div className="input-row">
            <select className="input-control" value={preset} onChange={(e) => setPreset(e.target.value)}>
              <option value="microservices">Red de Microservicios</option>
              <option value="datacenters">Red de Data Centers</option>
              <option value="custom">Personalizado (Ingresar Manualmente)</option>
            </select>
          </div>
        </div>
        {preset === 'custom' && (
          <div className="form-group" style={{marginTop: '10px'}}>
             <label className="form-label">Aristas (ej: A-B:5, B-C:10)</label>
             <input type="text" className="input-control" value={customGraphStr} onChange={e => setCustomGraphStr(e.target.value)} placeholder="Ej: A-B:5, B-C:10" />
          </div>
        )}

        <div className="input-row" style={{ gap: '12px' }}>
          {/* Button-in-button design */}
          <button 
            type="button" 
            className="btn btn-premium btn-sm" 
            onClick={() => runSearch('BFS')} 
            disabled={running}
          >
            <span>Ejecutar BFS</span>
            <span className="btn-icon-circle"><Play size={12} /></span>
          </button>
          <button 
            type="button" 
            className="btn btn-secondary btn-sm" 
            onClick={() => runSearch('DFS')} 
            disabled={running}
          >
            <Play size={12} /> Ejecutar DFS
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span className="form-label" style={{ margin: 0 }}>Visualización de Búsqueda</span>
          <div className="view-toggle-container">
            <button type="button" className={`view-toggle-btn ${displayMode === '2D' ? 'active' : ''}`} onClick={() => setDisplayMode('2D')}>2D</button>
            <button type="button" className={`view-toggle-btn ${displayMode === '3D' ? 'active' : ''}`} onClick={() => setDisplayMode('3D')}>3D</button>
          </div>
        </div>
        {displayMode === '2D' ? (
          <div className="canvas-container" style={{ minHeight: '300px' }}>
            <svg className="svg-canvas" viewBox="0 0 500 300">
              {/* Premium Grid Pattern Background */}
              <defs>
                <pattern id="dot-grid-3" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.8" fill="rgba(0, 0, 0, 0.06)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dot-grid-3)" />

              {/* Draw edges */}
              {graphData.edges.map((e, idx) => {
                let fromNode = graphData.nodes.find(n => n.id === e.from);
                let toNode = graphData.nodes.find(n => n.id === e.to);
                if (!fromNode || !toNode) return null;
                return (
                  <line 
                    key={`e-${idx}`} 
                    x1={fromNode.x} 
                    y1={fromNode.y} 
                    x2={toNode.x} 
                    y2={toNode.y} 
                    className="edge-line" 
                  />
                );
              })}

              {/* Draw nodes */}
              {graphData.nodes.map((n) => {
                let isVisited = visitedNodes.includes(n.id);
                let isActive = activeNode === n.id;
                let colorClass = "node-circle";
                if (isActive) colorClass += " active";
                else if (isVisited) colorClass += " visited";
                return (
                  <g key={n.id} transform={`translate(${n.x},${n.y})`}>
                    <circle r="16" className={colorClass} />
                    <text className="node-text">{n.id}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        ) : (
          <div style={{ height: '300px', width: '100%', position: 'relative', marginBottom: '12px' }}>
            <Graph3DCanvas 
              mode="graph" 
              nodes={graphData.nodes} 
              edges={graphData.edges} 
              activeNode={activeNode} 
              visitedNodes={visitedNodes} 
            />
          </div>
        )}
        
        <div className="output-box" style={{ borderStyle: 'dashed', color: 'var(--text-bright)' }}>
          <strong>Estructura Activa ({searchType === 'BFS' ? 'Cola FIFO' : 'Pila LIFO'}):</strong>{' '}
          {queueOrStack.length > 0 ? `[ ${queueOrStack.join(', ')} ]` : 'vacía'}
        </div>
      </div>

      <div className="demo-panel">
        <div className="demo-title">
          <Activity size={14} /> Traza y Estado de Variables
        </div>
        <div className="output-box" style={{ flexGrow: 1, minHeight: '350px' }}>
          {searchLog.length > 0 ? (
            searchLog.map((logLine, idx) => (
              <div key={idx} style={{ marginBottom: '6px', fontSize: '13px' }}>
                <span style={{ color: 'var(--primary)', marginRight: '6px' }}>&gt;</span>
                {logLine}
              </div>
            ))
          ) : (
            'Pulsa "Ejecutar BFS" o "Ejecutar DFS" para iniciar la simulación paso a paso.'
          )}
        </div>
      </div>
    </div>
  );
}

// --- 8. MST PANEL (Prim / Kruskal) ---
function MSTPanel() {
  const [displayMode, setDisplayMode] = useState('2D');
    const [preset, setPreset] = useState('microservices');
  const [customGraphStr, setCustomGraphStr] = useState("A-B:5, B-C:10, A-C:2");
  const [graphData, setGraphData] = useState(GRAPH_PRESETS.microservices);

  const parseCustomGraph = (str) => {
    let nodesSet = new Set();
    let edges = [];
    let parts = str.split(',').map(s => s.trim()).filter(s => s);
    parts.forEach(p => {
      let [link, w] = p.split(':');
      let weight = w ? parseInt(w) : 1;
      let [u, v] = link ? link.split('-') : [];
      if (u && v) {
        nodesSet.add(u.trim());
        nodesSet.add(v.trim());
        edges.push({ from: u.trim(), to: v.trim(), weight });
      }
    });
    
    let nodes = Array.from(nodesSet).map((id, i) => {
      let angle = (i / Math.max(1, nodesSet.size)) * 2 * Math.PI;
      return { id, x: 250 + 100 * Math.cos(angle), y: 150 + 100 * Math.sin(angle) };
    });
    
    if (nodes.length === 0) {
       nodes = [{ id: 'A', x: 250, y: 150 }];
    }
    return { nodes, edges };
  };

  useEffect(() => {
    if (preset === 'custom') {
      setGraphData(parseCustomGraph(customGraphStr));
    } else {
      setGraphData(GRAPH_PRESETS[preset] || GRAPH_PRESETS.microservices);
    }
  }, [preset, customGraphStr]);

  const [mstEdges, setMstEdges] = useState([]);
  const [mstWeight, setMstWeight] = useState(0);
  const [mstLog, setMstLog] = useState([]);
  const [running, setRunning] = useState(false);

  const runPrim = async () => {
    if (running) return;
    setRunning(true);
    setMstEdges([]);
    setMstWeight(0);
    
    let log = [];
    log.push("Iniciando algoritmo de Prim desde el nodo raíz HQ...");
    setMstLog([...log]);

    let visited = new Set(['HQ']);
    let edgesInMst = [];
    let currentWeight = 0;

    while (visited.size < graphData.nodes.length) {
      await new Promise(r => setTimeout(r, 1200));
      
      let bestEdge = null;
      let minW = Infinity;

      graphData.edges.forEach(e => {
        let uIn = visited.has(e.from);
        let vIn = visited.has(e.to);
        
        if ((uIn && !vIn) || (!uIn && vIn)) {
          if (e.weight < minW) {
            minW = e.weight;
            bestEdge = e;
          }
        }
      });

      if (bestEdge) {
        let newNode = visited.has(bestEdge.from) ? bestEdge.to : bestEdge.from;
        visited.add(newNode);
        edgesInMst.push(bestEdge);
        currentWeight += bestEdge.weight;
        
        log.push(`Elegida arista mínima cruzando corte: ${bestEdge.from}-${bestEdge.to} (peso ${bestEdge.weight}).`);
        log.push(`Incorporado nodo ${newNode} al MST. Vértices en MST: [ ${Array.from(visited).join(', ')} ]`);
        
        setMstEdges([...edgesInMst]);
        setMstWeight(currentWeight);
        setMstLog([...log]);
      } else {
        log.push("ERROR: El grafo es disconexo.");
        break;
      }
    }

    await new Promise(r => setTimeout(r, 800));
    log.push(`Prim completado. Peso total del MST = ${currentWeight}`);
    setMstLog([...log]);
    setRunning(false);
  };

  const runKruskal = async () => {
    if (running) return;
    setRunning(true);
    setMstEdges([]);
    setMstWeight(0);
    
    let log = [];
    log.push("Iniciando algoritmo de Kruskal...");
    log.push("Paso 1: Ordenando aristas por peso de forma ascendente...");
    setMstLog([...log]);

    let sortedEdges = [...graphData.edges].sort((a, b) => a.weight - b.weight);
    
    let parent = {};
    graphData.nodes.forEach(n => {
      parent[n.id] = n.id;
    });

    function find(i) {
      if (parent[i] === i) return i;
      parent[i] = find(parent[i]);
      return parent[i];
    }

    function union(i, j) {
      let rootI = find(i);
      let rootJ = find(j);
      parent[rootI] = rootJ;
    }

    let edgesInMst = [];
    let currentWeight = 0;
    let edgeIdx = 0;

    while (edgesInMst.length < graphData.nodes.length - 1 && edgeIdx < sortedEdges.length) {
      await new Promise(r => setTimeout(r, 1200));
      
      let nextEdge = sortedEdges[edgeIdx];
      let rootU = find(nextEdge.from);
      let rootV = find(nextEdge.to);

      if (rootU !== rootV) {
        union(rootU, rootV);
        edgesInMst.push(nextEdge);
        currentWeight += nextEdge.weight;
        log.push(`Arista ${nextEdge.from}-${nextEdge.to} (peso ${nextEdge.weight}) no forma ciclo. Añadida al MST.`);
        setMstEdges([...edgesInMst]);
        setMstWeight(currentWeight);
      } else {
        log.push(`Arista ${nextEdge.from}-${nextEdge.to} (peso ${nextEdge.weight}) SALTADA: formaría un ciclo.`);
      }
      
      edgeIdx++;
      setMstLog([...log]);
    }

    await new Promise(r => setTimeout(r, 800));
    log.push(`Kruskal completado. Peso total del MST = ${currentWeight}`);
    setMstLog([...log]);
    setRunning(false);
  };

  return (
    <div className="demo-layout">
      <div className="demo-panel">

        <div className="form-group" style={{marginTop: '12px'}}>
          <label className="form-label">Seleccionar Topología</label>
          <div className="input-row">
            <select className="input-control" value={preset} onChange={(e) => setPreset(e.target.value)}>
              <option value="microservices">Red de Microservicios</option>
              <option value="datacenters">Red de Data Centers</option>
              <option value="custom">Personalizado (Ingresar Manualmente)</option>
            </select>
          </div>
        </div>
        {preset === 'custom' && (
          <div className="form-group" style={{marginTop: '10px'}}>
             <label className="form-label">Aristas (ej: A-B:5, B-C:10)</label>
             <input type="text" className="input-control" value={customGraphStr} onChange={e => setCustomGraphStr(e.target.value)} placeholder="Ej: A-B:5, B-C:10" />
          </div>
        )}

        <div className="input-row" style={{ gap: '12px' }}>
          {/* Button-in-button design */}
          <button type="button" className="btn btn-premium btn-sm" onClick={runPrim} disabled={running}>
            <span>Ejecutar Prim</span>
            <span className="btn-icon-circle"><Play size={12} /></span>
          </button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={runKruskal} disabled={running}>
            <Play size={12} /> Ejecutar Kruskal
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span className="form-label" style={{ margin: 0 }}>Visualización del MST</span>
          <div className="view-toggle-container">
            <button type="button" className={`view-toggle-btn ${displayMode === '2D' ? 'active' : ''}`} onClick={() => setDisplayMode('2D')}>2D</button>
            <button type="button" className={`view-toggle-btn ${displayMode === '3D' ? 'active' : ''}`} onClick={() => setDisplayMode('3D')}>3D</button>
          </div>
        </div>
        {displayMode === '2D' ? (
          <div className="canvas-container" style={{ minHeight: '300px' }}>
            <svg className="svg-canvas" viewBox="0 0 500 300">
              {/* Premium Grid Pattern Background */}
              <defs>
                <pattern id="dot-grid-4" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.8" fill="rgba(0, 0, 0, 0.06)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dot-grid-4)" />

              {/* Draw edges */}
              {graphData.edges.map((e, idx) => {
                let fromNode = graphData.nodes.find(n => n.id === e.from);
                let toNode = graphData.nodes.find(n => n.id === e.to);
                if (!fromNode || !toNode) return null;
                
                let isMst = mstEdges.some(me => 
                  (me.from === e.from && me.to === e.to) || 
                  (me.from === e.to && me.to === e.from)
                );

                let midX = (fromNode.x + toNode.x) / 2;
                let midY = (fromNode.y + toNode.y) / 2;

                return (
                  <g key={`e-${idx}`}>
                    <line 
                      x1={fromNode.x} 
                      y1={fromNode.y} 
                      x2={toNode.x} 
                      y2={toNode.y} 
                      className={`edge-line ${isMst ? 'mst' : ''}`} 
                    />
                    <rect x={midX - 10} y={midY - 8} width="20" height="15" rx="3" fill="var(--bg-card)" stroke={isMst ? 'var(--secondary)' : 'var(--border)'} strokeWidth="1" />
                    <text x={midX} y={midY + 3} className="edge-text" style={{ fill: isMst ? 'var(--secondary)' : '' }}>{e.weight}</text>
                  </g>
                );
              })}

              {/* Draw nodes */}
              {graphData.nodes.map((n) => (
                <g key={n.id} transform={`translate(${n.x},${n.y})`}>
                  <circle r="16" className="node-circle active" />
                  <text className="node-text">{n.id}</text>
                </g>
              ))}
            </svg>
          </div>
        ) : (
          <div style={{ height: '300px', width: '100%', position: 'relative', marginBottom: '12px' }}>
            <Graph3DCanvas 
              mode="graph" 
              nodes={graphData.nodes} 
              edges={graphData.edges} 
              mstEdges={mstEdges} 
            />
          </div>
        )}

        <div className="math-block" style={{ margin: 0, padding: '10px 14px' }}>
          Peso Total del MST = <strong style={{ color: 'var(--secondary)' }}>{mstWeight}</strong>
        </div>
      </div>

      <div className="demo-panel">
        <div className="demo-title">
          <Activity size={14} /> Traza y Selección de Aristas
        </div>
        <div className="output-box" style={{ flexGrow: 1, minHeight: '350px' }}>
          {mstLog.length > 0 ? (
            mstLog.map((logLine, idx) => (
              <div key={idx} style={{ marginBottom: '6px', fontSize: '13px' }}>
                <span style={{ color: 'var(--secondary)', marginRight: '6px' }}>&gt;</span>
                {logLine}
              </div>
            ))
          ) : (
            'Pulsa "Ejecutar Prim" o "Ejecutar Kruskal" para iniciar la traza en tiempo real.'
          )}
        </div>
      </div>
    </div>
  );
}

// --- 9. TREE & AST PANEL ---
function TreeASTPanel() {
  const [displayMode, setDisplayMode] = useState('2D');
  const [expr, setExpr] = useState('(3 + 4) * (5 - 2)');
  const [astTree, setAstTree] = useState(null);
  const [evaluationLog, setEvaluationLog] = useState([]);
  const [evalResult, setEvalResult] = useState(null);
  const [traversalResult, setTraversalResult] = useState({});

  const handleParse = (e) => {
    if (e) e.preventDefault();
    try {
      let root = parseExpression(expr);
      setAstTree(root);
      setEvalResult(null);
      setEvaluationLog([]);

      let pre = getTraversalOrder(root, 'preorder');
      let ino = getTraversalOrder(root, 'inorder');
      let post = getTraversalOrder(root, 'postorder');
      let lvl = getLevelOrder(root);
      setTraversalResult({ pre, ino, post, lvl });
    } catch (err) {
      alert("Error al parsear la expresión.");
    }
  };

  const handleEvaluate = () => {
    if (!astTree) return;
    let log = [];
    let res = evaluateAST(astTree, log);
    setEvaluationLog(log);
    setEvalResult(res);
  };

  useEffect(() => {
    handleParse();
  }, []);

  let nodesList = [];
  if (astTree) {
    computeNodeCoordinates(astTree, 250, 40, 110, nodesList);
  }

  return (
    <div className="demo-layout">
      <div className="demo-panel">
        <form onSubmit={handleParse} className="form-group">
          <label className="form-label">Escribe tu Expresión Aritmética</label>
          <div className="input-row">
            <div style={{display:'flex', flexDirection:'column', gap:'8px', flexGrow: 1}}>
              <input 
                type="text" 
                className="input-control" 
                value={expr}
                onChange={(e) => setExpr(e.target.value)}
                placeholder="Ej: (3 + 4) * (5 - 2)"
              />
              <ScientificKeyboard onKeyPress={(k) => {
                if (k === 'C') setExpr('');
                else if (k === 'DEL') setExpr(prev => prev.slice(0, -1));
                else if (k === '=') { handleParse(); handleEvaluate(); }
                else setExpr(prev => prev + (['log','ln','sqrt','sin','cos','tan'].includes(k) ? k + '(' : k));
              }} />
            </div>
            {/* Button-in-button design */}
            <button type="submit" className="btn btn-premium btn-sm">
              <span>Generar AST</span>
              <span className="btn-icon-circle"><ArrowRight size={12} /></span>
            </button>
            <button type="button" onClick={handleEvaluate} className="btn btn-secondary btn-sm" disabled={!astTree}>
              Evaluar
            </button>
          </div>
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span className="form-label" style={{ margin: 0 }}>Visualización del AST</span>
          <div className="view-toggle-container">
            <button type="button" className={`view-toggle-btn ${displayMode === '2D' ? 'active' : ''}`} onClick={() => setDisplayMode('2D')}>2D</button>
            <button type="button" className={`view-toggle-btn ${displayMode === '3D' ? 'active' : ''}`} onClick={() => setDisplayMode('3D')}>3D</button>
          </div>
        </div>

        {displayMode === '2D' ? (
          <div className="canvas-container" style={{ minHeight: '300px' }}>
            <svg className="svg-canvas" viewBox="0 0 500 300">
              <defs>
                <pattern id="dot-grid-5" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.8" fill="rgba(0, 0, 0, 0.06)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dot-grid-5)" />

              {/* Edges */}
              {nodesList.map((n, i) => {
                if (n.parentX !== null && n.parentY !== null) {
                  return (
                    <line 
                      key={`e-${i}`}
                      x1={n.parentX} 
                      y1={n.parentY} 
                      x2={n.x} 
                      y2={n.y} 
                      className="edge-line active" 
                    />
                  );
                }
                return null;
              })}
              
              {/* Nodes */}
              {nodesList.map((n, i) => (
                <g key={`n-${i}`} transform={`translate(${n.x},${n.y})`}>
                  <circle r="16" className={`node-circle ${n.isLeaf ? 'visited' : 'active'}`} />
                  <text className="node-text">{n.name}</text>
                </g>
              ))}
            </svg>
          </div>
        ) : (
          <div style={{ height: '300px', width: '100%', position: 'relative', marginBottom: '12px' }}>
            <Graph3DCanvas 
              mode="tree" 
              nodes={nodesList.map(n => ({ name: n.name, x: n.x, y: n.y, parentX: n.parentX, parentY: n.parentY }))} 
            />
          </div>
        )}
        {evalResult !== null && (
          <div className="math-block" style={{ margin: 0 }}>
            Resultado de la Evaluación = <strong style={{ color: 'var(--secondary)' }}>{evalResult}</strong>
          </div>
        )}
      </div>

      <div className="demo-panel">
        <div className="demo-title">
          <Info size={14} /> Propiedades y Recorridos del Árbol
        </div>
        
        {astTree && (
          <div className="input-row" style={{ gap: '10px', marginBottom: '12px' }}>
            <div className="math-block" style={{ margin: 0, flex: 1 }}>
              <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>Altura Máxima</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary)' }}>
                {(function calcH(n){ return !n ? 0 : 1 + Math.max(calcH(n.left), calcH(n.right)); })(astTree)}
              </div>
            </div>
            <div className="math-block" style={{ margin: 0, flex: 1 }}>
              <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>Nodos Hoja</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--secondary)' }}>
                {(function calcL(n){ return !n ? 0 : (!n.left && !n.right) ? 1 : calcL(n.left) + calcL(n.right); })(astTree)}
              </div>
            </div>
          </div>
        )}

        <div className="output-box" style={{ fontSize: '13px', padding: '10px 14px' }}>
          {traversalResult.pre ? (
            `- Preorden (Raíz-Izq-Der):   [ ${traversalResult.pre.join(', ')} ]
- Inorden (Izq-Raíz-Der):    [ ${traversalResult.ino.join(', ')} ]
- Postorden (Izq-Der-Raíz):   [ ${traversalResult.post.join(', ')} ]
- Por niveles (BFS en Árbol): [ ${traversalResult.lvl.join(', ')} ]`
          ) : (
            'Ingresa una expresión para calcular los recorridos.'
          )}
        </div>

        <div className="demo-title" style={{ marginTop: '12px' }}>
          <Activity size={14} /> Traza de Evaluación Postorden
        </div>
        <div className="output-box" style={{ flexGrow: 1, minHeight: '180px' }}>
          {evaluationLog.length > 0 ? (
            evaluationLog.map((logLine, idx) => (
              <div key={idx} style={{ marginBottom: '6px', fontSize: '12px' }}>
                <span style={{ color: 'var(--secondary)', marginRight: '6px' }}>&gt;</span>
                {logLine}
              </div>
            ))
          ) : (
            'Pulsa "Evaluar" para ver la traza bottom-up.'
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// REUSABLE CODE VIEWER WITH TABS
// ============================================================================
function CodeViewer({ name, pseudo, js }) {
  const [activeLang, setActiveLang] = useState('pseudo');
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="code-container" style={{ borderStyle: 'solid' }}>
      <div className="code-header" style={{ cursor: 'pointer' }} onClick={() => setCollapsed(!collapsed)}>
        <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-bright)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Code size={16} style={{ color: 'var(--primary)' }} /> {name}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} onClick={(e) => e.stopPropagation()}>
          {!collapsed && (
            <div className="code-tabs">
              <button 
                className={`code-tab ${activeLang === 'pseudo' ? 'active' : ''}`}
                onClick={() => setActiveLang('pseudo')}
              >
                Pseudocódigo
              </button>
              {js && (
                <button 
                  className={`code-tab ${activeLang === 'js' ? 'active' : ''}`}
                  onClick={() => setActiveLang('js')}
                >
                  Javascript
                </button>
              )}
            </div>
          )}
          <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
            {collapsed ? '[Expandir]' : '[Colapsar]'}
          </span>
        </div>
      </div>
      
      {!collapsed && (
        <pre className="code-content">
          <code>
            {activeLang === 'pseudo' ? pseudo : js}
          </code>
        </pre>
      )}
    </div>
  );
}

// --- 0. VIDEO RESOURCES PANEL ---
function VideoResourcesPanel() {
  const videos = [
    { title: "Estructuras de Datos: Árboles AST", id: "7tCNu4CnjVc", desc: "Conceptos básicos sobre Árboles de Sintaxis Abstracta." },
    { title: "Grafos y Algoritmo de Dijkstra", id: "EFg3u_E6eHU", desc: "Explicación del algoritmo de la ruta más corta." },
    { title: "MergeSort y Algoritmos Divide y Vencerás", id: "4VqmGXwpLqc", desc: "Clase sobre recursividad y partición de arreglos." },
    { title: "Probabilidad y Teorema de Bayes", id: "HZGCoVF3YvM", desc: "Fundamentos de probabilidad condicional." }
  ];

  return (
    <div className="demo-layout">
      <div className="demo-panel" style={{ width: '100%' }}>
        <div className="demo-title">
          <Video size={14} /> Repositorio de Videos Educativos
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Aquí encontrarás explicaciones paso a paso de los temas fundamentales de Estructuras Discretas II. Estos videos te ayudarán a afianzar los conceptos matemáticos implementados en los simuladores.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {videos.map((v, i) => (
            <div key={i} className="math-block" style={{ margin: 0, padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontWeight: 'bold', color: 'var(--text-main)', fontSize: '14px' }}>{v.title}</div>
              <iframe 
                width="100%" 
                height="180" 
                src={`https://www.youtube.com/embed/${v.id}`} 
                title={v.title} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{ borderRadius: '6px' }}
              ></iframe>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
