import { Color } from '../../CadcraftForgeUtils/CadcraftForgeUtils.js';


let CommonFunctions = {};
let zones;
let aDoors;
let bDoors;
let cDoors; 
let aZones;
let bZones;
let cZones;
let dZones;
let aWindows;
let bWindows;
let cWindows;
let dWindows;

let aComplete;
let bComplete;
let cComplete;
let dComplete;

let aCompleteCombinePanel;
let bCompleteCombinePanel;
let cCompleteCombinePanel;
let dCompleteCombinePanel;

let zoneList;

CommonFunctions.CreateElevatorData = (params) => {

    let elevatorData = {
        baseData: GetBaseData(params),
        doorData: GetDoorData(params.doorData,params),
        levelData: params.levelData,
        optionData: params.optionData,
        panelData: {}
    };

    //Create zones
        zones = GetZones(params)
    // console.log('zones', zones);

    //Create Doorlist / Side
        aDoors = GetDoorList(params, 'a');
        bDoors = GetDoorList(params, 'b');
        cDoors = GetDoorList(params, 'c');
   
    //Combine DoorSide with zones
        aZones = CombineList('a')
        bZones = CombineList('b')
        cZones = CombineList('c')
        dZones = CombineList('d')
        //console.log('aZones', aZones)

    //Create Windowslist / Side
        aWindows = GetWindowsList(params, 'a')
        bWindows = GetWindowsList(params, 'b')
        cWindows = GetWindowsList(params, 'c')
        dWindows = GetWindowsList(params, 'd')
    // console.log('aWindows', aWindows)

    //Create Windows and DoorZones / Side
    aComplete = CombineZoneAndGlassList('a')
        bComplete = CombineZoneAndGlassList('b')
        cComplete = CombineZoneAndGlassList('c')
        dComplete = CombineZoneAndGlassList('d')
       // console.log('aComplete', aComplete)

    //Create BigPanel
    aCompleteCombinePanel = createBigPanel('a', params)
    bCompleteCombinePanel = createBigPanel('b', params)
    cCompleteCombinePanel = createBigPanel('c', params)
    dCompleteCombinePanel = createBigPanel('d', params)

    console.log('bCompleteCombinePanel', bCompleteCombinePanel)

   elevatorData.panelData.aCompleteCombinePanel = aCompleteCombinePanel;
   elevatorData.panelData.bCompleteCombinePanel = bCompleteCombinePanel;
   elevatorData.panelData.cCompleteCombinePanel = cCompleteCombinePanel;
   elevatorData.panelData.dCompleteCombinePanel = dCompleteCombinePanel;

  
    //CombineZoneAndGlassList
     

    return elevatorData

};

function GetDoorData(doorData,params) {
    let returnArray = [];
    let zoneWidth;
    let doorFrameWidth;
    let doorWidth;
    let ceilingHeight;
    let doorHeight;

    doorData.forEach((door, index) => {

        if (door.doorSide == 'a' || door.doorSide == 'c') {
            zoneWidth = GetWidthOfElevator(params);
        } else {
            zoneWidth = GetLengthOfElevator(params)-40;
        }

        if (door.typeOfDoor == 'double') {
            doorFrameWidth = door.doorSize + 120;
            doorWidth = (door.doorSize + 120)/2+5
        } else {
            doorFrameWidth = door.doorSize + 60;
            doorWidth = door.doorSize + 65;
        }

        if (door.typeOfDoor == 'a2:1') {
            ceilingHeight = 1100;
        } else {
            ceilingHeight = door.doorHeight + GetFrameHeight(params);
        }

        if (door.typeOfDoor == 'a2:1') {
            doorHeight = 1100;
        } else {
            doorHeight = door.doorHeight;
        }


        let currentDoordata = {
            elevatorStandard: params.elevatorStandard,
            liftHeight: door.liftHeight,
            doorSide: door.doorSide,
            typeOfDoor: door.typeOfDoor,
            doorHinge: door.doorHinge,
            doorHeight: doorHeight,
            doorSize: door.doorSize,
            doorCloser: door.doorCloser,
            canopy: door.canopy,
            callBox: door.callBox,
            ceilingHeight: ceilingHeight,
            zoneWidth: zoneWidth,
            doorFrameWidth: doorFrameWidth,
            doorWidth: doorWidth,
            windowDimension: GetWindowDimension(door),
            handleDimension: GetDoorHandleDimension(door),
            doorCloserDimension: DoorCloserDimension(door)
        }
        returnArray.push(currentDoordata);

    });

        return returnArray

}


