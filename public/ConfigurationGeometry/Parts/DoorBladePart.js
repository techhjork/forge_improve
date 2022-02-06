import { Features } from '../../CadcraftForgeUtils/CadcraftForgeUtils.js';


let DoorBladePart = function (width, height, thickness, doorData, rightleft) {

    let shape = new THREE.Shape();
    shape.moveTo(width, 0);
    shape.lineTo(width, height);
    shape.lineTo(0, height);
    shape.lineTo(0, 0);
    shape.lineTo(width, 0);

    let extrudeSettings = {
        steps: 2,
        depth: thickness,
        bevelEnabled: false
    };

    let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    let mesh = new THREE.Mesh(geometry);

    ////glass 
    //windowDimension from Commonfunctions 

    let windowHeight;
    let windowHeight2;
    let windowCCHeight;
    let windowCCWidth;
    let windowWidth;

    if (doorData.typeOfDoor == 'a1') {
        mesh = Features.Cut(mesh, new Features.ExtrudeBox(doorData.windowDimension.windowWidth, doorData.windowDimension.windowHeight, 80), doorData.windowDimension.windowCCWidth, doorData.windowDimension.windowCCHeight, -10, 0, 0, 0);
    } else if (doorData.typeOfDoor == 'a3') {
        mesh = Features.Cut(mesh, new Features.ExtrudeBox(doorData.windowDimension.windowWidth, doorData.windowDimension.windowHeight, 80), doorData.windowDimension.windowCCWidth, doorData.windowDimension.windowCCHeight, -10, 0, 0, 0);
    } else if (doorData.typeOfDoor == 'a2') {
        mesh = Features.Cut(mesh, new Features.ExtrudeBox(doorData.windowDimension.windowWidth, doorData.windowDimension.windowHeight, 70), doorData.windowDimension.windowCCWidth, doorData.windowDimension.windowCCHeight, -10, 0, 0, 0);
        mesh = Features.Cut(mesh, new Features.ExtrudeBox(doorData.windowDimension.windowWidth, doorData.windowDimension.windowHeight2, 70), doorData.windowDimension.windowCCWidth, doorData.windowDimension.windowCCHeight + 90 + doorData.windowDimension.windowHeight, -10, 0, 0, 0);
    } else if (doorData.typeOfDoor == 'a2:1') {
        mesh = Features.Cut(mesh, new Features.ExtrudeBox(doorData.windowDimension.windowWidth, doorData.windowDimension.windowHeight, 80), doorData.windowDimension.windowCCWidth, doorData.windowDimension.windowCCHeight, -10, 0, 0, 0);

    } else if (doorData.typeOfDoor == 'ei60') {
        mesh = Features.Cut(mesh, new Features.ExtrudeBox(doorData.windowDimension.windowWidth, doorData.windowDimension.windowHeight, 70), doorData.windowDimension.windowCCWidth, doorData.windowDimension.windowCCHeight, -10, 0, 0, 0);
    } else if (doorData.typeOfDoor == 'double') {
        if (rightleft == 'right') {
            mesh = Features.Cut(mesh, new Features.ExtrudeBox(doorData.windowDimension.windowWidth, doorData.windowDimension.windowHeight, 70), doorData.windowDimension.windowCCWidth, doorData.windowDimension.windowCCHeight, -10, 0, 0, 0);
           
        } else {
            mesh = Features.Cut(mesh, new Features.ExtrudeBox(doorData.windowDimension.windowWidth, doorData.windowDimension.windowHeight, 70), doorData.windowDimension.windowCCWidth2, doorData.windowDimension.windowCCHeight, -10, 0, 0, 0);
            console.log(doorData.windowDimension.windowCCWidth2);
        }
    }       

    return mesh;
};


export default DoorBladePart;