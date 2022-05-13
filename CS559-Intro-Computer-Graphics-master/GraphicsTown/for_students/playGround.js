/*jshint esversion: 6 */
// @ts-check
import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import * as InputHelpers from "../libs/CS559-Libs/inputHelpers.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";

let count = 0;

export class Grabout extends GrObject {

    constructor(params = {}) {
        let obj = new T.Group();
        let bg = new T.CylinderGeometry(0.5, 1, 0.5, 16);
        let bm = new T.MeshStandardMaterial({ color: "#888888", metalness: 0.5, roughness: 0.8 });
        let bot = new T.Mesh(bg, bm);
        bot.translateY(0.25);
        obj.add(bot);

        let play = new T.Group();
        bot.add(play);
        play.translateY(0.25);

        let sg = new T.CylinderGeometry(2, 1.8, 0.3, 8, 4, false, 0, Math.PI / 2);
        let sm;
        let sec;
        let hg = partsCalc();
        let hm = new T.MeshStandardMaterial({ color: "#999999", metalness: 0.8, roughness: 0.2 });
        let parts;
        let picker = ["red", "blue", "yellow", "green"];
        for (let i = 0; i < picker.length; i++) {
            sm = new T.MeshStandardMaterial({ color: picker[i], metalness: 0.3, roughness: 0.6 });
            sec = new T.Mesh(sg, sm);
            parts = new T.Mesh(hg, hm);
            sec.add(parts);
            parts.rotation.set(0, Math.PI / 4, 0);
            parts.translateZ(1.5);
            play.add(sec);
            sec.rotateY(i * Math.PI / 2);
        }

        super(`Roundabout-${count++}`, obj);
        this.eobj = obj;
        this.pf = play;
        this.eobj.position.x = params.x ? Number(params.x) : 0;
        this.eobj.position.y = params.y ? Number(params.y) : 0;
        this.eobj.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 1;
        obj.scale.set(scale, scale, scale);

        function partsCalc() {
            /**@type THREE.CurvePath */
            let partsLine = new T.CurvePath();
            partsLine.add(new T.LineCurve3(new T.Vector3(-0.5, 0, 0), new T.Vector3(-0.5, 0.8, 0)));
            partsLine.add(new T.CubicBezierCurve3(new T.Vector3(-0.5, 0.8, 0), new T.Vector3(-0.5, 1, 0), new T.Vector3(0.5, 1, 0), new T.Vector3(0.5, 0.8, 0)));
            partsLine.add(new T.LineCurve3(new T.Vector3(0.5, 0.8, 0), new T.Vector3(0.5, 0, 0)));
            return new T.TubeGeometry(partsLine, 64, 0.1, 8);
        }
    }
    tick(delta, timeOfDay) { this.pf.rotateY(0.005 * delta); }
}


let counts = 1;