function GetBaseData(params) {

    let baseData = {
        designer: params.designer,
        orderNumber: params.orderNumber,
        orderName: params.orderName,
        company: params.company,
        location: params.location,
        logo: params.logo,
        languageOptions: params.languageOptions,
        maximumWeight: GetMaximumWeight(params),
        load: GetLoad(params),
        clearArea: GetClearArea(params),
        elevatorWallThickness: 20,

        standard: params.standard,
        numberOfFloor: params.numberOfFloor,
        liftHeight: GetLiftHeight(params),
        totalHeight: GetTotalHeight(params),
        lengthOfCar: params.lengthOfCar,
        widthOfCar: params.widthOfCar,
        widthOfElevator: GetWidthOfElevator(params),
        lengthOfElevator: GetLengthOfElevator(params),
        shaftLength: GetShaftLength(params),
        shaftWidth: GetShaftWidth(params),

        doorDefaultHeight: GetDoorDefaultHeight(params),
        motorSpace: GetMotorSpace(params),

        pits: params.pits,
        pitsHeight: params.pitsHeight,
        zoneSectionStart: params.zoneSectionStart,
        heightAboveTopElevator: params.heightAboveTopElevator,
        heightFrame: GetFrameHeight(params),

        electricBoxSide: GetElectricBoxData(params).electricBoxSide,
        electricBoxFloorNo: GetElectricBoxData(params).electricBoxFloorNo,
        electricBoxdefault: params.electricBoxdefault,

        outerRoof: params.outerRoof,
        outerRoofSide: params.outerRoofSide,
        windowsSectionA: params.windowsSectionA,
        windowsSectionB: params.windowsSectionB,
        windowsSectionC: params.windowsSectionC,
        windowsSectiond: params.windowsSectionD,
        defaultDoorSize: params.defaultDoorSize,
        colorelevator: params.colorelevator,
        colordoor: params.colordoor,
        colorelevatoroptions: params.colorelevatoroptions,
        colordooroptions: params.colordooroptions

    }

    console.log('commonfunctions', params.colorelevator)

    //widthofelevator
    //lengthofelevator
    //shaftwidth
    //shaftlength


    return baseData
}


function GetElectricBoxData(params){

    let currentElectricBoxData;

    let setElectricBoxSide;
    let SetElectricBoxFloorNo;
    let electricSide;

    //electricBoxSide: params.electricBoxSide,
    //    electricBoxFloorNo: params.electricBoxFloorNo,
    //        electricBoxdefault: params.electricBoxdefault,

    if (!params.electricBoxdefault) {


        if (params.standard != 'pl400 halfdoor') {
            SetElectricBoxFloorNo = params.numberOfFloor - 1
        } else {
            SetElectricBoxFloorNo = 0
        }

        params.doorData.forEach((door, index) => {
            if (index == SetElectricBoxFloorNo) {
                setElectricBoxSide = door.doorSide;
            }

        });

    } else {
        setElectricBoxSide = params.electricBoxSide;

        if (params.standard == 'pl501') {
            SetElectricBoxFloorNo = params.numberOfFloor - 1
        } else {
            SetElectricBoxFloorNo = params.electricBoxFloorNo;
        }
    }


    if (params.standard == 'pl501') {
        if (setElectricBoxSide == 'b') {
            setElectricBoxSide = 'a';
        }
    }

    if (setElectricBoxSide == 'd') {
        setElectricBoxSide = 'b';
    }


    let electricPlacementHeight;
    let ceilingHeight;

    params.doorData.forEach((door, index) => {
        if (index == SetElectricBoxFloorNo) {
            electricPlacementHeight = door.liftHeight;
            //ceilingHeight = door.ceilingHeight;
        }

    });

    currentElectricBoxData = {
        electricBoxSide: setElectricBoxSide,
        electricBoxFloorNo: SetElectricBoxFloorNo,

    }

    return currentElectricBoxData

}

function DoorCloserDimension(doorData) {

    let currentdoorCloserData;
    let doorCloserCCHeight;
    let doorCloserCCWidth;
   

    if (doorData.typeOfDoor == 'a2:1') {
        doorCloserCCHeight = 100;
        doorCloserCCWidth = 650;
       
    } else {
        doorCloserCCHeight = doorData.doorHeight+25;
        doorCloserCCWidth = 550;

    }

    currentdoorCloserData = {
        doorCloserCCHeight: doorCloserCCHeight,
        doorCloserCCWidth: doorCloserCCWidth,
       
    }

    return currentdoorCloserData


}


