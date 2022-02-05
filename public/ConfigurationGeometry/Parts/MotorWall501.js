import { Features } from '../../CadcraftForgeUtils/CadcraftForgeUtils.js';


let MotoWall501 = function (width, height, thickness) {



    let shape = new THREE.Shape();
    shape.moveTo(150, 0);
    shape.lineTo(150, height);
    shape.lineTo(0, height);
    shape.lineTo(0, 0);
    shape.lineTo(150, 0);

    let extrudeSettings = {
        steps: 2,
        depth: thickness,
        bevelEnabled: false
    };

    let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    let mesh = new THREE.Mesh(geometry);


    let mesh2 = Features.Box(150,height,180)

    mesh = Features.Join(mesh, mesh2, width-150, 0, 0, 0, 0, 0);
  
    return mesh;
};


export default MotoWall501;