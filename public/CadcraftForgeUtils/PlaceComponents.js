
import { STLLoader } from '../CadcraftForgeUtils/examples/jsm/loaders/STLLoader.js';
import { IFCLoader } from '../CadcraftForgeUtils/examples/jsm/loaders/IFCLoader.js';
import { OBJLoader } from '../CadcraftForgeUtils/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from '../CadcraftForgeUtils/examples/jsm/loaders/MTLLoader.js';

let PlaceComponents = {};

PlaceComponents.Part = (partToPlace, xPos, yPos, zPos, xRot, yRot, zRot, material, scene, name, rotationAxisOrder = 'XYZ') => {

    let resRot = new THREE.Matrix4();
    resRot = GetComplexRotation(rotationAxisOrder, xPos, yPos, zPos, xRot, yRot, zRot)
    partToPlace.applyMatrix4(resRot);
    partToPlace.updateMatrix();

    partToPlace.material = material;
    partToPlace.name = name;
    scene.add(partToPlace);
    return partToPlace;
};

PlaceComponents.StandardPart = (wwwPathToFile, xPos, yPos, zPos, xRot, yRot, zRot, material, scene, rotationAxisOrder = 'XYZ') => {

    let mesh;
    let loader = new STLLoader();
    loader.load(wwwPathToFile, (geometry) => {
        let newgeometry = geometry;// new THREE.Geometry().fromBufferGeometry(geometry);
        mesh = new THREE.Mesh(newgeometry, material);

        let resRot = new THREE.Matrix4();

        resRot = GetComplexRotation(rotationAxisOrder, xPos, yPos, zPos, xRot, yRot, zRot)
        mesh.applyMatrix4(resRot);
        mesh.updateMatrix();

        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
    });

    return mesh;
};

PlaceComponents.StandardPartWithName = (wwwPathToFile, xPos, yPos, zPos, xRot, yRot, zRot, material, scene, name, rotationAxisOrder = 'XYZ') => {

    let mesh;
    let loader = new STLLoader();
    loader.load(wwwPathToFile, (geometry) => {
        let newgeometry = geometry;// new THREE.Geometry().fromBufferGeometry(geometry);
        mesh = new THREE.Mesh(newgeometry, material);

        let resRot = new THREE.Matrix4();

        resRot = GetComplexRotation(rotationAxisOrder, xPos, yPos, zPos, xRot, yRot, zRot)
        mesh.name = name;
        mesh.applyMatrix4(resRot);
        mesh.updateMatrix();

        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
    });

    return mesh;
};

PlaceComponents.BaseStandardPart = (wwwPathToFile, material, scene, name) => {

    let mesh;
    let loader = new STLLoader();
    loader.load(wwwPathToFile, (geometry) => {
        let newgeometry = geometry;// new THREE.Geometry().fromBufferGeometry(geometry);
        mesh = new THREE.Mesh(newgeometry, material);
        mesh.name = name;
        mesh.visible = false;
        scene.add(mesh);
    });

    return mesh;
};

PlaceComponents.BaseStandardGroup = (wwwPathToFile, scene, name) => {


    let objLoader = new OBJLoader();

    let materialsLoader = new MTLLoader();

    materialsLoader.load(wwwPathToFile.replace('.obj', '.mtl'), function (materialsCreator) {

        objLoader.setMaterials(materialsCreator);


        objLoader.load(wwwPathToFile, function (obj) {
            obj.name = name;
            obj.visible = false;
            scene.add(obj);
            console.log(scene.children);
        });

    });


    return true;
};