export class GrSwing extends GrObject {
    constructor(params = {}) {
        let swing = new T.Group();
        calc(swing);
        let parts1 = new T.Group();
        swing.add(parts1);
        parts1.translateY(1.8);
        let left = new T.Group();
        let right = new T.Group();
        parts1.add(left);
        parts1.add(right);
        calcChain(left, 20);
        calcChain(right, 20);
        left.translateZ(0.4);
        right.translateZ(-0.4);
        let sg = new T.Group();
        let geo = new T.BoxGeometry(0.4, 0.1, 1);
        let sm = new T.MeshStandardMaterial({ color: "#554433", metalness: 0.1, roughness: 0.6 });
        let seat = new T.Mesh(geo, sm);
        sg.add(seat);
        sg.position.set(0, -1.45, 0);
        parts1.add(sg);
        super(`Swing-${counts++}`, swing);
        this.eobj = swing;
        this.parts1 = parts1;
        this.seat = sg;
        this.eobj.position.x = params.x ? Number(params.x) : 0;
        this.eobj.position.y = params.y ? Number(params.y) : 0;
        this.eobj.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 1;
        swing.scale.set(scale, scale, scale);
        this.swing_angle = 0;
        function calc(group) {
            let pm = new T.MeshStandardMaterial({ color: "gold", metalness: 0.7, roughness: 0.5 });
            let pg = new T.CylinderGeometry(0.1, 0.1, 2, 16);
            let fp = new T.Mesh(pg, pm);
            group.add(fp);
            fp.position.set(0.4, 0.9, 0.9);
            fp.rotateZ(Math.PI / 8);
            let blPost = new T.Mesh(pg, pm);
            group.add(blPost);
            blPost.position.set(-0.4, 0.9, 0.9);
            blPost.rotateZ(-Math.PI / 8);
            let frPost = new T.Mesh(pg, pm);
            group.add(frPost);
            frPost.position.set(0.4, 0.9, -0.9);
            frPost.rotateZ(Math.PI / 8);
            let brPost = new T.Mesh(pg, pm);
            group.add(brPost);
            brPost.position.set(-0.4, 0.9, -0.9);
            brPost.rotateZ(-Math.PI / 8);
            let topPost = new T.Mesh(pg, pm);
            group.add(topPost);
            topPost.position.set(0, 1.8, 0);
            topPost.rotateX(-Math.PI / 2);
        }
        function calcChain(group, length) {
            let cg = new T.TorusGeometry(0.05, 0.015);
            let cm = new T.MeshStandardMaterial({ color: "#777777", metalness: 0.8, roughness: 0.2 });
            let link = new T.Mesh(cg, cm);
            group.add(link);
            for (let i = 0; i < length; i++) {
                let left = new T.Mesh(cg, cm);
                left.translateY(-0.07);
                link.add(left);
                left.rotation.set(0, Math.PI / 3, 0);
                link = left;
            }
        }
    }
    tick(delta, timeOfDay) {
        this.swing_angle += 0.009 * delta;
        this.parts1.rotation.z = Math.sin(this.swing_angle) * Math.PI / 4;
        this.seat.rotation.z = Math.sin(this.swing_angle) * Math.PI / 16;
    }

}





let counter = 0;


export class GrCarousel2 extends GrObject {

    constructor(params = {}) {
        let w = 3;
        let ca = new T.Group();
        let bg = new T.CylinderGeometry(w, w, 1, 32);
        let bm = new T.MeshStandardMaterial({
            color: "lightblue",
            metalness: 0.3,
            roughness: 0.8
        });
        let bot = new T.Mesh(bg, bm);
        bot.translateY(0.5);
        ca.add(bot);
        let play = new T.Group();
        bot.add(play);
        play.translateY(0.5);
        let pg = new T.CylinderGeometry(
            0.95 * w,
            0.95 * w,
            0.2,
            32
        );
        let pm = new T.MeshStandardMaterial({
            color: "gold",
            metalness: 0.3,
            roughness: 0.8
        });
        let pf = new T.Mesh(pg, pm);
        play.add(pf);

        let cpg = new T.CylinderGeometry(0.3 * w, 0.3 * w, 3, 16);
        let cpm = new T.MeshStandardMaterial({
            color: "gold",
            metalness: 0.8,
            roughness: 0.5
        });
        let cp = new T.Mesh(cpg, cpm);
        play.add(cp);
        cp.translateY(1.5);
        let tt = new T.Mesh(pg, pm);
        play.add(tt);
        tt.translateY(3);
        let opg = new T.CylinderGeometry(0.03 * w, 0.03 * w, 3, 16);
        let opm = new T.MeshStandardMaterial({
            color: "#aaaaaa",
            metalness: 0.8,
            roughness: 0.5
        });
        let opole;
        let num_poles = 10;
        let poles = [];
        let horsesArr = []

        for (let i = 0; i < num_poles; i++) {
            opole = new T.Mesh(opg, opm);
            play.add(opole);
            opole.translateY(1.5);
            opole.rotateY((2 * i * Math.PI) / num_poles);
            opole.translateX(0.8 * w);
            poles.push(opole);
            let horseGeometry = new T.BoxGeometry(0.5 * w, 0.2 * w, 0.2 * w)
            let horseMaterial = new T.MeshStandardMaterial({ color: "#DEB887", metalness: 0.8, roughness: 0.3 });

            let horse = new T.Mesh(horseGeometry, horseMaterial);
            play.add(horse);
            horse.translateY(1.5);
            horse.rotateY(2 * i * Math.PI / num_poles);
            horse.translateX(0.8 * w);
            horsesArr.push(horse);
        }

        let roof_geom = new T.ConeGeometry(w, 0.5 * w, 32, 4);
        let roof = new T.Mesh(roof_geom, bm);
        ca.add(roof);
        roof.translateY(4.8);

        super(`Carousel-${counter++}`, ca);
        this.eobj = ca;
        this.pf = pf;
        this.poles = poles;
        this.horses = horsesArr;
        this.time = 0;

        this.tick = function (delta) {
            this.eobj.rotateY(0.0009 * delta);
            this.time += delta / 200;
            let theta = this.time;

            this.eobj.position.x = params.x ? Number(params.x) : 0;
            this.eobj.position.y = params.y ? Number(params.y) : 0;
            this.eobj.position.z = params.z ? Number(params.z) : 0;
            let scale = params.size ? Number(params.size) : 1;
            ca.scale.set(scale, scale, scale);


            for (let i = 0; i < this.horses.length; i++) {
                if (i % 2 == 0) {
                    this.horses[i].translateY(-(0.01 * Math.sin(theta)))
                } else {
                    this.horses[i].translateY(0.01 * Math.sin(theta))
                }
            }
        }

    }
}


