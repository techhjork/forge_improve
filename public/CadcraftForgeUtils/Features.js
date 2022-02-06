
//import ThreeBSP from './threeCSG.js';
import { BufferGeometryUtils } from './examples/jsm/utils/BufferGeometryUtils.js';
import { Color } from './CadcraftForgeUtils.js';

let Features = {};


// ***************************************************************************************
// *********************** Features **********************************************************

Features.Box = function (width, height, length) {
    let box = new THREE.BoxGeometry(width, height, length);
    box.computeFaceNormals();
    box.computeVertexNormals();
    let box_mesh = new THREE.Mesh(box);
    let translation = new THREE.Matrix4().makeTranslation(width / 2, height / 2, length / 2);
    box_mesh.geometry.applyMatrix4(translation);
    box_mesh.updateMatrix();
    return box_mesh;
};

Features.Cylinder = function (diameter, height, radiusSegment) {
    let cyl = new THREE.CylinderGeometry(diameter / 2, diameter / 2, height, radiusSegment);
    cyl.computeFaceNormals();
    cyl.computeVertexNormals();
    let cyl_mesh = new THREE.Mesh(cyl);
    let translation = new THREE.Matrix4().makeTranslation(0, height / 2, 0);
    cyl_mesh.geometry.applyMatrix4(translation);
    cyl_mesh.updateMatrix();
    return cyl_mesh;
};

Features.Sphere = function (radius, widthSegments, heightSegments) {
    let sphere = new THREE.SphereGeometry(radius, widthSegments, widthSegments);
    sphere.computeFaceNormals();
    sphere.computeVertexNormals();
    let sphere_mesh = new THREE.Mesh(sphere);
    return sphere_mesh;
};

Features.ExtrudeBox = function (width, height, length, includeBevel = true) {
    let shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(width, 0);
    shape.lineTo(width, height);
    shape.lineTo(0, height);
    shape.lineTo(0, 0);

    let extrudeSettings = {
        steps: 2,
        depth: length,
        bevelEnabled: includeBevel,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1
    };

    let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    let extrude_mesh = new THREE.Mesh(geometry);

   

    return extrude_mesh;
};


Features.DrilledHole = function (diameter, depth, isDrillPointFlat = true) {
    //let holeGeo = new THREE.BufferGeometry();
    let cyl = new THREE.CylinderGeometry(diameter / 2, diameter / 2, depth, 10);
    cyl.computeFaceNormals();
    cyl.computeVertexNormals();
    let cyl_mesh = new THREE.Mesh(cyl);

    let translation = new THREE.Matrix4().makeTranslation(0, -depth / 2, 0);
    cyl_mesh.geometry.applyMatrix4(translation);
    cyl_mesh.updateMatrix();

    let geoArray = [];
    geoArray.push(cyl);
    //holeGeo.merge(cyl_mesh.geometry, cyl_mesh.matrix);

    if (isDrillPointFlat === false) {
        let drillPoint = new THREE.CylinderGeometry(diameter / 2, 0.01, (diameter / 2) * Math.tan(31 * Math.PI / 180), 10);
        drillPoint.computeFaceNormals();
        drillPoint.computeVertexNormals();
        let drillPoint_mesh = new THREE.Mesh(drillPoint);

        let translation = new THREE.Matrix4().makeTranslation(0, -(depth + (diameter / 2) * Math.tan(31 * Math.PI / 180) / 2), 0);
        drillPoint_mesh.geometry.applyMatrix4(translation);
        drillPoint_mesh.updateMatrix();
        //holeGeo.merge(drillPoint_mesh.geometry, drillPoint_mesh.matrix);
        geoArray.push(drillPoint_mesh.geometry);

        let holeGeo = BufferGeometryUtils.mergeBufferGeometries(geoArray);

        return new THREE.Mesh(holeGeo);
    };

    return new THREE.Mesh(cyl); 
};

