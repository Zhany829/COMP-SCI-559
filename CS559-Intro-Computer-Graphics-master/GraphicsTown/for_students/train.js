import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import * as InputHelpers from "../libs/CS559-Libs/inputHelpers.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";


let z = 15;
let u = 0;
let w = 0.7;
let pts = [[-0.9 * 55, 15, -0.9 * 55],
[w * 55, 15, -w * 55],
[w * 55, 15, w * 55],
[-w * 55, 15, w * 55]];
let bc = [];
let deriv = [];
let at = [];
let segn = 40;

export class GrTrain extends GrObject {
    constructor() {
        let train = new T.Group();
        let head = new T.Group();
        let gr1 = new T.Group();
        let gr2 = new T.Group();
        let baseBlack_geom2 = new T.CylinderGeometry(0.8, 0.8, 2.6, 15);
        let baseBlack_geom = new T.CylinderGeometry(0.5, 0.5, 2.2, 15);
        let baseBlack_mat = new T.MeshStandardMaterial({ color: "black", metalness: 0.5, roughness: 0.7 });
        let baseBlack1 = new T.Mesh(baseBlack_geom, baseBlack_mat);
        let baseBlack2 = new T.Mesh(baseBlack_geom, baseBlack_mat);
        let baseBlack3 = new T.Mesh(baseBlack_geom2, baseBlack_mat);
        baseBlack1.rotateZ(Math.PI / 2);
        baseBlack1.translateZ(2.5);
        baseBlack1.translateX(-.8);
        baseBlack2.rotateZ(Math.PI / 2);
        baseBlack2.translateZ(1.3);
        baseBlack2.translateX(-.8);
        baseBlack3.rotateZ(Math.PI / 2);
        baseBlack3.translateZ(0);
        baseBlack3.translateX(-.5);
        // head.add(baseBlack1,baseBlack2,baseBlack3);
        head.rotateY(Math.PI / 2);

        let baseBlack4 = new T.Mesh(baseBlack_geom2, baseBlack_mat);
        let baseBlack5 = new T.Mesh(baseBlack_geom2, baseBlack_mat);
        baseBlack4.rotateX(Math.PI / 2);
        baseBlack4.translateZ(.6);
        baseBlack4.translateX(-2.7);

        let baseBlack42 = new T.Mesh(baseBlack_geom2, baseBlack_mat);
        baseBlack42.rotateX(Math.PI / 2);
        baseBlack42.translateZ(.6);
        baseBlack42.translateX(-0.2);

        let baseBlack43 = new T.Mesh(baseBlack_geom2, baseBlack_mat);
        baseBlack43.rotateX(Math.PI / 2);
        baseBlack43.translateZ(.6);
        baseBlack43.translateX(2.3);

        baseBlack5.rotateX(Math.PI / 2);
        baseBlack5.translateZ(.6);
        let tail_geom = new T.BoxGeometry(20, 5, 5);
        let tail_mat = new T.MeshStandardMaterial({ color: "gold", metalness: 0.7, roughness: 0.7 });
        let tail11 = new T.Mesh(tail_geom, tail_mat);

        let rearWindowGeo = new T.BoxGeometry(0.1, 0.5, 0.7);
        rearWindowGeo.translate(1.9, 0, 0);
        rearWindowGeo.scale(4, 4, 4);
        let windowMaterial = new T.MeshStandardMaterial({ color: "silver", metalness: 0.9, roughness: 0.9 });
        let rearwindowMesh = new T.Mesh(rearWindowGeo, windowMaterial);


        // setting up the side windows 
        let sideWindowGeo = new T.BoxGeometry(2, 2, 0.5);
        let first = new T.Mesh(sideWindowGeo, windowMaterial);
        let second = new T.Mesh(sideWindowGeo, windowMaterial);
        let third = new T.Mesh(sideWindowGeo, windowMaterial);
        let fourth = new T.Mesh(sideWindowGeo, windowMaterial);
        let fifth = new T.Mesh(sideWindowGeo, windowMaterial);
        let sixth = new T.Mesh(sideWindowGeo, windowMaterial);
        let seventh = new T.Mesh(sideWindowGeo, windowMaterial);
        let eightth = new T.Mesh(sideWindowGeo, windowMaterial);


        let driverMirror = new T.BoxGeometry(1.5, 2.5, 0.1);
        let ninth = new T.Mesh(driverMirror, windowMaterial);
        let tenth = new T.Mesh(driverMirror, windowMaterial);

        let eleven = new T.Mesh(sideWindowGeo, windowMaterial);
        let twelve = new T.Mesh(sideWindowGeo, windowMaterial);


        // setting up the mirror 
        let mirror = new T.BoxGeometry(1, 2, 2.5);
        let mirrorMaterial = new T.MeshStandardMaterial({ color: "white", metalness: 0.9, roughness: 0.2 });
        let leftMirror = new T.Mesh(mirror, mirrorMaterial);
        let secondMirror = new T.Mesh(mirror, mirrorMaterial);


        // translate z axis 
        first.translateZ(2.35);
        second.translateZ(-2.35);
        third.translateZ(2.35);
        fourth.translateZ(-2.35);
        fifth.translateZ(2.35);
        sixth.translateZ(-2.35);
        seventh.translateZ(2.35);
        eightth.translateZ(-2.35);
        ninth.translateZ(2.5);
        tenth.translateZ(-2.5);
        eleven.translateZ(2.35);
        twelve.translateZ(-2.35);
        // translate x axis
        first.translateX(1);
        second.translateX(1);
        third.translateX(4);
        fourth.translateX(4);

        fifth.translateX(-2);
        sixth.translateX(-2);

        seventh.translateX(-5);
        eightth.translateX(-5);
        ninth.translateX(7);
        tenth.translateX(7);

        eleven.translateX(-8);
        twelve.translateX(-8);

        leftMirror.translateZ(1.9);
        secondMirror.translateZ(-1.9);

        leftMirror.translateX(7.8);
        secondMirror.translateX(7.8);

        leftMirror.translateY(0.2);
        secondMirror.translateY(0.2);

        rearwindowMesh.translateX(1.72);
        rearwindowMesh.translateY(0.15);




        let hook_geom = new T.BoxGeometry(3, 0.5, 0.5);
        let hook_mat = new T.MeshStandardMaterial({ color: "black", metalness: 0.5, roughness: 0.7 });
        let hook1 = new T.Mesh(hook_geom, hook_mat);
        tail11.translateY(-0.2);
        hook1.translateY(-0.8);
        hook1.translateX(2);
        tail11.translateX(-0.7);
        gr1.add(baseBlack4, tail11, rearwindowMesh, baseBlack42, baseBlack43,
            first, second, third, fourth, fifth, sixth, seventh, eightth, ninth, tenth, eleven, twelve,
            leftMirror, secondMirror);

        let tail21 = new T.Mesh(tail_geom, tail_mat);
        let hook2 = new T.Mesh(hook_geom, hook_mat);
        hook2.translateY(8.8);
        tail21.translateY(-0.2);
        gr2.add(baseBlack5, tail21, hook2);
        gr2.translateX(-5.7);
        hook2.translateX(2.5);

        let horn_geom = new T.CylinderGeometry(1, 0.5, 2);
        let horn_mat = new T.MeshStandardMaterial({ color: "black", metalness: 0.5, roughness: 0.7 });
        let horn = new T.Mesh(horn_geom, horn_mat);
        let horn2 = new T.Mesh(horn_geom, horn_mat);
        let horn3 = new T.Mesh(horn_geom, horn_mat);
        let horn4 = new T.Mesh(horn_geom, horn_mat);
        horn.translateX(3);
        horn.translateY(2.5);
        horn2.translateX(7);
        horn2.translateY(2.5);
        horn3.translateX(-1);
        horn3.translateY(2.5);
        horn4.translateX(-5);
        horn4.translateY(2.5);
        gr1.add(horn, horn2, horn3, horn4);

        let tireGeo = new T.CylinderGeometry(1, 1, 6.6, 50);
        let tirematerial = new T.MeshStandardMaterial({ color: "black", metalness: 0.9, roughness: 0.8 });
        let tire1 = new T.Mesh(tireGeo, tirematerial);
        let tire2 = new T.Mesh(tireGeo, tirematerial);
        let tire3 = new T.Mesh(tireGeo, tirematerial);
        let tire4 = new T.Mesh(tireGeo, tirematerial);
        let tire5 = new T.Mesh(tireGeo, tirematerial);
        let tire6 = new T.Mesh(tireGeo, tirematerial);

        tire1.rotateX(Math.PI / 2);
        tire2.rotateX(Math.PI / 2);
        tire3.rotateX(Math.PI / 2);
        tire4.rotateX(Math.PI / 2);
        tire5.rotateX(Math.PI / 2);
        tire6.rotateX(Math.PI / 2);

        tire1.translateY(0);
        tire1.translateZ(2.5);
        tire1.translateX(7.2);

        tire2.translateX(3);
        tire2.translateZ(2.5);
        tire2.translateY(0);

        tire3.translateY(0)
        tire3.translateZ(2.5);
        tire3.translateX(-1);

        tire4.translateY(0)
        tire4.translateZ(2.5);
        tire4.translateX(-5);

        tire5.translateY(0)
        tire5.translateZ(2.5);
        tire5.translateX(-9);

        tire6.translateY(0)
        tire6.translateZ(2.5);
        tire6.translateX(-14);



        gr1.add(tire1, tire2, tire3, tire4, tire5);

        train.add(gr1, gr2);
        super(`Train`, gr1);
        gr1.position.y = 2;
        this.train = gr2;
        train.translateY(1.5);

        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(2);
        this.ridePoint.rotateY(Math.PI / 4);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;

        this.head = head;
        this.tail1 = gr1;
        this.tail2 = gr2;
        this.horn = horn;
        let train_scale = 0.85;
        head.scale.set(train_scale, train_scale, train_scale);
        gr1.scale.set(train_scale, train_scale, train_scale);
        gr2.scale.set(train_scale, train_scale, train_scale);

    }

