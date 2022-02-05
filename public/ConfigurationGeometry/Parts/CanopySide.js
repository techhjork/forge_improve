import { Features } from '../../CadcraftForgeUtils/CadcraftForgeUtils.js';


let CanopySide = function () {

    let shape = new THREE.Shape();
    shape.moveTo(401, -175);
    shape.lineTo(50, -1400);
    shape.lineTo(0, -1400);
    shape.lineTo(0, 0);
    shape.lineTo(401, -175);


    let extrudeSettings = {
        steps: 1,
        depth: 10,
        bevelEnabled: false
    };

    let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    let mesh = new THREE.Mesh(geometry);


   


    return mesh;
};


export default CanopySide;