let water = new T.TextureLoader().load("./Pictures/oceanTexture.jpg");
export class GrFountain extends GrObject {
    constructor(params = {}) {
        let fountain = new T.Group();
        let fh = 0.4;
        let shader = shaderMaterial("./Shaders/fountain.vs", "./Shaders/fountain.fs",
            {
                side: T.DoubleSide,
                uniforms: {
                    texture: { value: water },
                    fh: { value: fh },
                    radius: { value: 0.3 },
                    height: { value: 0.3 },
                    plc: { value: new T.Vector3(1, 1, 0) },
                    plp: { value: new T.Vector3(1, 2, 3) },
                    light: { value: new T.Vector3(0, 1, 0) },
                    dark: { value: new T.Vector3(1, 0, 0) }
                }
            });
        let g = new T.SphereBufferGeometry(2, 200, 200);
        let waterShphere = new T.Mesh(g, shader);
        fountain.add(waterShphere);

        super(`Fountain`, fountain);
        this.shader = shader;
        this.time = 0;
        let scale = 1;
        this.waterShphere = waterShphere;
        fountain.scale.set(scale, scale, scale);
        waterShphere.translateY(12.5);
    }
    tick(delta, timeOfDay) {
        this.time += 0.01 * delta;
        this.waterShphere.rotation.set(0, this.time, 0);
        this.shader.uniforms.fh.value = this.time % 2 - 0.5;
    }
}


export class Grfountain extends GrObject {
    constructor() {
        let fountain = new T.Group();
        let fountain1 = new T.TorusGeometry(2.7, 0.5, 100, 100);
        let fountain2 = new T.TorusGeometry(2.3, 0.6, 100, 100);
        let fountain3 = new T.TorusGeometry(1.7, 0.7, 100, 100);
        let fountain4 = new T.BoxGeometry(6, 6, 0.5);
        let mat = new T.MeshStandardMaterial({ color: "#a6a6a6", metalness: 0.5, roughness: 0.8 });
        let mesh1 = new T.Mesh(fountain1, mat);
        let mesh2 = new T.Mesh(fountain2, mat);
        let mesh3 = new T.Mesh(fountain3, mat);
        let mesh4 = new T.Mesh(fountain4, mat);
        fountain.add(mesh1);

        mesh1.position.y = 0;
        mesh1.position.x = -10;
        mesh1.position.z = -3

        fountain.add(mesh2);
        mesh2.position.x = -10;
        mesh2.position.y = 0;
        mesh2.position.z = -2

        fountain.add(mesh3);
        mesh3.position.x = -10;
        mesh3.position.y = 0;
        mesh3.position.z = -1

        fountain.add(mesh4);
        mesh4.position.x = -10;
        mesh4.position.y = 0;
        mesh4.position.z = 0
        super(`fountain`, fountain);

    }
}



