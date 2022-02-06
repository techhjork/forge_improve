let Functions = {};

// ***************************************************************************************
// *********************** Functions **********************************************************
Functions.ClearScene = function (scene, excludeNames = null) {

    for (let i = scene.children.length - 1; i >= 0; i--) {
        if (scene.children[i].type === "Mesh" || scene.children[i].type === "LineSegments") {

            if (excludeNames === null)
                scene.remove(scene.children[i]);
            else if (!excludeNames.includes(scene.children[i].name))
                scene.remove(scene.children[i]);
        }

    }

};




Functions.FillObjects = (scene, types = null) => {
    let objects = [];

    for (let i = scene.children.length - 1; i >= 0; i--) {
        if (scene.children[i].type === "Mesh") {
            if (types !== null) {
                types.forEach(function (item) {
                    if (scene.children[i].name.toLowerCase().includes(item.toLowerCase())) {
                        objects.push(scene.children[i]);
                    }
                });
            }
            else
                objects.push(scene.children[i]);
        }
    }
    return objects;
};

Functions.GetPickedObject = (camera, pickFilteredObjects) => {
    var mouse3D = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5);
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse3D, camera);
    var intersects = raycaster.intersectObjects(pickFilteredObjects);
    if (intersects.length > 0)
        return intersects[0].object;
    else
        return null;
};

Functions.GetSpecificObjectsInFilteredObjects = (arrayOfParts, partOfName) => {
    let returnObjects = [];

    arrayOfParts.forEach(function (item) {
        //    console.log(item.name);
        if (item.name.toLowerCase().includes(partOfName.toLowerCase())) {
            returnObjects.push(item);
        }

    });

    return returnObjects;
};

export default Functions;