/*jshint esversion: 6 */
// @ts-check

/**
 * Draw Two Triangles - but set the normals in different ways
 * 
 * Only "old-style" Geometry has face normals (so we do that)
 * 
 * For BufferGeometry we show things with Vertex normals (split)
 * For smooth normals, we do it with both split (just happens to be the same)
 * as well as shared (so they can be computed)
 * 
 * We keep the "old" Geometry since we have nice ways to show the vertices
 * We also put the "new" Buffer Geometry in the background, so you can look
 * at the code.
 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";
import * as Geom from "../libs/CS559-Three/examples/jsm/deprecated/Geometry.js";
import {FontLoader} from "../libs/CS559-Three/examples/jsm/loaders/FontLoader.js";
import {TextGeometry} from "../libs/CS559-Three/examples/jsm/geometries/TextGeometry.js";

const s2 = Math.sqrt(2) / 2;

/**
 * Face normals - only works with old-fashioned Geometry
 * since only old-fashioned geometry has Face normals
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
      color: "yellow",
      roughness: 0.75
    });
    let bg = geometry.toBufferGeometry();
    let mesh = new T.Mesh(bg, material);
    let group = normal_helper(geometry, true);
    group.add(mesh);
    super("TwoTriangles1", group);
  }
}

/**
 * flat triangles (face normals) - implemented by splitting vertices
 * since that's what we have to do with buffer geometry.
 */
class TwoNormalTriangles extends GrObject {
  constructor() {
    let geometry = new Geom.Geometry();
    //
    geometry.vertices.push(new T.Vector3(-1, 1, -1));
    geometry.vertices.push(new T.Vector3(0, 0, 0));
    geometry.vertices.push(new T.Vector3(0, 2, 0));
    geometry.vertices.push(new T.Vector3(1, 1, -1));
    //
    let f1 = new Geom.Face3(0, 1, 2);
    f1.vertexNormals[0] = new T.Vector3(-s2, 0, s2);
    f1.vertexNormals[1] = new T.Vector3(-s2, 0, s2);
    f1.vertexNormals[2] = new T.Vector3(-s2, 0, s2);
    geometry.faces.push(f1);
    let f2 = new Geom.Face3(1, 3, 2);
    f2.vertexNormals[0] = new T.Vector3(s2, 0, s2);
    f2.vertexNormals[1] = new T.Vector3(s2, 0, s2);
    f2.vertexNormals[2] = new T.Vector3(s2, 0, s2);
    geometry.faces.push(f2);
    //
    let material = new T.MeshStandardMaterial({
      color: "yellow",
      roughness: 0.75
    });
    let bg = geometry.toBufferGeometry();
    let mesh = new T.Mesh(bg, material);
    let group = normal_helper(geometry, false);
    group.add(mesh);
    super("TwoTriangles2", group);
  }
}

class TwoNormalTrianglesBG extends GrObject {
    constructor() {
      let geometry = new T.BufferGeometry();
      //
      // while the two triangles have 4 certices, we need to split the vertices
      // so that they can have different normals
      const vertices = new Float32Array( [
         -1, 1, -1,     // 1A note that we need to keep this ccw
         0, 0, 0,       // 1B
         0, 2, 0,       // 1C
         
         1, 1, -1,      // second triangle
         0, 2, 0,       // 2B
         0, 0, 0        // 2C
      ]);
      // don't ask where we learn to call this "position" and "normal"
      // the only thing I can find is to read examples...
      geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
      // in 01, we computed these with cross product, here, we use them
      // from the way it was done above
      const normals = new Float32Array([
            -s2,0,s2,
            -s2,0,s2,
            -s2,0,s2,
            s2,0,s2,
            s2,0,s2,
            s2,0,s2
        ]);
      geometry.setAttribute("normal",new T.BufferAttribute(normals,3));

      let material = new T.MeshStandardMaterial({
        color: "yellow",
        roughness: 0.75
      });

      let mesh = new T.Mesh(geometry, material);
  
      //
      super("TwoNormalTrianglesBG", mesh);
    }
  }


/**
 * Smooth triangles (manually setting the directions)
 */
