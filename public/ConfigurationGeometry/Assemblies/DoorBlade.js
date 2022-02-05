import { PlaceComponent, Color, Functions, Features, PositionPart } from '../../CadcraftForgeUtils/CadcraftForgeUtils.js';
import CommonFunctions from '../Common/CommonFunctions.js';
import DoorBladePart from '../Parts/DoorBladePart.js'
import Panel from '../Parts/Panel.js'
import DoorHandle from '../Parts/DoorHandle.js'

let DoorBlade = function (scene, doorData, color,rightleft) {

    let components = [];

    //DoorBlade
    components.push(PlaceComponent.Part(new DoorBladePart(doorData.doorWidth, doorData.doorHeight, 58, doorData, rightleft), 0, 0, 0, 0, 0, 0, Color.GetColorByRAL(color), scene, "Door"));

      
    //Windows/Glass
    if (doorData.typeOfDoor == 'a2') {
        components.push(PlaceComponent.Part(new Panel(doorData.windowDimension.windowWidth, doorData.windowDimension.windowHeight, 20), doorData.windowDimension.windowCCWidth, doorData.windowDimension.windowCCHeight, 20, 0, 0, 0, Color.SmookeGlass(), scene, "Glass"));
        components.push(PlaceComponent.Part(new Panel(doorData.windowDimension.windowWidth, doorData.windowDimension.windowHeight2, 20), doorData.windowDimension.windowCCWidth, doorData.windowDimension.windowCCHeight + 90 + doorData.windowDimension.windowHeight, 20, 0, 0, 0, Color.SmookeGlass(), scene, "Glass"));
    } else if (doorData.typeOfDoor == 'double') {
        if (rightleft == 'right') {
            components.push(PlaceComponent.Part(new Panel(doorData.windowDimension.windowWidth, doorData.windowDimension.windowHeight, 20), doorData.windowDimension.windowCCWidth, doorData.windowDimension.windowCCHeight, 20, 0, 0, 0, Color.SmookeGlass(), scene, "Glass"));
        } else {
            components.push(PlaceComponent.Part(new Panel(doorData.windowDimension.windowWidth, doorData.windowDimension.windowHeight, 20), doorData.windowDimension.windowCCWidth2, doorData.windowDimension.windowCCHeight, 20, 0, 0, 0, Color.SmookeGlass(), scene, "Glass"));

        }

    } else {
        components.push(PlaceComponent.Part(new Panel(doorData.windowDimension.windowWidth, doorData.windowDimension.windowHeight, 20), doorData.windowDimension.windowCCWidth, doorData.windowDimension.windowCCHeight, 20, 0, 0, 0, Color.SmookeGlass(), scene, "Glass"));
    }

    //Handle
    if (rightleft == 'right') {
        components.push(PlaceComponent.Part(new DoorHandle(63, doorData.handleDimension.doorHandleHeight), 50, doorData.handleDimension.doorHandleCCHeight, 58, 90, 90, 180, Color.Aluminium(), scene, "Handle", 'ZXY'));
    } else {
        components.push(PlaceComponent.Part(new DoorHandle(63, doorData.handleDimension.doorHandleHeight), doorData.doorWidth - 50, doorData.handleDimension.doorHandleCCHeight, 58, 90, 90, 180, Color.Aluminium(), scene, "Handle", 'ZXY'));
    }

    return components
}

export default DoorBlade