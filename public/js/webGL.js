import {
    SetFont, StartConfiguration
} from '../ConfigurationGeometry/MasterAssembly.js';

import { PlaceComponent, Color, Functions } from '../../CadcraftForgeUtils/CadcraftForgeUtils.js';
import CommonFunctions from '../ConfigurationGeometry/Common/CommonFunctions.js';



var container;
var camera, camera2d, controls, scene, renderer, RenderCamera;
var lighting, ambient, keyLight, fillLight, backLight;

var raycaster;
var mouse = new THREE.Vector2(), INTERSECTED;
let font;



let pickFilteredObjects = [];

init();
animate();




function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    /* Camera */
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 50000);

    camera.position.x = 5000;
    camera.position.y = 13000;
    camera.position.z = 5000;

    RenderCamera = camera;
    camera.lookAt(new THREE.Vector3(0, 2500, 0));

    /* Scene */
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfe3dd);
       // new THREE.Color('skyblue');

    const canvas = document.querySelector('#c');

    renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
    });

    //renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //renderer.shadowMap.renderSingleSided = false;



    // //Create a DirectionalLight and turn on shadows for the light

    scene.add(new THREE.AmbientLight(0x222222));
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1500, 1500, 4500);
    directionalLight.target.position.set(0, 0, 0);

    //directionalLight.castShadow = true;
    //directionalLight.shadowDarkness = 0.1;

    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 5000;

    directionalLight.shadow.camera.left = -2000;
    directionalLight.shadow.camera.right = 2000;
    directionalLight.shadow.camera.top = 2000;
    directionalLight.shadow.camera.bottom = -2000;

    directionalLight.name = 'DirLight1';
    scene.add(directionalLight);

    var directionalLight2 = new THREE.DirectionalLight(0xffffff);
    directionalLight2.position.set(-1500, 1500, -4500);
    directionalLight2.target.position.set(0, 0, 0);

    //directionalLight.castShadow = true;
    //directionalLight.shadowDarkness = 0.1;

    directionalLight2.shadow.camera.near = 1;
    directionalLight2.shadow.camera.far = 5000;

    directionalLight2.shadow.camera.left = -2000;
    directionalLight2.shadow.camera.right = 2000;
    directionalLight2.shadow.camera.top = 2000;
    directionalLight2.shadow.camera.bottom = -2000;

    directionalLight2.name = 'DirLight2';
    scene.add(directionalLight2);



    var size = 30000;
    var divisions = 10;

    var gridHelper = new THREE.GridHelper(size, divisions);
   
    gridHelper.name = 'Grid';
    scene.add(gridHelper);

   //scene.add(new THREE.AxesHelper(3500));

  


    container.appendChild(renderer.domElement);
    /* Controls */
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.5;

    controls.screenSpacePanning = false;

    controls.minDistance = 2000;
    controls.maxDistance = 40000;

    controls.maxPolarAngle = Math.PI/3;
    controls.minPolarAngle = -Math.PI/3;

   // controls.minAzimuthAngle = - Math.PI / 2; // radians
    //controls.maxAzimuthAngle = Math.PI / 2; // radians

    controls.autoRotateSpeed = 1;
    controls.target = new THREE.Vector3(750, 1500, -750);
   // controls.target = new THREE.Vector3(0, 0, 0);

    controls.enablePan = true;

    raycaster = new THREE.Raycaster();

    /* Events */
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onMouseMove, false);

    var loader = new THREE.FontLoader();
    loader.load('/Fonts/Arial Narrow_Regular.json', function (response) {

        //font = response;
        SetFont(response);
    });


}


document.getElementById("test").addEventListener("click", Test);


document.getElementById("Apply").addEventListener("click", SendParameters);
document.getElementById("information").addEventListener("click", GetInformation);
document.getElementById("CreateDownloads").addEventListener("click", CreateWorkItem);


//document.getElementById("Fetch").addEventListener("click", fetchAndSendParameters);


//function fetchAndSendParameters() {

//    let params = {};

//    var getJSON = function (url, callback) {
//        var xhr = new XMLHttpRequest();
//        xhr.open('GET', url, true);
//        xhr.responseType = 'json';
//        xhr.onload = function () {
//            var status = xhr.status;
//            if (status === 200) {
//                params = xhr.response;
//                callback(null, xhr.response);
//            } else {
//                callback(status, xhr.response);
//            }
//        };
//        xhr.send();
//    };

//    getJSON('http://dev3.appcloud.se/api/forge/getForgeData?key=rnilsson',
//        function (err, data) {
//            if (err !== null) {
//                alert('Something went wrong: ' + err);
//            } else {
//                //var xhr2 = new window.XMLHttpRequest();
//                //xhr2.open('POST', '/htmlvalues', true);
//                //xhr2.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
//                //xhr2.send(JSON.stringify(params));

