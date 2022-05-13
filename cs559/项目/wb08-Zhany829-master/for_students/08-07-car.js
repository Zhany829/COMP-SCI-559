/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";


// define your vehicles here - remember, they need to be imported
// into the "main" program
let car1ObCtr = 0;
export class GrCar1 extends GrObject {
  constructor(params = {}) {
    let group = new  T.Group();

    let wall_geom = new T.BoxGeometry(0.4,1/3,0.1);
    let wall_mat = new T.MeshStandardMaterial({color: "white"});
    let frontWall_geom = new T.BoxGeometry(0.4,0.2,0.1);
    let frontWall = new T.Mesh(frontWall_geom, wall_mat);
    frontWall.translateY(1.3);
    frontWall.translateZ(0);
    frontWall.scale.set(3,3,3);
    group.add(frontWall);
    let frontWall2 = new T.Mesh(frontWall_geom, wall_mat);
    frontWall2.translateY(1.74);
    frontWall2.translateZ(-0.1);
    frontWall2.scale.set(3,3,3);
    frontWall2.rotateX(-Math.PI/6);
    group.add(frontWall2);
    let wall2 = new T.Mesh(wall_geom, wall_mat);
    wall2.translateY(1.5);
    wall2.translateZ(-1.35);
    wall2.scale.set(3,3,3);
    group.add(wall2);
    let wall3 = new T.Mesh(wall_geom, wall_mat);
    wall3.translateY(1.1);
    wall3.translateZ(-0.6);
    wall3.rotateX(Math.PI/2);
    wall3.rotateZ(Math.PI/2);
    wall3.scale.set(3,3,3);
    group.add(wall3);
    let side_geom = new T.BoxGeometry(0.4,0.2,0.1);
    let side_mat = new T.MeshStandardMaterial({color: "white"});
    let wall4 = new T.Mesh(side_geom, side_mat);
    wall4.translateY(1.3);
    wall4.translateX(-0.45);
    wall4.translateZ(-0.6);
    wall4.rotateY(Math.PI/2);
    wall4.scale.set(3,3,3);
    group.add(wall4);
    let wall5 = new T.Mesh(side_geom, side_mat);
    wall5.translateY(1.3);
    wall5.translateX(0.45);
    wall5.translateZ(-0.6);
    wall5.rotateY(Math.PI/2);
    wall5.scale.set(3,3,3);
    group.add(wall5);

    let tail_geom = new T.BoxGeometry(1 , 0.6, 0.7);
    let tail_mat = new T.MeshStandardMaterial({color: "pink",metalness: 0.3,roughness: 0.6});
    let tail = new T.Mesh(tail_geom, tail_mat);
    tail.translateY(1.3);
    tail.translateZ(-1.7);
    group.add(tail);
    
    let head1_geom = new T.BoxGeometry(1.2, 0.5, 0.6);
    let head1_mat = new T.MeshStandardMaterial({color: "grey"});
    let head1 = new T.Mesh(head1_geom, head1_mat);
    head1.translateY(1.26);
    head1.translateZ(0.44);
    group.add(head1);

    let tyre_geom = new T.CylinderGeometry(0.3,0.3,0.3);
    let tyre_mat = new T.MeshStandardMaterial({color: "black"});
    let tyre1 = new T.Mesh(tyre_geom, tyre_mat);
    tyre1.translateY(1);
    tyre1.translateX(0.5);
    tyre1.rotateZ(Math.PI/2);
    group.add(tyre1);
    let tyre2 = new T.Mesh(tyre_geom, tyre_mat);
    tyre2.translateY(1);
    tyre2.translateX(-0.5);
    tyre2.rotateZ(Math.PI/2);
    group.add(tyre2);
    let tyre3 = new T.Mesh(tyre_geom, tyre_mat);
    tyre3.translateY(1);
    tyre3.translateX(-0.5);
    tyre3.translateZ(-1.3);
    tyre3.rotateZ(Math.PI/2);
    group.add(tyre3);
    let tyre4 = new T.Mesh(tyre_geom, tyre_mat);
    tyre4.translateY(1);
    tyre4.translateX(0.5);
    tyre4.translateZ(-1.3);
    tyre4.rotateZ(Math.PI/2);
    group.add(tyre4);
  
    let left_geom = new T.BufferGeometry();
    const left_vertices = new Float32Array( [
            -1,0.2,-0.35, -1,-0.2,-0.35, -1,0.2,0.35, -1,-0.2,-0.35,  -1,-0.2,0.35,  -1,0.2,0.35,// left
        ]);
        for (let i = 0; i < left_vertices.length; i++) left_vertices[i] /= 2;
        left_geom.setAttribute('position',new T.BufferAttribute(left_vertices,3));
        left_geom.computeVertexNormals();
        // give it UVs
        const left_uvs = new Float32Array( [       
            0,1,0,0,1,1,0,0,1,0,1,1
    ]);
    left_geom.setAttribute('uv',new T.BufferAttribute(left_uvs,2));
    left_geom.translate(0.3,0.42,-0.23);
    let left_tl = new T.TextureLoader().load("./flash2.png");
    let left_material = new T.MeshStandardMaterial({color: "white", map: left_tl});
    let left_mesh = new T.Mesh(left_geom, left_material);
    left_mesh.position.y = 0;
    left_mesh.scale.set(3.01,3.01,3.01);
    group.add(left_mesh);

    let right_geom = new T.BufferGeometry();
    const right_vertices = new Float32Array( [
        1,0.2,0.35,    1,-0.2,0.35,    1,0.2,-0.35,   1,-0.2,0.35,    1,-0.2,-0.35,  1,0.2,-0.35,      // right
        ]);
        for (let i = 0; i < right_vertices.length; i++) right_vertices[i] /= 2;
        right_geom.setAttribute('position',new T.BufferAttribute(right_vertices,3));
        right_geom.computeVertexNormals();
        // give it UVs
        const right_uvs = new Float32Array( [       
            0,1,0,0,1,1,0,0,1,0,1,1
    ]);
    right_geom.setAttribute('uv',new T.BufferAttribute(right_uvs,2));
    right_geom.translate(-0.3,0.42,-0.23);
    let right_tl = new T.TextureLoader().load("./flash1.png");
    let right_material = new T.MeshStandardMaterial({color: "white", map: right_tl});
    let right_mesh = new T.Mesh(right_geom, right_material);
    right_mesh.position.y = 0;
    right_mesh.scale.set(3.01,3.01,3.01);
    group.add(right_mesh);

   
    super(`car1-${car1ObCtr++}`, group);
    this.whole_ob = group;
   
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    group.scale.set(scale, scale, scale);
    // group.scale.set(.5, .5, .5);
    group.position.y -= 0.5;
    group.rotateY(-Math.PI/3);
  }
  /**
   * StepWorld method
   * @param {*} delta 
   * @param {*} timeOfDay 
   */
  stepWorld(delta, timeOfDay) {
   
  }
}
let car2ObCtr = 0;
export class GrCar2 extends GrObject {
  constructor(params = {}) {
    let group = new  T.Group();
    let box_geom = new T.BoxGeometry(0.5,0.5,1);
    let box_mat = new T.MeshStandardMaterial({color: "white"});
    let box = new T.Mesh(box_geom, box_mat);
    box.translateY(1.5);
    box.translateZ(-0.43);
    box.scale.set(3,3,3);
    group.add(box);
    let head1_geom = new T.BoxGeometry(0.5,0.4,0.35);
    let head1_mat = new T.MeshStandardMaterial({color: "orange"});
    let head1 = new T.Mesh(head1_geom, head1_mat);
    head1.translateY(1.4);
    head1.translateZ(2);
    head1.scale.set(3,3,3);
    group.add(head1);
    let head2_geom = new T.BoxGeometry(0.3,0.2,0.25);
    let head2_mat = new T.MeshStandardMaterial({color: "green"});
    let head2 = new T.Mesh(head2_geom, head2_mat);
    head2.translateY(2.2);
    head2.translateZ(1.8);
    head2.scale.set(3,3,3);
    group.add(head2);
    let board_geom = new T.BoxGeometry(0.5,0.7,0.1);
    let board_mat = new T.MeshStandardMaterial({color: "grey"});
    let board = new T.Mesh(board_geom, board_mat);
    board.translateY(1.7);
    board.translateZ(1.3);
    board.scale.set(3,3,3);
    group.add(board);
    let board2_geom = new T.BoxGeometry(0.5,0.1,1.5);
    let board2 = new T.Mesh(board2_geom, board_mat);
    board2.translateY(0.6);
    board2.translateZ(0.2);
    board2.scale.set(3,3,3);
    group.add(board2);

    let tyre_geom = new T.CylinderGeometry(0.34,0.34,0.3);
    let tyre_mat = new T.MeshStandardMaterial({color: "black"});
    let tyre1 = new T.Mesh(tyre_geom, tyre_mat);
    tyre1.translateY(0.4);
    tyre1.translateX(0.8);
    tyre1.translateZ(-1);
    tyre1.rotateZ(Math.PI/2);
    group.add(tyre1);
    let tyre2 = new T.Mesh(tyre_geom, tyre_mat);
    tyre2.translateY(0.4);
    tyre2.translateX(0.8);
    tyre2.translateZ(0.1);
    tyre2.rotateZ(Math.PI/2);
    group.add(tyre2);
    let tyre3 = new T.Mesh(tyre_geom, tyre_mat);
    tyre3.translateY(0.4);
    tyre3.translateX(0.8);
    tyre3.translateZ(1.4);
    tyre3.rotateZ(Math.PI/2);
    group.add(tyre3);
    let tyre4 = new T.Mesh(tyre_geom, tyre_mat);
    tyre4.translateY(0.4);
    tyre4.translateX(-0.8);
    tyre4.translateZ(1.4);
    tyre4.rotateZ(Math.PI/2);
    group.add(tyre4);
    let tyre5 = new T.Mesh(tyre_geom, tyre_mat);
    tyre5.translateY(0.4);
    tyre5.translateX(-0.8);
    tyre5.translateZ(0.1);
    tyre5.rotateZ(Math.PI/2);
    group.add(tyre5);
    let tyre6 = new T.Mesh(tyre_geom, tyre_mat);
    tyre6.translateY(0.4);
    tyre6.translateX(-0.8);
    tyre6.translateZ(-1);
    tyre6.rotateZ(Math.PI/2);
    group.add(tyre6);


    //make image
    let right_geometry = new T.BufferGeometry();
    const right_vertices = new Float32Array( [
        1,0.5,1,    1,-0.5,1,    1,0.5,-1,   1,-.5,1,    1,-.5,-1,  1,.5,-1,      // right
        // -1,0.5,-1,  -1,-0.5,-1,  -1,0.5,1,  -1,-0.5,-1,  -1,-0.5,1,  -1,0.5,1,// left
        // -1,1,-1,  -1,1,1,   1,1,-1,   -1,1,1,     1,1,1,  1,1,-1,	    // up
        //     1,1,-1,   1,-1,-1,   -1,1,-1,  1,-1,-1,   -1,-1,-1,  -1,1,-1 // back
        
    ]);
    for (let i = 0; i < right_vertices.length; i++) right_vertices[i] /= 2;
    right_geometry.setAttribute('position',new T.BufferAttribute(right_vertices,3));
    right_geometry.computeVertexNormals();
    // give it UVs
    const right_uvs = new Float32Array( [       
        0,1,0,0,1,1,0,0,1,0,1,1
        // 2/3,1/3, 2/3,0, 1,1/3,2/3,0, 1,0, 1,1/3,
        // 2/3,1/3,2/3,2/3,1,1/3,2/3,2/3,1,2/3,1,1/3,
        // 1/3,2/3,1/3,1/3,0,2/3,1/3,1/3,0,1/3,0,2/3,
    ]);
    right_geometry.setAttribute('uv',new T.BufferAttribute(right_uvs,2));
    right_geometry.translate(-0.24,0.5,-0.15);
    let right_tl = new T.TextureLoader().load("./bumblebee3.jpg");
    let right_material = new T.MeshStandardMaterial({color: "white", map: right_tl});
    let right_mesh = new T.Mesh(right_geometry, right_material);
    right_mesh.position.y = 0;
    right_mesh.scale.set(3.01,3.01,3.01);
    group.add(right_mesh);

    let left_geometry = new T.BufferGeometry();
    const left_vertices = new Float32Array( [
        // 1,0.5,1,    1,-0.5,1,    1,0.5,-1,   1,-.5,1,    1,-.5,-1,  1,.5,-1,      // right
        -1,0.5,-1,  -1,-0.5,-1,  -1,0.5,1,  -1,-0.5,-1,  -1,-0.5,1,  -1,0.5,1,// left
        // -1,1,-1,  -1,1,1,   1,1,-1,   -1,1,1,     1,1,1,  1,1,-1,	    // up
        //     1,1,-1,   1,-1,-1,   -1,1,-1,  1,-1,-1,   -1,-1,-1,  -1,1,-1 // back
        
    ]);
    for (let i = 0; i < left_vertices.length; i++) left_vertices[i] /= 2;
    left_geometry.setAttribute('position',new T.BufferAttribute(left_vertices,3));
    left_geometry.computeVertexNormals();
    // give it UVs
    const left_uvs = new Float32Array( [       
        // 1/3,1/3,1/3,0,2/3,1/3,1/3,0,2/3,0,2/3,1/3,
        0,1,0,0,1,1,0,0,1,0,1,1
        // 2/3,1/3,2/3,2/3,1,1/3,2/3,2/3,1,2/3,1,1/3,
        // 1/3,2/3,1/3,1/3,0,2/3,1/3,1/3,0,1/3,0,2/3,
    ]);
    left_geometry.setAttribute('uv',new T.BufferAttribute(left_uvs,2));
    left_geometry.translate(0.22,0.5,-0.15);
    let left_tl = new T.TextureLoader().load("./bumblebee1.jpg");
    let left_material = new T.MeshStandardMaterial({color: "white", map: left_tl});
    let left_mesh = new T.Mesh(left_geometry, left_material);
    left_mesh.position.y = 0;
    left_mesh.scale.set(3.01,3.01,3.01);
    group.add(left_mesh);


    let upper_geometry = new T.BufferGeometry();
    const upper_vertices = new Float32Array( [
        // 1,0.5,1,    1,-0.5,1,    1,0.5,-1,   1,-.5,1,    1,-.5,-1,  1,.5,-1,      // right
        // -1,0.5,-1,  -1,-0.5,-1,  -1,0.5,1,  -1,-0.5,-1,  -1,-0.5,1,  -1,0.5,1,// left
        -.5,1,-1,  -.5,1,1,   .5,1,-1,   -.5,1,1,     .5,1,1,  .5,1,-1,	    // up
        //     1,1,-1,   1,-1,-1,   -1,1,-1,  1,-1,-1,   -1,-1,-1,  -1,1,-1 // back
        
    ]);
    for (let i = 0; i < upper_vertices.length; i++) upper_vertices[i] /= 2;
    upper_geometry.setAttribute('position',new T.BufferAttribute(upper_vertices,3));
    upper_geometry.computeVertexNormals();
    // give it UVs
    const upper_uvs = new Float32Array( [       
        // 1/3,1/3,1/3,0,2/3,1/3,1/3,0,2/3,0,2/3,1/3,
        // 2/3,1/3, 2/3,0, 1,1/3,2/3,0, 1,0, 1,1/3,
        0,1,0,0,1,1,0,0,1,0,1,1
        // 1/3,2/3,1/3,1/3,0,2/3,1/3,1/3,0,1/3,0,2/3,
    ]);
    upper_geometry.setAttribute('uv',new T.BufferAttribute(upper_uvs,2));
    upper_geometry.translate(0.00,0.25,-0.15);
    let upper_tl = new T.TextureLoader().load("./bumblebee2.jpg");
    let upper_material = new T.MeshStandardMaterial({color: "white", map: upper_tl});
    let upper_mesh = new T.Mesh(upper_geometry, upper_material);
    upper_mesh.position.y = 0;
    upper_mesh.scale.set(3.01,3.01,3.01);
    group.add(upper_mesh);
    super(`car2-${car2ObCtr++}`, group);
    this.whole_ob = group;

    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    group.scale.set(scale, scale, scale);
    group.scale.set(.8, .8, .8);
    group.rotateY(-Math.PI/4);
  }
  /**
   * StepWorld method
   * @param {*} delta 
   * @param {*} timeOfDay 
   */
  stepWorld(delta, timeOfDay) {
  
  }
}
