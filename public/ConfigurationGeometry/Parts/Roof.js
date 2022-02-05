import { Features } from '../../CadcraftForgeUtils/CadcraftForgeUtils.js';


let Roof = function (width, height, length) {

    let shape = new THREE.Shape();
    shape.moveTo(width, 0);
    shape.lineTo(width, 75);
    shape.lineTo(0, 375);
    shape.lineTo(0, 0);
    shape.lineTo(width, 0);

    let extrudeSettings = {
        steps: 2,
        depth: length,
        bevelEnabled: false
    };

    let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    let mesh = new THREE.Mesh(geometry);

    return mesh;
};


export default Roof;