//                //var x = document.getElementById("pdfDownloadLink");
//                //x.style.display = "none";

//                //console.log(params);
//                UniversalScaffold(params);
//            }
//        });
//}



function SendParameters() {

    let params = {

        
       
        projectnumber: document.getElementById('projectnumber').value,
        ordeprojectnamerName: document.getElementById('projectname').value,
        preparedby: document.getElementById('preparedby').value,
        drawingnumber: document.getElementById('drawingnumber').value,
        commissionnumber: document.getElementById('commissionnumber').value,
        elevatordesignation: document.getElementById('elevatordesignation').value,
        elevatornumber: document.getElementById('elevatornumber').value,
        logo: document.getElementById('logo').value,
        languageOptions: document.getElementById('languageoptions').value,

        standard: document.getElementById('standard').value,
        numberOfFloor: Number(document.getElementById('numberoffloor').value),
        lengthOfCar: Number(document.getElementById('lengthofcar').value),
        widthOfCar: Number(document.getElementById('widthofcar').value),
        pits: document.getElementById('pits').checked,
        pitsHeight: Number(document.getElementById('pitsheight').value),
        zoneSectionStart: Number(document.getElementById('zonesectionstart').value),
        heightAboveTopElevator: Number(document.getElementById('heightabovetopelevator').value),
        electricBoxSide: document.getElementById('electricboxside').value,
        electricBoxFloorNo: document.getElementById('electricboxfloorno').value,
        electricBoxdefault: document.getElementById('electricboxdefault').checked,
        outerRoof: document.getElementById('outerroof').checked,
        outerRoofSide: document.getElementById('outerroofside').value,
        windowsSectionA: document.getElementById('windowssectiona').value,
        windowsSectionB: document.getElementById('windowssectionb').value,
        windowsSectionC: document.getElementById('windowssectionc').value,
        windowsSectionD: document.getElementById('windowssectiond').value,
        defaultDoorSize: document.getElementById('defaultdoorsize').checked,
        colorelevator: document.getElementById('colorelevator').value,
        colordoor: document.getElementById('colordoor').value,
        colorelevatoroptions: document.getElementById('colorelevatoroptions').value,
        colordooroptions: document.getElementById('colordooroptions').value,


        levelData: GetLevelData(Number(document.getElementById('numberoffloor').value)),
        doorData: GetDoorData(Number(document.getElementById('numberoffloor').value)),
        optionData: GetOptionsData()

    };


    console.log('webgl', document.getElementById('colorelevator').value);

    SendParameterstooForge()
  


    StartConfiguration(params,scene,camera);
}

//Send too Forge / Inventor drawing
function SendParameterstooForge() {

    let params2 = {

        ProjectNumber: document.getElementById('projectnumber').value,
        ProjectName: document.getElementById('projectname').value,
        PreparedBy: document.getElementById('preparedby').value,
        DrawingNumber: document.getElementById('drawingnumber').value,
        CommissionNumber: document.getElementById('commissionnumber').value,
        ElevatorDesignation: document.getElementById('elevatordesignation').value,
        ElevatorNumber: document.getElementById('elevatornumber').value,
        Logo: GetLogo(document.getElementById('logo').value),
        LanguageOptions: document.getElementById('languageoptions').value,

        Standard: GetStandard(document.getElementById('standard').value),
        NumberOfFloor: Number(document.getElementById('numberoffloor').value),
        LengthOfCar: Number(document.getElementById('lengthofcar').value),
        WidthOfCar: Number(document.getElementById('widthofcar').value),
        Pits: document.getElementById('pits').checked,
        PitHeight: Number(document.getElementById('pitsheight').value),
        ZoneSectionStart: Number(document.getElementById('zonesectionstart').value),
        HeightAboveTopElevator: Number(document.getElementById('heightabovetopelevator').value),
        ElectricBoxSide: document.getElementById('electricboxside').value,
        ElectricBoxFloorNo: document.getElementById('electricboxfloorno').value,
        ElectricBoxDefault: document.getElementById('electricboxdefault').checked,
        OuterRoof: document.getElementById('outerroof').checked,
        OuterRoofSide: (document.getElementById('outerroofside').value).toUpperCase(),
        WindowsSectionA: document.getElementById('windowssectiona').value,
        WindowsSectionB: document.getElementById('windowssectionb').value,
        WindowsSectionC: document.getElementById('windowssectionc').value,
        WindowsSectionD: document.getElementById('windowssectiond').value,
        DefaultDoorSize: document.getElementById('defaultdoorsize').checked,
        Colorelevator: document.getElementById('colorelevator').value,
        Colordoor: document.getElementById('colordoor').value,


      
        Safelinemx2: document.getElementById('safelinemx2').checked,
        Safelinemx2gsm: document.getElementById('safelinemx2gsm').checked,
        Schoolcontrolassa: document.getElementById('schoolcontrolassa').checked,
        Schoolcontrol: document.getElementById('schoolcontrol').checked,
        Intercom: document.getElementById('intercom').checked,
        Callsend: document.getElementById('callsend').checked,
        Firealarmdrive: document.getElementById('firealarmdrive').checked,
        Folderseat: document.getElementById('folderseat').checked,
        Floorvoiceannouncement: document.getElementById('floorvoiceannouncement').checked,
        Lsfcable: document.getElementById('lsfcable').checked,
        Telephone: document.getElementById('telephone').checked,
        Keyswitch: document.getElementById('keyswitch').checked,
        Ups: document.getElementById('ups').checked,
        Comments: document.getElementById('comments').value,


        

    };

    params2 = fillLevelData(params2)
    
    console.log((document.getElementById('outerroofside').value).toUpperCase());

    console.log(params2);

    var xhr2 = new window.XMLHttpRequest();
    xhr2.open('POST', '/htmlvalues', true);
    xhr2.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr2.send(JSON.stringify(params2));


   
}

