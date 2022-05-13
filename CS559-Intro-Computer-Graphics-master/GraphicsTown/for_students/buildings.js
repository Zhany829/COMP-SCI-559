/*jshint esversion: 6 */
// @ts-check



// get things we need
import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";


let yellow = 1; let blue = 1; let brown = 1; let lighthousenum=1;

export class GrBuilding1 extends GrObject {
    constructor(params={}) {
        let houseType = new T.Geometry();
        let k = 2, id = 1;
        houseType.vertices.push(new T.Vector3( 0,0, 0));
        houseType.vertices.push(new T.Vector3( k,0, 0));
        houseType.vertices.push(new T.Vector3( k,0, k));
        houseType.vertices.push(new T.Vector3( 0,0, k));
        houseType.vertices.push(new T.Vector3( 0,id, k));
        houseType.vertices.push(new T.Vector3( 0,id, 0));
        houseType.vertices.push(new T.Vector3( k,id, 0));
        houseType.vertices.push(new T.Vector3( k,id, k));
        houseType.vertices.push(new T.Vector3( k,id*1.5, k/2));
        houseType.vertices.push(new T.Vector3( 0,id*1.5, k/2));
        //window
        id = id-0.5, k = k + 0.01;
        houseType.vertices.push(new T.Vector3( 1.2*k/3-0.5,id/1.5, k));
        houseType.vertices.push(new T.Vector3( 1.2*k*2/3-0.5,id/1.5, k));
        houseType.vertices.push(new T.Vector3( 1.2*k*2/3-0.5,id/1.5+1.5*k/6, k));
        houseType.vertices.push(new T.Vector3( 1.2*k/3-0.5,id/1.5+1.5*k/6, k));
        //door
        id = id;
        let door_width=0.4,width2 = k -0.3;
        houseType.vertices.push(new T.Vector3( width2-door_width,0, k));
        houseType.vertices.push(new T.Vector3( width2,0, k));
        houseType.vertices.push(new T.Vector3( width2,door_width*2, k));
        houseType.vertices.push(new T.Vector3( width2-door_width,door_width*2, k));
        
        //
        houseType.faceVertexUvs = [ [] ];
        let f1 = new T.Face3(3,2,7);
        houseType.faces.push(f1);
        houseType.faceVertexUvs[0].push([new T.Vector2(1/3,1/3), new T.Vector2(2/3,1/3), new T.Vector2(2/3,2/3)]);
        let f2 = new T.Face3(3,7,4);
        houseType.faces.push(f2);
        houseType.faceVertexUvs[0].push([new T.Vector2(1/3,1/3), new T.Vector2(2/3,2/3), new T.Vector2(1/3,2/3)]);
        let f3 = new T.Face3(2,1,6);
        houseType.faces.push(f3);
        houseType.faceVertexUvs[0].push([new T.Vector2(2/3,1/3), new T.Vector2(1,1/3), new T.Vector2(1,2/3)]);
        let f4 = new T.Face3(2,6,7);
        houseType.faces.push(f4);
        houseType.faceVertexUvs[0].push([new T.Vector2(2/3,1/3), new T.Vector2(1,2/3), new T.Vector2(2/3,2/3)]);
        let f5 = new T.Face3(4,7,6);
        houseType.faces.push(f5);
        houseType.faceVertexUvs[0].push([new T.Vector2(1/3,2/3), new T.Vector2(2/3,2/3), new T.Vector2(2/3,1)]);
        let f6 = new T.Face3(4,6,5);
        houseType.faces.push(f6);
        houseType.faceVertexUvs[0].push([new T.Vector2(1/3,2/3), new T.Vector2(2/3,1), new T.Vector2(1/3,1)]);
        let f7 = new T.Face3(0,3,4);
        houseType.faces.push(f7);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,1/3), new T.Vector2(1/3,1/3), new T.Vector2(1/3,2/3)]);
        let f8 = new T.Face3(0,4,5);
        houseType.faces.push(f8);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,1/3), new T.Vector2(1/3,2/3), new T.Vector2(0,2/3)]);
        let f9 = new T.Face3(0,1,2);
        houseType.faces.push(f9);
        houseType.faceVertexUvs[0].push([new T.Vector2(1/3,0), new T.Vector2(2/3,0), new T.Vector2(2/3,1/3)]);
        let f10 = new T.Face3(0,2,3);
        houseType.faces.push(f10);
        houseType.faceVertexUvs[0].push([new T.Vector2(1/3,0), new T.Vector2(2/3,1/3), new T.Vector2(1/3,1/3)]);
        
        let f11 = new T.Face3(1,0,5);
        houseType.faces.push(f11);
        houseType.faceVertexUvs[0].push([new T.Vector2(2/3,0), new T.Vector2(1,0), new T.Vector2(1,1/3)]);
        let f12 = new T.Face3(1,5,6);
        houseType.faces.push(f12);
        houseType.faceVertexUvs[0].push([new T.Vector2(2/3,0), new T.Vector2(1,1/3), new T.Vector2(2/3,1/3)]);
        
        houseType.computeFaceNormals();
        houseType.uvsNeedUpdate=true;
        let tl=new T.TextureLoader().load("./Pictures/wallTexture.jpg");
        let treeMat = new T.MeshStandardMaterial({map:tl, bumpMap:tl});
        
        //roof
        let f21 = new T.Face3(4,7,8);
        f21.materialIndex = 1;
        houseType.faces.push(f21);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,0), new T.Vector2(1,0), new T.Vector2(1,1)]);
        let f22 = new T.Face3(4,8,9);
        f22.materialIndex = 1;
        houseType.faces.push(f22);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,0), new T.Vector2(1,1), new T.Vector2(0,1)]);
        let f23 = new T.Face3(6,5,9);
        f23.materialIndex = 1;
        houseType.faces.push(f23);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,0), new T.Vector2(1,0), new T.Vector2(1,1)]);
        let f24 = new T.Face3(6,9,8);
        f24.materialIndex = 1;
        houseType.faces.push(f24);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,0), new T.Vector2(1,1), new T.Vector2(0,1)]);
        let f25 = new T.Face3(9,5,4);
        f25.materialIndex = 1;
        houseType.faces.push(f25);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,0), new T.Vector2(1,0), new T.Vector2(1,1)]);
        let f26 = new T.Face3(8,7,6);
        f26.materialIndex = 1;
        houseType.faces.push(f26);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,0), new T.Vector2(1,1), new T.Vector2(0,1)]);
        
        //window
        let f33 = new T.Face3(10,11,12);
        f33.materialIndex = 2;
        houseType.faces.push(f33);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,0), new T.Vector2(1,0), new T.Vector2(1,1)]);
        let f34 = new T.Face3(10,12,13);
        f34.materialIndex = 2;
        houseType.faces.push(f34);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,0), new T.Vector2(1,1), new T.Vector2(0,1)]);
       
        //door
        let f43 = new T.Face3(14,15,16);
        f43.materialIndex = 3;
        houseType.faces.push(f43);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,0), new T.Vector2(1,0), new T.Vector2(1,1)]);
        let f44 = new T.Face3(14,16,17);
        f44.materialIndex = 3;
        houseType.faces.push(f44);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,0), new T.Vector2(1,1), new T.Vector2(0,1)]);
       
        houseType.computeFaceNormals();
        houseType.uvsNeedUpdate=true;

        let t2=new T.TextureLoader().load("./Pictures/roofTexture.jpg");
        let material2 = new T.MeshStandardMaterial({map:t2, bumpMap:t2});
        let t3=new T.TextureLoader().load("./Pictures/windowTexture.jpg");
        let material3 = new T.MeshStandardMaterial({map:t3, bumpMap:t3});
        let t4=new T.TextureLoader().load("./Pictures/door1.jpg");
        let material4 = new T.MeshStandardMaterial({map:t4, bumpMap:t4});
        let mesh = new T.Mesh(houseType,[treeMat, material2,material3, material4]);

        super(`Yellow House-${yellow++}`,mesh);
        this.whole_ob = mesh;
        this.whole_ob.position.x = params.x ? Number(params.x) : 0;
        this.whole_ob.position.y = params.y ? Number(params.y) : 0;
		this.whole_ob.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 1;
        this.whole_ob.scale.set(scale,scale,scale);

        this.rotate = params.rotate ? Number(params.rotate) : 0;
        switch(this.rotate) {
            case 0: 
                break;
            case 1:
                mesh.rotation.y = Math.PI/2;
                break;
            case 2:
                mesh.rotation.y = -Math.PI/2;
                break;
        } 
    }
}


