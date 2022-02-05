import { PlaceComponent, Color, Functions, Features, PositionPart } from '../../CadcraftForgeUtils/CadcraftForgeUtils.js';
import CommonFunctions from '../Common/CommonFunctions.js';
import FrameLeft from '../Parts/FrameLeft.js'
import FrameRight from '../Parts/FrameRight.js'
import FrameTop from '../Parts/FrameTop.js'
import DoorCloser from '../Parts/DoorCloser.js'
import CallBox from '../Parts/CallBox.js'
import CanopySide from '../Parts/CanopySide.js'
import DoorBlade from './DoorBlade.js'
import Canopy from './Canopy.js'
import TestPart from '../../CadcraftForgeUtils/TestPart.js'





let Door = function (scene,doorData,color) {

    let components = [];

    let elevatorType = doorData.elevatorStandard;
    let leftframeWidth;
    let rightframeWidth;
    let doubleDimension = 0;
    let dimensionHingeSide = 0;
    let doorFrameDimension;
    let machineDoorFrameDimension;
    let wallCut;
    //Karm / Överstycke / Sida / standard / dörr / glass / hissknapp / dörrstängare 

    //Default framevalue  
    if (elevatorType == 'pl501') {
        doorFrameDimension = 220;
        machineDoorFrameDimension = 240;
    } else if (elevatorType == 'pl400') {
        doorFrameDimension = 220;
        machineDoorFrameDimension = 280;
    } else if (elevatorType == 'pl500') {
        doorFrameDimension = 220;
        machineDoorFrameDimension = 280;
    } else if (elevatorType == 'pl400 halfdoor') {
        doorFrameDimension = 220;
        machineDoorFrameDimension = 280;
    } else if (elevatorType == 'gl800') {
        doorFrameDimension = 220;
        machineDoorFrameDimension = 380;
    } else if (elevatorType == 'gl1000') {
        doorFrameDimension = 220;
        machineDoorFrameDimension = 380;
    } else {
        doorFrameDimension = 220;
        machineDoorFrameDimension = 285;
    }


    // DoorHingeDimension
    if (doorData.doorSide == 'a') {
       // console.log('doorHinge', doorData.doorHinge);
        if (doorData.doorHinge == 'right') {
            dimensionHingeSide = 0;
            //console.log('doorHinge', doorData.doorHinge );
        } else {
            dimensionHingeSide = 60;
        }
        wallCut = true;


    } else if (doorData.doorSide == 'c') {
        if (doorData.doorHinge == 'right') {
            dimensionHingeSide = 60;
        } else {
            dimensionHingeSide = 0;
        }
        wallCut = true;
    } else {
        dimensionHingeSide = 0;
        wallCut = false;
    }
    //Doubel Dimension
    //if (doorData.typeOfDoor == 'double') {
    //    doubleDimension = 60;
    //}

  
    switch (doorData.doorSide) {
        case "a":
            leftframeWidth = machineDoorFrameDimension - dimensionHingeSide;
            rightframeWidth = doorData.zoneWidth - doorData.doorFrameWidth - machineDoorFrameDimension - doubleDimension  + dimensionHingeSide ;
            break;
        case "b":
            leftframeWidth = (doorData.zoneWidth - doorData.doorFrameWidth  - doubleDimension)/2;
            rightframeWidth = leftframeWidth;

            break;
        case "c":
            leftframeWidth = doorData.zoneWidth - doorData.doorFrameWidth- machineDoorFrameDimension - doubleDimension + dimensionHingeSide;
            rightframeWidth = machineDoorFrameDimension - dimensionHingeSide;
            break;
        case "d":
            leftframeWidth = (doorData.zoneWidth - doorData.doorFrameWidth  - doubleDimension) / 2;
            rightframeWidth = leftframeWidth;
            break;
        
    }

    //Frame
    //LeftFrame
    components.push(PlaceComponent.Part(new FrameLeft(leftframeWidth, doorData.doorHeight, 50, wallCut), 0, 0, 0, 0, 0, 0, Color.GetColorByRAL(color), scene, "Door"));
    //RightFrame
    components.push(PlaceComponent.Part(new FrameRight(rightframeWidth, doorData.doorHeight, 50, wallCut), leftframeWidth + doorData.doorFrameWidth , 0, 0, 0, 0, 0, Color.GetColorByRAL(color), scene, "Door"));
    //TopFrame
    if (doorData.typeOfDoor != 'a2:1') {
        components.push(PlaceComponent.Part(new FrameTop(doorData.zoneWidth, doorData.ceilingHeight - doorData.doorHeight, 50, wallCut), 0, doorData.doorHeight, 0, 0, 0, 0, Color.GetColorByRAL(color), scene, "Door"));
    }

   

    //DoorBlade
    if (doorData.typeOfDoor != 'double') {

        if (doorData.doorHinge == 'right') {
            components.push(PlaceComponent.Assembly(new DoorBlade(scene, doorData, color, doorData.doorHinge), leftframeWidth - 9, 0, 0, 0, 0, 0, 'ZYX'));
        } else {
            components.push(PlaceComponent.Assembly(new DoorBlade(scene, doorData, color, doorData.doorHinge), leftframeWidth + 4, 0, 0, 0, 0, 0, 'ZYX'));
        }
    } else {
      
        components.push(PlaceComponent.Assembly(new DoorBlade(scene, doorData, Color.GetColorByRAL(color),'left'), leftframeWidth + 4, 0, 0, 0, 0, 0, 'ZYX'));
        components.push(PlaceComponent.Assembly(new DoorBlade(scene, doorData, Color.GetColorByRAL(color),'right'), leftframeWidth - 9-5 + doorData.doorWidth, 0, 0, 0, 0, 0, 'ZYX'));

    }

    //DoorCloser 

    if (doorData.doorCloser) {

        if (doorData.typeOfDoor != 'double') {

            if (doorData.doorHinge == 'right') {
                components.push(PlaceComponent.Part(new DoorCloser(525, 100, 105), leftframeWidth + doorData.doorFrameWidth - doorData.doorCloserDimension.doorCloserCCWidth, doorData.doorCloserDimension.doorCloserCCHeight, 50, 0, 0, 0, Color.Green(), scene, "DoorCloser"));

            } else {
                components.push(PlaceComponent.Part(new DoorCloser(525, 100, 105), leftframeWidth + doorData.doorCloserDimension.doorCloserCCWidth - 525, doorData.doorCloserDimension.doorCloserCCHeight, 50, 0, 0, 0, Color.Green(), scene, "DoorCloser"));
            }
        } else {
            components.push(PlaceComponent.Part(new DoorCloser(525, 100, 105), leftframeWidth + doorData.doorFrameWidth - 550, doorData.doorCloserDimension.doorCloserCCHeight, 50, 0, 0, 0, Color.Green(), scene, "DoorCloser"));
            components.push(PlaceComponent.Part(new DoorCloser(525, 100, 105), leftframeWidth + 550 - 525, doorData.doorCloserDimension.doorCloserCCHeight, 50, 0, 0, 0, Color.Green(), scene, "DoorCloser"));
        }
    }

   
    //CallBox

    if (doorData.callBox) {

        if (doorData.doorHinge == 'right') {
            components.push(PlaceComponent.Part(new CallBox(80, 220, 10), leftframeWidth - 80 - 18, 897, 50, 0, 0, 0, Color.SandColor(), scene, "CallBox"));
        } else {
            components.push(PlaceComponent.Part(new CallBox(80, 220, 10), leftframeWidth + doorData.doorFrameWidth + 18, 897, 50, 0, 0, 0, Color.SandColor(), scene, "CallBox"));
            }
    }

    // Canopy 
    if (doorData.canopy) {
        components.push(PlaceComponent.Assembly(new Canopy(scene, doorData, color), doorData.zoneWidth, doorData.ceilingHeight, 50, 0, -90, 0, 'XYZ'));
    }


    return components
}

export default Door