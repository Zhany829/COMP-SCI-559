
import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let s = 80;
let rs = 3.5;
export class GrTruck extends GrObject {
    constructor() {
        let bigCar = new T.Group();
        let fg = new T.Group();
        let box = new T.BoxGeometry(0.61, 0.91, 0.81);
        let mat = new T.MeshStandardMaterial({ color: "gold", metalness: 0.5, roughness: 0.9 });
        let fmesh = new T.Mesh(box, mat);
        let fwg = new T.BoxGeometry(0.11, 0.41, 0.61);
        let wm = new T.MeshStandardMaterial({ color: "white", metalness: 0.3, roughness: 0.2 });
        let fw = new T.Mesh(fwg, wm);
        let sm = new T.BoxGeometry(0.31, 0.41, 0.11);
        let sw = new T.Mesh(sm, wm);
        let mesh2 = new T.Mesh(sm, wm);
        let fbm = new T.BoxGeometry(0.41, 0.41, 0.61);
        let ft = new T.MeshStandardMaterial({ color: "white", metalness: 0.5, roughness: 0.2 });
        let fd = new T.Mesh(fbm, ft);
        let em = new T.BoxGeometry(0.11, 0.31, 0.21);
        let emat = new T.MeshStandardMaterial({ color: "white", metalness: 0.8, roughness: 0.2 });
        let m1 = new T.Mesh(em, emat);
        let m2 = new T.Mesh(em, emat);
        fd.translateY(-0.255);
        fd.translateX(-0.265);
        sw.translateZ(0.365);
        mesh2.translateZ(-0.365);
        m1.translateZ(0.45);
        m2.translateZ(-0.45);
        m1.translateX(0.245);
        m2.translateX(0.245);
        m1.translateY(0.15);
        m2.translateY(0.15);
        sw.translateY(0.15);
        mesh2.translateY(0.15);
        fw.translateX(0.265);
        fw.translateY(0.15);
        fg.add(fmesh, fd, fw, sw, mesh2, m1, m2);
        fg.translateY(0.45);
        fg.translateX(0.55);
        bigCar.add(fg);
        let cm = new T.BoxGeometry(2.31, 1.11, 1.1);
        let cmat = new T.MeshStandardMaterial({ color: "green", metalness: 0.6, roughness: 0.5 });
        let c = new T.Mesh(cm, cmat);
        c.translateY(0.51);
        c.translateX(-1.11);
        bigCar.add(c);

        let wgeom = new T.CylinderGeometry(0.21, 0.21, 1.21, 32);
        let wmat = new T.MeshStandardMaterial({ color: "black", metalness: 0.9, roughness: 0.8 });
        let w1 = new T.Mesh(wgeom, wmat);
        let w2 = new T.Mesh(wgeom, wmat);
        let w3 = new T.Mesh(wgeom, wmat);
        let w4 = new T.Mesh(wgeom, wmat);
        w1.rotateX(Math.PI / 2);
        w2.rotateX(Math.PI / 2);
        w3.rotateX(Math.PI / 2);
        w4.rotateX(Math.PI / 2);
        w1.translateX(-1.61);
        w2.translateX(-1.11);
        w3.translateX(-0.31);
        w4.translateX(0.21);
        bigCar.add(w1, w2, w3, w4);

        bigCar.translateY(0.21);
        bigCar.scale.set(1.52, 1.52, 1.52);
        super(`Truck`, bigCar);
        this.bigCar = bigCar;

        bigCar.position.x = s / 5 - rs / 4;
        bigCar.position.z = -s / 5 + rs / 4 - 4;
        this.turn = 0;
        this.x = s / 5 - rs / 4;
        this.z = -s / 5 + rs / 4;
        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(2);
        this.ridePoint.rotateY(Math.PI / 2);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;


    }