let count = 0;
export class GrTree extends GrObject {
    constructor(x, y, z, num=10) {
    let treeMat = new T.MeshStandardMaterial({color: "brown", roughness: 1, metalness: 0});
    let point1 = new T.Vector2(0.5, 0);
    let point2 = new T.Vector2(0.2, 8);
    let pointsConstruct = [point1, point2];
    let treeStem = new T.LatheGeometry(pointsConstruct, 20);
    treeStem.computeFlatVertexNormals();
    let treeBranch = new T.LatheGeometry(pointsConstruct, 20);
    treeBranch.computeFlatVertexNormals();
    treeBranch.rotateX(Math.PI/2);
    let treebase = new T.Mesh(treeStem, treeMat);
    for (let i = 0; i < num; i++) {
        let ram = Math.random()*6;
        let y = ram;
        let numb = new T.Mesh(treeBranch, treeMat);
        let  rotation = Math.random()*Math.PI*2;
        let rotationran = Math.PI/2 - Math.random()*Math.PI/4;
        let n1 = Math.cos(rotation)*Math.sin(rotationran);
        let n2 = Math.cos(rotationran);
        let n3 = Math.sin(rotationran)*Math.sin(rotation);
        numb.lookAt(new T.Vector3(n1, n2, n3));
        numb.position.y = y + 2;
        let scale = 2/numb.position.y; 
        let scaleTree = (scale + 1)*0.25;
        numb.scale.set(scaleTree, scaleTree, scaleTree);
        treebase.add(numb);
        let chunk = new T.SphereGeometry((scale + 6)/2, 6, 3);
        chunk.computeFlatVertexNormals();
        let mat = new T.MeshStandardMaterial({color: "#009933", roughness: 1, metalness: 0})
        let chunkMesh = new T.Mesh(chunk, mat);
        numb.add(chunkMesh);
        chunkMesh.position.z = 8;
    }
    treebase.position.set(x, y, z);
    treebase.scale.set(0.2, 0.2, 0.2);
    count++;
    super(`tree_${count}`, treebase);
    }
}



