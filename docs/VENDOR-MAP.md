# Vendor symbol map — three.js r180

What the mangled vendor identifiers in `public/assets/index-DCXbw2vV.js`
actually are. Vendor occupies bundle lines 1–25400 (three.js r180 +
`OrbitControls`); the app is 25401 onward.

Version confirmed twice: `const Ia = "180"` at bundle line 41, and
`window.__THREE__` at runtime.

## Headline

- **48 real vendor symbols**, 237 references — not 64/278.
- `tools/scope_graph.py` reports 64 because its 2-char heuristic has both a
  **false-positive** and a **false-negative** failure mode. Both are corrected
  below.
- Every one of the 48 is identified **certain**. Nothing is unidentified.
- The single largest dependency, `P` = `Vector3` with **60 references**, is
  invisible to the current tool because it is one character long.

## Correcting the tool's symbol list

### False negatives — 1-character names are never counted

`scope_graph.py` only records an unresolved identifier as vendor when
`len(name) == 2`. The vendor half declares exactly two top-level 1-char names,
and the app uses both:

| symbol | refs | what it is                                                                                                                                                                                                                                                                                            |
| ------ | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `P`    | 60   | **`Vector3`** — `class P` at bundle L1215, `P.prototype.isVector3 = !0`, `constructor(t=0,e=0,n=0)` setting `.x/.y/.z`. Never shadowed in `src/`.                                                                                                                                                     |
| `K`    | 124  | **Not three.js.** Bundler helper at bundle L6: `var K = (i,t,e) => Wh(i, typeof t != "symbol" ? t+"" : t, e)` — esbuild/Vite's `__publicField`, used for class-field initialisers (`K(this, "structGroup", new rn())`). It disappears when the app is compiled from real source; it is not an import. |

A scan for vendor top-level names of length ≥ 3 referenced by the app found
**none**, so with `P` added the surface is complete.

### False positives — 17 of the reported 64 are app-local names

The heuristic treats any unresolved 2-char token as vendor. Object-literal keys
and indented local declarations are not preceded by `.`, so they leak in.

**Object property names in the app's own data (14):**

| reported            | refs   | actually                                                 |
| ------------------- | ------ | -------------------------------------------------------- |
| `id`                | 25     | `id:` action/request key — `{ t:"emb", id: 17, ... }`    |
| `cx`                | 12     | arch-centre key — `{ cx: 0, r: 2.1, springY: 3.1 }`      |
| `x0` `x1` `z0` `z1` | 5 each | terrain-region bounds in `05-world.js:33-37`             |
| `ax` `az` `bx` `bz` | 4 each | span endpoints — `{ ax: -88, az: -44, bx: 30, bz: -44 }` |
| `ay` `by`           | 3 each | span endpoint heights                                    |
| `cy` `cz`           | 2 each | cloud-centre keys — `{ cx:-30, cz:-20, cy:42, r:34 }`    |

`x0` and `z0` do also exist as `function x0(i)` / `function z0(i)` in the vendor
half, but every counted app occurrence is an object key in `05-world.js`, never
a call. Coincidence of naming, not a reference.

**Local variables inside app functions (3):**

| reported | refs | actually                                                                         |
| -------- | ---- | -------------------------------------------------------------------------------- |
| `Lt`     | 11   | loop/temp local, e.g. `for (let Lt = I; Lt <= F; Lt += 2)` — `04-builders.js:34` |
| `pt`     | 6    | temp local — `const pt = s.x + c.x * B` — `04-builders.js:46`                    |
| `th`     | 1    | thickness key — `th: 3.2` — `05-world.js:346`                                    |

`Lt` and `pt` do appear in the vendor half, but only as function-scoped locals
there too; neither is a top-level declaration in either half.

64 − 17 + 1 (`P`) = **48**.

---

## The map

Evidence codes: **F** = `is*` prototype flag; **T** = `this.type = "..."` string
literal set in the constructor; **C** = constructor signature / properties;
**V** = literal constant value; **S** = app call site. Bundle line numbers are
of the declaration.

### Core math and scene graph