function fillLevelData(params) {


    for (var i = 0; i < Number(document.getElementById('numberoffloor').value); i++) {
     

        params['LiftHeightLevel' + i] = Number(document.getElementById('liftheightlevel' + i).value);
        params['DoorSideLevel' + i] = (document.getElementById('doorsidelevel' + i).value).toUpperCase();
        params['TypeOfDoorLevel' + i] = GetDoorType(document.getElementById('typeofdoorlevel' + i).value);
        params['DoorHingeLevel' + i] = GetLeftRight(document.getElementById('doorhingelevel' + i ).value);
        params['DoorSizeLevel' + i] = Number(document.getElementById('doorsizelevel' + i).value);
        params['DoorHeightLevel' + i] = Number(document.getElementById('doorheightlevel' + i).value);
        params['DoorCloserLevel' + i] = document.getElementById('doorcloserlevel' + i).checked;
        params['CanopyLevel' + i] = document.getElementById('canopylevel' + i).checked;
        params['CallBoxLevel' + i] = document.getElementById('callboxlevel' + i).checked;
       
                  

    }

    return params;
}


function GetLeftRight(doorHingehtml) {
    let doorHinge;

    if (doorHingehtml == 'right') {
        doorHinge = 'Right';
    } else {
        doorHinge = 'Left';
    }

    return doorHinge


}


function GetDoorType(doorTypehtml) {

    let doorType;

    if (doorTypehtml == 'a1') {
        doorType = 'A1';
    } else if (doorTypehtml == 'a3')  {
        doorType = 'A3';
    } else if (doorTypehtml == 'a2') {
        doorType = 'A2';
    } else if (doorTypehtml == 'a2:1') {
        doorType = 'A2:1';
    } else if (doorTypehtml == 'ei60') {
        doorType = 'Ei60';
    } else if (doorTypehtml == 'double') {
        doorType = 'Double';
    } 

    return doorType


}




function GetStandard(standardhtml) {

    let standard;

    switch (standardhtml) {
        case "pl400":
            standard = 'PL400';
            break;
        case "gl1000":
            logo = 'GL1000';
        case "gl800":
            standard = 'GL800';
            break;
        case "pl400 halfdoor":
            standard = 'PL400 Halfdoor';
            break;
        case "pl500":
            standard = 'PL500';
            break;
        case "pl501":
            standard = 'PL501';
            break;
    }

    return standard


}


function GetLogo(logohtml) {

    let logo;


    switch (logohtml) {
        case "namilift":
            logo = 'NamiLift';
            break;
        case "alsaceaccess":
            logo = 'Alsace_Access';
        case "emptylogo":
            logo = 'Alsace_Access';
            break;
        case "msw":
            logo = 'MSW';
            break;
        case "partillehiss":
            logo = 'Partille_hiss';
            break;
        case "weymann":
            logo = 'Weymann';
            break;
        case "oronaalta":
            logo = 'Orona_alta';
            break;
        case "globus":
            logo = 'Globus';
            break;
        case "zzed":
            logo = 'ZZED';
            break;

    }

    return logo


}