let GrCrossHippedCount = 0;
export class GrCrossHipped extends GrObject
{
    constructor(params = {})
    {
        let house;
        super(`crossHipped-${++GrCrossHippedCount}`, house);
    }
}


export class GrBuilding2 extends GrObject {
    constructor(params={}) {
        let houseType = new T.Geometry();
        let k = 2, id = 1;
        houseType.vertices.push(new T.Vector3( 0,0, 0));
        houseType.vertices.push(new T.Vector3( k,0, 0));
        houseType.vertices.push(new T.Vector3( k,0, k));
        houseType.vertices.push(new T.Vector3( 0,0, k));
        houseType.vertices.push(new T.Vector3( 0,id, k));
        houseType.vertices.push(new T.Vector3( 0,id, 0));
        houseType.vertices.push(new T.Vector3( k,id, 0));
        houseType.vertices.push(new T.Vector3( k,id, k));
        //roof
        houseType.vertices.push(new T.Vector3( k/2,id*1.8, k/2));
        //window
        id = id-0.5, k = k + 0.01;
        houseType.vertices.push(new T.Vector3( 1.2*k/3-0.5,id/1.5-0.1, k));
        houseType.vertices.push(new T.Vector3( 1.2*k*2/3-0.5,id/1.5-0.1, k));
        houseType.vertices.push(new T.Vector3( 1.2*k*2/3-0.5,id/1.5+1.5*k/6+0.1, k));
        houseType.vertices.push(new T.Vector3( 1.2*k/3-0.5,id/1.5+1.5*k/6+0.1, k));
        //door
        id = id;
        let door_width=0.4,width2 = k -0.3;
        houseType.vertices.push(new T.Vector3( width2-door_width,0, k));
        houseType.vertices.push(new T.Vector3( width2,0, k));
        houseType.vertices.push(new T.Vector3( width2,door_width*2, k));
        houseType.vertices.push(new T.Vector3( width2-door_width,door_width*2, k));
    
        houseType.faceVertexUvs = [ [] ];
        let f1 = new T.Face3(3,2,7);
        houseType.faces.push(f1);
        houseType.faceVertexUvs[0].push([new T.Vector2(1/3,1/3), new T.Vector2(2/3,1/3), new T.Vector2(2/3,2/3)]);
        let f2 = new T.Face3(3,7,4);
        houseType.faces.push(f2);
        houseType.faceVertexUvs[0].push([new T.Vector2(1/3,1/3), new T.Vector2(2/3,2/3), new T.Vector2(1/3,2/3)]);
        let f3 = new T.Face3(2,1,6);
        houseType.faces.push(f3);
        houseType.faceVertexUvs[0].push([new T.Vector2(2/3,1/3), new T.Vector2(1,1/3), new T.Vector2(1,2/3)]);
        let f4 = new T.Face3(2,6,7);
        houseType.faces.push(f4);
        houseType.faceVertexUvs[0].push([new T.Vector2(2/3,1/3), new T.Vector2(1,2/3), new T.Vector2(2/3,2/3)]);
        let f5 = new T.Face3(4,7,6);
        houseType.faces.push(f5);
        houseType.faceVertexUvs[0].push([new T.Vector2(1/3,2/3), new T.Vector2(2/3,2/3), new T.Vector2(2/3,1)]);
        let f6 = new T.Face3(4,6,5);
        houseType.faces.push(f6);
        houseType.faceVertexUvs[0].push([new T.Vector2(1/3,2/3), new T.Vector2(2/3,1), new T.Vector2(1/3,1)]);
        let f7 = new T.Face3(0,3,4);
        houseType.faces.push(f7);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,1/3), new T.Vector2(1/3,1/3), new T.Vector2(1/3,2/3)]);
        let f8 = new T.Face3(0,4,5);
        houseType.faces.push(f8);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,1/3), new T.Vector2(1/3,2/3), new T.Vector2(0,2/3)]);
        let f9 = new T.Face3(0,1,2);
        houseType.faces.push(f9);
        houseType.faceVertexUvs[0].push([new T.Vector2(1/3,0), new T.Vector2(2/3,0), new T.Vector2(2/3,1/3)]);
        let f10 = new T.Face3(0,2,3);
        houseType.faces.push(f10);
        houseType.faceVertexUvs[0].push([new T.Vector2(1/3,0), new T.Vector2(2/3,1/3), new T.Vector2(1/3,1/3)]);
        
        let f11 = new T.Face3(1,0,5);
        houseType.faces.push(f11);
        houseType.faceVertexUvs[0].push([new T.Vector2(2/3,0), new T.Vector2(1,0), new T.Vector2(1,1/3)]);
        let f12 = new T.Face3(1,5,6);
        houseType.faces.push(f12);
        houseType.faceVertexUvs[0].push([new T.Vector2(2/3,0), new T.Vector2(1,1/3), new T.Vector2(2/3,1/3)]);
        
        houseType.computeFaceNormals();
        houseType.uvsNeedUpdate=true;


        let tl=new T.TextureLoader().load("./Pictures/wallTexture2.jpg");
        let treeMat = new T.MeshStandardMaterial({map:tl, bumpMap:tl});
        
        //roof
        let f21 = new T.Face3(4,7,8);
        f21.materialIndex = 1;
        houseType.faces.push(f21);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,0), new T.Vector2(1,0), new T.Vector2(1,1)]);
        let f22 = new T.Face3(7,6,8);
        f22.materialIndex = 1;
        houseType.faces.push(f22);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,0), new T.Vector2(1,1), new T.Vector2(0,1)]);
        let f23 = new T.Face3(6,5,8);
        f23.materialIndex = 1;
        houseType.faces.push(f23);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,0), new T.Vector2(1,0), new T.Vector2(1,1)]);
        let f24 = new T.Face3(4,8,5);
        f24.materialIndex = 1;
        houseType.faces.push(f24);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,0), new T.Vector2(1,1), new T.Vector2(0,1)]);
        //window
        let f33 = new T.Face3(9,10,11);
        f33.materialIndex = 2;
        houseType.faces.push(f33);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,0), new T.Vector2(1,0), new T.Vector2(1,1)]);
        let f34 = new T.Face3(9,11,12);
        f34.materialIndex = 2;
        houseType.faces.push(f34);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,0), new T.Vector2(1,1), new T.Vector2(0,1)]);
       
        //door
        let f43 = new T.Face3(13,14,15);
        f43.materialIndex = 3;
        houseType.faces.push(f43);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,0), new T.Vector2(1,0), new T.Vector2(1,1)]);
        let f44 = new T.Face3(13,15,16);
        f44.materialIndex = 3;
        houseType.faces.push(f44);
        houseType.faceVertexUvs[0].push([new T.Vector2(0,0), new T.Vector2(1,1), new T.Vector2(0,1)]);
    
        houseType.computeFaceNormals();
        houseType.uvsNeedUpdate=true;
        let t2=new T.TextureLoader().load("./Pictures/roofTexture2.jpg");
        let material2 = new T.MeshStandardMaterial({map:t2, bumpMap:t2});
        let t3=new T.TextureLoader().load("./Pictures/windowTexture2.jpg");
        let material3 = new T.MeshStandardMaterial({map:t3, bumpMap:t3});
        let t4=new T.TextureLoader().load("./Pictures/doorTexture2.jpg");
        let material4 = new T.MeshStandardMaterial({map:t4, bumpMap:t4});
        let mesh = new T.Mesh(houseType,[treeMat, material2,material3, material4]);
        super(`Blue House-${blue++}`,mesh);
        this.whole_ob = mesh;
        this.whole_ob.position.x = params.x ? Number(params.x) : 0;
        this.whole_ob.position.y = params.y ? Number(params.y) : 0;
		this.whole_ob.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 1;
        mesh.scale.set(scale,scale,scale);
        this.rotate = params.rotate ? Number(params.rotate) : 0;
        switch(this.rotate) {
            case 0: 
                break;
            case 1:
                mesh.rotation.y = Math.PI/2;
                break;
            case 2:
                mesh.rotation.y = -Math.PI/2;
                break;
        } 
    }
}