    tick(time, timeOfDay) {
        let run = time / 60;
        switch (this.turn) {
            case 0:
                this.bigCar.translateX(run);
                this.z -= run;
                if (this.z <= -s / 5 + rs / 4) {
                    this.turn = 1;
                    this.bigCar.rotateY(Math.PI / 2);
                }
                break;
            case 1:
                this.bigCar.translateX(run);
                this.x += run;
                if (this.x >= s / 5 - rs / 4) {
                    this.turn = 2;
                    this.bigCar.rotateY(Math.PI / 2);
                }
                break;
            case 2:
                this.bigCar.translateX(run);
                this.z += run;
                if (this.z >= s / 5 - rs / 4) {
                    this.turn = 3;
                    this.bigCar.rotateY(Math.PI / 2);
                }
                break;
            case 3:
                this.bigCar.translateX(run);
                this.x -= run;
                if (this.x <= -s / 5 + rs / 3) {
                    this.turn = 0;
                    this.bigCar.rotateY(Math.PI / 2);
                }
                break;

        }


    }

}

export class GrBus1 extends GrObject {
    constructor() {
        let bus = new T.Group();

        let fp = new T.Group();
        let box = new T.BoxGeometry(3.52, 1.2, 0.82);
        let mat = new T.MeshStandardMaterial({ color: "white", metalness: 0.55, roughness: 0.2 });
        let fmesh = new T.Mesh(box, mat);
        let fwg = new T.BoxGeometry(0.12, 0.52, 0.62);
        let wm = new T.MeshStandardMaterial({ color: "black", metalness: 0.55, roughness: 0.2 });
        let fw = new T.Mesh(fwg, wm);
        let geo2 = new T.BoxGeometry(0.52, 0.42, 0.12);
        let comb2 = new T.Mesh(geo2, wm);
        let mesh2 = new T.Mesh(geo2, wm);
        let s3 = new T.Mesh(geo2, wm);
        let s4 = new T.Mesh(geo2, wm);
        let s5 = new T.Mesh(geo2, wm);
        let s6 = new T.Mesh(geo2, wm);
        let s7 = new T.Mesh(geo2, wm);
        let s8 = new T.Mesh(geo2, wm);
        let box3 = new T.BoxGeometry(0.12, 0.32, 0.22);
        let mesh3 = new T.MeshStandardMaterial({ color: "white", metalness: 0.3, roughness: 0.2 });
        let e1 = new T.Mesh(box3, mesh3);
        let e2 = new T.Mesh(box3, mesh3);
        let newG = new T.Group();
        comb2.translateZ(0.362);
        mesh2.translateZ(-0.362);
        s3.translateZ(0.362);
        s4.translateZ(-0.362);
        s5.translateZ(0.362);
        s6.translateZ(-0.362);
        s7.translateZ(0.362);
        s8.translateZ(-0.362);
        comb2.translateX(-0.22);
        mesh2.translateX(-0.22);
        s3.translateX(0.52);
        s4.translateX(0.52);
        s5.translateX(1.12);
        s6.translateX(1.12);
        s7.translateX(-0.82);
        s8.translateX(-0.82);
        e1.translateZ(0.42);
        e2.translateZ(-0.42);
        e1.translateX(1.62);
        e2.translateX(1.62);
        e1.translateY(0.12);
        e2.translateY(0.12);
        fw.translateX(1.712);
        fw.translateY(0.12);

        newG.add(comb2, mesh2, s3, s4, s5, s6, s7, s8);
        fp.add(fmesh, fw, e1, e2, newG);
        newG.translateY(0.1);
        fp.translateY(0.4);
        bus.add(fp);

        let tire = new T.CylinderGeometry(0.2, 0.2, 1, 32);
        let tireMat = new T.MeshStandardMaterial({ color: "black", metalness: 0.3, roughness: 0.8 });
        let t1 = new T.Mesh(tire, tireMat);
        let t2 = new T.Mesh(tire, tireMat);
        let t3 = new T.Mesh(tire, tireMat);
        let t4 = new T.Mesh(tire, tireMat);
        t1.rotateX(Math.PI / 2);
        t2.rotateX(Math.PI / 2);
        t3.rotateX(Math.PI / 2);
        t4.rotateX(Math.PI / 2);
        t1.translateX(1.21);
        t2.translateX(0.51);
        t3.translateX(-0.51);
        t4.translateX(-1.21);
        bus.add(t1, t2, t3, t4);
        bus.translateY(0.21);
        super(`Bus1`, bus);
        this.bigCar = bus;
        bus.scale.set(1.51, 1.51, 1.51);
        bus.position.x = s / 10 + rs / 4 + 7;
        bus.position.z = s / 5 + rs / 4;
        this.turn = 3;
        this.x = s / 5 + rs / 4;
        this.z = s / 5 + rs / 4;

        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(2);
        this.ridePoint.rotateY(Math.PI / 2);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;
    }

