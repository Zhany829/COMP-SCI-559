/*jshint esversion: 6 */
// @ts-check

/**
 * Two Textured Triangles Example - done using old style "Geometry"
 * note the use of the deprecated Geometry.js
 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";
import * as Geom from "../libs/CS559-Three/examples/jsm/deprecated/Geometry.js";

const s2 = Math.sqrt(2) / 2;

/**
 * base triangle pair - no texture, plain white material
 */
class TwoTriangles extends GrObject {
  constructor() {
    let geometry = new Geom.Geometry();
    //
    geometry.vertices.push(new T.Vector3(-1, 1, -1));
    geometry.vertices.push(new T.Vector3(0, 0, 0));
    geometry.vertices.push(new T.Vector3(0, 2, 0));
    geometry.vertices.push(new T.Vector3(1, 1, -1));
    //
    let f1 = new Geom.Face3(0, 1, 2);
    geometry.faces.push(f1);
    let f2 = new Geom.Face3(1, 3, 2);
    geometry.faces.push(f2);
    geometry.computeFaceNormals();
    //
    let material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75
    });
    let bg = geometry.toBufferGeometry();
    let mesh = new T.Mesh(bg, material);
    super("TwoTriangles1", mesh);
  }
}

class TwoTrianglesTextured extends GrObject {
  constructor() {
    let geometry = new Geom.Geometry();
    //
    geometry.vertices.push(new T.Vector3(-1, 1, -1));
    geometry.vertices.push(new T.Vector3(0, 0, 0));
    geometry.vertices.push(new T.Vector3(0, 2, 0));
    geometry.vertices.push(new T.Vector3(1, 1, -1));
    //
// @@Snippet:texcoords
    let f1 = new Geom.Face3(0, 1, 2);
    geometry.faceVertexUvs = [[]];
    geometry.faces.push(f1);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1)
    ]);
// @@Snippet:end
    let f2 = new Geom.Face3(1, 3, 2);
    geometry.faces.push(f2);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
      new T.Vector2(0, 1)
    ]);
    geometry.computeFaceNormals();
    geometry.uvsNeedUpdate = true;
    //

    let tl = new T.TextureLoader().load("../textures/UV_Grid_Sm.jpg");
    let material = new T.MeshStandardMaterial({ map: tl, roughness: 0.75 });
    let bg = geometry.toBufferGeometry();
    let mesh = new T.Mesh(bg, material);
    super("TwoTriangles2", mesh);
  }
}

/** 
 * textured, but taking advantage of the split vertex so each triangle
 * gets a different part of the texture
 */
class TwoTrianglesTextured2 extends GrObject {
  constructor() {
    let geometry = new Geom.Geometry();
    //
    geometry.vertices.push(new T.Vector3(-1, 1, -1));
    geometry.vertices.push(new T.Vector3(0, 0, 0));
    geometry.vertices.push(new T.Vector3(0, 2, 0));
    geometry.vertices.push(new T.Vector3(1, 1, -1));
    //
    geometry.faceVertexUvs = [[]];
    let f1 = new Geom.Face3(0, 1, 2);
    geometry.faces.push(f1);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(0.5, 0),
      new T.Vector2(0, 0.5)
    ]);
    let f2 = new Geom.Face3(1, 3, 2);
    geometry.faces.push(f2);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0.75, 1),
      new T.Vector2(1, 0.75)
    ]);
    geometry.computeFaceNormals();
    geometry.uvsNeedUpdate = true;
    //

    let tl = new T.TextureLoader().load("../textures/UV_Grid_Sm.jpg");
    let material = new T.MeshStandardMaterial({ map: tl, roughness: 0.75 });
    let bg = geometry.toBufferGeometry();
    let mesh = new T.Mesh(bg, material);
    super("TwoTriangles3", mesh);
  }
}

function shift(grobj, x) {
  grobj.objects[0].translateX(x);
  return grobj;
}

// main part (was a function)
let mydiv = document.getElementById("div1");

let box = InputHelpers.makeBoxDiv({ width: mydiv ? 640 : 820 }, mydiv);
if (!mydiv) {
    InputHelpers.makeBreak(); // sticks a break after the box
}
InputHelpers.makeHead("Texture Test", box);

let world = new GrWorld({ width: mydiv ? 600 : 800, where: box });

let tt = shift(new TwoTriangles(), -3);
world.add(tt);
let t2 = shift(new TwoTrianglesTextured(), 0);
world.add(t2);
let t3 = shift(new TwoTrianglesTextured2(), 3);
world.add(t3);

let div = InputHelpers.makeBoxDiv({}, box);

let sl = new InputHelpers.LabelSlider("ry", { min: -2, max: 2, where: div });
sl.oninput = function(evt) {
    let v = sl.value();
    tt.objects[0].rotation.y = v;
    t2.objects[0].rotation.y = v;
    t3.objects[0].rotation.y = v;
};

// @@Snippet:loadtexmat
let t1 = new T.TextureLoader().load("../textures/UV_Grid_Sm.jpg");
let m1 = new T.MeshBasicMaterial({ map: t1, side: T.DoubleSide });
// @@Snippet:end
let p1 = new T.PlaneGeometry(1, 1, 1, 1);
let g1 = new T.Mesh(p1, m1);
g1.translateY(3);
world.scene.add(g1);

world.ambient.intensity = 0.6;

world.go();