function GetDoorHandleDimension(doorData) {

    let currentHandledata;
    let doorHandleCCHeight;
    let doorHandleHeight;
    let doorHandleCCWidth;

    if (doorData.typeOfDoor == 'a2:1') {
        doorHandleCCHeight = 1050;
        doorHandleHeight = 250;
        doorHandleCCWidth = 50;
    } else {
        doorHandleCCHeight = 1588;
        doorHandleHeight = 1200;
        doorHandleCCWidth = 50;

    }

    currentHandledata = {
        doorHandleCCHeight: doorHandleCCHeight,
        doorHandleHeight: doorHandleHeight,
        doorHandleCCWidth: doorHandleCCWidth
    }

    return currentHandledata

   
}


function GetWindowDimension(doorData) {

    let currentWindowsdata;
    let windowHeight;
    let windowHeight2 = 0;
    let windowCCHeight;
    let windowWidth;
    let windowCCWidth;
    let windowCCWidth2 = 0;

    if (doorData.typeOfDoor == 'a1') {
        windowHeight = 600;
        windowWidth = 75;
        windowCCHeight = 1160;
        if (doorData.doorHinge == 'right') {
            windowCCWidth = 269;
        } else {
            windowCCWidth = (doorData.doorSize + 65) - 260 - 9 - windowWidth;
        }

    } else if (doorData.typeOfDoor == 'a3') {
        windowHeight = 1580;
        windowCCHeight = 260;

        if (doorData.doorSize <= 900) {
            windowWidth = doorData.doorSize - 255;
        } else {
            windowWidth = 645;
        }

        if (doorData.doorSize > 900) {
            if (doorData.doorHinge == 'right') {
                windowCCWidth = ((doorData.doorSize + 60) + 1 + - windowWidth)/2;
            } else {
                windowCCWidth = (doorData.doorSize + 65) - windowWidth - ((doorData.doorSize + 60) + 1 + - windowWidth) / 2;
            }

        } else {
            if (doorData.doorHinge == 'right') {
                windowCCWidth = 137;
            } else {
                windowCCWidth = (doorData.doorSize + 65) - 137 - windowWidth;
            }
        }
    } else if (doorData.typeOfDoor == 'a2') {
        windowHeight = 550;
        windowHeight2 = 950;
        windowCCHeight = 260;
        if (doorData.doorSize <= 900) {
            windowWidth = doorData.doorSize - 255;
        } else {
            windowWidth = 645;
        }

        if (doorData.doorSize > 900) {
            if (doorData.doorHinge == 'right') {
                windowCCWidth = ((doorData.doorSize + 60) + 1 + - windowWidth) / 2;
            } else {
                windowCCWidth = (doorData.doorSize + 65) - windowWidth - ((doorData.doorSize + 60) + 1 + - windowWidth) / 2;
            }

        } else {
            if (doorData.doorHinge == 'right') {
                windowCCWidth = 137;
            } else {
                windowCCWidth = (doorData.doorSize + 65) - 137 - windowWidth;
            }
        }

    } else if (doorData.typeOfDoor == 'a2:1') {
        windowHeight = 650;
        windowCCHeight = 260;

        if (doorData.doorSize <= 900) {
            windowWidth = doorData.doorSize - 255;
        } else {
            windowWidth = 645;
        }

        if (doorData.doorSize > 900) {
            if (doorData.doorHinge == 'right') {
                windowCCWidth = ((doorData.doorSize + 60) + 1 + - windowWidth) / 2;
            } else {
                windowCCWidth = (doorData.doorSize + 65) - windowWidth - ((doorData.doorSize + 60) + 1 + - windowWidth) / 2;
            }

        } else {
            if (doorData.doorHinge == 'right') {
                windowCCWidth = 137;
            } else {
                windowCCWidth = (doorData.doorSize + 65) - 137 - windowWidth;
            }
        }
    } else if (doorData.typeOfDoor == 'ei60') {
        windowHeight = 900;
        windowWidth = 125;
        windowCCHeight = 850;
        if (doorData.doorHinge == 'right') {
            windowCCWidth =( doorData.doorSize + 60 )/ 2 - windowWidth / 2 + 9;
        } else {
            windowCCWidth = doorData.doorSize + 65 - 9 - (doorData.doorSize + 60) / 2 - windowWidth / 2;
        }
    } else if (doorData.typeOfDoor == 'double') {
        windowHeight = 600;
        windowWidth = 75;
        windowCCHeight = 1160;
        windowCCWidth = 269
        windowCCWidth2 = ((doorData.doorSize + 120)/2+5) - 260 - 9 - windowWidth;
       
        
       
    }


     
        currentWindowsdata = {
            windowHeight: windowHeight,
            windowWidth: windowWidth,
            windowCCHeight: windowCCHeight,
            windowCCWidth: windowCCWidth,
            windowCCWidth2: windowCCWidth2,
            windowHeight2: windowHeight2
           
        }

    return currentWindowsdata


}