export class GrHut extends GrObject{
    constructor(){
        let hut = new T.Group();
        let wt=new T.TextureLoader().load("./Pictures/wood.jpg");
        let wMat = new T.MeshStandardMaterial({map:wt,bumpMap: wt,roughness:1});
        let wtd=new T.TextureLoader().load("./Pictures/woodDoor2.jpg");
        let wallDoorMaterial = new T.MeshStandardMaterial({map:wtd,bumpMap: wtd, roughness:1});
        let wtw=new T.TextureLoader().load("./Pictures/wood.jpg");
        let wWM = new T.MeshStandardMaterial({map:wtw,bumpMap: wtw, roughness:1});
        var exterior = [];
        exterior.push( wallDoorMaterial );
        exterior.push( wMat );
        exterior.push( wMat );
        exterior.push( wMat );
        exterior.push( wWM );
        exterior.push( wWM );
        var foundation = new T.BoxGeometry( 1.1, 1.1, 1.1, 1, 1, 1 );
        let mesh2 = new T.Mesh( foundation, exterior );
        hut.add(mesh2);
        mesh2.position.y = 0.51;
        let rf=new T.TextureLoader().load("./Pictures/woodRoof.jpg");
        let rMat = new T.MeshStandardMaterial({map:rf,bumpMap:rf, roughness:1});
        let roofGeometry = new T.ConeBufferGeometry(.91, .81, 4, 4);
        let roofMesh = new T.Mesh(roofGeometry,rMat);
        hut.add(roofMesh);
        roofMesh.position.y = 1.41;
        roofMesh.rotateY(Math.PI/4);
        super("GrHut",hut);

    }
}