    tick(delta, timeOfDay) {
        let train = [];
        train.push(this.tail1);
        train.push(this.tail2);
        for (let count = 0; count < train.length; count++) {
            let xAxis;
            let zAxis;
            let rotation;
            u += delta * 0.0003;
            let components = train[count];
            let factor = (u) % (pts.length);
            let length = Math.floor(factor) % bc.length;
            let steps = 0.0001;
            [xAxis, zAxis, rotation] = arcCalc(length, factor + steps * count, factor + steps * count - length);
            components.position.x = xAxis;
            components.position.z = zAxis;

            if (count == 1 || count == 0) {
                components.rotation.set(0, rotation - Math.PI / 2, 0);
            } else {
            }

        }

    }

}




function arcCalc(count, u, u2) { 

    let rotation;
    let qq = 0;
    let tp = -1;
    let tj = -1;
    let p2 = 0;
    let t3;
    let t3z;

    let [x, z, s1, s2] = calc(count, u2);

    let val = u / bc.length;
    let t0 = at[at.length - 1].segA[segn - 1];
    let ml = t0[2], x00 = pts[0][0], z00 = pts[0][2];
    let cl = val * ml;

    if (cl > ml) {
        qq = 1;
        tp = at.length - 1;
        tj = segn - 1;
        p2 = (cl - ml) / Math.sqrt((t0[0] - x00) * (t0[0] - x00) + (t0[1] - z00) * (t0[1] - z00));
        t3 = x00;
        t3z = z00;
    }

    for (let steps = 0; steps < at.length && qq == 0; steps++) {

        let temp = at[steps].segA;
        for (let steps = 0; steps < segn; steps++) {

            let low = temp[steps][2], high;
            if (steps < segn - 1) {
                high = temp[steps + 1];
            } else {
                high = at[(steps + 1) % at.length].segA[0];
            }

            if (Math.floor(low) <= Math.floor(cl) && Math.floor(high[2]) >= Math.floor(cl)) {

                p2 = (cl - low) / (high[2] - low);
                qq = 1;
                tp = steps;
                tj = steps;
                t3 = high[0];
                t3z = high[1];
                break;
            }
        }
    }

    rotation = Math.atan2(s1, s2);
    return [x, z, rotation];
}

