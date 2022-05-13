/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";


class Dice1 extends GrObject {
constructor() {
    let geometry = new T.BufferGeometry();
    //
    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    const vertices = new Float32Array( [
        1,1,1,    1,-1,1,    1,1,-1,   1,-1,1,    1,-1,-1,  1,1,-1,      // right
        -1,1,-1,  -1,-1,-1,  -1,1,1,  -1,-1,-1,  -1,-1,1,  -1,1,1,// left
        -1,1,-1,  -1,1,1,   1,1,-1,   -1,1,1,     1,1,1,  1,1,-1,	    // up
        -1,-1,1,  -1,-1,-1,  1,-1,1,  -1,-1,-1,  1,-1,-1,  1,-1,1,// down
        -1,1,1,   -1,-1,1,    1,1,1,   -1,-1,1,    1,-1,1,  1,1,1,	    // front
        1,1,-1,   1,-1,-1,   -1,1,-1,  1,-1,-1,   -1,-1,-1,  -1,1,-1 // back
        
    ]);
    for (let i = 0; i < vertices.length; i++) vertices[i] /= 2;
    geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
    geometry.computeVertexNormals();
    // give it UVs
    const uvs = new Float32Array( [       
        1/3,1/3,1/3,0,2/3,1/3,1/3,0,2/3,0,2/3,1/3,
        2/3,1/3, 2/3,0, 1,1/3,2/3,0, 1,0, 1,1/3,
        1/3,2/3,1/3,1/3,0,2/3,1/3,1/3,0,1/3,0,2/3,
        2/3,1/3,2/3,2/3,1,1/3,2/3,2/3,1,2/3,1,1/3,
        1/3,1,1/3,2/3,2/3,1,1/3,2/3,2/3,2/3,2/3,1,
        2/3,2/3,2/3,1/3,1/3,2/3,2/3,1/3,1/3,1/3,1/3,2/3
    ]);
    geometry.setAttribute('uv',new T.BufferAttribute(uvs,2));
    geometry.translate(0,2.5,0);
    let tl = new T.TextureLoader().load("../images/dice_texture.png");
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
class Dice2 extends GrObject {
    constructor() {
        let geometry = new T.BufferGeometry();
        //
        // while the two triangles have 4 certices, we need to split the vertices
        // so that they can have different normals
        const vertices = new Float32Array( [
            1,1,1,    1,-1,1,    1,1,-1,   1,-1,1,    1,-1,-1,  1,1,-1,      // right
            -1,1,-1,  -1,-1,-1,  -1,1,1,  -1,-1,-1,  -1,-1,1,  -1,1,1,// left
            -1,1,-1,  -1,1,1,   1,1,-1,   -1,1,1,     1,1,1,  1,1,-1,	    // up
            -1,-1,1,  -1,-1,-1,  1,-1,1,  -1,-1,-1,  1,-1,-1,  1,-1,1,// down
            -1,1,1,   -1,-1,1,    1,1,1,   -1,-1,1,    1,-1,1,  1,1,1,	    // front
            1,1,-1,   1,-1,-1,   -1,1,-1,  1,-1,-1,   -1,-1,-1,  -1,1,-1 // back
            
        ]);
        for (let i = 0; i < vertices.length; i++) vertices[i] /= 2;
        geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
        geometry.computeVertexNormals();
        // give it UVs
        const uvs = new Float32Array( [       
            1/3,1/3,1/3,0,2/3,1/3,1/3,0,2/3,0,2/3,1/3,
            2/3,1/3, 2/3,0, 1,1/3,2/3,0, 1,0, 1,1/3,
            2/3,1/3,2/3,2/3,1,1/3,2/3,2/3,1,2/3,1,1/3,
            2/3,2/3,2/3,1/3,1/3,2/3,2/3,1/3,1/3,1/3,1/3,2/3,
            1/3,1,1/3,2/3,2/3,1,1/3,2/3,2/3,2/3,2/3,1,
            1/3,2/3,1/3,1/3,0,2/3,1/3,1/3,0,1/3,0,2/3,
        ]);
        geometry.setAttribute('uv',new T.BufferAttribute(uvs,2));
        geometry.translate(0,2.5,0);
        let tl = new T.TextureLoader().load("../images/dice_texture.png");
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

let d1 = shift(new Dice1(), -3);
world.add(d1);
let d2 = shift(new Dice2(), 3);
world.add(d2);

let div = InputHelpers.makeBoxDiv({}, box);

let sl = new InputHelpers.LabelSlider("ry", { min: -2, max: 2, where: div });
sl.oninput = function(evt) {
    let v = sl.value();
    d1.objects[0].rotation.y = v;
    d2.objects[0].rotation.y = v;
};


let p1 = new T.PlaneGeometry(1, 1, 1, 1);

world.ambient.intensity = 0.6;

world.go();