function createBigPanel(side,params) {
    let returnArray = [];
    let completeList;
    let currentZonedata;
    let startPos;
    let endPos;
    let zoneWidth;

    if (side == 'a') {
        completeList = aComplete
        zoneWidth = GetWidthOfElevator(params);
    } else if (side == 'b') {
        zoneList = bZones
        completeList = bComplete
        zoneWidth = GetLengthOfElevator(params)-40;
    } else if (side == 'c') {
        zoneList = cZones
        completeList = cComplete
        zoneWidth = GetWidthOfElevator(params);
    } else if (side == 'd') {
        zoneList = dZones
        completeList = dComplete
        zoneWidth = GetLengthOfElevator(params)-40;
    }



    completeList.forEach((zone, index) => {

        if (zone.zoneType == 'door' || zone.zoneType == 'glass') {

            currentZonedata = {
                zoneSize: zone.zoneSize,
                startPos: zone.startPos,
                endPos: zone.endPos,
                zoneType: zone.zoneType,
                zoneWidth: zoneWidth,
                zoneSide: side
            }
            returnArray.push(currentZonedata);
        } else {
            if (index == 0) {
                startPos = completeList[index].startPos;
                // console.log('startPos0', startPos)
            } else {
                if (completeList[index - 1].zoneType != 'panel' && completeList[index - 1].zoneType != 'shortpanel') {

                    startPos = completeList[index].startPos;
                    // console.log('startPos1', startPos)
                }
            }

            endPos = completeList[index].endPos;


            if (index != completeList.length - 1) {

                if (completeList[index + 1].zoneType != 'panel' && completeList[index + 1].zoneType != 'shortpanel') {
                    // console.log('completeList[index+1].zonType', completeList[index].zoneType)
                    currentZonedata = {
                        zoneSize: endPos - startPos,
                        startPos: startPos,
                        endPos: endPos,
                        zoneType: 'panel',
                        zoneWidth: zoneWidth,
                        zoneSide: side
                    }
                    returnArray.push(currentZonedata);
                }
            } else {
                currentZonedata = {
                    zoneSize: endPos - startPos,
                    startPos: startPos,
                    endPos: endPos,
                    zoneType: 'panel',
                    zoneWidth: zoneWidth,
                    zoneSide: side
                }
                returnArray.push(currentZonedata);

            }

        }

    });

    return returnArray


}

function CombineZoneAndGlassList(side) {
    let returnArray = [];
    let foundGlass;
    let glassCount;
    let foundReplaceShortPanel;
    let zoneList;
    let windowList;
    let glassItem;
    let currentZonedata;

    if (side == 'a') {
        zoneList = aZones
        windowList = aWindows
    } else if (side == 'b') {
        zoneList = bZones
        windowList = bWindows
    } else if (side == 'c') {
        zoneList = cZones
        windowList = cWindows
    } else if (side == 'd') {
        zoneList = dZones
        windowList = dWindows
    }


    

    zoneList.forEach((zone, index) => {
        foundReplaceShortPanel = false;
        foundGlass = false;
        glassCount = 0

        windowList.every((glass, index2) => {

            glassCount += 1

            if (zone.startPos == glass.startPos && glass.endPos <= zone.endPos && zone.zoneType != 'door') {
                foundGlass = true;
                glassItem = glass;
               
                return  false
            }

            if (zone.zoneType == 'shortpanel' && zone.endPos == glass.endPos && zone.zoneSize >= 393) {
                              
                foundReplaceShortPanel = true;
            }

            return true

        });

        if (foundGlass) {

            if (glassItem.zoneType == 'glass') {
                currentZonedata = {
                    zoneSize: glassItem.zoneSize,
                    startPos: glassItem.startPos,
                    endPos: glassItem.endPos,
                    zoneType: glassItem.zoneType,
                }
                // console.log('currentZonedata', currentZonedata) 
                returnArray.push(currentZonedata);

                if (glassItem.zoneSize < 993) {
                    returnArray.push(windowList[glassCount]);
                }
            } else {
                returnArray.push(glassItem);
                returnArray.push(windowList[glassCount]);
            }
        } else {
            if (!foundReplaceShortPanel) {
                returnArray.push(zone);
            } else {
                let startPos = zone.startPos;
                let endPos = zone.endPos;
                let oldGlassZone = endPos - startPos;
                let newGlassZone;

                let inc = 100;
                newGlassZone = (Math.floor(Math.round(oldGlassZone + 7, 0) / inc) * inc) - 7;

                if (newGlassZone != oldGlassZone) {
                    currentZonedata = {
                        zoneSize: oldGlassZone - newGlassZone,
                        startPos: startPos,
                        endPos: startPos + (oldGlassZone - newGlassZone),
                        zoneType: 'panel',
                    }
                    // console.log('currentZonedata', currentZonedata) 
                    returnArray.push(currentZonedata);
                }

                currentZonedata = {
                    zoneSize: newGlassZone,
                    startPos: endPos - newGlassZone,
                    endPos: endPos,
                    zoneType: 'glass',
                }
                // console.log('currentZonedata', currentZonedata) 
                returnArray.push(currentZonedata);



            }

        }

    });     


    return returnArray

}

