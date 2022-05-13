/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import {GrTree, GrBD1, GrBD2, GrBD3} from "./08-06-buildings.js";
// your buildings are defined in another file... you should import them
// here

let world = new GrWorld();
// place your buildings and trees into the world here
for (let x = -4.2; x < 4.2; x += 1.4)  world.add(new GrTree({x : x, z : 4.2}));
for (let x = -4.2; x < 4.2; x += 1.4)  world.add(new GrTree({x : x, z : -4.2}));
for (let z = -4.2; z < 4.2; z += 1.4)  world.add(new GrTree({x : 4.2, z : z}));
for (let z = -4.2; z < 4.2; z += 1.4)  world.add(new GrTree({x : -4.2, z : z}));

world.add(new GrBD1({x : 2, z : -2}));

world.add(new GrBD2({x : -2, z : -2}));

world.add(new GrBD3({x : 1, z : 2.3}));

world.go();


