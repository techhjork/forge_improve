
import { Features } from '../../CadcraftForgeUtils/CadcraftForgeUtils.js';


let CanopyTop = function (length) {

    let shape = new THREE.Shape();
    shape.moveTo(401.24, -175.11);
    shape.lineTo(395.54, -188.18);
    shape.lineTo(0, -15.56);
    shape.lineTo(0, 0);
    shape.lineTo(401.24, -175.11);

    let extrudeSettings = {
        steps: 1,
        depth: length-20,
        bevelEnabled: false
    };


    let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    let mesh = new THREE.Mesh(geometry);






    return mesh;
};


export default CanopyTop;



 //shape = new THREE.Shape();
    //shape.moveTo(401, -175);
    //shape.lineTo(50, -1400);
    //shape.lineTo(0, -1400);
    //shape.lineTo(0, 0);
    //shape.lineTo(401, -175);


    //extrudeSettings = {
    //    steps: 1,
    //    depth: 10,
    //    bevelEnabled: false
    //};


    //let geometry2 = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    //let mesh2 = new THREE.Mesh(geometry2);

    //mesh = Features.Join(mesh, mesh2, 0, 0, length-10, 0, 0, 0);


   // shape = new THREE.Shape();
   // shape.moveTo(401.24, -175.11);
   // shape.lineTo(395.54, -188.18);
   // shape.lineTo(0, -15.56);
   // shape.lineTo(0, 0);
   // shape.lineTo(401.24, -175.11);

   //  extrudeSettings = {
   //     steps: 3,
   //     depth: length-20,
   //     bevelEnabled: false
   // };


   // let geometry3 = new THREE.ExtrudeGeometry(shape, extrudeSettings);
   // let mesh3 = new THREE.Mesh(geometry3);



   //mesh = Features.Join(mesh, mesh3, 0, 0, 10, 0, 0, 0);