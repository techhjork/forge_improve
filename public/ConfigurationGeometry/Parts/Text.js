import { Features } from '../../CadcraftForgeUtils/CadcraftForgeUtils.js';


let Text = function (text,height, font, scene) {
   // let mesh = Features.ExtrudeBox(width, height, length);

    let mesh = Features.Text(text, height, font, 'middlecenter', scene,0,0,0,0,0,0)


    return mesh;
};


export default Text;