| symbol | refs | three.js r180   | line  | evidence                                                                                                                                                       | confidence |
| ------ | ---- | --------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `P`    | 60   | `Vector3`       | 1215  | **F** `P.prototype.isVector3 = !0`; **C** `(t=0,e=0,n=0)` → `.x/.y/.z`                                                                                         | certain    |
| `at`   | 3    | `Vector2`       | 561   | **F** `at.prototype.isVector2 = !0`; **C** `(t=0,e=0)` → `.x/.y`; `get width/height`                                                                           | certain    |
| `se`   | 3    | `Matrix4`       | 3554  | **F** `se.prototype.isMatrix4 = !0`; **C** 16 args, `.elements` 16-long identity; `makePerspective`, `decompose`                                               | certain    |
| `ri`   | 1    | `Quaternion`    | 789   | **F** `isQuaternion`; **C** `(t=0,e=0,n=0,s=1)` → `_x/_y/_z/_w`; `slerpFlat`, `setFromEuler`                                                                   | certain    |
| `Ht`   | 6    | `Color`         | 5402  | **F** `isColor`; **C** `.r/.g/.b` = 1 then `this.set(t,e,n)`; **S** `new Ht("#efe8d8")`                                                                        | certain    |
| `Fn`   | 1    | `Plane`         | 8060  | **F** `isPlane`; **C** `(normal = new P(1,0,0), constant = 0)`; **S** `new Fn(new P(-1,0,0), 0)` for the SECTION cut plane                                     | certain    |
| `Re`   | 2    | `Object3D`      | 4596  | **F** `isObject3D`; **T** `"Object3D"`; `Re.DEFAULT_UP`, `traverse`, `localToWorld`; **S** used as the `dummy` matrix carrier for `InstancedMesh`              | certain    |
| `rn`   | 9    | `Group`         | 7668  | **F** `isGroup`; **T** `"Group"`; 4-line class                                                                                                                 | certain    |
| `he`   | 17   | `Mesh`          | 6899  | **F** `isMesh`; **T** `"Mesh"`; **C** `(geometry = new ve(), material = new yi())`                                                                             | certain    |
| `sh`   | 2    | `InstancedMesh` | 7936  | **F** `isInstancedMesh`; extends `he`(Mesh); `.instanceMatrix`, `setMatrixAt`, `setColorAt`                                                                    | certain    |
| `yr`   | 4    | `Line`          | 8288  | **F** `isLine`; **T** `"Line"`; **C** `(geometry, material = new Ya())`; `computeLineDistances`                                                                | certain    |
| `ih`   | 2    | `Scene`         | 7849  | **F** `isScene`; **T** `"Scene"`; `.background/.environment/.fog/.overrideMaterial`                                                                            | certain    |
| `vh`   | 2    | `Raycaster`     | 11224 | **C** `(origin, direction, near = 0, far = Infinity)`, `.ray = new Br(...)`, `.params = {Mesh:{},Line:{threshold:1},...}`; `setFromCamera`, `intersectObjects` | certain    |
| `Xa`   | 1    | `FogExp2`       | 7830  | **F** `isFogExp2`; **C** `(color, density = 25e-5)`; **S** `je.fog = new Xa(...)`                                                                              | certain    |

### Geometry

| symbol | refs | three.js r180      | line  | evidence                                                                                                                                                         | confidence |
| ------ | ---- | ------------------ | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `ve`   | 12   | `BufferGeometry`   | 6378  | **F** `isBufferGeometry`; **T** `"BufferGeometry"`; `setAttribute`, `setFromPoints`, `computeVertexNormals`, `applyMatrix4`                                      | certain    |
| `pe`   | 16   | `BufferAttribute`  | 6155  | **F** `isBufferAttribute`; **C** `(array, itemSize, normalized=!1)`, throws on plain Array; `setXYZ`, `setUsage`; **S** `new pe(s, 2)` for the `aTone` attribute | certain    |
| `le`   | 23   | `BoxGeometry`      | 7092  | **T** `"BoxGeometry"`; **C** `(w,h,d,ws,hs,ds)` all default 1                                                                                                    | certain    |
| `Fe`   | 14   | `CylinderGeometry` | 8448  | **T** `"CylinderGeometry"`; **C** `(rTop, rBottom, height, radialSeg=32, heightSeg=1, openEnded=!1, thetaStart=0, thetaLength=2π)`                               | certain    |
| `ls`   | 4    | `ConeGeometry`     | 8575  | **T** `"ConeGeometry"`; extends `Fe`(Cylinder) calling `super(0, t, e, ...)` — the top-radius-0 specialisation                                                   | certain    |
| `Pr`   | 2    | `SphereGeometry`   | 10490 | **T** `"SphereGeometry"`; **C** `(radius=1, widthSeg=32, heightSeg=16, phiStart, phiLength=2π, thetaStart, thetaLength=π)`                                       | certain    |
| `Ai`   | 3    | `PlaneGeometry`    | 10437 | **T** `"PlaneGeometry"`; **C** `(w,h,ws,hs)`                                                                                                                     | certain    |
| `Hr`   | 2    | `TorusGeometry`    | 10575 | **T** `"TorusGeometry"`; **C** `(radius=1, tube=0.4, radialSeg=12, tubularSeg=48, arc=2π)`                                                                       | certain    |
| `Si`   | 5    | `ExtrudeGeometry`  | 10067 | **T** `"ExtrudeGeometry"`; **C** `(shapes = new ss([...Vector2]), options = {})`; **S** `new Si(shape, {depth, bevelEnabled:!1, curveSegments})`                 | certain    |
| `$a`   | 1    | `TubeGeometry`     | 10634 | **T** `"TubeGeometry"`; **C** `(path, tubularSegments=64, radius=1, radialSegments=8, closed=!1)`; **S** `new $a(catmullCurve, 48, 2.4, 5)`                      | certain    |
| `ss`   | 5    | `Shape`            | 9525  | **T** `"Shape"`; extends `Ma`(Path); `.holes`, `extractPoints`                                                                                                   | certain    |
| `Ma`   | 1    | `Path`             | 9450  | **T** `"Path"`; `moveTo/lineTo/quadraticCurveTo/bezierCurveTo/absarc`, `.currentPoint = new at()`                                                                | certain    |
| `oh`   | 1    | `CatmullRomCurve3` | 8873  | **F** `isCatmullRomCurve3`; **C** `(points=[], closed=!1, curveType="centripetal", tension=0.5)`                                                                 | certain    |