Features.Counterbore = function (majorDiameter, majorDepth, minorDiameter, totalDepth, isDrillPointFlat = true) {
    //let holeGeo = new THREE.Geometry();
    let cyl = new THREE.CylinderGeometry(majorDiameter / 2, majorDiameter / 2, majorDepth, 10);
    cyl.computeFaceNormals();
    cyl.computeVertexNormals();
    let cyl_mesh = new THREE.Mesh(cyl);

    let translation = new THREE.Matrix4().makeTranslation(0, -majorDepth / 2, 0);
    cyl_mesh.geometry.applyMatrix4(translation);
    cyl_mesh.updateMatrix();

    let geoArray = [];
    geoArray.push(cyl);

    //holeGeo.merge(cyl_mesh.geometry, cyl_mesh.matrix);

    let cyl2 = new THREE.CylinderGeometry(minorDiameter / 2, minorDiameter / 2, totalDepth - majorDepth, 10);
    cyl2.computeFaceNormals();
    cyl2.computeVertexNormals();
    let cyl2_mesh = new THREE.Mesh(cyl2);

    translation = new THREE.Matrix4().makeTranslation(0, -(majorDepth + (totalDepth - majorDepth) / 2), 0);
    cyl2_mesh.geometry.applyMatrix4(translation);
    cyl2_mesh.updateMatrix();

    //holeGeo.merge(cyl2_mesh.geometry, cyl2_mesh.matrix);

    geoArray.push(cyl2);

    if (isDrillPointFlat === false) {
        let drillPoint = new THREE.CylinderGeometry(minorDiameter / 2, 0.01, (minorDiameter / 2) * Math.tan(31 * Math.PI / 180), 10);
        drillPoint.computeFaceNormals();
        drillPoint.computeVertexNormals();
        let drillPoint_mesh = new THREE.Mesh(drillPoint);

        let translation = new THREE.Matrix4().makeTranslation(0, -(totalDepth + (minorDiameter / 2) * Math.tan(31 * Math.PI / 180) / 2), 0);
        drillPoint_mesh.geometry.applyMatrix4(translation);
        drillPoint_mesh.updateMatrix();
        //holeGeo.merge(drillPoint_mesh.geometry, drillPoint_mesh.matrix);
        geoArray.push(drillPoint_mesh.geometry);

        
    };

    let holeGeo = BufferGeometryUtils.mergeBufferGeometries(geoArray);

    return new THREE.Mesh(holeGeo);
};

Features.Cut = function (masterMesh, cutMesh, xPos, yPos, zPos, xRot, yRot, zRot) {
    
    let base_bsp = new ThreeBSP(masterMesh);
    let resRot = GetNewMatrix(xPos, yPos, zPos, xRot, yRot, zRot);
    cutMesh.applyMatrix4(resRot);
    cutMesh.updateMatrix();
    let cut_bsp = new ThreeBSP(cutMesh);
    let resultBSP = base_bsp.subtract(cut_bsp);

    return resultBSP.toMesh();

};

Features.Join = function (masterMesh, addMesh, xPos, yPos, zPos, xRot, yRot, zRot) {

    let resRot = GetNewMatrix(xPos, yPos, zPos, xRot, yRot, zRot);
    addMesh.applyMatrix4(resRot);
    addMesh.geometry.applyMatrix4(resRot);
    addMesh.updateMatrix();

    let masterGeo;
    let addGeo;
    if (masterMesh.geometry.index === null)
        masterGeo = masterMesh.geometry;
    else
        masterGeo = masterMesh.geometry.toNonIndexed();

    if (addMesh.geometry.index === null)
        addGeo = addMesh.geometry;
    else
        addGeo = addMesh.geometry.toNonIndexed()

    let returnGeo = BufferGeometryUtils.mergeBufferGeometries([masterGeo, addGeo]);

    return new THREE.Mesh(returnGeo);
};

// Don't work in new releases
//Features.MultipleCut = function (masterMesh, cutMesh, arrayofVector3, xRot, yRot, zRot) {


//    let base_bsp = new ThreeBSP(masterMesh);

//    ////let cutGeo = new THREE.Geometry();
//    let occGeo;

//    let geoArray = [];
  
//    arrayofVector3.forEach(function (item, index, array) {

//        let resRot = GetNewMatrix(item.x, item.y, item.z, xRot, yRot, zRot);
//        occGeo = cutMesh.geometry.clone();

//        occGeo.applyMatrix4(resRot);
//        geoArray.push(occGeo);
//    });

//    console.log(geoArray);
//    let cutGeo = BufferGeometryUtils.mergeBufferGeometries(geoArray);

//    var cutGeo_mesh = new THREE.Mesh(cutGeo);


//    console.log(cutGeo_mesh);
//    let cut_bsp = new ThreeBSP(cutGeo_mesh);
//    let resultBSP = base_bsp.subtract(cut_bsp);

//    return resultBSP.toMesh();

//};


