<template>
  <div ref="containerRef" class="hero-form" aria-hidden="true" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'

const containerRef = ref<HTMLElement | null>(null)

function buildRibbon(NL: number, NR: number) {
  const pos: number[] = []
  const uc: number[] = []
  const idx: number[] = []
  const up = new THREE.Vector3(0, 1, 0)
  const P = new THREE.Vector3()
  const Pn = new THREE.Vector3()
  const T = new THREE.Vector3()
  const Nrm = new THREE.Vector3()
  const B = new THREE.Vector3()
  const W = new THREE.Vector3()
  const Th = new THREE.Vector3()
  const tmp = new THREE.Vector3()
  const rx = 0.54
  const ry = 0.075

  function path(u: number, out: THREE.Vector3) {
    out.set(
      (u - 0.5) * 3.15,
      Math.sin(u * Math.PI * 1.05 - 0.35) * 0.44 - 0.04,
      Math.sin(u * Math.PI * 0.85) * 0.55,
    )
  }

  for (let i = 0; i < NL; i += 1) {
    const u = i / (NL - 1)
    path(u, P)
    path(Math.min(1, u + 0.001), Pn)
    T.subVectors(Pn, P).normalize()
    Nrm.copy(up).addScaledVector(T, -up.dot(T))
    if (Nrm.lengthSq() < 1e-6) Nrm.set(1, 0, 0)
    Nrm.normalize()
    B.crossVectors(T, Nrm).normalize()
    const tw = u * Math.PI * 2.05 + 0.35
    const ct = Math.cos(tw)
    const st = Math.sin(tw)
    W.copy(Nrm).multiplyScalar(ct).addScaledVector(B, st)
    Th.copy(Nrm).multiplyScalar(-st).addScaledVector(B, ct)
    const taper = Math.pow(Math.sin(Math.PI * u), 0.5)
    const rxe = rx * (0.40 + 0.60 * taper)
    const rye = ry * (0.55 + 0.45 * taper)
    for (let j = 0; j < NR; j += 1) {
      const th = (j / NR) * Math.PI * 2
      tmp.copy(P).addScaledVector(W, rxe * Math.cos(th)).addScaledVector(Th, rye * Math.sin(th))
      pos.push(tmp.x, tmp.y, tmp.z)
      uc.push(u)
    }
  }

  for (let i = 0; i < NL - 1; i += 1) {
    for (let j = 0; j < NR; j += 1) {
      const a = i * NR + j
      const b = i * NR + ((j + 1) % NR)
      const c = (i + 1) * NR + j
      const d = (i + 1) * NR + ((j + 1) % NR)
      idx.push(a, c, b, b, c, d)
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  geometry.setAttribute('uCoord', new THREE.Float32BufferAttribute(uc, 1))
  geometry.setIndex(idx)
  geometry.computeVertexNormals()
  return geometry
}

const SOLID_V = `
  attribute float uCoord;
  varying float vU; varying vec3 vN; varying vec3 vWorld;
  void main(){
    vU=uCoord;
    vec4 wp=modelMatrix*vec4(position,1.0);
    vWorld=wp.xyz;
    vN=normalize(normalMatrix*normal);
    gl_Position=projectionMatrix*viewMatrix*wp;
  }`

const SOLID_F = `
  precision highp float;
  varying float vU; varying vec3 vN; varying vec3 vWorld;
  uniform vec3 uIvory; uniform vec3 uShadow; uniform vec3 uTerra;
  void main(){
    vec3 N=normalize(vN);
    if(!gl_FrontFacing) N=-N;
    vec3 Vd=normalize(cameraPosition - vWorld);
    vec3 L=normalize(vec3(0.55,0.85,0.65));
    float diff=clamp(dot(N,L),0.0,1.0);
    float amb=0.46 + 0.26*N.y;
    vec3 base=mix(uShadow, uIvory, clamp(diff*0.85+amb*0.45,0.0,1.0));
    float fres=pow(1.0-clamp(dot(N,Vd),0.0,1.0),3.0);
    base += fres*0.14;
    float bands=smoothstep(0.55,0.98,0.5+0.5*sin(vWorld.y*66.0));
    float buildZone=smoothstep(0.30,0.52,vU)*(1.0-smoothstep(0.66,0.9,vU));
    base=mix(base, base*0.80 + uTerra*0.03, bands*(0.10+0.55*buildZone));
    float solid=smoothstep(0.44,0.74,vU);
    float alpha=max(solid, buildZone*0.55);
    if(alpha<0.02) discard;
    gl_FragColor=vec4(base, alpha);
  }`

const WIRE_V = `
  attribute float uCoord; varying float vU;
  void main(){ vU=uCoord; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`

const WIRE_F = `
  precision highp float;
  varying float vU; uniform vec3 uTerra; uniform float uTime;
  void main(){
    float a=1.0 - smoothstep(0.12,0.48,vU);
    float pulse=0.6 + 0.4*sin(uTime*1.4 - vU*10.0);
    a*=0.55 + 0.45*pulse;
    if(a<0.02) discard;
    gl_FragColor=vec4(uTerra, a*0.85);
  }`

let cleanup: (() => void) | null = null

onMounted(() => {
  const container = containerRef.value
  if (!container) return

  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  } catch {
    return
  }

  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
  camera.position.set(0, 0, 7)

  const baseRot = { x: -0.14, y: -0.38, z: 0.20 }
  const group = new THREE.Group()
  group.rotation.set(baseRot.x, baseRot.y, baseRot.z)
  scene.add(group)

  const uniforms = {
    uTime: { value: 0 },
    uIvory: { value: new THREE.Color('#ECE3CF') },
    uShadow: { value: new THREE.Color('#B49F80') },
    uTerra: { value: new THREE.Color('#E1A137') },
  }
  const solidGeometry = buildRibbon(260, 22)
  const wireGeometry = buildRibbon(74, 9)
  const solidMat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: SOLID_V,
    fragmentShader: SOLID_F,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: true,
  })
  const wireMat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: WIRE_V,
    fragmentShader: WIRE_F,
    transparent: true,
    wireframe: true,
    depthWrite: false,
  })

  const solid = new THREE.Mesh(solidGeometry, solidMat)
  solid.renderOrder = 1
  const wire = new THREE.Mesh(wireGeometry, wireMat)
  wire.renderOrder = 0
  group.add(wire, solid)

  let baseY = 0
  const resize = () => {
    const w = container.clientWidth || 1
    const h = container.clientHeight || 1
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    const small = w < 820
    baseY = small ? -0.24 : -0.46
    group.position.x = small ? 0.04 : 1.06
    group.position.y = baseY
    group.scale.setScalar(small ? 0.88 : 1.20)
  }

  let tx = 0
  let ty = 0
  let px = 0
  let py = 0
  const pointerMove = (event: PointerEvent) => {
    tx = event.clientX / window.innerWidth - 0.5
    ty = event.clientY / window.innerHeight - 0.5
  }

  const reduceRibbon = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let running = true
  const observer = new IntersectionObserver((entries) => {
    running = Boolean(entries[0]?.isIntersecting)
  }, { threshold: 0 })

  let raf = 0
  const t0 = performance.now()
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame)
    if (!running) return
    const t = (now - t0) / 1000
    uniforms.uTime.value = t
    px += (tx - px) * 0.045
    py += (ty - py) * 0.045
    const scrollK = (window.scrollY || 0) / (window.innerHeight || 1)
    if (!reduceRibbon) {
      group.rotation.y = baseRot.y + Math.sin(t * 0.28) * 0.12 + px * 0.28
      group.rotation.x = baseRot.x + Math.sin(t * 0.22) * 0.045 - py * 0.12
      group.rotation.z = baseRot.z + px * 0.04
      group.position.y = baseY + Math.sin(t * 0.55) * 0.06 - scrollK * 0.45
    }
    renderer.render(scene, camera)
  }

  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', pointerMove, { passive: true })
  observer.observe(container)

  if (reduceRibbon) {
    renderer.render(scene, camera)
  } else {
    raf = requestAnimationFrame(frame)
  }

  cleanup = () => {
    cancelAnimationFrame(raf)
    observer.disconnect()
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', pointerMove)
    solidGeometry.dispose()
    wireGeometry.dispose()
    solidMat.dispose()
    wireMat.dispose()
    renderer.dispose()
    renderer.domElement.remove()
  }
})

onBeforeUnmount(() => {
  cleanup?.()
})
</script>
