/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// define your buildings here - remember, they need to be imported
// into the "main" program


let treeObCtr = 0;

export class GrTree extends GrObject {
  constructor(params = {}) {
    let tree = new T.Group();

    let base_geom = new T.CylinderGeometry(0.7, 0.7, 5, 16);
    let base_mat = new T.MeshStandardMaterial({color: "brown", metalness: 0.5,roughness: 0.8});
    let base = new T.Mesh(base_geom, base_mat);
    base.translateY(0.25);
    tree.add(base);

    let leaf = new T.Group();
    base.add(leaf);
    leaf.translateY(0.25);
    let leaf_geom = new T.SphereGeometry(1);
    let leaf_mat = new T.MeshStandardMaterial({color: "green", metalness: 0.5,roughness: 0.8});
    let leaf1 = new T.Mesh(leaf_geom, leaf_mat);
    leaf1.position.y = 3.2;
    leaf.add(leaf1);
    let leaf2 = new T.Mesh(leaf_geom, leaf_mat);
    leaf2.position.y += 3.2;
    leaf2.position.z += 1;
    leaf.add(leaf2);
    let leaf3 = new T.Mesh(leaf_geom, leaf_mat);
    leaf3.position.y = 3.2;
    leaf3.position.z -= 1;
    leaf.add(leaf3);
    let leaf4 = new T.Mesh(leaf_geom, leaf_mat);
    leaf4.position.y = 3.2;
    leaf4.position.x -= 1;
    leaf.add(leaf4);
    let leaf5 = new T.Mesh(leaf_geom, leaf_mat);
    leaf5.position.y = 3.2;
    leaf5.position.x += 1;
    leaf.add(leaf5);
    let leaf6 = new T.Mesh(leaf_geom, leaf_mat);
    leaf6.position.y = 4.2;
    leaf.add(leaf6);
    let leaf7 = new T.Mesh(leaf_geom, leaf_mat);
    leaf7.position.y = 5.2;
    leaf.add(leaf7);
    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`tree-${treeObCtr++}`, tree);
    this.whole_ob = tree;
    

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    tree.scale.set(0.15, 0.15, 0.15);
    tree.position.y += 0.3;
    // This helper function defines a curve for the merry-go-round's handles,
    // then extrudes a tube along the curve to make the actual handle geometry.
    let i = 0, flag = 1;
    this.i = i;
    this.flag = flag;
  }
}


class roof1 extends GrObject {
    constructor() {
        let geometry = new T.BufferGeometry();
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
        let mesh = new T.Mesh(geometry, material);
        super("TwoTrianglesBG3", mesh);
    }
}

let bd1ObCtr = 0;