function GetDoorData(qtyFloor) {

    let returnArray = [];
     
    for (var i = 0; i < qtyFloor; i++) {
        let currentleveldata = {
            liftHeight: Number(document.getElementById('liftheightlevel' + i).value),
            doorSide: document.getElementById('doorsidelevel' + i).value,
            typeOfDoor: document.getElementById('typeofdoorlevel' + i).value,
            doorHinge: document.getElementById('doorhingelevel' + i).value,
            doorSize: Number(document.getElementById('doorsizelevel' + i).value),
            doorHeight: Number(document.getElementById('doorheightlevel' + i).value),
            doorCloser: document.getElementById('doorcloserlevel' + i).checked,
            canopy: document.getElementById('canopylevel' + i).checked,
            callBox: document.getElementById('callboxlevel' + i).checked,
           // ceilingHeight: Number(document.getElementById('ceilingheightlevel' + i).value),
        }
        returnArray.push(currentleveldata);

    }

    return returnArray;
}


function GetLevelData(qtyFloor) {

    let returnArray = [];
     
    for (var i = 0; i < qtyFloor ; i++) {
        let currentleveldata = {
            liftHeight: Number(document.getElementById('liftheightlevel' + i).value),
        }
        returnArray.push(currentleveldata);

    }

    return returnArray;
}

function GetOptionsData() {

    let returnArray = [];

    let currentOptionsdata = {
        safeLineMx2: document.getElementById('safelinemx2').checked,
        safeLineMx2Gsm: document.getElementById('safelinemx2gsm').checked,
        schoolControlAssa: document.getElementById('schoolcontrolassa').checked,
        schoolControl: document.getElementById('schoolcontrol').checked,
        interCom: document.getElementById('intercom').checked,
        callSend: document.getElementById('callsend').checked,
        fireAlarmDrive: document.getElementById('firealarmdrive').checked,
        folderSeat: document.getElementById('folderseat').checked,
        floorVoiceAnnouncement: document.getElementById('floorvoiceannouncement').checked,
        lsfCable: document.getElementById('lsfcable').checked,
        telephone: document.getElementById('telephone').checked,
        keySwitch: document.getElementById('keyswitch').checked,
        ups: document.getElementById('ups').checked,
    }
    returnArray.push(currentOptionsdata);


    return returnArray;
}



function Test() {

    alert('test');
}


var xhr;

//   xhr.onreadystatechange = function() {
//       alert(xhr.readyState);
//       if (xhr.readyState === 4)  { 
//        alert('Ready!!');
//       }
//     };



function GetInformation() {
    // Pick any part
    pickFilteredObjects = [];
    pickFilteredObjects = CommonFunctions.FillObjects(scene);

    document.addEventListener('mousedown', onPickedForInfoFromPart);
}

function onPickedForInfoFromPart(event) {
    event.preventDefault();
    let pickedObject = CommonFunctions.GetPickedObject(camera, pickFilteredObjects);

    if (pickedObject !== null) {

        console.log(pickedObject);
        console.log(pickedObject.name);
        console.log('Position');
        console.log(pickedObject.position.x + ' , ' + pickedObject.position.y + ' , ' + pickedObject.position.z);
        console.log('Rotation');
        console.log(Math.round(pickedObject.rotation.x * 180 / Math.PI) + ' , ' + Math.round(pickedObject.rotation.y * 180 / Math.PI) + ' , ' + Math.round(pickedObject.rotation.z * 180 / Math.PI));

    }
    pickFilteredObjects = [];
    document.removeEventListener('mousedown', onPickedForInfoFromPart);
}



function CreateWorkItem() {
    xhr = new window.XMLHttpRequest();

    //xhr.open('GET', '/api/forge/datamanagement/signandworkitemInventor', true);
    console.log('I create Work Item before');
    xhr.open('GET', ' /api/forge/oauth', true);

    xhr.send(null);
    console.log('I create Work Item after');
}





function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function onKeyboardEvent(e) {
    if (e.code === 'KeyL') {
        lighting = !lighting;
        if (lighting) {
            ambient.intensity = 0.25;
            scene.add(keyLight);
            scene.add(fillLight);
            scene.add(backLight);
        } else {
            ambient.intensity = 1.0;
            scene.remove(keyLight);
            scene.remove(fillLight);
            scene.remove(backLight);
        }
    }
}




function onMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}


function animate() {
    requestAnimationFrame(animate);
    controls.update();

   
    render();
}


function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }


    raycaster.setFromCamera(mouse, camera);

    
    var intersects = raycaster.intersectObjects(pickFilteredObjects);
    if (intersects.length > 0) {
        if (INTERSECTED !== intersects[0].object) {
            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex(0xff0000);
        }
    } else {
        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        INTERSECTED = null;
    }

    renderer.render(scene, camera);
}



function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