class TwoSmoothTriangles extends GrObject {
  constructor() {
    let geometry = new Geom.Geometry();
    //
    geometry.vertices.push(new T.Vector3(-1, 1, -1));
    geometry.vertices.push(new T.Vector3(0, 0, 0));
    geometry.vertices.push(new T.Vector3(0, 2, 0));
    geometry.vertices.push(new T.Vector3(1, 1, -1));
    //
    let f1 = new Geom.Face3(0, 1, 2);
    f1.vertexNormals[0] = new T.Vector3(-s2, 0, s2);
    f1.vertexNormals[1] = new T.Vector3(0, 0, 1);
    f1.vertexNormals[2] = new T.Vector3(0, 0, 1);
    geometry.faces.push(f1);
    let f2 = new Geom.Face3(1, 3, 2);
    f2.vertexNormals[0] = new T.Vector3(0, 0, 1);
    f2.vertexNormals[1] = new T.Vector3(s2, 0, s2);
    f2.vertexNormals[2] = new T.Vector3(0, 0, 1);
    geometry.faces.push(f2);
    //
    let material = new T.MeshStandardMaterial({
      color: "yellow",
      roughness: 0.75
    });
    let bg = geometry.toBufferGeometry();
    let mesh = new T.Mesh(bg, material);
    let group = normal_helper(geometry, false);
    group.add(mesh);
    super("TwoTriangles3", group);
  }
}
/**
 * Here we are doing vertex sharing, just to keep the code symmetric
 */
class TwoSmoothTrianglesBG extends GrObject {
    constructor() {
      let geometry = new T.BufferGeometry();
      //
      // while the two triangles have 4 certices, we need to split the vertices
      // so that they can have different normals
      const vertices = new Float32Array( [
         -1, 1, -1,     // 1A note that we need to keep this ccw
         0, 0, 0,       // 1B
         0, 2, 0,       // 1C
         
         1, 1, -1,      // second triangle
         0, 2, 0,       // 2B
         0, 0, 0        // 2C
      ]);
      // don't ask where we learn to call this "position" and "normal"
      // the only thing I can find is to read examples...
      geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
      // in 01, we computed these with cross product, here, we use them
      // from the way it was done above
      const normals = new Float32Array([
            -s2,0,s2,
            0,0,1,
            0,0,1,
            s2,0,s2,
            0,0,1,
            0,0,1
        ]);
      geometry.setAttribute("normal",new T.BufferAttribute(normals,3));

      let material = new T.MeshStandardMaterial({
        color: "yellow",
        roughness: 0.75
      });

      let mesh = new T.Mesh(geometry, material);
  
      //
      super("TwoNormalTrianglesBG", mesh);
    }
  }

/**
 * here we do it with 4 vertices - which requires using indecies
 */
class TwoSmoothTriangleShared extends GrObject {
    constructor() {
        let geometry = new T.BufferGeometry();
        //
        // while the two triangles have 4 certices, we need to split the vertices
        // so that they can have different normals
        const vertices = new Float32Array( [
            -1, 1, -1,     // 1A note that we need to keep this ccw
            0, 0, 0,       // 1B
            0, 2, 0,       // 1C
            1, 1, -1,      // second triangle
        ]);
        // don't ask where we learn to call this "position" and "normal"
        // the only thing I can find is to read examples...
        geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
        // in 01, we computed these with cross product, here, we use them
        // from the way it was done above
        const normals = new Float32Array([
            -s2,0,s2,
            0,0,1,
            0,0,1,
            s2,0,s2
        ]);
        geometry.setAttribute("normal",new T.BufferAttribute(normals,3));

        // set the indecies - our triangles are 0 1 2 and 3,2,1
        geometry.setIndex([0,1,2, 3,2,1]);

        let material = new T.MeshStandardMaterial({
        color: "yellow",
        roughness: 0.75
        });

        let mesh = new T.Mesh(geometry, material);

        //
        super("TwoNormalTrianglesBG", mesh);
    }
}