function bezierCalc() {
    bc = [];
    deriv = [];
    at = [];
    let count; 
    let step = 0.5; 
    let u = 1 / 3;

    for (count = 0; count < pts.length; count++) {
        let start = pts[count];
        let x, y;
        x = pts[(count + 1) % pts.length][0] - pts[(count - 1 + pts.length) % pts.length][0];
        y = pts[(count + 1) % pts.length][2] - pts[(count - 1 + pts.length) % pts.length][2];
        let end = [step * x, 15, step * y];
        let mid = [start[0] + u * end[0], 15, start[2] + u * end[2]];
        let mid1 = pts[(count + 1) % pts.length];
        x = pts[(count + 2) % pts.length][0] - pts[count][0];
        z = pts[(count + 2) % pts.length][2] - pts[count][2];
        let mid2 = [step * x, 15, step * z];
        let p2 = [mid1[0] - u * mid2[0], 15, mid1[2] - u * mid2[2]];
        bc.push([start, mid, p2, mid1]);
        deriv.push([start, mid1, end, mid2]);

        let steps; 
        let spin; 
        let s1; 
        let s2;
        let segs = [];

        for (steps = 0; steps < 1; steps += 1 / segn) {
            [x, z, s1, s2] = calc(count, steps);
            spin = Math.atan2(s1, s2);
            if (count == 0 && steps == 0) {
                segs.push([start[0], start[2], 0, spin]);
                continue;
            }
            let temp;
            if (steps == 0) {
                temp = at[(count - 1 + at.length) % at.length].segA[9];
            } else {
                temp = segs.pop();
                segs.push(temp);
            }
            let dist = temp[2] + Math.sqrt((temp[0] - x) * (temp[0] - x) + (temp[1] - z) * (temp[1] - z));
            segs.push([x, z, dist, spin]);
        }
        at.push({
            "segA": segs,
        });
    }
}

