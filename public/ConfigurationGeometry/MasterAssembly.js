import { PlaceComponent, Color, Functions, Features, PositionPart } from '../CadcraftForgeUtils/CadcraftForgeUtils.js';
import CommonFunctions from './Common/CommonFunctions.js';
import Side from './Assemblies/Side.js'
import Door from './Assemblies/Door.js'
import MotorWall from './Parts/MotorWall.js'
import MotorWall501 from './Parts/MotorWall501.js'
import Ramp from './Parts/Ramp.js'
import Roof from './Parts/Roof.js'
import Floor from './Parts/Floor.js'
import Text from './Parts/Text.js'
import ElectricBox from './Parts/ElectricBox.js'
import TestPart from '../CadcraftForgeUtils/TestPart.js'


let scene;
let camera;
let font;
let elevatorData;

let StartConfiguration = function (params, _scene, _camera) {
    scene = _scene;
    camera = _camera;
    Functions.ClearScene(scene);
    
    //Skapa JavaObject  med all info 
    elevatorData = CommonFunctions.CreateElevatorData(params)
    //Rita upp hiss  Function 
    createElevator();

    
    //TestPart
  //PlaceComponent.Part(new TestPart(   1000, 1000, 550,2000), 0, 0, 0, 0, 0, 0, Color.Red(), scene, "Floor")
   
};


function createElevator() {
    console.log('elevatorData', elevatorData)

    PlaceSide();
    PlaceDoor()
    PlaceRamp()
    PlaceRoof()
    PlaceFloor()
    PlaceElectricBox()





}

function PlaceElectricBox() {
    let componets = [];

    let setElectricBoxSide = elevatorData.baseData.electricBoxSide;
    let SetElectricBoxFloorNo = elevatorData.baseData.electricBoxFloorNo;
    let electricSide;
    let electricPlacementHeight;
    let ceilingHeight;

    elevatorData.doorData.forEach((door, index) => {
        if (index == SetElectricBoxFloorNo) {
            electricPlacementHeight = door.liftHeight;
            ceilingHeight = door.ceilingHeight;
        }

    });

    electricSide = setElectricBoxSide;

    let postionX;
    let postionY;
    let postionZ;
    let angleY;

    if (electricSide == 'a') {
        postionX = 20;
        postionY = electricPlacementHeight;
        postionZ = 2;
        angleY = 0
    } else if (electricSide == 'b') {
        postionX = elevatorData.baseData.widthOfElevator+2;
        postionY = electricPlacementHeight;
        postionZ = -20
        angleY = 90;
    } else if (electricSide == 'c') {
        postionX = 20;
        postionY = electricPlacementHeight;
        postionZ = -elevatorData.baseData.lengthOfElevator - 20;
        angleY = 0
    } 

    let electricBoxHeight;

    if (elevatorData.baseData.standard == 'pl501') {
        if (ceilingHeight >= 2300) {
            electricBoxHeight = 2300;
        } else {
            electricBoxHeight = ceilingHeight;
        }

        
    } else {
        electricBoxHeight = 2020;
    }

    PlaceComponent.Part(new ElectricBox(135, electricBoxHeight, 20), postionX, postionY, postionZ, 0, angleY, 0, Color.Aluminium(), scene, "ElectricBox");

    return componets
}

function PlaceFloor() {
    let componets = [];
    PlaceComponent.Part(new Floor(elevatorData.baseData.widthOfElevator + 1750, 50, elevatorData.baseData.lengthOfElevator+2000 ), -1750 / 2, -50, -elevatorData.baseData.lengthOfElevator-(2000/2) , 0, 0, 0, Color.SandColor(), scene, "Floor");


    PlaceComponent.Part(new Text('Side A', 100, font, scene), elevatorData.baseData.widthOfElevator/2, 10, 700, -90, 0, 90, Color.Black(), scene, "Text");

    PlaceComponent.Part(new Text('Side B',100,font,scene), elevatorData.baseData.widthOfElevator +500, 10, -elevatorData.baseData.lengthOfElevator/2, -90, 0, 90, Color.Black(), scene, "Text");

    PlaceComponent.Part(new Text('Side C', 100, font, scene), elevatorData.baseData.widthOfElevator/2, 10, -elevatorData.baseData.lengthOfElevator - 700, -90, 0, 90, Color.Black(), scene, "Text");

    PlaceComponent.Part(new Text('Side D', 100, font, scene), -500, 10, -elevatorData.baseData.lengthOfElevator/2, -90, 0, 90, Color.Black(), scene, "Text");

    return componets
}