Features.MultipleJoin = function (masterMesh, addMesh, arrayofVector3, xRot, yRot, zRot) {

    //let addGeo = masterMesh.geometry;   //new THREE.Geometry();

    let occGeo;
    let geoArray = [];
    geoArray.push(masterMesh.geometry);
    arrayofVector3.forEach(function (item, index, array) {

        let resRot = GetNewMatrix(item.x, item.y, item.z, xRot, yRot, zRot);
        occGeo = addMesh.geometry.clone();

        occGeo.applyMatrix4(resRot);

        if (occGeo.index !== null)
            occGeo = occGeo.toNonIndexed();


        geoArray.push(occGeo);
    });

    //console.log(geoArray);
    let returnGeo = BufferGeometryUtils.mergeBufferGeometries(geoArray);
    //console.log(new THREE.Mesh(returnGeo));
    return new THREE.Mesh(returnGeo);

};



Features.Text = (text, textHeight, font, justification, scene, x, y, z, xRot, yRot, zRot) => {

    let textGeo = GetTextGeo(text, textHeight, font, 1);

    let textGeoLength = textGeo.boundingBox.max.x - textGeo.boundingBox.min.x;
    let textGeoHeight = textGeo.boundingBox.max.y - textGeo.boundingBox.min.y;

    let xTrans; // = -textGeo.boundingBox.min.x;
    let yTrans; // = -textGeo.boundingBox.min.y;

    if (justification.toLowerCase() === 'bottomleft') {
        xTrans = 0;
        yTrans = 0;
    }
    else if (justification.toLowerCase() === 'bottomcenter') {
        xTrans = - textGeoLength / 2;
        yTrans = 0;
    }
    else if (justification.toLowerCase() === 'bottomright') {
        xTrans = - textGeoLength;
        yTrans = 0;
    }
    else if (justification.toLowerCase() === 'middleleft') {
        xTrans = 0;
        yTrans = textGeoHeight / 2;
    }
    else if (justification.toLowerCase() === 'middlecenter') {
        xTrans = -textGeoLength / 2;
        yTrans = -textGeoHeight / 2;
    }
    else if (justification.toLowerCase() === 'middleright') {
        xTrans = - textGeoLength;
        yTrans = - textGeoHeight / 2;
    }
    else if (justification.toLowerCase() === 'topleft') {
        xTrans = 0;
        yTrans = - textGeoHeight;
    }
    else if (justification.toLowerCase() === 'topcenter') {
        xTrans = - textGeoLength / 2;
        yTrans = - textGeoHeight;
    }
    else if (justification.toLowerCase() === 'topright') {
        xTrans = - textGeoLength;
        yTrans = - textGeoHeight;
    }
    else {
        xTrans = 0;
        yTrans = 0;
    }


    //let textMesh = CreateMeshOfText(textGeo, x + xTrans, y + yTrans, z, xRot, yRot, zRot);
    let textMesh = CreateMeshOfText(textGeo, x, y, z, xTrans, yTrans, 0, xRot, yRot, zRot);
    scene.add(textMesh);

    return textMesh;

};




function GetTextGeo(text, fontSize, font, thickness) {

    let textGeo = new THREE.TextGeometry(text, {
        font: font,
        size: fontSize,
        height: thickness,
        curveSegments: 4
    });

    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();
    //textGeo = new THREE.BufferGeometry().fromGeometry(textGeo);

    return textGeo;
}

function CreateMeshOfText(textGeo, x, y, z, xTrans, yTrans, zTrans, xRot, yRot, zRot) {
    let textMesh1 = new THREE.Mesh(textGeo, Color.Black());


    let translation = new THREE.Matrix4().makeTranslation(xTrans, yTrans, zTrans);
    textMesh1.geometry.applyMatrix4(translation);

    textMesh1.position.x = x;
    textMesh1.position.y = y;
    textMesh1.position.z = z;

    textMesh1.rotation.x = xRot * Math.PI / 180;
    textMesh1.rotation.y = yRot * Math.PI / 180;
    textMesh1.rotation.z = zRot * Math.PI / 180;
    textMesh1.name = 'TextMesh';
    textMesh1.updateMatrix();


    return textMesh1;
}

function GetNewMatrix(xPos, yPos, zPos, xRot, yRot, zRot) {
    let translation = new THREE.Matrix4().makeTranslation(xPos, yPos, zPos);
    let rotation1 = new THREE.Matrix4().makeRotationX(xRot * Math.PI / 180);
    let rotation2 = new THREE.Matrix4().makeRotationY(yRot * Math.PI / 180);
    let rotation3 = new THREE.Matrix4().makeRotationZ(zRot * Math.PI / 180);

    let resRot = new THREE.Matrix4();
    resRot = translation.multiply(rotation1.multiply(rotation2.multiply(rotation3)));
    return resRot;
};

export default Features;