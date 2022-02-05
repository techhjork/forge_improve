//import ThreeBSP from '../../CadcraftForgeUtils/threeCSG.js';
import { Features } from './CadcraftForgeUtils.js';

let TestPart = function (height, width, thickness, length) {

 
    let outher_mesh = new Features.Box(height, width, length);
 
   outher_mesh = Features.Cut(outher_mesh, new Features.Box(height - 2 * thickness, width - 2 * thickness, length), thickness, thickness, 0, 0, 0, 0);
 
    outher_mesh = Features.Cut(outher_mesh, new Features.DrilledHole(100, 500), height+20, width/2, 100, 0, 0, -90);

    outher_mesh = Features.Join(outher_mesh, new Features.Box(100, 100, 100), height / 2, width, 200, 0, 0, 0);

    //let arrVetors = [];
    //arrVetors.push(new THREE.Vector3(height / 4, width+100, 300));
    //arrVetors.push(new THREE.Vector3(height / 4, width + 100, 450));
    //arrVetors.push(new THREE.Vector3(height / 4, width + 100, 580));

    //outher_mesh = Features.MultipleCut(outher_mesh, new Features.DrilledHole(25, 500), arrVetors, 0, 0, 0);


    let arrAddVetors = [];
    arrAddVetors.push(new THREE.Vector3(height-20, width, 300));
    arrAddVetors.push(new THREE.Vector3(height - 20, width, 350));
    arrAddVetors.push(new THREE.Vector3(height - 20, width, 380));

    outher_mesh = Features.MultipleJoin(outher_mesh, new Features.Box(25, 25, 25), arrAddVetors, 0, 0, 0);


    return outher_mesh;

};
export default TestPart;