function bezierCurveCalc(cpList, steps) {
    
    var step = Math.round(steps) + 1 || 20;          
    var geometry = new T.Geometry();

    var start0 = cpList[0];
    let val0 = new T.Vector3(start0[0], start0[1], start0[2]);
    start0 = cpList[1];
    let val1 = new T.Vector3(start0[0], start0[1], start0[2]);
    start0 = cpList[2];
    let val2 = new T.Vector3(start0[0], start0[1], start0[2]);
    start0 = cpList[3];
    let val3 = new T.Vector3(start0[0], start0[1], start0[2]);
    var bezier = new T.CubicBezierCurve3(val0, val1, val2, val3);
    var steps, stepSize = 1 / (step - 1);
    for (steps = 0; steps < step; steps++) {
        geometry.vertices.push(bezier.getPoint(steps * stepSize));
    }
    return geometry;
}

function createPoint(P, radius, material) {

    radius = radius || 0.1;
    material = material || new T.MeshNormalMaterial();
    var mesh = new T.Mesh(new T.SphereGeometry(radius), material);
    mesh.position.set(P[0], P[1], P[2]);
    return mesh;
}

function calc(count, u) { 
    let x;
    let z; 
    let s1; 
    let s2;
    let p = deriv[count];
    x = p[0][0] + p[2][0] * u + (-3 * p[0][0] - 2 * p[2][0] + 3 * p[1][0] - p[3][0]) * u * u + (2 * p[0][0] + p[2][0] - 2 * p[1][0] + p[3][0]) * u * u * u;
    z = p[0][2] + p[2][2] * u + (-3 * p[0][2] - 2 * p[2][2] + 3 * p[1][2] - p[3][2]) * u * u + (2 * p[0][2] + p[2][2] - 2 * p[1][2] + p[3][2]) * u * u * u;
    s1 = p[2][0] + (-3 * p[0][0] - 2 * p[2][0] + 3 * p[1][0] - p[3][0]) * u * 2 + (2 * p[0][0] + p[2][0] - 2 * p[1][0] + p[3][0]) * u * u * 3;
    s2 = p[2][2] + (-3 * p[0][2] - 2 * p[2][2] + 3 * p[1][2] - p[3][2]) * u * 2 + (2 * p[0][2] + p[2][2] - 2 * p[1][2] + p[3][2]) * u * u * 3;
    return [x, z, s1, s2];
}

function wood(world) {
    at.forEach(function (pt) {
        let steps;
        let segs1 = pt.segA;
        let geo = new T.BoxGeometry(1, 0.3, 2);
        let mesh = new T.MeshStandardMaterial({ color: "brown", metalness: 0.8, roughness: 0.5 });

        let base = new T.BoxGeometry(3, 0.5, 5);
        let baseMat = new T.MeshStandardMaterial({ color: "#737373", metalness: 0.5, roughness: 0.5 });
    
        for (steps = 0; steps < segn; steps++) {
            let rail = new T.Mesh(geo, mesh);
            rail.translateX(segs1[steps][0]);
            rail.translateY(15);
            rail.translateZ(segs1[steps][1]);
            rail.rotation.set(0, segs1[steps][3] + Math.PI / 2, 0);
            world.scene.add(rail);
        }

        for (steps = 0; steps < segn; steps++) {
            let rail = new T.Mesh(base, baseMat);
            rail.translateX(segs1[steps][0]);
            rail.translateY(14.7);
            rail.translateZ(segs1[steps][1]);
            rail.rotation.set(0, segs1[steps][3] + Math.PI / 2, 0);
            world.scene.add(rail);
        }



    });
}

export function draw(world) {
    bezierCalc();
    wood(world);
    bc.forEach(function (curves) {
        var bezier = [
            curves[0],
            curves[1],
            curves[2],
            curves[3]
        ];
        var curveGeom = bezierCurveCalc(bezier, 20);
        var curveMat = new T.LineBasicMaterial({ color: "black", linewidth: 10 });
        var curve1 = new T.Line(curveGeom, curveMat);
       
        world.scene.add(curve1);
       
    });

    for (var count = 0; count < bc[0].length; count++) {
        world.scene.add(createPoint(bc[0][count]));
    }

}