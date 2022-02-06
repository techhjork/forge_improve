import { PlaceComponent, Color, Functions, Features, PositionPart } from '../../CadcraftForgeUtils/CadcraftForgeUtils.js';
import CommonFunctions from '../Common/CommonFunctions.js';
import Panel from '../Parts/Panel.js'
import Glass from './Glass.js'



let Side = function (scene, panelData,color) {

    let components = [];

 

    panelData.forEach((zone, index) => {
        if (zone.zoneType == 'panel') {
            components.push(PlaceComponent.Part(new Panel(zone.zoneWidth, zone.zoneSize, 20), 0, zone.startPos, 0, 0, 0, 0, Color.GetColorByRAL(color), scene, "Panel" & index));
        } else if (zone.zoneType == 'glass') {

            components.push(PlaceComponent.Assembly(new Glass(scene, zone, color), 0, zone.startPos, 0, 0, 0, 0, 'ZYX'));

        }

    });

    return components
}

export default Side