function GetWindowsList(params,side) {
    let returnArray = [];
    let windowsSection = [];
    let currentZonedata;

    if (side == 'a') {
        windowsSection = params.windowsSectionA
    } else if (side == 'b') {
        windowsSection = params.windowsSectionB
    } else if (side == 'c') {
        windowsSection = params.windowsSectionC
    } else if (side == 'd') {
        windowsSection = params.windowsSectionD
    }

    let lastPostion 
    //lastPostion = windowsSection.split('-').pop();
    lastPostion = windowsSection.substring(windowsSection.lastIndexOf('-') + 1, windowsSection.length );
   
    if (Number(lastPostion) >= GetTotalHeight(params)) {
        let totHeight = GetTotalHeight(params)
       if (side == 'd' && params.standard == 'pl501') {
           totHeight -= 500;
        }
        lastPostion = totHeight;
    }


    console.log("lastPostion,",lastPostion);
    /// Combine windowslist "0-" and  lastPostion and
    let newWindowsSection = windowsSection.substring(0,windowsSection.lastIndexOf('-') + 1);
        
    windowsSection = newWindowsSection + lastPostion;
  
    console.log('windowsSection', windowsSection);

    let glassSections = windowsSection.split(',');
    let startPos;
    let endPos;
    let zoneStart;
    let zoneEnd;
    let newGlassStart;
    let newGlassEnd;
    let newGlassZone;
    let oldGlassStart;
    let oldGlassEnd;
    let oldGlassZone;
    let inc;
   
    for (var i = 0; i < glassSections.length; i++) {

        zones.forEach((zone, index) => {


            if (zone.startPos > params.zoneSectionStart) {

                let glassSection = glassSections[i].split('-');

                if (Number(zone.startPos) < Number(glassSection[0]) && Number(zone.endPos) > Number(glassSection[1])) {
                    console.log('1')
                } else {

                    if (Number(zone.startPos) < Number(glassSection[1]) && Number(zone.endPos) > Number(glassSection[1])) {
                        if (Number(glassSection[1]) - Number(zone.startPos) > 400) {

                            zoneStart = Number(zone.startPos);
                            zoneEnd = Number(zone.endPos);
                            oldGlassEnd = Number(glassSection[1]);
                            oldGlassZone = oldGlassEnd - zoneStart
                            let inc = 100;
                            newGlassZone = (Math.round(Math.round(oldGlassZone + 7, 0) / inc) * inc) - 7;

                            newGlassEnd = zone.startPos + newGlassZone;

                            currentZonedata = {
                                zoneSize: newGlassZone,
                                startPos: zoneStart,
                                endPos: newGlassEnd,
                                zoneType: "glass",
                            }
                            returnArray.push(currentZonedata);

                            if (newGlassZone != 993) {
                                currentZonedata = {
                                    zoneSize: zoneEnd - newGlassEnd,
                                    startPos: newGlassEnd,
                                    endPos: zoneEnd,
                                    zoneType: "panel",
                                }
                                returnArray.push(currentZonedata);

                            }

                        }
                        //console.log('2')
                    }

                }

                'Hela GlassZone'

                if (Number(glassSection[0]) < Number(zone.startPos) && Number(glassSection[1]) > Number(zone.endPos) ) {
                    //console.log('3')
                    currentZonedata = {
                        zoneSize: zone.zoneSize,
                        startPos: zone.startPos,
                        endPos: zone.endPos,
                        zoneType: "glass",
                    }
                    returnArray.push(currentZonedata);

                }

                if (Number(zone.startPos) < Number(glassSection[0]) && Number(zone.endPos) > Number(glassSection[1])) {


                    oldGlassZone = Number(glassSection[1]) - Number(glassSection[0]);
                    newGlassStart = Number(glassSection[0]);
                    
                    let inc = 100;
                    newGlassZone = (Math.floor(Math.round(oldGlassZone + 7, 0) / inc) * inc) - 7;

                    if (newGlassZone >= 393) {
                        currentZonedata = {
                            zoneSize: newGlassZone,
                            startPos: newGlassStart,
                            endPos: newGlassStart + newGlassZone,
                            zoneType: "glass",
                        }
                        returnArray.push(currentZonedata);

                    }


                } else {

                    //console.log('5')
                    if (Number(zone.startPos) <= Number(glassSection[0]) && Number(zone.endPos) > Number(glassSection[0])) {


                        if (zone.endPos - Number(glassSection[0]) >=400) {

                            zoneStart = zone.startPos;
                            zoneEnd = zone.endPos
                            oldGlassStart = Number(glassSection[0]);
                            oldGlassZone = zoneEnd - oldGlassStart;
                            inc = 100;
                            newGlassZone = (Math.round(Math.round(oldGlassZone + 7, 0) / inc) * inc) - 7;
                            newGlassStart = zoneEnd - newGlassZone;

                            if (newGlassZone != 993) {
                                currentZonedata = {
                                    zoneSize: 993 - newGlassZone,
                                    startPos: zoneStart,
                                    endPos: newGlassStart,
                                    zoneType: "panel",
                                }
                                returnArray.push(currentZonedata);

                            }

                            currentZonedata = {
                                zoneSize: newGlassZone,
                                startPos: newGlassStart,
                                endPos: zoneEnd,
                                zoneType: "glass",
                            }
                            returnArray.push(currentZonedata);


                        }


                    }

                }


            }


        });
    }



    return returnArray

}


