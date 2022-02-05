
let PositionPart = function () {
    let sphere = new THREE.SphereGeometry(0.01, 5, 5);
    sphere.computeFaceNormals();
    sphere.computeVertexNormals();
    let sphere_mesh = new THREE.Mesh(sphere);
    return sphere_mesh;
};



export default PositionPart;