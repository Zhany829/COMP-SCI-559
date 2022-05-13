/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";
import * as Geom from "../libs/CS559-Three/examples/jsm/deprecated/Geometry.js";

const s2 = Math.sqrt(2) / 2;

class TwoTrianglesBG extends GrObject {
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
      geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
      geometry.computeVertexNormals();

      // load the texture and assign it to the material
      let material = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.75
      });

      let mesh = new T.Mesh(geometry, material);
  
      //
      super("TwoTrianglesBG", mesh);
    }
  }
  
/**
 * this only adds the textures...
 */
class TwoTexturedTrianglesBG extends GrObject {
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
      geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
      geometry.computeVertexNormals();
      // give it UVs
      // @@Snippet:texcoords
      const uvs = new Float32Array( [
        0,0,
        1,0,
        0,1,        
        1,1,
        0,1,
        1,0
      ]);
      geometry.setAttribute('uv',new T.BufferAttribute(uvs,2));
      //@@Snippet:end

      // @@Snippet:texuse
      let tl = new T.TextureLoader().load("../textures/UV_Grid_Sm.jpg");
      let material = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.75,
        map: tl
      });
      // @@Snippet:end
      //
      let mesh = new T.Mesh(geometry, material);
      //
      super("TwoTrianglesBG2", mesh);
    }
}

/**
 * this is the same, but with different texture coordss
 */
class TwoTexturedTrianglesBG2 extends GrObject {
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
        geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
        geometry.computeVertexNormals();
        // give it UVs
        const uvs = new Float32Array( [
        0,0,
        .5,0,
        0,.5,
        1,1,
        0,.75,
        .75,0
        ]);
        geometry.setAttribute('uv',new T.BufferAttribute(uvs,2));

        let tl = new T.TextureLoader().load("../textures/UV_Grid_Sm.jpg");
        let material = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.75,
        map: tl
        });
        //
        let mesh = new T.Mesh(geometry, material);
        //
        super("TwoTrianglesBG3", mesh);
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

let tt = shift(new TwoTrianglesBG(), -3);
world.add(tt);
let t2 = shift(new TwoTexturedTrianglesBG(), 0);
world.add(t2);
let t3 = shift(new TwoTexturedTrianglesBG2(), 3);
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