    tick(time, timeOfDay) {
        let v2 = time / 50;
        switch (this.turn) {
            case 0:
                this.bigCar.translateX(v2);
                this.z += v2;
                if (this.z >= s / 5 + rs / 4) {
                    this.turn = 1;
                    this.bigCar.rotateY(-Math.PI / 2);
                }
                break;
            case 1:
                this.bigCar.translateX(v2);
                this.x -= v2;
                if (this.x <= -s / 5 - rs / 3) {
                    this.turn = 2;
                    this.bigCar.rotateY(-Math.PI / 2);
                }
                break;
            case 2:
                this.bigCar.translateX(v2);
                this.z -= v2;
                if (this.z <= -s / 5 - rs / 4) {
                    this.turn = 3;
                    this.bigCar.rotateY(-Math.PI / 2);
                }
                break;
            case 3:
                this.bigCar.translateX(v2);
                this.x += v2;
                if (this.x >= s / 5 + rs / 4) {
                    this.turn = 0;
                    this.bigCar.rotateY(-Math.PI / 2);
                }
                break;

        }


    }



}


export class GrBus2 extends GrObject {
    constructor() {
        let bus = new T.Group();

        let fg = new T.Group();
        let fgg = new T.BoxGeometry(3.51, 1.1, 0.81);
        let fm = new T.MeshStandardMaterial({ color: "#7de1e8", metalness: 0.5, roughness: 0.2 });
        let fmesh = new T.Mesh(fgg, fm);
        let fwg = new T.BoxGeometry(0.11, 0.51, 0.61);
        let wm = new T.MeshStandardMaterial({ color: "black", metalness: 0.9, roughness: 0.2 });
        let frw = new T.Mesh(fwg, wm);
        let geo2 = new T.BoxGeometry(0.51, 0.41, 0.11);
        let comb2 = new T.Mesh(geo2, wm);
        let mesh2 = new T.Mesh(geo2, wm);
        let s3 = new T.Mesh(geo2, wm);
        let s4 = new T.Mesh(geo2, wm);
        let s5 = new T.Mesh(geo2, wm);
        let s6 = new T.Mesh(geo2, wm);
        let s7 = new T.Mesh(geo2, wm);
        let s8 = new T.Mesh(geo2, wm);
        let box3 = new T.BoxGeometry(0.11, 0.31, 0.21);
        let mesh3 = new T.MeshStandardMaterial({ color: "white", metalness: 0.3, roughness: 0.2 });
        let e1 = new T.Mesh(box3, mesh3);
        let e2 = new T.Mesh(box3, mesh3);
        let newG = new T.Group();
        comb2.translateZ(0.362);
        mesh2.translateZ(-0.362);
        s3.translateZ(0.362);
        s4.translateZ(-0.362);
        s5.translateZ(0.362);
        s6.translateZ(-0.362);
        s7.translateZ(0.362);
        s8.translateZ(-0.362);
        comb2.translateX(-0.22);
        mesh2.translateX(-0.22);
        s3.translateX(0.52);
        s4.translateX(0.52);
        s5.translateX(1.12);
        s6.translateX(1.12);
        s7.translateX(-0.82);
        s8.translateX(-0.82);
        e1.translateZ(0.42);
        e2.translateZ(-0.42);
        e1.translateX(1.62);
        e2.translateX(1.62);
        e1.translateY(0.12);
        e2.translateY(0.12);
        frw.translateX(1.712);
        frw.translateY(0.12);
        newG.add(comb2, mesh2, s3, s4, s5, s6, s7, s8);
        fg.add(fmesh, frw, e1, e2, newG);
        newG.translateY(0.11);
        fg.translateY(0.41);
        bus.add(fg);

        let tire = new T.CylinderGeometry(0.22, 0.22, 1.2, 32);
        let tireMat = new T.MeshStandardMaterial({ color: "black", metalness: 0.3, roughness: 0.8 });
        let t1 = new T.Mesh(tire, tireMat);
        let t2 = new T.Mesh(tire, tireMat);
        let t3 = new T.Mesh(tire, tireMat);
        let t4 = new T.Mesh(tire, tireMat);
        t1.rotateX(Math.PI / 2);
        t2.rotateX(Math.PI / 2);
        t3.rotateX(Math.PI / 2);
        t4.rotateX(Math.PI / 2);
        t1.translateX(1.2);
        t2.translateX(0.5);
        t3.translateX(-0.5);
        t4.translateX(-1.2);
        bus.add(t1, t2, t3, t4);

        bus.translateY(0.2);

        super(`Bus2`, bus);
        this.bigCar = bus;
        bus.scale.set(1.5, 1.5, 1.5);
        bus.position.x = -s / 5 - rs / 4;
        bus.position.z = -s / 5 - rs / 4;
        this.turn = 3;
        this.x = -s / 5 - rs / 4;
        this.z = -s / 5 - rs / 4;

        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(2);
        this.ridePoint.rotateY(Math.PI / 2);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;
    }