export class Building1 extends GrObject {
    constructor (num) {
        let building = new T.Group();
        let houseType = new T.Geometry();
        houseType.vertices.push(new T.Vector3(-1,1,0)); 
        houseType.vertices.push(new T.Vector3( 0,0,0)); 
        houseType.vertices.push(new T.Vector3( -1,0,0)); 
        houseType.vertices.push(new T.Vector3( 0,1,0)); 
    
        houseType.faceVertexUvs = [ [] ];
        houseType.faces.push(new T.Face3(1,0,2));
        houseType.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(0,1), new T.Vector2(0,0)]);
        houseType.faces.push(new T.Face3(1,3,0));
        houseType.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(1,1), new T.Vector2(0,1)]);
        
        houseType.computeFaceNormals();
        houseType.uvsNeedUpdate=true;
        let t = new T.TextureLoader().load("./Pictures/222.jpg");
        let mat = new T.MeshStandardMaterial({map:t, bumpMap: t, roughness:0.75});

        for(let id=0; id<5; id++){
            for(let k=0; k<3; k++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(k,id,0);
                building.add(block);
            }
        }
        for(let id=0; id<5; id++){
            for(let k=0; k<3; k++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(k-1,id,-2);
                block.rotation.set(0,Math.PI,0);
                building.add(block);
            }
        }
        
        let ex1 = new T.Group();
        for(let id=0; id<5; id++){
            for(let w=0; w<2; w++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(w,id,-2);
                ex1.add(block);
            }
        }
        ex1.rotation.set(0,-Math.PI/2,0);
        ex1.position.set(-3,0,-1);
        building.add(ex1);

        let ex2 = new T.Group();
        for(let id=0; id<5; id++){
            for(let w=0; w<2; w++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(w,id,-2);
                ex2.add(block);
            }
        }
        ex2.rotation.set(0,Math.PI/2,0);
        ex2.position.set(4,0,-1);
        building.add(ex1);
        building.add(ex2);


        let geo = new T.PlaneGeometry(3,2);
        let texture = new T.TextureLoader().load("./Pictures/r.jpg")
        let treeMat = new T.MeshStandardMaterial({map: texture, bumpMap: texture, roughnessMap: texture, metalnessMap: texture, refractionRatio: 1});
        let roof = new T.Mesh(geo, treeMat)
        // let roof = new T.Mesh(geo,new T.MeshStandardMaterial({color:"grey",roughness:0.75}));
        roof.position.set(0.5,5,-1);
        roof.rotation.set(-Math.PI/2, 0,0);
        building.add(roof);

        super("Building_" + num, building);
    }
}
export class Building2 extends GrObject {
    constructor (num) {
        let building = new T.Group();

        let houseType = new T.Geometry();
        houseType.vertices.push(new T.Vector3(-1,1,0)); 
        houseType.vertices.push(new T.Vector3( 0,0,0)); 
        houseType.vertices.push(new T.Vector3( -1,0,0)); 
        houseType.vertices.push(new T.Vector3( 0,1,0)); 
        houseType.faceVertexUvs = [ [] ];
        houseType.faces.push(new T.Face3(1,0,2));
        houseType.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(0,1), new T.Vector2(0,0)]);
        houseType.faces.push(new T.Face3(1,3,0));
        houseType.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(1,1), new T.Vector2(0,1)]);
        
        houseType.computeFaceNormals();
        houseType.uvsNeedUpdate=true;

        let t = new T.TextureLoader().load("./Pictures/r.jpg");
        let mat = new T.MeshStandardMaterial({map:t, bumpMap: t, roughness:0.75});

        for(let id=0; id<5; id++){
            for(let k=0; k<3; k++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(k,id,0);
                building.add(block);
            }
        }
        for(let id=0; id<5; id++){
            for(let k=0; k<3; k++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(k-1,id,-2);
                block.rotation.set(0,Math.PI,0);
                building.add(block);
            }
        }
        
        let ex1 = new T.Group();
        for(let id=0; id<5; id++){
            for(let w=0; w<2; w++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(w,id,-2);
                ex1.add(block);
            }
        }
        ex1.rotation.set(0,-Math.PI/2,0);
        ex1.position.set(-3,0,-1);
        building.add(ex1);

        let ex2 = new T.Group();
        for(let id=0; id<5; id++){
            for(let w=0; w<2; w++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(w,id,-2);
                ex2.add(block);
            }
        }
        ex2.rotation.set(0,Math.PI/2,0);
        ex2.position.set(4,0,-1);
        building.add(ex1);
        building.add(ex2);


        let geo = new T.PlaneGeometry(3,2);
        let texture = new T.TextureLoader().load("./Pictures/r.jpg")
        let treeMat = new T.MeshStandardMaterial({map: texture, bumpMap: texture, roughnessMap: texture, metalnessMap: texture, refractionRatio: 1});
        let roof = new T.Mesh(geo, treeMat)
        // let roof = new T.Mesh(geo,new T.MeshStandardMaterial({color:"grey",roughness:0.75}));
        roof.position.set(0.5,5,-1);
        roof.rotation.set(-Math.PI/2, 0,0);
        building.add(roof);


        //building.position.set(0,2,0);

        super("Building_" + num, building);
    }
}

