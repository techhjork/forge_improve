import { Features } from '../../CadcraftForgeUtils/CadcraftForgeUtils.js';


let FrameLeft = function (width, height, thickness, wallCut) {

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
    if (wallCut) {
        mesh = Features.Cut(mesh, new Features.ExtrudeBox(20, height, 50), 0, 0, -20, 0, 0, 0);
    }
   
    return mesh;
};


export default FrameLeft;