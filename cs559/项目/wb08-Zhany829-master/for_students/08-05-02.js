/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// define a class of Domino here - it should be a subclass of GrObject

class Dice1 extends GrObject {
    constructor() {
        let geometry = new T.BufferGeometry();
        //
        // while the two triangles have 4 certices, we need to split the vertices
        // so that they can have different normals
        const vertices = new Float32Array( [
            1,1,1,    1,0.6,1,    1,1,-1,   1,0.6,1,    1,0.6,-1,  1,1,-1,      // right
            -1,1,-1,  -1,0.6,-1,  -1,1,1,  -1,0.6,-1,  -1,0.6,1,  -1,1,1,// left
            -1,1,-1,  -1,1,1,   1,1,-1,   -1,1,1,     1,1,1,  1,1,-1,	    // up
            -1,0.6,1,  -1,0.6,-1,  1,0.6,1,  -1,0.6,-1,  1,0.6,-1,  1,0.6,1,// down
            -1,1,1,   -1,0.6,1,    1,1,1,   -1,0.6,1,    1,0.6,1,  1,1,1,	    // front
            1,1,-1,   1,0.6,-1,   -1,1,-1,  1,0.6,-1,   -1,0.6,-1,  -1,1,-1, // back

            1,1,-1,    1,0.6,-1,    1,1,-3,   1,0.6,-1,    1,0.6,-3,  1,1,-3,      // right
            -1,1,-3,  -1,0.6,-3,  -1,1,-1,  -1,0.6,-3,  -1,0.6,-1,  -1,1,-1,// left
            -1,1,-3,  -1,1,-1,   1,1,-3,   -1,1,-1,     1,1,-1,  1,1,-3,	    // up
            -1,0.6,-1,  -1,0.6,-3,  1,0.6,-1,  -1,0.6,-3,  1,0.6,-3,  1,0.6,-1,// down
            -1,1,-1,   -1,0.6,-1,    1,1,-1,   -1,0.6,-1,    1,0.6,-1,  1,1,-1,	    // front
            1,1,-3,   1,0.6,-3,   -1,1,-3,  1,0.6,-3,   -1,0.6,-3,  -1,1,-3 // back
            
        ]);
        for (let i = 0; i < vertices.length; i++) vertices[i] /= 2;
        geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
        geometry.computeVertexNormals();
        // give it UVs
        const uvs = new Float32Array( [       
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            2/3,1/3,2/3,0,1,1/3,2/3,0,1,0,1,1/3,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            2/3,1/3,2/3,0,1,1/3,2/3,0,1,0,1,1/3,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
        ]);
        geometry.setAttribute('uv',new T.BufferAttribute(uvs,2));
        geometry.translate(0,0,0);
        let tl = new T.TextureLoader().load("../images/dice_texture.png");
        let material = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.75,
        map: tl
        });
        
        let mesh = new T.Mesh(geometry, material);
        
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
            1,1,1,    1,0.6,1,    1,1,-1,   1,0.6,1,    1,0.6,-1,  1,1,-1,      // right
            -1,1,-1,  -1,0.6,-1,  -1,1,1,  -1,0.6,-1,  -1,0.6,1,  -1,1,1,// left
            -1,1,-1,  -1,1,1,   1,1,-1,   -1,1,1,     1,1,1,  1,1,-1,	    // up
            -1,0.6,1,  -1,0.6,-1,  1,0.6,1,  -1,0.6,-1,  1,0.6,-1,  1,0.6,1,// down
            -1,1,1,   -1,0.6,1,    1,1,1,   -1,0.6,1,    1,0.6,1,  1,1,1,	    // front
            1,1,-1,   1,0.6,-1,   -1,1,-1,  1,0.6,-1,   -1,0.6,-1,  -1,1,-1, // back

            1,1,-1,    1,0.6,-1,    1,1,-3,   1,0.6,-1,    1,0.6,-3,  1,1,-3,      // right
            -1,1,-3,  -1,0.6,-3,  -1,1,-1,  -1,0.6,-3,  -1,0.6,-1,  -1,1,-1,// left
            -1,1,-3,  -1,1,-1,   1,1,-3,   -1,1,-1,     1,1,-1,  1,1,-3,	    // up
            -1,0.6,-1,  -1,0.6,-3,  1,0.6,-1,  -1,0.6,-3,  1,0.6,-3,  1,0.6,-1,// down
            -1,1,-1,   -1,0.6,-1,    1,1,-1,   -1,0.6,-1,    1,0.6,-1,  1,1,-1,	    // front
            1,1,-3,   1,0.6,-3,   -1,1,-3,  1,0.6,-3,   -1,0.6,-3,  -1,1,-3 // back
            
        ]);
        for (let i = 0; i < vertices.length; i++) vertices[i] /= 2;
        geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
        geometry.computeVertexNormals();
        // give it UVs
        const uvs = new Float32Array( [       
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            2/3,1/3,2/3,0,1,1/3,2/3,0,1,0,1,1/3,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            2/3,2/3,2/3,1/3,1,2/3,2/3,1/3,1,1/3,1,2/3,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
        ]);
        geometry.setAttribute('uv',new T.BufferAttribute(uvs,2));
        geometry.translate(0,0,0);
        let tl = new T.TextureLoader().load("../images/dice_texture.png");
        let material = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.75,
        map: tl
        });
        
        let mesh = new T.Mesh(geometry, material);
        
        super("TwoTrianglesBG3", mesh);
    }
}
class Dice3 extends GrObject {
    constructor() {
        let geometry = new T.BufferGeometry();
        //
        // while the two triangles have 4 certices, we need to split the vertices
        // so that they can have different normals
        const vertices = new Float32Array( [
            1,1,1,    1,0.6,1,    1,1,-1,   1,0.6,1,    1,0.6,-1,  1,1,-1,      // right
            -1,1,-1,  -1,0.6,-1,  -1,1,1,  -1,0.6,-1,  -1,0.6,1,  -1,1,1,// left
            -1,1,-1,  -1,1,1,   1,1,-1,   -1,1,1,     1,1,1,  1,1,-1,	    // up
            -1,0.6,1,  -1,0.6,-1,  1,0.6,1,  -1,0.6,-1,  1,0.6,-1,  1,0.6,1,// down
            -1,1,1,   -1,0.6,1,    1,1,1,   -1,0.6,1,    1,0.6,1,  1,1,1,	    // front
            1,1,-1,   1,0.6,-1,   -1,1,-1,  1,0.6,-1,   -1,0.6,-1,  -1,1,-1, // back

            1,1,-1,    1,0.6,-1,    1,1,-3,   1,0.6,-1,    1,0.6,-3,  1,1,-3,      // right
            -1,1,-3,  -1,0.6,-3,  -1,1,-1,  -1,0.6,-3,  -1,0.6,-1,  -1,1,-1,// left
            -1,1,-3,  -1,1,-1,   1,1,-3,   -1,1,-1,     1,1,-1,  1,1,-3,	    // up
            -1,0.6,-1,  -1,0.6,-3,  1,0.6,-1,  -1,0.6,-3,  1,0.6,-3,  1,0.6,-1,// down
            -1,1,-1,   -1,0.6,-1,    1,1,-1,   -1,0.6,-1,    1,0.6,-1,  1,1,-1,	    // front
            1,1,-3,   1,0.6,-3,   -1,1,-3,  1,0.6,-3,   -1,0.6,-3,  -1,1,-3 // back
            
        ]);
        for (let i = 0; i < vertices.length; i++) vertices[i] /= 2;
        geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
        geometry.computeVertexNormals();
        // give it UVs
        const uvs = new Float32Array( [       
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            2/3,2/3,2/3,1/3,1,2/3,2/3,1/3,1,1/3,1,2/3,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            1/3,1,1/3,2/3,2/3,1,1/3,2/3,2/3,2/3,2/3,1,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
        ]);
        geometry.setAttribute('uv',new T.BufferAttribute(uvs,2));
        geometry.translate(0,0,0);
        let tl = new T.TextureLoader().load("../images/dice_texture.png");
        let material = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.75,
        map: tl
        });
        
        let mesh = new T.Mesh(geometry, material);
        
        super("TwoTrianglesBG3", mesh);
    }
}
class Dice4 extends GrObject {
    constructor() {
        let geometry = new T.BufferGeometry();
        //
        // while the two triangles have 4 certices, we need to split the vertices
        // so that they can have different normals
        const vertices = new Float32Array( [
            1,1,1,    1,0.6,1,    1,1,-1,   1,0.6,1,    1,0.6,-1,  1,1,-1,      // right
            -1,1,-1,  -1,0.6,-1,  -1,1,1,  -1,0.6,-1,  -1,0.6,1,  -1,1,1,// left
            -1,1,-1,  -1,1,1,   1,1,-1,   -1,1,1,     1,1,1,  1,1,-1,	    // up
            -1,0.6,1,  -1,0.6,-1,  1,0.6,1,  -1,0.6,-1,  1,0.6,-1,  1,0.6,1,// down
            -1,1,1,   -1,0.6,1,    1,1,1,   -1,0.6,1,    1,0.6,1,  1,1,1,	    // front
            1,1,-1,   1,0.6,-1,   -1,1,-1,  1,0.6,-1,   -1,0.6,-1,  -1,1,-1, // back

            1,1,-1,    1,0.6,-1,    1,1,-3,   1,0.6,-1,    1,0.6,-3,  1,1,-3,      // right
            -1,1,-3,  -1,0.6,-3,  -1,1,-1,  -1,0.6,-3,  -1,0.6,-1,  -1,1,-1,// left
            -1,1,-3,  -1,1,-1,   1,1,-3,   -1,1,-1,     1,1,-1,  1,1,-3,	    // up
            -1,0.6,-1,  -1,0.6,-3,  1,0.6,-1,  -1,0.6,-3,  1,0.6,-3,  1,0.6,-1,// down
            -1,1,-1,   -1,0.6,-1,    1,1,-1,   -1,0.6,-1,    1,0.6,-1,  1,1,-1,	    // front
            1,1,-3,   1,0.6,-3,   -1,1,-3,  1,0.6,-3,   -1,0.6,-3,  -1,1,-3 // back
            
        ]);
        for (let i = 0; i < vertices.length; i++) vertices[i] /= 2;
        geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
        geometry.computeVertexNormals();
        // give it UVs
        const uvs = new Float32Array( [       
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            1/3,1,1/3,2/3,2/3,1,1/3,2/3,2/3,2/3,2/3,1,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            1/3,2/3,1/3,1/3,2/3,2/3,1/3,1/3,2/3,1/3,2/3,2/3,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
        ]);
        geometry.setAttribute('uv',new T.BufferAttribute(uvs,2));
        geometry.translate(0,0,0);
        let tl = new T.TextureLoader().load("../images/dice_texture.png");
        let material = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.75,
        map: tl
        });
        
        let mesh = new T.Mesh(geometry, material);
        
        super("TwoTrianglesBG3", mesh);
    }
}
function shift(grobj, x, z) {
    grobj.objects[0].translateX(x);
    grobj.objects[0].translateZ(z);
    return grobj;
  }
  let mydiv = document.getElementById("div1");
  let world = new GrWorld({ width: mydiv ? 600 : 800 });

  let d1 = shift(new Dice1(), -3, 4.5);
  world.add(d1);
  let d2 = shift(new Dice2(), -3, 2.45);
  world.add(d2);
  let d3 = shift(new Dice3(), -3, 0.4);
  world.add(d3);
  let d4 = shift(new Dice4(), -3, -1.65);
  world.add(d4);

  world.ambient.intensity = 0.6;
  
  world.go();
