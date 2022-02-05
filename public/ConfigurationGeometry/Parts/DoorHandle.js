import { Features } from '../../CadcraftForgeUtils/CadcraftForgeUtils.js';

let DoorHandle = function (height, length) {


    let radiusOfSweep = 42.5;

    let shape = new THREE.Shape();
    shape.moveTo(-12.23, 2.6);
    shape.lineTo(-11.42, 5.08);
    shape.lineTo(-10.11, 7.35);
    shape.lineTo(-8.36, 9.29);
    shape.lineTo(-6.25, 10.83);
    shape.lineTo(-3.86, 11.89);
    shape.lineTo(-1.31, 12.43);
    shape.lineTo(1.31, 12.43);
    shape.lineTo(3.86, 11.89);
    shape.lineTo(6.25, 10.83);
    shape.lineTo(8.36, 9.29);
    shape.lineTo(10.11, 7.35);
    shape.lineTo(11.42, 5.08);
    shape.lineTo(12.23, 2.6);
    shape.lineTo(12.5, 0);
    shape.lineTo(12.23, -2.6);
    shape.lineTo(11.42, -5.08);
    shape.lineTo(10.11, -7.35);
    shape.lineTo(8.36, -9.29);
    shape.lineTo(6.25, -10.83);
    shape.lineTo(3.86, -11.89);
    shape.lineTo(1.31, -12.43);
    shape.lineTo(-1.31, -12.43);
    shape.lineTo(-3.86, -11.89);
    shape.lineTo(-6.25, -10.83);
    shape.lineTo(-8.36, -9.29);
    shape.lineTo(-10.11, -7.35);
    shape.lineTo(-11.42, -5.08);
    shape.lineTo(-12.23, -2.6);
    shape.lineTo(-12.5, 0);
    shape.lineTo(-12.23, 2.6);



    let path = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, height - radiusOfSweep, 0));

    let path2 = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, height - radiusOfSweep, 0),
        new THREE.Vector3(0, height, 0),
        new THREE.Vector3(radiusOfSweep, height, 0)
    );

    let path3 = new THREE.LineCurve3(new THREE.Vector3(radiusOfSweep, height, 0), new THREE.Vector3(length - radiusOfSweep, height, 0));

    let path4 = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(length - radiusOfSweep, height, 0),
        new THREE.Vector3(length, height, 0),
        new THREE.Vector3(length, height - radiusOfSweep, 0),
    );

    let path5 = new THREE.LineCurve3(new THREE.Vector3(length, height - radiusOfSweep, 0), new THREE.Vector3(length, 0, 0),);

    let curves = new THREE.CurvePath();

    curves.add(path);
    curves.add(path2);
    curves.add(path3);
    curves.add(path4);
    curves.add(path5);


    var extrudeSettings = {
        steps: 100,
        extrudePath: curves,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1
    };

    var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    let mesh = new THREE.Mesh(geometry);


    return mesh;
};

export default DoorHandle;

