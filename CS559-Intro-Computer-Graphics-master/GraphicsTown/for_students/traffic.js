/*jshint esversion: 6 */
// @ts-check



// get things we need
import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";

let size = 95;
export class GrAvenue extends GrObject {
    constructor() {
        let avenue = new T.Group();
        let geo1 = new T.BoxGeometry( size*0.8,0.02,4 );
        let geo2 = new T.BoxGeometry( 3,0.05,size*0.8 );
        let geomesh = new T.MeshStandardMaterial({color:"#a6a6a6", metalness:0.5, roughness:0.8});
        let mesh1 = new T.Mesh(geo1, geomesh);
        let mesh2 = new T.Mesh(geo1, geomesh);
        let mesh3 = new T.Mesh(geo2, geomesh);
        let mesh4 = new T.Mesh(geo2, geomesh);
        avenue.add(shift(mesh1 ,0,size/5));
        avenue.add(shift(mesh2 ,0,-size/5));
        avenue.add(shift(mesh3 ,size/5,0));
        avenue.add(shift(mesh4 ,-size/5,0));
        super("Roads",avenue);
    }
}


export class GrRoad2 extends GrObject {
    constructor (length, id) {
       let road;
        
        super("Road_" + id, road);
    }
}



export class GrBridge extends GrObject {
    constructor(){
        let bridge = new T.Group();

        let texture = new T.TextureLoader().load("./Pictures/metalPole.jpg")
        let geo1 = new T.CylinderGeometry(0.5,0.5,14.7,100);
        let material = new T.MeshStandardMaterial({map: texture, bumpMap: texture, roughnessMap: texture, metalnessMap: texture, refractionRatio: 1});
        let mesh = new T.Mesh(geo1, material);
        bridge.add(mesh);
        super("Roads",bridge);
    }
}

export class GrShiny extends GrObject {
    /**
     * @param {GrWorld} world
     */
    constructor(world,radius =1.5 ) {

        let flag = new T.Group();
        super("ShinySculpture", flag);
        this.world = world;
        this.cubecam = new T.CubeCamera(radius*1.05, 100, 128);
        this.sculptureGeom = new T.SphereBufferGeometry(radius, 100, 100);
        this.sculptureMaterial = new T.MeshStandardMaterial({
            color: "white",
            roughness: 0.2,
            metalness: .7,
            // @ts-ignore   // envMap has the wrong type
            envMap: this.cubecam.renderTarget.texture,
          });
          this.sculpture = new T.Mesh(this.sculptureGeom, this.sculptureMaterial);
          flag.add(this.cubecam);
        flag.add(this.sculpture);
        this.sculpture.rotateY(Math.PI/2);
        this.sculpture.translateY(3);

        let base_geom = new T.BoxBufferGeometry( 0.5, 2, 0.5 );
		let base_mat = new T.MeshStandardMaterial({color:"white", metalness:0.5, roughness:0.2});
        let pole = new T.Mesh(base_geom, base_mat);
        flag.add(pole);

        this.mesh = new T.MeshStandardMaterial({
            color: "white",
            roughness: 0.2,
            metalness: .7,
            // @ts-ignore   // envMap has the wrong type
            envMap: this.cubecam.renderTarget.texture,
          });

          this.cube = new T.Mesh(base_geom, this.mesh);

          flag.add(this.cube);

  
          
    }
    
    tick(delta, timeOfDay) {
        this.cubecam.update(this.world.renderer, this.world.scene);
      }
}



function shift(grobj,x,z,s=1) {
    grobj.translateX(x);
    grobj.translateZ(z);
    grobj.scale.set(s,s,s);
    return grobj;
}


export class GrHelicopter extends GrObject{
    constructor(id){
        let group = new T.Group();
        super("Helicopter2",group);
        this.cop = group;
        this.id = id;
        let backBlade = new T.MeshStandardMaterial({color:"black"});
        let head = new T.SphereBufferGeometry(.6,20,20);
        let mesh = new T.Mesh(head, new T.MeshStandardMaterial({color:"white", metalness: 0.8}));
        this.cop.add(mesh);
        this.t = new T.CylinderBufferGeometry(.02,.4,1.2,40)
        let tailMesh = new T.Mesh(this.t, new T.MeshStandardMaterial({color:"white",metalness:0.8 }));
        tailMesh.rotateZ(Math.PI/2);
        tailMesh.position.x = tailMesh.position.x-.6;
        this.cop.add(tailMesh);
        let rb = new T.CylinderBufferGeometry(.01,.01,.2,15)
        let rm = new T.Mesh(rb,backBlade);
        rm.position.y = rm.position.y+.45;
        this.cop.add(rm);
        let tb = new T.BoxBufferGeometry(.01,.3,.07);
        let tbm = new T.Mesh(tb, backBlade);
        tbm.position.x = tailMesh.position.x-.58;
        tbm.position.z = tailMesh.position.z-.025;
        tbm.rotateY(Math.PI/2);
        this.cop.add(tbm);
        let te = new T.BoxBufferGeometry(.01,.3,.07);
        this.tem = new T.Mesh(te, new T.MeshStandardMaterial({color:"black", metalness:0.8}));
        this.tem.position.x = tbm.position.x;
        this.tem.position.z = tbm.position.z-.015;
        this.tem.rotateY(Math.PI/2);
        this.cop.add(this.tem);

        this.rotor2 = new T.BoxBufferGeometry(.008,1.5,.07);
        this.rotor = new T.BoxBufferGeometry(.008,1.5,.07);
    
        this.rotor3 = new T.BoxBufferGeometry(.008,1.5,.07);
        this.rotor4 = new T.BoxBufferGeometry(.008,1.5,.07);

        this.base = new T.BoxBufferGeometry(0.15,0.15,0.15);

        let rotorMesh = new T.Mesh(this.rotor, new T.MeshStandardMaterial({color:"black", metalness:0.8}));
        let roterMesh2 = new T.Mesh(this.rotor2, new T.MeshStandardMaterial({color:"black", metalness:0.8}));
        let roterMesh3 = new T.Mesh(this.rotor2, new T.MeshStandardMaterial({color:"black", metalness:0.8}));

        let roterMesh4 = new T.Mesh(this.rotor2, new T.MeshStandardMaterial({color:"black", metalness:0.8}));

        let baseMesh = new T.Mesh(this.base, new T.MeshStandardMaterial({color:"black", metalness:0.8}));
        roterMesh2.position.y = tailMesh.position.y+.59;
        rotorMesh.position.y = tailMesh.position.y+.59;
        baseMesh.position.y = tailMesh.position.y+.59;
        roterMesh3.position.y = tailMesh.position.y+.59;
        roterMesh4.position.y = tailMesh.position.y+.59;

        rotorMesh.rotateZ(Math.PI/2);
    

        roterMesh2.rotateZ(-Math.PI/2)
    
        this.cop.add(rotorMesh, roterMesh2, baseMesh);

        this.cop.position.y = 2

        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(2);
        this.ridePoint.rotateY(Math.PI / 2);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;
    }

    tick(delta, timeofday){
        let theta = performance.now() / 800;
        let x2 = this.id * -28 * Math.cos(theta);
        let z2 = this.id * -28 * Math.sin(theta);
        this.cop.position.x = x2;
        this.cop.position.z = z2;
        this.cop.lookAt(2,2,2);
        this.tem.rotateX(3);
        this.cop.position.y = this.id * Math.sin(theta) * 3.5 + 20;
        this.rotor.rotateX(1);
    };
}