    tick(time, timeOfDay) {
        let v2 = time / 60;
        switch (this.turn) {
            case 0:
                this.bigCar.translateX(v2);
                this.z += v2;
                if (this.z >= s / 5 + rs / 4) {
                    this.turn = 1;
                    this.bigCar.rotateY(-Math.PI / 2);
                }
                break;
            case 1:
                this.bigCar.translateX(v2);
                this.x -= v2;
                if (this.x <= -s / 5 - rs / 3) {
                    this.turn = 2;
                    this.bigCar.rotateY(-Math.PI / 2);
                }
                break;
            case 2:
                this.bigCar.translateX(v2);
                this.z -= v2;
                if (this.z <= -s / 5 - rs / 4) {
                    this.turn = 3;
                    this.bigCar.rotateY(-Math.PI / 2);
                }
                break;
            case 3:
                this.bigCar.translateX(v2);
                this.x += v2;
                if (this.x >= s / 5 + rs / 4) {
                    this.turn = 0;
                    this.bigCar.rotateY(-Math.PI / 2);
                }
                break;

        }
    }

}


export class GrCar1 extends GrObject {
    constructor(params = {}) {
        let smallCar = new T.Group();

        let box = new T.BoxGeometry(2.1, 0.3, 0.8);
        let boxMat = new T.MeshStandardMaterial({ color: "#a8e87d", metalness: 0.1, roughness: 0.2 });
        let mesh = new T.Mesh(box, boxMat);
        let tGr = new T.Group();

        let tGeo = new T.Geometry();
        tGeo.vertices = [
            new T.Vector3(-0.3, 0, 0),
            new T.Vector3(1, 0, 0),
            new T.Vector3(1, 0, 0.8),
            new T.Vector3(-0.3, 0, 0.8),
            new T.Vector3(1 / 4 - 0.2, 0.5, 0.8),
            new T.Vector3(3 / 4, 0.5, 0.8),
            new T.Vector3(3 / 4, 0.5, 0),
            new T.Vector3(1 / 4 - 0.2, 0.5, 0),
        ];
        tGeo.faces = [
            new T.Face3(3, 2, 5),
            new T.Face3(3, 5, 4),
            new T.Face3(2, 1, 6),
            new T.Face3(2, 6, 5),
            new T.Face3(4, 5, 6),
            new T.Face3(4, 6, 7),
            new T.Face3(0, 3, 4),
            new T.Face3(0, 4, 7),
            new T.Face3(1, 0, 7),
            new T.Face3(1, 7, 6)
        ];
        let tm = new T.MeshStandardMaterial({ color: "white", metalness: 0.8, roughness: 0.2 });
        let top1 = new T.Mesh(tGeo, tm);
        tGr.add(top1);
        top1.translateZ(-0.41);
        tGr.translateY(0.31);
        tGr.translateX(0.21);

        let wfGeo = new T.Geometry();
        wfGeo.vertices = [
            new T.Vector3(-0.3 + 0.35 / 8, 0.5 / 4, 0.1),
            new T.Vector3(-0.3 + 0.35 / 8, 0.5 / 4, 0.7),
            new T.Vector3(1 / 4 - 0.2 - 0.35 / 8, 0.5 * 7 / 8 - 0.01, 0.7),
            new T.Vector3(1 / 4 - 0.2 - 0.35 / 8, 0.5 * 7 / 8 - 0.01, 0.1)
        ];
        wfGeo.faces = [
            new T.Face3(0, 1, 2),
            new T.Face3(0, 2, 3)
        ];
        let wm = new T.MeshStandardMaterial({ color: "white", metalness: 0.5, roughness: 0.2 });
        let frw = new T.Mesh(wfGeo, wm);
        frw.translateX(-0.01);
        frw.translateZ(-0.4);

        let wbGeo = new T.Geometry();
        wbGeo.vertices = [
            new T.Vector3(1 - (1 / 4) * 1 / 5, 0.1, 0.1),
            new T.Vector3(1 - (1 / 4) * 1 / 5, 0.1, 0.7),
            new T.Vector3(3 / 4 + (1 / 4) * 1 / 5, 0.4, 0.7),
            new T.Vector3(3 / 4 + (1 / 4) * 1 / 5, 0.4, 0.1)
        ];
        wbGeo.faces = [
            new T.Face3(1, 0, 3),
            new T.Face3(1, 3, 2)
        ];
        let bww = new T.Mesh(wbGeo, wm);
        bww.translateX(0.011);
        bww.translateZ(-0.41);
        let geo2 = new T.BoxGeometry(0.45, 0.3, 0.1);
        let comb2 = new T.Mesh(geo2, wm);
        let mesh2 = new T.Mesh(geo2, wm);
        comb2.translateZ(0.351);
        mesh2.translateZ(-0.351);
        comb2.translateY(0.25);
        mesh2.translateY(0.25);
        comb2.translateX(0.3);
        mesh2.translateX(0.3);
        tGr.add(frw, bww, comb2, mesh2);
        smallCar.add(mesh, tGr);
        mesh.rotation.y = Math.PI;
        tGr.rotation.y = Math.PI;
        mesh.translateY(0.21);
        let tire = new T.CylinderGeometry(0.21, 0.21, 1, 32);
        let tireMat = new T.MeshStandardMaterial({ color: "silver", metalness: 0.8, roughness: 0.8 });
        let t1 = new T.Mesh(tire, tireMat);
        let t2 = new T.Mesh(tire, tireMat);
        t1.rotateX(Math.PI / 2);
        t2.rotateX(Math.PI / 2);
        t1.translateX(-0.5);
        t2.translateX(0.5);
        let wheels_group = new T.Group();
        wheels_group.add(t1, t2);
        smallCar.add(wheels_group);
        smallCar.translateY(0.21);
        let scale = 1.51;
        smallCar.scale.set(scale, scale, scale);
        super(`Car1`, smallCar);
        this.bigCar = smallCar;
        smallCar.position.x = -s / 5 + rs / 4;
        smallCar.position.z = s / 5 - rs / 4;
        this.turn = 0;
        this.x = -s / 5 + rs / 4;
        this.z = s / 5 - rs / 4;
        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(2);
        this.ridePoint.rotateY(Math.PI / 2);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;

    }