### Materials

| symbol | refs | three.js r180         | line  | evidence                                                                                                                        | confidence |
| ------ | ---- | --------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `yi`   | 5    | `MeshBasicMaterial`   | 6102  | **F** `isMeshBasicMaterial`; **T** `"MeshBasicMaterial"`                                                                        | certain    |
| `Ea`   | 3    | `MeshLambertMaterial` | 10806 | **F** `isMeshLambertMaterial`; **T** `"MeshLambertMaterial"`                                                                    | certain    |
| `Vd`   | 1    | `MeshPhongMaterial`   | 10728 | **F** `isMeshPhongMaterial`; **T** `"MeshPhongMaterial"`; `.specular = new Ht(1118481)`, `.shininess = 30`                      | certain    |
| `Vn`   | 1    | `ShaderMaterial`      | 7235  | **F** `isShaderMaterial`; **T** `"ShaderMaterial"`; `.uniforms/.vertexShader/.fragmentShader`; **S** the post-process `postMat` | certain    |
| `Ya`   | 1    | `LineBasicMaterial`   | 8255  | **F** `isLineBasicMaterial`; **T** `"LineBasicMaterial"`                                                                        | certain    |
| `gh`   | 2    | `LineDashedMaterial`  | 10934 | **F** `isLineDashedMaterial`; **T** `"LineDashedMaterial"`; `.scale/.dashSize/.gapSize`; **S** the build guides                 | certain    |

### Cameras, lights, renderer

| symbol | refs | three.js r180        | line  | evidence                                                                                                                                                                                                                                                             | confidence |
| ------ | ---- | -------------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `un`   | 1    | `PerspectiveCamera`  | 7354  | **F** `isPerspectiveCamera`; **T** `"PerspectiveCamera"`; **C** `(fov=50, aspect=1, near=0.1, far=2000)`; **S** `new un(46, 2, 0.4, 1200)`                                                                                                                           | certain    |
| `Ja`   | 1    | `OrthographicCamera` | 11090 | **F** `isOrthographicCamera`; **T** `"OrthographicCamera"`; **S** `new Ja(-1,1,1,-1,0,1)` — the fullscreen-quad post camera                                                                                                                                          | certain    |
| `Zd`   | 1    | `DirectionalLight`   | 11193 | **F** `isDirectionalLight`; **T** `"DirectionalLight"`; `.target`, `.shadow = new Kd()`                                                                                                                                                                              | certain    |
| `qd`   | 1    | `HemisphereLight`    | 10988 | **F** `isHemisphereLight`; **T** `"HemisphereLight"`; **C** `(skyColor, groundColor, intensity)` → `.groundColor`                                                                                                                                                    | certain    |
| `N0`   | 1    | `WebGLRenderer`      | 23099 | **F** `isWebGLRenderer`; **C** destructures `{canvas, context, depth, stencil, alpha, antialias, premultipliedAlpha, preserveDrawingBuffer, powerPreference, failIfMajorPerformanceCaveat, reversedDepthBuffer}`; `get/set outputColorSpace`, `get coordinateSystem` | certain    |
| `Gn`   | 2    | `WebGLRenderTarget`  | 2943  | **F** `isWebGLRenderTarget`; **C** `(width=1, height=1, options={})`                                                                                                                                                                                                 | certain    |
| `Ka`   | 1    | `DepthTexture`       | 8410  | **F** `isDepthTexture`; **C** throws unless format is `DepthFormat`/`DepthStencilFormat`; `.flipY = !1`, `.compareFunction`                                                                                                                                          | certain    |

### Constants

