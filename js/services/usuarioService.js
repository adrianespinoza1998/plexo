app.factory("usuarioService",["$http","sessionService",function ($http,sessionService) {
    return{
        updateUsuario:function (id_usuario,correo,contrasena,nombre,ap_paterno,ap_materno) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/editar_usuario.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'id_usuario='+id_usuario+'&correo='+correo+'&contrasena='+contrasena+'&nombre='+nombre+
                    '&ap_paterno='+ap_paterno+'&ap_materno='+ap_materno
            }).then(function successCallback(response) {
                if(response.data.error='ninguno'){
                    sessionService.setEmail(response.data.correo);
                    //sessionService.setContrasena(response.data.contrasena);
                    sessionService.setNombre(response.data.nombre);
                    sessionService.setApPaterno(response.data.ap_paterno);
                    sessionService.setApMaterno(response.data.ap_materno);
                    alert('Datos actualizados');
                }else{
                    var mensaje=response.data.error;
                    console.log(mensaje);
                }
            },function errorCallback(response) {
                alert('Error al buscar usuarios en base de datos:'+response.data.error);
            });
        },
        createUsuario:function (nombre,ap_paterno,ap_materno,rut,id_empresa,correo,dv) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/crear_usuario.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'nombre='+nombre+'&ap_paterno='+ap_paterno+'&ap_materno='+ap_materno+'&rut='+rut+'&id_empresa='
                    +id_empresa+'&correo='+correo+'&dv='+dv
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    alert('Usuario creado');
                }else{
                    alert('Error al crear usuario');
                    console.log(response.data.error);
                }
            }, function errorCallback(response) {
                alert('Error al conectarse a la BD');
            });
        }
    }
}]);