PlaceComponents.PlaceOrCloneComponent = (scene, partToReplace, name, pathOfStandardComponent, extension, meshNames = []) => {

    let nameAndPathOfStandardComponent = './' + pathOfStandardComponent + name + '.' + extension;

    if (!meshNames.includes(name)) {

        const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("rgb(255,0,0)"),
            flatShading: false,
            roughness: 0.5,
            metalness: 0.5,
            side: THREE.DoubleSide
        });

        if (nameAndPathOfStandardComponent.toLowerCase().includes('.stl')) {
            PlaceComponents.BaseStandardPart(nameAndPathOfStandardComponent, material, scene, 'Base_' + name);
        } else if (nameAndPathOfStandardComponent.toLowerCase().includes('.obj')) {
            PlaceComponents.BaseStandardGroup(nameAndPathOfStandardComponent, scene, 'Base_' + name);
        }
        
    }


    if (scene.getObjectByName('Base_' + name)) {

        if (nameAndPathOfStandardComponent.toLowerCase().includes('.stl')) {
            let foundMesh = scene.getObjectByName('Base_' + name);
            let baseMesh = foundMesh.clone();


            PlaceComponents.CloneAndPlaceBaseMesh(scene, baseMesh, partToReplace);  //scene.children[i].material

        } else if (nameAndPathOfStandardComponent.toLowerCase().includes('.obj')) {
            let foundGroup = scene.getObjectByName('Base_' + name);
            let baseGroup = foundGroup.clone();
            PlaceComponents.CloneAndPlaceBaseGroup(scene, baseGroup, partToReplace); 
        }

    } else {
       
        PlaceComponents.OnlyOneStandardPartByMatrix(scene, nameAndPathOfStandardComponent, partToReplace);

        if (name.includes('no'))
            console.log(scene.children[i]);
    }

    scene.remove(partToReplace);
};

PlaceComponents.CloneAndPlaceBaseMesh = (scene, baseMesh, partToReplace) => {
    let foundMatrix = new THREE.Matrix4();
    baseMesh.name = partToReplace.name.replace('PP_', '');
    baseMesh.properties = partToReplace.properties;
    partToReplace.updateMatrixWorld();
    foundMatrix = partToReplace.matrixWorld;
    baseMesh.applyMatrix4(foundMatrix);
    baseMesh.updateMatrix();
    baseMesh.material = partToReplace.material;
    baseMesh.visible = true;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    scene.add(baseMesh);

    return baseMesh;
};


PlaceComponents.CloneAndPlaceBaseGroup = (scene, baseGroup, partToReplace) => {

    let foundMatrix = new THREE.Matrix4();
    baseGroup.name = partToReplace.name.replace('PP_', '');
    baseGroup.properties = partToReplace.properties;
    partToReplace.updateMatrixWorld();
    foundMatrix = partToReplace.matrixWorld;
    baseGroup.applyMatrix4(foundMatrix);
    baseGroup.updateMatrix();
    baseGroup.visible = true;

    scene.add(baseGroup);

    return baseGroup;
};




PlaceComponents.OnlyOneStandardPartByMatrix = (scene, wwwPathToFile, partToReplace) => {
    let foundMatrix = new THREE.Matrix4();
    let mesh;


    if (wwwPathToFile.toLowerCase().includes('.stl')) {
        let stlLoader = new STLLoader();
        stlLoader.load(wwwPathToFile, (geometry) => {
            mesh = new THREE.Mesh(geometry, partToReplace.material);
            mesh.name = partToReplace.name.replace('PP_', '');
            mesh.properties = partToReplace.properties;
            partToReplace.updateMatrixWorld();
            foundMatrix = partToReplace.matrixWorld;
            mesh.applyMatrix4(foundMatrix);
            mesh.updateMatrix();

            mesh.castShadow = true;
            mesh.receiveShadow = true;
            scene.add(mesh);

        });
    } else if (wwwPathToFile.toLowerCase().includes('.obj')) {



        let objLoader = new OBJLoader();

        let materialsLoader = new MTLLoader();
        materialsLoader.load(wwwPathToFile.replace('.obj', '.mtl'), function (materialsCreator) {

            objLoader.setMaterials(materialsCreator);


            objLoader.load(wwwPathToFile, function (obj) {
                obj.name = partToReplace.name.replace('PP_', '');
                obj.properties = partToReplace.properties;
                partToReplace.updateMatrixWorld();
                foundMatrix = partToReplace.matrixWorld;
                obj.applyMatrix4(foundMatrix);
                obj.updateMatrix();
                scene.add(obj);
            });

        });
    } else if (wwwPathToFile.toLowerCase().includes('.ifc')) {


        let ifcLoader = new IFCLoader();
        ifcLoader.setWasmPath('CadcraftForgeUtils/examples/jsm/loaders/ifc/');
        ifcLoader.load(wwwPathToFile, function (model) {

            model.name = partToReplace.name.replace('PP_', '');
            model.properties = partToReplace.properties;
            partToReplace.updateMatrixWorld();
            foundMatrix = partToReplace.matrixWorld;
            model.applyMatrix4(foundMatrix);
            model.updateMatrix();
            model.scale.set(1000, 1000, 1000);
            model.castShadow = true;
            model.receiveShadow = true;
            scene.add(model);

        });

    };


    return mesh;
};