export class Building3 extends GrObject {
    constructor (num) {
        let building = new T.Group();

        let houseType = new T.Geometry();
        houseType.vertices.push(new T.Vector3(-1,1,0)); //0 top left
        houseType.vertices.push(new T.Vector3( 0,0,0)); //1 bottom right
        houseType.vertices.push(new T.Vector3( -1,0,0)); //2 bottom left
        houseType.vertices.push(new T.Vector3( 0,1,0)); //3 top right
    
        houseType.faceVertexUvs = [ [] ];
        houseType.faces.push(new T.Face3(1,0,2));
        houseType.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(0,1), new T.Vector2(0,0)]);
        houseType.faces.push(new T.Face3(1,3,0));
        houseType.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(1,1), new T.Vector2(0,1)]);
        
        houseType.computeFaceNormals();
        houseType.uvsNeedUpdate=true;

        let t = new T.TextureLoader().load("./Pictures/k.jpg");
        let mat = new T.MeshStandardMaterial({map:t, bumpMap: t, roughness:0.75});

        for(let id=0; id<5; id++){
            for(let k=0; k<3; k++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(k,id,0);
                building.add(block);
            }
        }
        for(let id=0; id<5; id++){
            for(let k=0; k<3; k++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(k-1,id,-2);
                block.rotation.set(0,Math.PI,0);
                building.add(block);
            }
        }
        
        let ex1 = new T.Group();
        for(let id=0; id<5; id++){
            for(let w=0; w<2; w++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(w,id,-2);
                ex1.add(block);
            }
        }
        ex1.rotation.set(0,-Math.PI/2,0);
        ex1.position.set(-3,0,-1);
        building.add(ex1);

        let ex2 = new T.Group();
        for(let id=0; id<5; id++){
            for(let w=0; w<2; w++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(w,id,-2);
                ex2.add(block);
            }
        }
        ex2.rotation.set(0,Math.PI/2,0);
        ex2.position.set(4,0,-1);
        building.add(ex1);
        building.add(ex2);


        let geo = new T.PlaneGeometry(3,2);
        let texture = new T.TextureLoader().load("./Pictures/r.jpg")
        let treeMat = new T.MeshStandardMaterial({map: texture, bumpMap: texture, roughnessMap: texture, metalnessMap: texture, refractionRatio: 1});
        let roof = new T.Mesh(geo, treeMat)
        // let roof = new T.Mesh(geo,new T.MeshStandardMaterial({color:"grey",roughness:0.75}));
        roof.position.set(0.5,5,-1);
        roof.rotation.set(-Math.PI/2, 0,0);
        building.add(roof);

        super("Building_" + num, building);
    }
}