| symbol | refs | three.js r180      | value    | evidence                                                                                                                                                                                         | confidence |
| ------ | ---- | ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `Ve`   | 3    | `SRGBColorSpace`   | `"srgb"` | **V**; position in the verbatim r180 `constants.js` run `Jn=""`(NoColorSpace), `Ve="srgb"`, `ns="srgb-linear"`, `Er="linear"`, `ce="srgb"`(SRGBTransfer). **S** `renderer.outputColorSpace = Ve` | certain    |
| `Ze`   | 4    | `LinearFilter`     | `1006`   | **V** unique numeric constant; **S** `minFilter: Ze, magFilter: Ze`                                                                                                                              | certain    |
| `si`   | 1    | `UnsignedIntType`  | `1014`   | **V** unique numeric constant; **S** `depthTexture.type = si`                                                                                                                                    | certain    |
| `_n`   | 2    | `DoubleSide`       | `2`      | **V** + position in the `ii=0, $e=1, _n=2` run (FrontSide/BackSide/DoubleSide); **S** `{ side: _n }`                                                                                             | certain    |
| `kn`   | 1    | `NoToneMapping`    | `0`      | **V** + vendor L18436 `e.toneMapping !== kn ? "#define TONE_MAPPING" : ""`; **S** `renderer.toneMapping = kn`                                                                                    | certain    |
| `Ua`   | 1    | `PCFShadowMap`     | `1`      | **V** + vendor L18102 `i.shadowMapType === Ua ? (t = "SHADOWMAP_TYPE_PCF")`; **S** `renderer.shadowMap.type = Ua`                                                                                | certain    |
| `Lu`   | 1    | `DynamicDrawUsage` | `35048`  | **V** = `GL_DYNAMIC_DRAW`; **S** `instanceMatrix.setUsage(Lu)`                                                                                                                                   | certain    |

### Addon

| symbol | refs | three.js r180                                              | line  | evidence                                                                                                                                                                                                                 | confidence |
| ------ | ---- | ---------------------------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `O0`   | 1    | `OrbitControls` (`three/addons/controls/OrbitControls.js`) | 24624 | extends `$d` (the r180 `Controls` base, itself `extends Ei`/EventDispatcher); `.minDistance/.maxPolarAngle/.enableDamping`, `_handleTouchStartDollyRotate`, `getPolarAngle`; **S** `new O0(camera, renderer.domElement)` | certain    |

---

## The import list

Replacing the vendored 751 KB with real imports needs exactly this:

```js
import {
  // math
  Vector2,
  Vector3,
  Matrix4,
  Quaternion,
  Color,
  Plane,
  // scene graph
  Object3D,
  Group,
  Mesh,
  InstancedMesh,
  Line,
  Scene,
  Raycaster,
  FogExp2,
  // geometry
  BufferGeometry,
  BufferAttribute,
  BoxGeometry,
  CylinderGeometry,
  ConeGeometry,
  SphereGeometry,
  PlaneGeometry,
  TorusGeometry,
  ExtrudeGeometry,
  TubeGeometry,
  Shape,
  Path,
  CatmullRomCurve3,
  // materials
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  ShaderMaterial,
  LineBasicMaterial,
  LineDashedMaterial,
  // cameras / lights / renderer
  PerspectiveCamera,
  OrthographicCamera,
  DirectionalLight,
  HemisphereLight,
  WebGLRenderer,
  WebGLRenderTarget,
  DepthTexture,
  // constants
  SRGBColorSpace,
  LinearFilter,
  UnsignedIntType,
  DoubleSide,
  NoToneMapping,
  PCFShadowMap,
  DynamicDrawUsage,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
```

47 named exports from `three@0.180` plus `OrbitControls`. `K` is not an import —
it is the bundler's class-field helper and vanishes on recompile.

Notably absent, given a 5,500-line 3D game: no `Texture`/`TextureLoader`, no
`GLTFLoader`, no `AnimationMixer`, no `Points`/`Sprite`, no `PointLight` or
`AmbientLight`, no `Box3`/`Sphere`/`Frustum`, no `MeshStandardMaterial`. All
world geometry is generated in-process and all lighting is Lambert plus the
custom engraving `onBeforeCompile` hook.

## Recommended fix to `tools/scope_graph.py`

Two changes would make the vendor list trustworthy without hand-checking:

1. Accept 1-char unresolved identifiers as vendor candidates (currently
   `len(name) == 2` silently drops `P`, the largest dependency of all).
2. Cross-check each candidate against column-0 declarations in bundle lines
   1–25400, and separately against **indented** declarations inside `src/`. A
   candidate that is not declared at vendor top level, or that _is_ declared as
   a local in `src/`, is a false positive. That alone removes all 17 listed
   above.
