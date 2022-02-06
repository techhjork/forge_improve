import { Features } from '../../CadcraftForgeUtils/CadcraftForgeUtils.js';


let Floor = function (width,height,length) {

    let mesh = Features.ExtrudeBox(width, height, length);

    


    return mesh;
};



export default Floor;