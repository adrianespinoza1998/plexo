var scene=new xeogl.Scene();

var material = new xeogl.PhongMaterial(scene,{
    diffuse:[0.6,0.6,0.7]
});

var geometry=new xeogl.TorusGeometry(scene);

var mesh=new xeogl.Mesh(scene,{
    material:material,
    geometry:geometry
});

material.diffuse=[1,1,0];

material.alpha=0.5;

scene.on('tick',function () {
    scene.camera.orbitYaw(0.6);
    scene.camera.orbitPitch(0.3);
});