function CombineList(side) {
    let returnArray = [];
    let doorList = [];
    
    let foundDoorOrShort;
    let currentZonedata;

    if (side == 'a') {
        doorList = aDoors
    } else if (side == 'b') {
        doorList = bDoors
    } else if (side == 'c') {
        doorList = cDoors
    } else if (side == 'd') {
    }

    zones.forEach((zone, index) => {
        foundDoorOrShort = false
        doorList.forEach((door, index) => {
           
            if (zone.startPos < door.startPos && zone.endPos > door.startPos) {
              
                currentZonedata = {
                    zoneSize: door.startPos - zone.startPos,
                    startPos: zone.startPos,
                    endPos: zone.startPos + (door.startPos - zone.startPos),
                    zoneType: "shortpanel",
                }
                returnArray.push(currentZonedata);

                //20211210
                if (zone.endPos > door.endPos) {
                    currentZonedata = {
                        zoneSize: zone.endPos - door.endPos,
                        startPos: door.endPos,
                        endPos: door.endPos + (zone.endPos - door.endPos),
                        zoneType: "shortpanel",
                    }
                    returnArray.push(currentZonedata);


                }


                foundDoorOrShort = true

            }


            if (door.startPos >= zone.startPos && door.startPos < zone.endPos) {

                //console.log('Zone.startPos', zone.startPos)
                //console.log('door.startPos', zone.startPos)
                currentZonedata = {
                    zoneSize: door.zoneSize,
                    startPos: door.startPos,
                    endPos: door.endPos,
                    zoneType: "door",
                }
                returnArray.push(currentZonedata);
                foundDoorOrShort = true

            } else {

                if ((zone.startPos > door.startPos && zone.startPos < door.endPos) && (zone.endPos > door.startPos && zone.endPos <= door.endPos)) {
                    foundDoorOrShort = true
                } else {

                    if (zone.startPos < door.endPos && zone.endPos > door.endPos) {
                        currentZonedata = {
                            zoneSize: zone.endPos - door.endPos,
                            startPos: door.endPos,
                            endPos: door.endPos + (zone.endPos - door.endPos),
                            zoneType: "shortpanel",
                        }
                        returnArray.push(currentZonedata);
                        foundDoorOrShort = true
                    }

                }


            }

        });

        if(!foundDoorOrShort){
            returnArray.push(zone);
        }

    });
    return returnArray
}

