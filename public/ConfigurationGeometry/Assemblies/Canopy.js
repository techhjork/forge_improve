import { PlaceComponent, Color, Functions, Features, PositionPart } from '../../CadcraftForgeUtils/CadcraftForgeUtils.js';
import CommonFunctions from '../Common/CommonFunctions.js';
import CanopySide from '../Parts/CanopySide.js'
import CanopyTop from '../Parts/CanopyTop.js'


let Canopy = function (scene, doorData, color) {

    let components = [];

    //Side
    components.push(PlaceComponent.Part(new CanopySide(), 0, 0, 0, 0, 0, 0, Color.GetColorByRAL(color), scene, "CanopySide"));
    components.push(PlaceComponent.Part(new CanopySide(), 0, 0, doorData.zoneWidth - 10, 0, 0, 0, Color.GetColorByRAL(color), scene, "CanopySide2"));
    //Top
    components.push(PlaceComponent.Part(new CanopyTop(doorData.zoneWidth), 0, 0, 10, 0, 0, 0, Color.GetColorByRAL(color), scene, "CanopyTop"));



    return components
}

export default Canopy