export class Building4 extends GrObject {
    constructor (num) {
        let building = new T.Group();

        let houseType = new T.Geometry();
        houseType.vertices.push(new T.Vector3(-1,1,0)); 
        houseType.vertices.push(new T.Vector3( 0,0,0)); 
        houseType.vertices.push(new T.Vector3( -1,0,0)); 
        houseType.vertices.push(new T.Vector3( 0,1,0)); 
    
        houseType.faceVertexUvs = [ [] ];
        houseType.faces.push(new T.Face3(1,0,2));
        houseType.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(0,1), new T.Vector2(0,0)]);
        houseType.faces.push(new T.Face3(1,3,0));
        houseType.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(1,1), new T.Vector2(0,1)]);
        
        houseType.computeFaceNormals();
        houseType.uvsNeedUpdate=true;

        let t = new T.TextureLoader().load("./Pictures/a.jpg");
        let mat = new T.MeshStandardMaterial({map:t, bumpMap: t, roughness:0.75});

        for(let id=0; id<5; id++){
            for(let k=0; k<3; k++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(k,id,0);
                building.add(block);
            }
        }
        for(let id=0; id<5; id++){
            for(let k=0; k<3; k++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(k-1,id,-2);
                block.rotation.set(0,Math.PI,0);
                building.add(block);
            }
        }
        
        let ex1 = new T.Group();
        for(let id=0; id<5; id++){
            for(let w=0; w<2; w++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(w,id,-2);
                ex1.add(block);
            }
        }
        ex1.rotation.set(0,-Math.PI/2,0);
        ex1.position.set(-3,0,-1);
        building.add(ex1);

        let ex2 = new T.Group();
        for(let id=0; id<5; id++){
            for(let w=0; w<2; w++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(w,id,-2);
                ex2.add(block);
            }
        }
        ex2.rotation.set(0,Math.PI/2,0);
        ex2.position.set(4,0,-1);
        building.add(ex1);
        building.add(ex2);


        let geo = new T.PlaneGeometry(3,2);
        let texture = new T.TextureLoader().load("./Pictures/r.jpg")
        let treeMat = new T.MeshStandardMaterial({map: texture, bumpMap: texture, roughnessMap: texture, metalnessMap: texture, refractionRatio: 1});
        let roof = new T.Mesh(geo, treeMat)
        // let roof = new T.Mesh(geo,new T.MeshStandardMaterial({color:"grey",roughness:0.75}));
        roof.position.set(0.5,5,-1);
        roof.rotation.set(-Math.PI/2, 0,0);
        building.add(roof);


        //building.position.set(0,2,0);

        super("Building_" + num, building);
    }
}

