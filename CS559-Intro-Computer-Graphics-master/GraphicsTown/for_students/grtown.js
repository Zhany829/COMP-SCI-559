
/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

// import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
//import {shaderMaterial} from "../libs/CS559-Framework/shaderHelper"
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";


// import {main} from "../examples/main.js";
import { SimpleHouse } from "../examples/house.js";
import { CircularTrack, TrackCube, TrackCar } from "../examples/track.js";
import { Helicopter, Helipad } from "../examples/helicopter.js";
import { ShinySculpture } from "../examples/shinySculpture.js";
import { MorphTest } from "../examples/morph.js";

import {GrTruck, GrBus1, GrBus2, GrCar1, GrCar2} from "./cars.js";
import {GrAvenue,GrBridge, GrShiny, GrHelicopter} from "./traffic.js";
import {GrBuilding1, GrBuilding2, GrTree, GrHut, Building1, Building2, Building3, Building4, Building5, Building6} from "./buildings.js";

import {GrTrain,draw, } from "./train.js";

import {GrSwing,Grabout, GrCarousel2, GrFountain, Grfountain} from "./playGround.js"

 // import {LakeObject} from "./lake"

// import {GrBuildingc} from "./church.js"
/**m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */
function grtown() {
  // make the world
  let world = new GrWorld({
    width: 1200,
    height: 1000,
    groundplanesize: 60 // make the ground plane big enough for a world of stuff
  });


  world.scene.background = new T.CubeTextureLoader()
	.setPath( './Pictures/' )
	.load( [
		'sh_rt.png',
		'sh_lf.png',
		'sh_up.png',
		'sh_dn.png',
		'sh_bk.png',
		'sh_ft.png'
    ] );

    draw(world);

    let car1 = new GrTruck();
    // car1.objects[0].position.x = 10;
    // car1.objects[0].position.z = 2;
     world.add(new GrTruck());

    let car2 = new GrCar1(); 
    // car2.objects[0].position.x = 10;
    // car2.objects[0].position.z = 6;
    world.add(new GrCar1());

    let car3 = new GrCar2();
    // car3.objects[0].position.x = 10;
    // car3.objects[0].position.z = 10;
    world.add(new GrCar2());

    let car4 = new GrBus1();
    // car4.objects[0].position.x = 10;
    // car4.objects[0].position.z = -2;
    world.add(new GrBus1());

    let car5 = new GrBus2();
    // car5.objects[0].position.x = 10;
    // car5.objects[0].position.z = -6;
    world.add(new GrBus2());

   
    let flag = (new GrShiny(world,2));
    flag.setScale(2,2,2);
    flag.objects[0].translateY(2)
    world.add(flag)

    world.add(new GrAvenue());


    let building_indx;
    for(building_indx = 0; building_indx < 2; building_indx ++){
        world.add(new GrBuilding1({z:building_indx*7,x:-26, size:2, rotate:1}));
        let group2 = new GrBuilding1({z:building_indx*7,x:26, size:2, rotate:1});
        group2.objects[0].rotateY(Math.PI)
        world.add(group2);
    }

    let house1 = new GrBuilding1({z:13,x:-26, size:2, rotate:1});
    world.add(house1);

    let house2 = new GrBuilding1({z:-7,x:-26, size:2, rotate:1});
    world.add(house2);

    for(building_indx = -1; building_indx < 2; building_indx ++){
      let house1 = new GrBuilding2({z:-30, x:12, size:3, rotate:2})
      world.add(house1);
      house1.objects[0].rotateY(Math.PI/2);
      house1.objects[0].translateX(-2)
      let house2 = new GrBuilding2({z:-30, x:4, size:3, rotate:2});
      world.add(house2);
      house2.objects[0].rotateY(Math.PI/2);
      house2.objects[0].translateX(-2)

      let house3 = new GrBuilding2({z:-30,x:-4, size:3, rotate:2});
      world.add(house3);
      house3.objects[0].rotateY(Math.PI/2);
      house3.objects[0].translateX(-2)

      let house4 = new GrBuilding2({z:-30,x:-12, size:3, rotate:2});
      world.add(house4);
      house4.objects[0].rotateY(Math.PI/2);
      house4.objects[0].translateX(-2)
  }





  let smallHouse = new GrHut();
  smallHouse.setScale(3,3,3);
  world.add(smallHouse);
  smallHouse.objects[0].position.x=23;
  smallHouse.objects[0].position.z=-5;
  smallHouse.objects[0].rotateY(Math.PI)

  let smallHouse2 = new GrHut();
  smallHouse2.setScale(3,3,3);
  world.add(smallHouse2);
  smallHouse2.objects[0].position.x=23;
  smallHouse2.objects[0].position.z=-10;
  smallHouse2.objects[0].rotateY(Math.PI)

  let building1 = new Building1(1); 
  building1.setScale(2,2,2);
  world.add(building1);
  building1.objects[0].position.x = 12;
  building1.objects[0].position.z = 27;

  let roof = new GrBridge();
  roof.setScale(0.1,0.2,0.1);
  world.add(roof);
  roof.objects[0].position.x = 13;
  roof.objects[0].position.z = 24.5;
  roof.objects[0].position.y = 11;

  let top = new Building2(1); 
  top.setScale(0.7,0.2,0.7);
  world.add(top);
  top.objects[0].position.x = 13;
  top.objects[0].position.z = 25;
  top.objects[0].position.y = 10;

  let building2 = new Building3(1); 
  building2.setScale(2,2,2);
  world.add(building2);
  building2.objects[0].position.x = 5;
  building2.objects[0].position.z = 27;

  let roof1 = new GrBridge();
  roof1.setScale(0.1,0.2,0.1);
  world.add(roof1);
  roof1.objects[0].position.x = 6;
  roof1.objects[0].position.z = 24.5;
  roof1.objects[0].position.y = 11;

  let top1 = new Building2(1); 
  top1.setScale(0.7,0.2,0.7);
  world.add(top1);
  top1.objects[0].position.x = 6;
  top1.objects[0].position.z = 25;
  top1.objects[0].position.y = 10;
  

  let building3 = new Building4(1);
  building3.setScale(2,2,2);
  world.add(building3);
  building3.objects[0].position.x = -2;
  building3.objects[0].position.z = 27;
  
  let roof2 = new GrBridge();
  roof2.setScale(0.1,0.2,0.1);
  world.add(roof2);
  roof2.objects[0].position.x = -1;
  roof2.objects[0].position.z = 24.5;
  roof2.objects[0].position.y = 11;

  let top2 = new Building2(1); 
  top2.setScale(0.7,0.2,0.7);
  world.add(top2);
  top2.objects[0].position.x = -1;
  top2.objects[0].position.z = 25;
  top2.objects[0].position.y = 10;

  let building4 = new Building5(1);
  building4.setScale(2,2,2);
  world.add(building4);
  building4.objects[0].position.x = -9;
  building4.objects[0].position.z = 27;

  let roof3 = new GrBridge();
  roof3.setScale(0.1,0.2,0.1);
  world.add(roof3);
  roof3.objects[0].position.x = -8;
  roof3.objects[0].position.z = 24.5;
  roof3.objects[0].position.y = 11;

  let top3 = new Building2(1); 
  top3.setScale(0.7,0.2,0.7);
  world.add(top3);
  top3.objects[0].position.x = -8;
  top3.objects[0].position.z = 25;
  top3.objects[0].position.y = 10;

  let building5 = new Building6(1);
  building5.setScale(2,2,2);
  world.add(building5);
  building5.objects[0].position.x = -16;
  building5.objects[0].position.z = 27;

  let roof4 = new GrBridge();
  roof4.setScale(0.1,0.2,0.1);
  world.add(roof4);
  roof4.objects[0].position.x = -15;
  roof4.objects[0].position.z = 24.5;
  roof4.objects[0].position.y = 11;

  let top4 = new Building2(1); 
  top4.setScale(0.7,0.2,0.7);
  world.add(top4);
  top4.objects[0].position.x = -15;
  top4.objects[0].position.z = 25;
  top4.objects[0].position.y = 10;

  let carousel = new GrCarousel2({z:10});
  world.add(carousel);  


// making some obj
let fountain =  new GrFountain({size:4});
world.add(fountain);
fountain.objects[0].position.x = -10;
fountain.objects[0].position.y = -9.3;
fountain.objects[0].position.z = 0;

let fobj = new Grfountain();
world.add(fobj);
fobj.objects[0].rotateX(Math.PI/2);




let obj1 = new Loaders.ObjGrObject({
  obj:"./San Fran Tower.obj",
  mtl:"./San Fran Tower.mtl",
  mtloptions: {side:T.DoubleSide},
  callback: function (obj) {
      console.log(obj);
      obj1.objects.forEach(ob => console.log(ob));
      
  }
});


obj1.objects[0].translateX(-3);
obj1.objects[0].scale.set(0.17,0.17,0.17);
world.add(obj1);
obj1.objects[0].position.x = 25;
obj1.objects[0].position.y = 1;
obj1.objects[0].position.z = 32;


let obj2 = new Loaders.ObjGrObject({
  obj:"./San Fran Tower.obj",
  mtl:"./San Fran Tower.mtl",
  mtloptions: {side:T.DoubleSide},
  callback: function (obj) {
      console.log(obj);
      obj2.objects.forEach(ob => console.log(ob));
      
  }
});

obj2.objects[0].translateX(-3);
obj2.objects[0].scale.set(0.3,0.3,0.3);
world.add(obj2);
obj2.objects[0].position.x = -40;
obj2.objects[0].position.y = 1;
obj2.objects[0].position.z = -29;





world.add(new Helipad(-25,1.5,-25));
    world.add(new Helipad(23,1.5,23));
    world.add(new Helipad(-25,0,25));
    world.add(new Helipad(25,0,-25));

    let copter = new Helicopter();
    world.add(copter);
    copter.getPads(world.objects);



  world.add(new GrSwing({x:10,z:2.5,size:1}));
  world.add(new GrSwing({x:10,z:-2.5,size:1}));



    let i; let j;
   for (i =12; i>-21; i=i-5) {
     let tree = new GrTree(i,0,40,20);
     tree.setScale(1,1.6,1)
     world.add(tree);
   }

   for (i =12; i>-21; i=i-5) {
    let tree = new GrTree(i,0,35,15);
    tree.setScale(1,1,1)
    world.add(tree);
  }


  for (i =12; i>-21; i=i-5) {
    let tree = new GrTree(i,0,-35,15);
    tree.setScale(1,1,1)
    world.add(tree);
  }

  for (i =12; i>-21; i=i-5) {
    let tree = new GrTree(i,0,-42,20);
    tree.setScale(1,1.6,1)
    world.add(tree);
  }

  for (i=13; i>-21; i=i-5) {
    let tree = new GrTree(-30,0,i,20);
    tree.setScale(1,1.6,1)
    world.add(tree);
  }


  for (i=13; i>-21; i=i-5) {
    let tree = new GrTree(-40,0,i,20);
    tree.setScale(1,1.9,1)
    world.add(tree);
  }
   

  for (i=-15; i<19; i=i+5) {
    let tree = new GrTree(30,0,i,20);
    tree.setScale(1,1.3,1)
    world.add(tree);
  }

  for (i=-15; i<19; i=i+5) {
    let tree = new GrTree(40,0,i,20);
    tree.setScale(1,1.7,1)
    world.add(tree);
  }
    

    

    world.add(new Grabout({x:0,z:-10,size:1.5}));

    


    let train = new GrTrain();
    world.add(train);
    train.objects[0].translateY(16);

    let bridge = new GrBridge();
world.add(bridge);
bridge.objects[0].translateY(7);
bridge.objects[0].position.x =40;
bridge.objects[0].position.z =40;

let bridge2 = new GrBridge();
world.add(bridge2);
bridge2.objects[0].translateY(7);
bridge2.objects[0].position.x =37.2;
bridge2.objects[0].position.z =37.2;


let bridge3 = new GrBridge();
world.add(bridge3);
bridge3.objects[0].translateY(7);
bridge3.objects[0].position.x =-48;
bridge3.objects[0].position.z =-48;

let bridge4 = new GrBridge();
world.add(bridge4);
bridge4.objects[0].translateY(7);
bridge4.objects[0].position.x =-50;
bridge4.objects[0].position.z =-50;

let bridge5 = new GrBridge();
world.add(bridge5);
bridge5.objects[0].translateY(7);
bridge5.objects[0].position.x =37.2;
bridge5.objects[0].position.z =-37.2;

let bridge6 = new GrBridge();
world.add(bridge6);
bridge6.objects[0].translateY(7);
bridge6.objects[0].position.x =40;
bridge6.objects[0].position.z =-40;

let bridge7 = new GrBridge();
world.add(bridge7);
bridge7.objects[0].translateY(7);
bridge7.objects[0].position.x =-37.2;
bridge7.objects[0].position.z =37.2;

let bridge8 = new GrBridge();
world.add(bridge8);
bridge8.objects[0].translateY(7);
bridge8.objects[0].position.x =-40;
bridge8.objects[0].position.z =40;


let heli1 = new GrHelicopter(-1);
    world.add(heli1);
    heli1.objects[0].scale.set(2,2,2);

  // only after all the objects exist can we build the UI
  // @ts-ignore       // we're sticking a new thing into the world
  world.ui = new WorldUI(world);
  // now make it go!
  world.go();
}
Helpers.onWindowOnload(grtown);


function shift(grobj,x,y,z) {
  grobj.objects[0].translateX(x);
  grobj.objects[0].translateY(y);
  grobj.objects[0].translateZ(z);

  return grobj;
}

function rotate(grobj,x,y,z) {
  grobj.objects[0].rotateX(x);
  grobj.objects[0].rotateY(y);
  grobj.objects[0].rotateZ(z);

  return grobj;
}