PlaceComponents.StandardPartByMatrix = (wwwPathToFile, matrixPartName, material, scene) => {
    let allMatrix = [];
    let foundMatrix = new THREE.Matrix4();
    for (let i = 0; i < scene.children.length; i++) {
        if (scene.children[i].type === 'Mesh')
            if (scene.children[i].name === matrixPartName) {
                let foundMesh = scene.children[i];
                foundMesh.updateMatrixWorld();
                foundMatrix = foundMesh.matrixWorld;
                allMatrix.push(foundMatrix);
            }
    }

    let mesh;
    let loader = new STLLoader();
    loader.load(wwwPathToFile, (geometry) => {
        let newgeometry = new THREE.Geometry().fromBufferGeometry(geometry);


        allMatrix.forEach(function (item, index, array) {
            mesh = new THREE.Mesh(newgeometry, material);
            mesh.applyMatrix4(item);
            mesh.updateMatrix();

            mesh.castShadow = true;
            mesh.receiveShadow = true;
            scene.add(mesh);
            return mesh;
        });

    });

    return mesh;
};





PlaceComponents.Assembly = (arrayOfPartsToPlace, xPos, yPos, zPos, xRot, yRot, zRot, rotationAxisOrder = 'XYZ') => {

    let resRot = new THREE.Matrix4();
    // resRot = GetNewMatrix(xPos, yPos, zPos, xRot, yRot, zRot);
    resRot = GetComplexRotation(rotationAxisOrder, xPos, yPos, zPos, xRot, yRot, zRot)
    arrayOfPartsToPlace = arrayOfPartsToPlace.flat();
    arrayOfPartsToPlace.forEach(function (item, index, array) {
        item.applyMatrix4(resRot);
        item.updateMatrix();
        item.geometry.computeVertexNormals();
        item.receiveShadow = true;
        item.castShadow = true;
    });

    return arrayOfPartsToPlace;
};

PlaceComponents.AssemblyByMatrix = (arrayOfPartsToPlace, scene, name) => {

    let foundMatrix = new THREE.Matrix4();
    for (let i = 0; i < scene.children.length; i++) {
        if (scene.children[i].type === 'Mesh')
            if (scene.children[i].name === name) {
                let foundMesh = scene.children[i];
                foundMesh.updateMatrixWorld();
                foundMatrix = foundMesh.matrixWorld;
                break;
            }
    }
    arrayOfPartsToPlace = arrayOfPartsToPlace.flat();
    arrayOfPartsToPlace.forEach(function (item, index, array) {
        item.applyMatrix4(foundMatrix);
        item.updateMatrix();
        item.geometry.computeVertexNormals();
        item.receiveShadow = true;
        item.castShadow = true;
    });

    return arrayOfPartsToPlace;
};