function PlaceSide() {
    let componets = [];
    let pitCompantion = 0;

    if (elevatorData.baseData.pits) {
        pitCompantion = -elevatorData.baseData.pitsHeight;
    }


    let color = elevatorData.baseData.colorelevator;
 //   console.log(color);

    // Place A Side 
    PlaceComponent.Assembly(new Side(scene, elevatorData.panelData.aCompleteCombinePanel, color), 0, pitCompantion, -elevatorData.baseData.elevatorWallThickness, 0, 0, 0, 'ZYX');
    //Place B Side
    PlaceComponent.Assembly(new Side(scene, elevatorData.panelData.bCompleteCombinePanel, color), elevatorData.baseData.widthOfElevator - elevatorData.baseData.elevatorWallThickness, pitCompantion, -elevatorData.baseData.elevatorWallThickness, 0, 90, 0, 'ZYX');
    //Place C Side
    PlaceComponent.Assembly(new Side(scene, elevatorData.panelData.cCompleteCombinePanel, color), elevatorData.baseData.widthOfElevator, pitCompantion, -elevatorData.baseData.lengthOfElevator + elevatorData.baseData.elevatorWallThickness, 0, 180, 0, 'ZYX');
    //Place D Side
    PlaceComponent.Assembly(new Side(scene, elevatorData.panelData.dCompleteCombinePanel, color), elevatorData.baseData.elevatorWallThickness, pitCompantion, -elevatorData.baseData.lengthOfElevator + elevatorData.baseData.elevatorWallThickness, 0, -90, 0, 'ZYX');

    //Place MotorWall
    if (elevatorData.baseData.standard == 'pl501') {
        PlaceComponent.Part(new MotorWall501(elevatorData.baseData.lengthOfElevator - 40, elevatorData.baseData.totalHeight, 180), elevatorData.baseData.elevatorWallThickness, 0, -elevatorData.baseData.elevatorWallThickness, 0, 90, 0, Color.SandColor(), scene, "MotorWall");
    } else {
        PlaceComponent.Part(new MotorWall(elevatorData.baseData.lengthOfElevator - 40, elevatorData.baseData.totalHeight, 10), elevatorData.baseData.motorSpace, 0, -elevatorData.baseData.elevatorWallThickness, 0, 90, 0, Color.SandColor(), scene, "MotorWall");
    }
   
    return componets

}

function PlaceRoof() {
    let componets = [];
    let pitHeight = 0;
    let postionX;
    let postionY;
    let postionZ;
    let angleY;
    let roofWidth;
    let roofLength;

 
       
    if (elevatorData.baseData.outerRoof) {

        if (elevatorData.baseData.outerRoofSide == 'a') {
            postionX = 0;
            postionZ = 0;
            angleY = 90;
            roofWidth = elevatorData.baseData.lengthOfElevator;
            roofLength = elevatorData.baseData.widthOfElevator;
        } else if (elevatorData.baseData.outerRoofSide == 'b') {
            postionX = elevatorData.baseData.widthOfElevator;
            postionZ = 0;
            angleY = 180;
            roofWidth = elevatorData.baseData.widthOfElevator;
            roofLength = elevatorData.baseData.lengthOfElevator;
        } else if (elevatorData.baseData.outerRoofSide == 'c') {
            postionX = elevatorData.baseData.widthOfElevator;
            postionZ = -elevatorData.baseData.lengthOfElevator;
            angleY = -90;
            roofWidth = elevatorData.baseData.lengthOfElevator;
            roofLength = elevatorData.baseData.widthOfElevator;
        } else if (elevatorData.baseData.outerRoofSide == 'd') {
            postionX = 0;
            postionZ = -elevatorData.baseData.lengthOfElevator;
            angleY = 0;
            roofWidth = elevatorData.baseData.widthOfElevator;
            roofLength = elevatorData.baseData.lengthOfElevator;
        }

        PlaceComponent.Part(new Roof(roofWidth, 375, roofLength), postionX, elevatorData.baseData.totalHeight, postionZ, 0, angleY, 0, Color.SandColor(), scene, "Roof");


     }

    return componets

}