function GetDoorList(params,side) {

    let returnArray = [];
    let startPos = 0;
    let endPos = 0;
    let pitCompantion;
    let currentDoordata = {};

    if (params.pits) {
        pitCompantion = params.pitsHeight;
    } else {
        pitCompantion = 0;
    }

    let qtyDoor = params.doorData.length;

    for (var i = 0; i < qtyDoor ; i++) {
      
        if (params.doorData[i].doorSide == side) {

            if (i == 0) {
                currentDoordata = {
                    zoneSize: params.doorData[i].doorHeight + GetFrameHeight(params),
                    startPos: Number(params.doorData[i].liftHeight) + params.pitsHeight,
                    endPos: Number(params.doorData[i].liftHeight) + params.doorData[i].doorHeight + GetFrameHeight(params) + params.pitsHeight ,
                    zoneType: "door",
                }

                returnArray.push(currentDoordata);
            } else {
                currentDoordata = {
                    zoneSize: params.doorData[i].doorHeight + GetFrameHeight(params),
                    startPos: Number(params.doorData[i].liftHeight) + pitCompantion,
                    endPos: Number(params.doorData[i].liftHeight) + params.doorData[i].doorHeight + GetFrameHeight(params) + pitCompantion,
                    zoneType: "door",
                }
                returnArray.push(currentDoordata);


            }

        }

    }

    return returnArray
}

function GetZones(params) {

    let returnArray = [];

    let totalHeight = GetTotalHeight(params);
    let firstZone = params.zoneSectionStart;
    let normalZone = 993
    let restZone = totalHeight;
    let startPos = 0;
    let endPos;
    let pitCompantion;
    let currentZonedata = {}

    if (params.pits) {
        pitCompantion = params.pitsHeight;
    } else {
        pitCompantion = 0;
    }

    //FirstZone 
    firstZone += pitCompantion
    restZone -= firstZone

        currentZonedata = {
            zoneSize: firstZone,
            startPos: startPos,
            endPos: startPos + firstZone,
            zoneType: "panel",
        }
        returnArray.push(currentZonedata);

    startPos += firstZone

   // console.log('startPos', startPos)
   //Complet Zone 993
    while (restZone > normalZone) {
        endPos = startPos + normalZone
      
        currentZonedata = {
            zoneSize: normalZone,
            startPos: startPos,
            endPos: endPos,
            zoneType: "panel",
        }

        returnArray.push(currentZonedata);

        startPos = endPos
        restZone -= normalZone
    }
    //LastZone 
       restZone += pitCompantion 

    currentZonedata = {
        zoneSize: restZone,
        startPos: startPos,
        endPos: startPos + restZone,
        zoneType: "panel",
    }

    returnArray.push(currentZonedata);

    return returnArray
}


function GetLiftHeight(params) {

    //Calculate LiftHeight
    let liftHeight;
    let qtyFloor = params.numberOfFloor;
  
    for (var i = 0; i < qtyFloor ; i++) {
        if (i = qtyFloor-1) {
            liftHeight = params.doorData[i].liftHeight
        }
    }

    //console.log('liftHeight', liftHeight);

    return liftHeight 
}

function GetTotalHeight(params) {

    let qtyFloor = params.numberOfFloor;
    let liftHeight;
    let totalHeight;
    let lastDoorHeight;


    for (var i = 0; i < qtyFloor ; i++) {
        if (i = qtyFloor-1) {
            liftHeight = params.doorData[i].liftHeight
            lastDoorHeight = params.doorData[i].doorHeight
        }
    }
    

    if (params.standard == 'pl400 halfdoor') {
        totalHeight = liftHeight + 1100
        console.log('totalHeight', totalHeight);
    } else {
        totalHeight = liftHeight + lastDoorHeight + GetFrameHeight(params) + params.heightAboveTopElevator;
    }
    

    return totalHeight

}

function GetShaftLength(params) {


    //Calculate shaftLength
    let shaftLength

    switch (params.standard) {
        case "pl501":
            shaftLength = params.lengthOfCar + 120;
            break;
        case "pl500":
            shaftLength = params.lengthOfCar + 120;
            break;
        case "pl400":
            shaftLength = params.lengthOfCar + 120;
            break;
        case "pl400 halfdoor":
            shaftLength = params.lengthOfCar + 120;
            break;
        case "gl800":
            shaftLength = params.lengthOfCar + 120;
            break;
        case "gl1000":
            shaftLength = params.lengthOfCar + 120;
            break;
    }

    return shaftLength
}

function GetShaftWidth(params) {

    let shaftWidth

    //Calculate shaftLength
    
    switch (params.standard) {
        case "pl501":
            shaftWidth = params.widthOfCar + 250;
            break;
        case "pl500":
            shaftWidth = params.widthOfCar + 340;
            break;
        case "pl400":
            shaftWidth = params.widthOfCar + 340;
            break;
        case "pl400 halfdoor":
            shaftWidth = params.widthOfCar + 340;
            break;
        case "gl800":
            shaftWidth = params.widthOfCar + 440;
            break;
        case "gl1000":
            shaftWidth = params.widthOfCar + 440;
            break;
    }

    return shaftWidth
}