//function GetNewMatrix(xPos, yPos, zPos, xRot, yRot, zRot) {
//    let translation = new THREE.Matrix4().makeTranslation(xPos, yPos, zPos);
//    let rotation1 = new THREE.Matrix4().makeRotationX(xRot * Math.PI / 180);
//    let rotation2 = new THREE.Matrix4().makeRotationY(yRot * Math.PI / 180);
//    let rotation3 = new THREE.Matrix4().makeRotationZ(zRot * Math.PI / 180);

//    let resRot = new THREE.Matrix4();
//    resRot = translation.multiply(rotation1.multiply(rotation2.multiply(rotation3)));
//    return resRot;
//};

function GetComplexRotation(rotationAxisOrder, xPos, yPos, zPos, xRot, yRot, zRot) {

    let PrimaryMatrix = new THREE.Matrix4();
    let SecondaryMatrix = new THREE.Matrix4();
    let ThirdaryMatrix = new THREE.Matrix4();
    let PrimaryAngle;
    let PrimaryVector = new THREE.Vector3();


    if (rotationAxisOrder.charAt(0).toLowerCase() === 'x') {
        PrimaryVector = new THREE.Vector3(1, 0, 0);
        PrimaryAngle = xRot * Math.PI / 180;
    }
    else if (rotationAxisOrder.charAt(0).toLowerCase() === 'y') {
        PrimaryVector = new THREE.Vector3(0, 1, 0);
        PrimaryAngle = yRot * Math.PI / 180;
    }
    else {
        PrimaryVector = new THREE.Vector3(0, 0, 1);
        PrimaryAngle = zRot * Math.PI / 180;
    }

    PrimaryMatrix.makeRotationAxis(PrimaryVector, PrimaryAngle);

    let SecondaryAngle;
    let secondaryMatrixColumnStartNo;

    if (rotationAxisOrder.charAt(1).toLowerCase() === 'x') {
        secondaryMatrixColumnStartNo = 0;
        SecondaryAngle = xRot * Math.PI / 180;
    }
    else if (rotationAxisOrder.charAt(1).toLowerCase() === 'y') {
        secondaryMatrixColumnStartNo = 4;
        SecondaryAngle = yRot * Math.PI / 180;
    }
    else {
        secondaryMatrixColumnStartNo = 8;
        SecondaryAngle = zRot * Math.PI / 180;
    }

    SecondaryMatrix.makeRotationAxis(new THREE.Vector3(PrimaryMatrix.elements[secondaryMatrixColumnStartNo], PrimaryMatrix.elements[secondaryMatrixColumnStartNo + 1], PrimaryMatrix.elements[secondaryMatrixColumnStartNo + 2]), SecondaryAngle);
    SecondaryMatrix.multiply(PrimaryMatrix);


    let thirdaryAngle;
    let thirdaryMatrixColumnStartNo;

    if (rotationAxisOrder.charAt(2).toLowerCase() === 'x') {
        thirdaryMatrixColumnStartNo = 0;
        thirdaryAngle = xRot * Math.PI / 180;
    }
    else if (rotationAxisOrder.charAt(2).toLowerCase() === 'y') {
        thirdaryMatrixColumnStartNo = 4;
        thirdaryAngle = yRot * Math.PI / 180;
    }
    else {
        thirdaryMatrixColumnStartNo = 8;
        thirdaryAngle = zRot * Math.PI / 180;
    }

    ThirdaryMatrix.makeRotationAxis(new THREE.Vector3(SecondaryMatrix.elements[thirdaryMatrixColumnStartNo], SecondaryMatrix.elements[thirdaryMatrixColumnStartNo + 1], SecondaryMatrix.elements[thirdaryMatrixColumnStartNo + 2]), thirdaryAngle);
    ThirdaryMatrix.multiply(SecondaryMatrix);

    let translation = new THREE.Matrix4().makeTranslation(xPos, yPos, zPos);
    return translation.multiply(ThirdaryMatrix);

}

export default PlaceComponents;