// Helper to draw arrow (cylinder + cone) from (x0, y0, z0) to (x1, y1, z1).
function draw_arrow(x0 = 0, y0 = 0, z0 = 0, x1 = 1, y1 = 1, z1 = 1, param = { color: "red", thickness: 0.02, scale: 1 }) {
  let group = new T.Group();
  let lineGeometry = new T.CylinderBufferGeometry(1, 1, 1);
  let lineMaterial = new T.MeshBasicMaterial({ color: param.color || "red" });
  let line = new T.Mesh(lineGeometry, lineMaterial);
  let arrowGeometry = new T.ConeBufferGeometry(1, 1);
  let arrow = new T.Mesh(arrowGeometry, lineMaterial);
  let thick = param.thickness || 0.02;
  let length = param.scale || 1;
  length *= Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1) + (z0 - z1) * (z0 - z1));
  line.position.set(0, length / 2, 0);
  arrow.position.set(0, length, 0);
  line.scale.set(thick, length, thick);
  arrow.scale.set(thick * 3, thick * 6, thick * 3);
  group.add(line, arrow);
  group.position.set(x0, y0, z0);
  group.lookAt(new T.Vector3(x1, y1, z1));
  group.rotateX(Math.PI / 2);
  return group;
}

// Draw arrow
function draw_arrow_vector(v0 = new T.Vector3(0, 0, 0), v1 = new T.Vector3(1, 1, 1), param = { color: "red", thickness: 0.02, scale: 1 }) {
  return draw_arrow(v0.x, v0.y, v0.z, v0.x + v1.x, v0.y + v1.y, v0.z + v1.z, param);
}

// Helper to draw text at (x, y, z) with size.
function draw_text(text = "Hello World", x = 0, y = 0, z = 0, size = 1, param = { color: "red", thickness: 0 }) {
  let loader = new FontLoader();
  let group = new T.Group();
  loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    let geometry = new TextGeometry(text, { font: font, size: size, height: param.thickness || 0 });
    let material = new T.MeshBasicMaterial({ color: param.color || "red" });
    let mesh = new T.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    group.add(mesh);
  });
  return group;
}

// Draw text
function draw_text_vector(str = "", v = new T.Vector3(0, 0, 0), size = 1, param = { color: "red", thickness: 0.01 }) {
  return draw_text(str, v.x, v.y, v.z, size, param);
}

// Helper to find the center of a face.
function center(vertices = [new T.Vector3()], face = new Geom.Face3(0, 0, 0)) {
  return new T.Vector3().add(vertices[face.a]).add(vertices[face.b]).add(vertices[face.c]).multiplyScalar(1 / 3);
}

// If face = true, it will draw the normal of the face at the center of the face.
// If face = false, it will draw three normals at the three vertices.
function normal_helper(geometry = new Geom.Geometry(), face = true) {
  // let geometry = geometry_.toBufferGeometry();
  let vertices = [].concat(...geometry.faces.map(fi => face ? center(geometry.vertices, fi) : [geometry.vertices[fi.a], geometry.vertices[fi.b], geometry.vertices[fi.c]]));
  let normals = [].concat(...geometry.faces.map(fi => face ? fi.normal : fi.vertexNormals));
  let arrows = vertices.map((vi, i) => draw_arrow_vector(vi, normals[i]));
  let texts = geometry.vertices.map((vi, i) => draw_text_vector(String(i), vi, 0.2));
  texts.forEach(t => t.translateY(0.1));
  let group = new T.Group();
  group.add(...arrows, ...texts);
  return group;
}

function shift(grobj, x, y, z) {
  grobj.objects[0].translateX(x);
  grobj.objects[0].translateY(y);
  grobj.objects[0].translateZ(z);
  return grobj;
}

// "main" part
let mydiv = document.getElementById("div1");

let box = InputHelpers.makeBoxDiv({ width: mydiv ? 640 : 820 }, mydiv);
if (!mydiv) {
    InputHelpers.makeBreak(); // sticks a break after the box
}

InputHelpers.makeHead("Three Different Normals (computed, face, vertex)",box);

let world = new GrWorld({ width: mydiv ? 600 : 800, where: box });

let tt = shift(new TwoTriangles(), -4, 0.2, 0);
world.add(tt);

let t2 = shift(new TwoNormalTriangles(), 0, 0.2, 0);
world.add(t2);

let t3 = shift(new TwoSmoothTriangles(), 4, 0.2, 0);
world.add(t3);

let div = InputHelpers.makeBoxDiv({}, box);

let sl = new InputHelpers.LabelSlider("ry", { min: -2, max: 2, where: div });
sl.oninput = function (evt) {
    let v = sl.value();
    tt.objects[0].rotation.y = v;
    t2.objects[0].rotation.y = v;
    t3.objects[0].rotation.y = v;
};

InputHelpers.makeBreak(box);

world.go();