export class Building5 extends GrObject {
    constructor (num) {
        let building = new T.Group();

        let houseType = new T.Geometry();
        houseType.vertices.push(new T.Vector3(-1,1,0)); //0 top left
        houseType.vertices.push(new T.Vector3( 0,0,0)); //1 bottom right
        houseType.vertices.push(new T.Vector3( -1,0,0)); //2 bottom left
        houseType.vertices.push(new T.Vector3( 0,1,0)); //3 top right
    
        houseType.faceVertexUvs = [ [] ];
        houseType.faces.push(new T.Face3(1,0,2));
        houseType.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(0,1), new T.Vector2(0,0)]);
        houseType.faces.push(new T.Face3(1,3,0));
        houseType.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(1,1), new T.Vector2(0,1)]);
        
        houseType.computeFaceNormals();
        houseType.uvsNeedUpdate=true;

        let t = new T.TextureLoader().load("./Pictures/k.jpg");
        let mat = new T.MeshStandardMaterial({map:t, bumpMap: t, roughness:0.75});

        for(let id=0; id<5; id++){
            for(let k=0; k<3; k++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(k,id,0);
                building.add(block);
            }
        }
        for(let id=0; id<5; id++){
            for(let k=0; k<3; k++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(k-1,id,-2);
                block.rotation.set(0,Math.PI,0);
                building.add(block);
            }
        }
        
        let ex1 = new T.Group();
        for(let id=0; id<5; id++){
            for(let w=0; w<2; w++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(w,id,-2);
                ex1.add(block);
            }
        }
        ex1.rotation.set(0,-Math.PI/2,0);
        ex1.position.set(-3,0,-1);
        building.add(ex1);

        let ex2 = new T.Group();
        for(let id=0; id<5; id++){
            for(let w=0; w<2; w++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(w,id,-2);
                ex2.add(block);
            }
        }
        ex2.rotation.set(0,Math.PI/2,0);
        ex2.position.set(4,0,-1);
        building.add(ex1);
        building.add(ex2);


        let geo = new T.PlaneGeometry(3,2);
        let texture = new T.TextureLoader().load("./Pictures/r.jpg")
        let treeMat = new T.MeshStandardMaterial({map: texture, bumpMap: texture, roughnessMap: texture, metalnessMap: texture, refractionRatio: 1});
        let roof = new T.Mesh(geo, treeMat)
        // let roof = new T.Mesh(geo,new T.MeshStandardMaterial({color:"grey",roughness:0.75}));
        roof.position.set(0.5,5,-1);
        roof.rotation.set(-Math.PI/2, 0,0);
        building.add(roof);



        super("Building_" + num, building);
    }
}


export class Building6 extends GrObject {
    constructor (num) {
        let building = new T.Group();

        let houseType = new T.Geometry();
        houseType.vertices.push(new T.Vector3(-1,1,0)); 
        houseType.vertices.push(new T.Vector3( 0,0,0)); 
        houseType.vertices.push(new T.Vector3( -1,0,0)); 
        houseType.vertices.push(new T.Vector3( 0,1,0)); 
    
        houseType.faceVertexUvs = [ [] ];
        houseType.faces.push(new T.Face3(1,0,2));
        houseType.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(0,1), new T.Vector2(0,0)]);
        houseType.faces.push(new T.Face3(1,3,0));
        houseType.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(1,1), new T.Vector2(0,1)]);
        
        houseType.computeFaceNormals();
        houseType.uvsNeedUpdate=true;

        let t = new T.TextureLoader().load("./Pictures/l.jpg");
        let mat = new T.MeshStandardMaterial({map:t, bumpMap: t, roughness:0.75});

        for(let id=0; id<5; id++){
            for(let k=0; k<3; k++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(k,id,0);
                building.add(block);
            }
        }
        for(let id=0; id<5; id++){
            for(let k=0; k<3; k++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(k-1,id,-2);
                block.rotation.set(0,Math.PI,0);
                building.add(block);
            }
        }
        
        let ex1 = new T.Group();
        for(let id=0; id<5; id++){
            for(let w=0; w<2; w++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(w,id,-2);
                ex1.add(block);
            }
        }
        ex1.rotation.set(0,-Math.PI/2,0);
        ex1.position.set(-3,0,-1);
        building.add(ex1);

        let ex2 = new T.Group();
        for(let id=0; id<5; id++){
            for(let w=0; w<2; w++){
                let block = new T.Mesh(houseType,mat);
                block.position.set(w,id,-2);
                ex2.add(block);
            }
        }
        ex2.rotation.set(0,Math.PI/2,0);
        ex2.position.set(4,0,-1);
        building.add(ex1);
        building.add(ex2);


        let geo = new T.PlaneGeometry(3,2);
        let texture = new T.TextureLoader().load("./Pictures/r.jpg")
        let treeMat = new T.MeshStandardMaterial({map: texture, bumpMap: texture, roughnessMap: texture, metalnessMap: texture, refractionRatio: 1});
        let roof = new T.Mesh(geo, treeMat)
        roof.position.set(0.5,5,-1);
        roof.rotation.set(-Math.PI/2, 0,0);
        building.add(roof);

        super("Building_" + num, building);
    }
}





