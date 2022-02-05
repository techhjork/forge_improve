import { Features } from '../../CadcraftForgeUtils/CadcraftForgeUtils.js';


let GlassFrame = function (width, height, thickness) {

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


   
    mesh = Features.Cut(mesh, new Features.ExtrudeBox(width-100, height-100, 80), 50, 50, -10, 0, 0, 0);


    return mesh;
};


export default GlassFrame;