export class GrBD1 extends GrObject {
  constructor(params = {}) {
    let group = new  T.Group();
    let build_geom = new T.BoxGeometry(1,1,1);
    let build_mat = new T.MeshStandardMaterial({color: "white"});
    let build = new T.Mesh(build_geom, build_mat);
    build.translateY(1.5);
    build.scale.set(3,3,3);
    group.add(build);
    let door_geom = new T.BoxGeometry(0.3,0.4,0.01);
    let door_mat = new T.MeshStandardMaterial({color: "black"});
    let door = new T.Mesh(door_geom, door_mat);
    door.translateY(0.6);
    door.translateZ(1.5);
    door.scale.set(3,3,3);
    group.add(door);
    let window_geom = new T.BoxGeometry(0.3,0.3,0.01);
    let window_mat = new T.MeshStandardMaterial({color: "black"});
    let window1 = new T.Mesh(window_geom, window_mat);
    window1.position.set(-0.6,1.8,1.5);
    window1.scale.set(3,3,3);
    group.add(window1);
    let window2 = new T.Mesh(window_geom, window_mat);
    window2.position.set(0.6,1.8,1.5);
    window2.scale.set(3,3,3);
    group.add(window2);
    

    let base_geom = new T.CylinderGeometry(0.5, 1, 0.5, 16);
    let base_mat = new T.MeshStandardMaterial({color: "white", metalness: 0.5,roughness: 0.8});
    let base = new T.Mesh(base_geom, base_mat);
    base.translateY(0.25);
    group.add(base);

    let platform_geom = new T.CylinderGeometry(2, 1.8, 0.3, 8, 4);
    let platform_mat = new T.MeshStandardMaterial({color: "white",metalness: 0.3,roughness: 0.6});
    let platform_group = new T.Group();
    platform_group.translateY(0.25);
    let platform = new T.Mesh(platform_geom, platform_mat);
    platform.rotateZ(Math.PI);
    platform_group.add(platform);

    let stick_geom = new T.BoxGeometry(0.25,0.5,0.25);
    let stick_mat = new T.MeshStandardMaterial({color: "black",metalness: 0.3,roughness: 0.6});
    let stick_group = new T.Group();
    stick_group.translateY(0.25);
    let stick = new T.Mesh(stick_geom, stick_mat);
    platform_group.add(stick);

    let support_geom = new T.BoxGeometry(0.3,2,0.3);
    let support_mat = new T.MeshStandardMaterial({color: "black",metalness: 0.3,roughness: 0.6});
    let support = new T.Mesh(support_geom, support_mat);
    base.add(support);

    let boxes = [];
    let box_geom = new T.BoxGeometry(0.5,0.5,0.5);
    let box_mat = new T.MeshStandardMaterial({color: "red",metalness: 0.3,roughness: 0.6});
    let box1 = new T.Mesh(box_geom, box_mat);
    box1.position.y += 0.4;
    box1.position.z += -1.5;
    platform_group.add(box1);
    let box2 = new T.Mesh(box_geom, box_mat);
    box2.position.y += 0.4;
    box2.position.z += 1.5;
    platform_group.add(box2);
    let box3 = new T.Mesh(box_geom, box_mat);
    box3.position.y += 0.4;
    box3.position.x += -1.5;
    platform_group.add(box3);
    let box4 = new T.Mesh(box_geom, box_mat);
    box4.position.y += 0.4;
    box4.position.x += 1.5;
    platform_group.add(box4);

    boxes.push(box1);
    boxes.push(box2)
    boxes.push(box3);
    boxes.push(box4);

    base.add(platform_group);

    let geometry = new T.BufferGeometry();
    //
    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    const vertices = new Float32Array( [
        1,0,1,    2,-1,2,    1,0,-1,   2,-1,2,    2,-1,-2,  1,0,-1,      // right
        -1,0,-1,  -2,-1,-2,  -1,0,1,  -2,-1,-2,  -2,-1,2,  -1,0,1,// left
        -1,0,-1,  -1,0,1,   1,0,-1,   -1,0,1,     1,0,1,  1,0,-1,	    // up
        -2,-1,2,  -2,-1,-2,  2,-1,2,  -2,-1,-2,  2,-1,-2,  2,-1,2,// down
        -1,0,1,   -2,-1,2,    1,0,1,   -2,-1,2,    2,-1,2,  1,0,1,	    // front
        1,0,-1,   2,-1,-2,   -1,0,-1,  2,-1,-2,   -2,-1,-2,  -1,0,-1 // back
        
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
    let tl = new T.TextureLoader().load("./heart.jpg");
    let material = new T.MeshStandardMaterial({
    color: "white",
    roughness: 0.75,
    map: tl
    });
    //
    let roof1 = new T.Mesh(geometry, material);
    roof1.position.y -= 1;
    roof1.scale.set(2,2,2);
    group.add(roof1);
    // platform_group.add(base)
    super(`bd1-${bd1ObCtr++}`, group);
    this.whole_ob = group;
    this.platform = platform_group;
    this.platform.rotateX(Math.PI/2);
    this.platform.position.y += 2.5;
    this.boxes = boxes;
    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    group.scale.set(scale, scale, scale);
    group.scale.set(.5, .5, .5);
    base.position.set(0, 4, 0);
    base.scale.set(0.6,0.6,0.6);
  }
  /**
   * StepWorld method
   * @param {*} delta 
   * @param {*} timeOfDay 
   */
  stepWorld(delta, timeOfDay) {
    this.platform.rotateY(0.005 * delta/10);
    for (let i = 0; i < this.boxes.length; i++) {
      this.boxes[i].rotateY(-0.005 * delta/10);
    }
  }
}

function createEarth() {

    var _config = {
        radius: 1.4,
        map: new T.TextureLoader().load('./earth.jpg'),//加载需要的地球贴图 地球图为宽高 2:1的图  
    }
    
    var geometry = new T.SphereBufferGeometry(_config.radius, 64, 64);

    var material = new T.MeshPhongMaterial({
        color: 0xffffff,
        map: _config.map,
    });
    let earth = new T.Mesh(geometry, material);
    return earth;
}


let bd2ObCtr = 0;
export class GrBD2 extends GrObject {
  constructor(params = {}) {
    let group = new  T.Group();
    let build_geom = new T.BoxGeometry(1,1,1);
    let build_mat = new T.MeshStandardMaterial({color: "white"});
    let build = new T.Mesh(build_geom, build_mat);
    build.translateY(1.5);
    build.scale.set(3,3,3);
    group.add(build);
    let door_geom = new T.BoxGeometry(0.3,0.4,0.01);
    let door_mat = new T.MeshStandardMaterial({color: "black"});
    let door = new T.Mesh(door_geom, door_mat);
    door.translateY(0.6);
    door.translateZ(1.5);
    door.scale.set(3,3,3);
    group.add(door);
    let window_geom = new T.BoxGeometry(0.3,0.3,0.01);
    let window_mat = new T.MeshStandardMaterial({color: "black"});
    let window1 = new T.Mesh(window_geom, window_mat);
    window1.position.set(-0.6,1.8,1.5);
    window1.scale.set(3,3,3);
    group.add(window1);
    let window2 = new T.Mesh(window_geom, window_mat);
    window2.position.set(0.6,1.8,1.5);
    window2.scale.set(3,3,3);
    group.add(window2);
    

    let base_geom = new T.CylinderGeometry(1.7, 2.7, 1, 16);
    let base_mat = new T.MeshStandardMaterial({color: "white", metalness: 0.5,roughness: 0.8});
    let base = new T.Mesh(base_geom, base_mat);
    base.position.y = 3.3;
    group.add(base);
    
    let support_geom = new T.BoxGeometry(0.3,2,0.3);
    let support_mat = new T.MeshStandardMaterial({color: "black",metalness: 0.3,roughness: 0.6});
    let support = new T.Mesh(support_geom, support_mat);
    support.translateY(4);
    group.add(support);

    let earth = createEarth();
    earth.position.y = 5.5;
    group.add(earth);
    
    //make image
    let geometry = new T.BufferGeometry();
    const vertices = new Float32Array( [
        1,1,1,    1,-1,1,    1,1,-1,   1,-1,1,    1,-1,-1,  1,1,-1,      // right
        -1,1,-1,  -1,-1,-1,  -1,1,1,  -1,-1,-1,  -1,-1,1,  -1,1,1,// left
        -1,1,-1,  -1,1,1,   1,1,-1,   -1,1,1,     1,1,1,  1,1,-1,	    // up
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
        1/3,2/3,1/3,1/3,0,2/3,1/3,1/3,0,1/3,0,2/3,
    ]);
    geometry.setAttribute('uv',new T.BufferAttribute(uvs,2));
    geometry.translate(0,0.5,0);
    let tl = new T.TextureLoader().load("./star.jpg");
    let material = new T.MeshStandardMaterial({color: "white", map: tl});
    let mesh = new T.Mesh(geometry, material);
    mesh.position.y = 0;
    mesh.scale.set(3.01,3.01,3.01);
    group.add(mesh);

    super(`bd2-${bd2ObCtr++}`, group);
    this.whole_ob = group;
    this.earth = earth;

    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    group.scale.set(scale, scale, scale);
    group.scale.set(.5, .5, .5);
    base.scale.set(0.6,0.6,0.6);
    
  }
  /**
   * StepWorld method
   * @param {*} delta 
   * @param {*} timeOfDay 
   */
  stepWorld(delta, timeOfDay) {
    this.earth.rotateY(0.01 * delta/10);
  }
}

let bd3ObCtr = 0;
export class GrBD3 extends GrObject {
  constructor(params = {}) {
    let group = new  T.Group();

    let wall_geom = new T.BoxGeometry(1,1,0.1);
    let wall_mat = new T.MeshStandardMaterial({color: "white"});
    let wall1 = new T.Mesh(wall_geom, wall_mat);
    wall1.translateY(1.5);
    wall1.translateZ(1.35);
    wall1.scale.set(3,3,3);
    group.add(wall1);
    let wall2 = new T.Mesh(wall_geom, wall_mat);
    wall2.translateY(1.5);
    wall2.translateZ(-1.35);
    wall2.scale.set(3,3,3);
    group.add(wall2);
    let wall3 = new T.Mesh(wall_geom, wall_mat);
    wall3.translateY(1.5);
    wall3.translateY(-1.35);
    wall3.rotateX(Math.PI/2);
    wall3.scale.set(3,3,3);
    group.add(wall3);
    let wall4 = new T.Mesh(wall_geom, wall_mat);
    wall4.translateY(1.5);
    wall4.translateX(-1.35);
    wall4.rotateY(Math.PI/2);
    wall4.scale.set(3,3,3);
    group.add(wall4);
    let wall5 = new T.Mesh(wall_geom, wall_mat);
    wall5.translateY(1.5);
    wall5.translateX(1.35);
    wall5.rotateY(Math.PI/2);
    wall5.scale.set(3,3,3);
    group.add(wall5);

    let support_geom = new T.BoxGeometry(0.3,2,0.3);
    let support_mat = new T.MeshStandardMaterial({color: "pink",metalness: 0.3,roughness: 0.6});
    let support1 = new T.Mesh(support_geom, support_mat);
    support1.translateY(3);
    support1.translateX(-1.34);
    support1.translateZ(1.34);
    group.add(support1);
    let support2 = new T.Mesh(support_geom, support_mat);
    support2.translateY(3);
    support2.translateX(-1.34);
    support2.translateZ(-1.34);
    group.add(support2);
    let support3 = new T.Mesh(support_geom, support_mat);
    support3.translateY(3);
    support3.translateX(1.34);
    support3.translateZ(1.34);
    group.add(support3);
    let support4 = new T.Mesh(support_geom, support_mat);
    support4.translateY(3);
    support4.translateX(1.34);
    support4.translateZ(-1.34);
    group.add(support4);

    let door_geom = new T.BoxGeometry(0.3,0.4,0.01);
    let door_mat = new T.MeshStandardMaterial({color: "black"});
    let door = new T.Mesh(door_geom, door_mat);
    door.translateY(0.6);
    door.translateZ(1.5);
    door.scale.set(3,3,3);
    group.add(door);
    let window_geom = new T.BoxGeometry(0.3,0.3,0.01);
    let window_mat = new T.MeshStandardMaterial({color: "black"});
    let window1 = new T.Mesh(window_geom, window_mat);
    window1.position.set(-0.6,1.8,1.5);
    window1.scale.set(3,3,3);
    group.add(window1);
    let window2 = new T.Mesh(window_geom, window_mat);
    window2.position.set(0.6,1.8,1.5);
    window2.scale.set(3,3,3);
    group.add(window2);
    
  
    let left_geom = new T.BufferGeometry();
    const left_vertices = new Float32Array( [
        // 1,1,1,    1,-1,1,    1,1,-1,   1,-1,1,    1,-1,-1,  1,1,-1,      // right
            -1,1,-1,  -1,-1,-1,  -1,1,1,  -1,-1,-1,  -1,-1,1,  -1,1,1,// left
            
        ]);
        for (let i = 0; i < left_vertices.length; i++) left_vertices[i] /= 2;
        left_geom.setAttribute('position',new T.BufferAttribute(left_vertices,3));
        left_geom.computeVertexNormals();
        // give it UVs
        const left_uvs = new Float32Array( [       
            0,1,0,0,1,1,0,0,1,0,1,1
    ]);
    left_geom.setAttribute('uv',new T.BufferAttribute(left_uvs,2));
    left_geom.translate(0,0.5,0);
    let left_tl = new T.TextureLoader().load("./ironman.jpg");
    let left_material = new T.MeshStandardMaterial({color: "white", map: left_tl});
    let left_mesh = new T.Mesh(left_geom, left_material);
    left_mesh.position.y = 0;
    left_mesh.scale.set(3.01,3.01,3.01);
    group.add(left_mesh);

    let right_geom = new T.BufferGeometry();
    const right_vertices = new Float32Array( [
        1,1,1,    1,-1,1,    1,1,-1,   1,-1,1,    1,-1,-1,  1,1,-1,      // right
        ]);
        for (let i = 0; i < right_vertices.length; i++) right_vertices[i] /= 2;
        right_geom.setAttribute('position',new T.BufferAttribute(right_vertices,3));
        right_geom.computeVertexNormals();
        // give it UVs
        const right_uvs = new Float32Array( [       
            0,1,0,0,1,1,0,0,1,0,1,1
    ]);
    right_geom.setAttribute('uv',new T.BufferAttribute(right_uvs,2));
    right_geom.translate(0,0.5,0);
    let right_tl = new T.TextureLoader().load("./CA.jpg");
    let right_material = new T.MeshStandardMaterial({color: "white", map: right_tl});
    let right_mesh = new T.Mesh(right_geom, right_material);
    right_mesh.position.y = 0;
    right_mesh.scale.set(3.01,3.01,3.01);
    group.add(right_mesh);

    let back_geom = new T.BufferGeometry();
    const back_vertices = new Float32Array( [
        1,1,-1,   1,-1,-1,   -1,1,-1,  1,-1,-1,   -1,-1,-1,  -1,1,-1 // back
        ]);
        for (let i = 0; i < back_vertices.length; i++) back_vertices[i] /= 2;
        back_geom.setAttribute('position',new T.BufferAttribute(back_vertices,3));
        back_geom.computeVertexNormals();
        // give it UVs
        const back_uvs = new Float32Array( [       
            0,1,0,0,1,1,0,0,1,0,1,1
    ]);
    back_geom.setAttribute('uv',new T.BufferAttribute(back_uvs,2));
    back_geom.translate(0,0.5,0);
    let back_tl = new T.TextureLoader().load("./spiderman.jpg");
    let back_material = new T.MeshStandardMaterial({color: "white", map: back_tl});
    let back_mesh = new T.Mesh(back_geom, back_material);
    back_mesh.position.y = 0;
    back_mesh.scale.set(3.02,3.02,3.02);
    group.add(back_mesh);


    let roof_geom = new T.BufferGeometry();
    const roof_vertices = new Float32Array( [
        0.5,0.6,0.5,  0,0,1,  1,0,1,
        0.5,.6,0.5,  1,0,1,  1,0,0,
        0.5,.6,0.5,  1,0,0,  0,0,0,
        0.5,.6,0.5,  0,0,0,  0,0,1,
        ]);
        // for (let i = 0; i < roof_vertices.length; i++) roof_vertices[i] /= 2;
        roof_geom.setAttribute('position',new T.BufferAttribute(roof_vertices,3));
        roof_geom.computeVertexNormals();
        // give it UVs
        const roof_uvs = new Float32Array( [       
            .5,.5,0,0,1,0,
            .5,.5,1,0,1,1,
            .5,.5,1,1,0,1,
            .5,.5,0,1,0,0
    ]);
    roof_geom.setAttribute('uv',new T.BufferAttribute(roof_uvs,2));
    roof_geom.translate(-0.5,1.3,-0.5);
    let roof_tl = new T.TextureLoader().load("./shield.jpg");
    let roof_material = new T.MeshStandardMaterial({color: "white", map:roof_tl});
    let roof_mesh = new T.Mesh(roof_geom, roof_material);
    roof_mesh.position.y = 0;
    roof_mesh.scale.set(2.9,2.9,2.9);
    group.add(roof_mesh);

    super(`bd3-${bd3ObCtr++}`, group);
    this.whole_ob = group;
    let up = 1;
    this.up = up;
    this.roof_mesh = roof_mesh;
    this.support1 = support1;
    this.support2 = support2;
    this.support3 = support3;
    this.support4 = support4;
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    group.scale.set(scale, scale, scale);
    group.scale.set(.5, .5, .5);
    
  }
  /**
   * StepWorld method
   * @param {*} delta 
   * @param {*} timeOfDay 
   */
  stepWorld(delta, timeOfDay) {
    if (this.roof_mesh.position.y > 0.3) this.up = -1;
    if (this.roof_mesh.position.y < -0.5) this.up = 1;
    this.roof_mesh.position.y += (this.up) * (0.01 * delta) / 16;
    this.support1.position.y += (this.up) * (0.01 * delta) / 16;
    this.support2.position.y += (this.up) * (0.01 * delta) / 16;
    this.support3.position.y += (this.up) * (0.01 * delta) / 16;
    this.support4.position.y += (this.up) * (0.01 * delta) / 16;
  }
}
