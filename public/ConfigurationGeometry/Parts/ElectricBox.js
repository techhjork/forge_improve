import { Features } from '../../CadcraftForgeUtils/CadcraftForgeUtils.js';


let ElectricBox = function (width, height, thickness) {

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

    return mesh;
};


export default ElectricBox;