function GetWidthOfElevator(params) {

    let widthOfElevator;

    //console.log('GetWidthOfElevator', params.standard)

    switch (params.standard) {
        case "pl501":
            widthOfElevator = params.widthOfCar + 210;
            break;
        case "pl500":
            widthOfElevator = params.widthOfCar + 300;
            break;
        case "pl400":
            widthOfElevator = params.widthOfCar + 300;
            break;
        case "pl400 halfdoor":
            widthOfElevator = params.widthOfCar + 300;
            break;
        case "gl800":
            widthOfElevator = params.widthOfCar + 400;
            break;
        case "gl1000":
            widthOfElevator = params.widthOfCar + 400;
            break;
    }


    return widthOfElevator

}

function GetLengthOfElevator(params) {

    let lengthOfElevator

    switch (params.standard) {
        case "pl501":
            lengthOfElevator = params.lengthOfCar + 70;
            break;
        case "pl500":
            lengthOfElevator = params.lengthOfCar + 70;
            break;
        case "pl400":
            lengthOfElevator = params.lengthOfCar + 70;
            break;
        case "pl400 halfdoor":
            lengthOfElevator = params.lengthOfCar + 70;
            break;
        case "gl800":
            lengthOfElevator = params.lengthOfCar + 70;
            break;
        case "gl1000":
            lengthOfElevator = params.lengthOfCar + 70;
            break;
    }



    return lengthOfElevator

}

function GetDoorDefaultHeight(params) {

    let doorDefaultHeight

    switch (params.standard) {
        case "pl501":
            doorDefaultHeight = 2300;
            break;
        case "pl500":
            doorDefaultHeight = 2225;
            break;
        case "pl400":
            doorDefaultHeight = 2225;
            break;
        case "pl400 halfdoor":
            doorDefaultHeight = 2225;
            break;
        case "gl800":
            doorDefaultHeight = 2225;
            break;
        case "gl1000":
            doorDefaultHeight = 2225;
            break;
    }



    return doorDefaultHeight


}

function GetMaximumWeight(params) {

    let maximumWeight 

    switch (params.standard) {
        case "pl501":
            maximumWeight = "2000 Kg";
            break;
        case "pl500":
            maximumWeight = "2100 Kg";
        case "pl400":
            maximumWeight = "2000 Kg";
            break;
        case "pl400 halfdoor":
            maximumWeight = "2000 Kg";
            break;
        case "gl800":
            maximumWeight = "2500 Kg";
            break;
        case "gl1000":
            maximumWeight = "2500 Kg";
            break;
    }

    return maximumWeight

}

function GetClearArea(params) {

    let clearArea 
    switch (params.standard) {
        case "pl501":
            clearArea = "1500 mm";
            break;
        case "pl500":
            clearArea = "1500 mm";
        case "pl400":
            clearArea = "1500 mm";
            break;
        case "pl400 halfdoor":
            clearArea = "1500 mm";
            break;
        case "gl800":
            clearArea = "1500x1500 mm";
            break;
        case "gl1000":
            clearArea = "2000x1500 mm";
            break;
    }



    return clearArea

}

function GetLoad(params) {

     let load
    switch (params.standard) {
        case "pl501":
            load = "400 Kg";
            break;
        case "pl500":
            load = "500 Kg";
        case "pl400":
            load = "500 Kg";
            break;
        case "pl400 halfdoor":
            load = "400 Kg";
            break;
        case "gl800":
            load = "1000 Kg";
            break;
        case "gl1000":
            load = "1000 Kg";
            break;
    }




    return load

}

function GetFrameHeight(params) {

    let frameHeight;

    switch (params.standard) {
        case "pl501":
            frameHeight = 230;
            break;
        case "pl500":
            frameHeight = 225;
        case "pl400":
            frameHeight = 225;
            break;
        case "pl400 halfdoor":
            frameHeight = 225;
            break;
        case "gl800":
            frameHeight = 225;
            break;
        case "gl1000":
            frameHeight = 225;
            break;
    }

    return frameHeight


}

function GetMotorSpace(params) {
    let motorSpace;


    switch (params.standard) {
        case "pl501":
            motorSpace = 200;
            break;
        case "pl500":
            motorSpace = 280;
        case "pl400":
            motorSpace = 280;
            break;
        case "pl400 halfdoor":
            motorSpace = 280;
            break;
        case "gl800":
            motorSpace = 380;
            break;
        case "gl1000":
            motorSpace = 380;
            break;
    }


    return motorSpace

}




export default CommonFunctions;