function PlaceDoor() {
    let componets = [];
    let pitHeight = 0;
    let postionX;
    let postionY;
    let postionZ;
    let angleY;

    let color = elevatorData.baseData.colordoor;

    elevatorData.doorData.forEach((door, index) => {

        if (door.doorSide == 'a') {
             postionX = 0
            postionZ = -elevatorData.baseData.elevatorWallThickness-30;
             angleY =0
        } else if (door.doorSide == 'b') {
            postionX = elevatorData.baseData.widthOfElevator - elevatorData.baseData.elevatorWallThickness-30;
            postionZ = -elevatorData.baseData.elevatorWallThickness;
            angleY = 90;
        } else if (door.doorSide == 'c') {
            postionX = elevatorData.baseData.widthOfElevator;
            postionZ = -elevatorData.baseData.lengthOfElevator + elevatorData.baseData.elevatorWallThickness+30;
            angleY = 180
        } else if (door.doorSide == 'd') {
            postionX = elevatorData.baseData.elevatorWallThickness+30;
            postionZ = -elevatorData.baseData.lengthOfElevator + elevatorData.baseData.elevatorWallThickness;
            angleY = -90;
        }


        // Place Door 
        if (index == 0 && elevatorData.baseData.pits == false) {
            pitHeight = elevatorData.baseData.pitsHeight;
            PlaceComponent.Assembly(new Door(scene, door, color), postionX, door.liftHeight + pitHeight, postionZ, 0, angleY, 0, 'ZYX');
        } else {
            PlaceComponent.Assembly(new Door(scene, door, color), postionX, door.liftHeight, postionZ, 0, angleY, 0, 'ZYX');
        }


    });

    return componets

}


function PlaceRamp() {
    let componets = [];
    let pitHeight = 0;
    let rampLength;
    let postionX;
    let postionY;
    let postionZ;
    let angleY;

    elevatorData.doorData.forEach((door, index) => {

        if (door.doorSide == 'a') {
            postionX = elevatorData.baseData.widthOfElevator;
            postionZ = 0;
            angleY = -90;
            rampLength = elevatorData.baseData.widthOfElevator;
        } else if (door.doorSide == 'b') {
            postionX = elevatorData.baseData.widthOfElevator
            postionZ = - elevatorData.baseData.lengthOfElevator;
            angleY = 0;
            rampLength = elevatorData.baseData.lengthOfElevator;
        } else if (door.doorSide == 'c') {
            postionX = 0;
            postionZ = -elevatorData.baseData.lengthOfElevator ;
            angleY = 90;
            rampLength = elevatorData.baseData.widthOfElevator;
            
        } else if (door.doorSide == 'd') {
            postionX = 0;
            postionZ = 0;
            angleY = 180;
            rampLength = elevatorData.baseData.lengthOfElevator;
        }


        // Place Door 
        if (index == 0 && elevatorData.baseData.pits == false) {
            pitHeight = elevatorData.baseData.pitsHeight;
            PlaceComponent.Part(new Ramp(500, pitHeight, rampLength), postionX, 0, postionZ, 0, angleY, 0, Color.SandColor(), scene, "Ramp");

        }


    });

    return componets

}


let SetFont = function (_font) {
    font = _font;
};





export {SetFont, StartConfiguration };