    tick(time, timeOfDay) {
        let run = time / 40;
        switch (this.turn) {
            case 0:
                this.bigCar.translateX(run);
                this.z -= run;
                if (this.z <= -s / 5 + rs / 4) {
                    this.turn = 1;
                    this.bigCar.rotateY(Math.PI / 2);
                }
                break;
            case 1:
                this.bigCar.translateX(run);
                this.x += run;
                if (this.x >= s / 5 - rs / 4) {
                    this.turn = 2;
                    this.bigCar.rotateY(Math.PI / 2);
                }
                break;
            case 2:
                this.bigCar.translateX(run);
                this.z += run;
                if (this.z >= s / 5 - rs / 4) {
                    this.turn = 3;
                    this.bigCar.rotateY(Math.PI / 2);
                }
                break;
            case 3:
                this.bigCar.translateX(run);
                this.x -= run;
                if (this.x <= -s / 5 + rs / 3) {
                    this.turn = 0;
                    this.bigCar.rotateY(Math.PI / 2);
                }
                break;

        }



    }


}


export class GrCar2 extends GrObject {
    constructor() {
        let smallCar = new T.Group();
        let box = new T.BoxGeometry(2.11, 0.31, 0.81);
        let boxMat = new T.MeshStandardMaterial({ color: "yellow", metalness: 0.5, roughness: 0.2 });
        let mesh = new T.Mesh(box, boxMat);
        let tGr = new T.Group();
        let tGeo = new T.Geometry();
        tGeo.vertices = [
            new T.Vector3(-0.3, 0, 0),
            new T.Vector3(1, 0, 0),
            new T.Vector3(1, 0, 0.8),
            new T.Vector3(-0.3, 0, 0.8),
            new T.Vector3(1 / 4 - 0.2, 0.5, 0.8),
            new T.Vector3(3 / 4, 0.5, 0.8),
            new T.Vector3(3 / 4, 0.5, 0),
            new T.Vector3(1 / 4 - 0.2, 0.5, 0)
        ];
        tGeo.faces = [
            new T.Face3(3, 2, 5),
            new T.Face3(3, 5, 4),
            new T.Face3(2, 1, 6),
            new T.Face3(2, 6, 5),
            new T.Face3(4, 5, 6),
            new T.Face3(4, 6, 7),
            new T.Face3(0, 3, 4),
            new T.Face3(0, 4, 7),
            new T.Face3(1, 0, 7),
            new T.Face3(1, 7, 6)
        ];
        let tm = new T.MeshStandardMaterial({ color: "yellow", metalness: 0.2, roughness: 0.2 });
        let top1 = new T.Mesh(tGeo, tm);
        tGr.add(top1);
        top1.translateZ(-0.41);
        tGr.translateY(0.31);
        tGr.translateX(0.31);
        let wfGeo = new T.Geometry();
        wfGeo.vertices = [
            new T.Vector3(-0.3 + 0.35 / 8, 0.5 / 4, 0.1),
            new T.Vector3(-0.3 + 0.35 / 8, 0.5 / 4, 0.7),
            new T.Vector3(1 / 4 - 0.2 - 0.35 / 8, 0.5 * 7 / 8 - 0.01, 0.7),
            new T.Vector3(1 / 4 - 0.2 - 0.35 / 8, 0.5 * 7 / 8 - 0.01, 0.1)
        ];
        wfGeo.faces = [
            new T.Face3(0, 1, 2),
            new T.Face3(0, 2, 3)
        ];
        let wm = new T.MeshStandardMaterial({ color: "silver", metalness: 0.7, roughness: 0.2 });
        let frw = new T.Mesh(wfGeo, wm);
        frw.translateX(-0.011);
        frw.translateZ(-0.41);

        let wbGeo = new T.Geometry();
        wbGeo.vertices = [
            new T.Vector3(1 - (1 / 4) * 1 / 5, 0.1, 0.1),
            new T.Vector3(1 - (1 / 4) * 1 / 5, 0.1, 0.7),
            new T.Vector3(3 / 4 + (1 / 4) * 1 / 5, 0.4, 0.7),
            new T.Vector3(3 / 4 + (1 / 4) * 1 / 5, 0.4, 0.1)
        ];
        wbGeo.faces = [
            new T.Face3(1, 0, 3),
            new T.Face3(1, 3, 2)
        ];
        let bww = new T.Mesh(wbGeo, wm);
        bww.translateX(0.011);
        bww.translateZ(-0.41);

        let geo2 = new T.BoxGeometry(0.451, 0.31, 0.11);
        let comb2 = new T.Mesh(geo2, wm);
        let mesh2 = new T.Mesh(geo2, wm);
        comb2.translateZ(0.351);
        mesh2.translateZ(-0.351);
        comb2.translateY(0.251);
        mesh2.translateY(0.251);
        comb2.translateX(0.31);
        mesh2.translateX(0.31);
        tGr.add(frw, bww, comb2, mesh2);
        mesh.translateY(0.21);
        let tire = new T.CylinderGeometry(0.21, 0.21, 1, 32);
        let tireMat = new T.MeshStandardMaterial({ color: "blsilverack", metalness: 0.7, roughness: 0.8 });
        let t1 = new T.Mesh(tire, tireMat);
        let t2 = new T.Mesh(tire, tireMat);
        t1.rotateX(Math.PI / 2);
        t2.rotateX(Math.PI / 2);
        t1.translateX(-0.51);
        t2.translateX(0.51);
        smallCar.add(mesh, tGr, t1, t2);
        smallCar.translateY(0.21);
        mesh.rotation.y = Math.PI;
        tGr.rotation.y = Math.PI;
        let scale = 1.51;
        smallCar.scale.set(scale, scale, scale);
        smallCar.translateY(0.21);
        super(`Car2`, smallCar);
        this.bigCar = smallCar;
        smallCar.position.x = 0;
        smallCar.position.z = s / 5 - rs / 4;
        this.turn = 3;
        this.x = 0;
        this.z = s / 5 - rs / 4;
        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(2);
        this.ridePoint.rotateY(Math.PI / 2);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;

    }

    tick(time, timeOfDay) {
        let run = time / 40;
        switch (this.turn) {
            case 0:
                this.bigCar.translateX(run);
                this.z -= run;
                if (this.z <= -s / 5 + rs / 4) {
                    this.turn = 1;
                    this.bigCar.rotateY(Math.PI / 2);
                }
                break;
            case 1:
                this.bigCar.translateX(run);
                this.x += run;
                if (this.x >= s / 5 - rs / 4) {
                    this.turn = 2;
                    this.bigCar.rotateY(Math.PI / 2);
                }
                break;
            case 2:
                this.bigCar.translateX(run);
                this.z += run;
                if (this.z >= s / 5 - rs / 4) {
                    this.turn = 3;
                    this.bigCar.rotateY(Math.PI / 2);
                }
                break;
            case 3:
                this.bigCar.translateX(run);
                this.x -= run;
                if (this.x <= -s / 5 + rs / 3) {
                    this.turn = 0;
                    this.bigCar.rotateY(Math.PI / 2);
                }
                break;

        }



    }
}



