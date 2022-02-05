import { Features } from '../../CadcraftForgeUtils/CadcraftForgeUtils.js';


let CallBox = function (width, height, thickness) {
     

    let shape = new THREE.Shape();
    shape.moveTo(width, 0);
    shape.lineTo(width, height);
    shape.lineTo(0, height);
    shape.lineTo(0, 0);
    shape.lineTo(width, 0);

    let extrudeSettings = {
        steps: 1,
        depth: thickness,
        bevelEnabled: false
    };

    let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    let mesh = new THREE.Mesh(geometry);

 

    mesh = Features.Join(mesh, new Features.DrilledHole(50, 100), width/2, 75, 25, 90, 0, 0);

    

   

    return mesh;
};


export default CallBox;