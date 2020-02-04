app.factory("loginService",["$http","$location","sessionService","toggleService",
    function ($http, $location, sessionService, toggleService) {
    return{
        login:function (mail,password) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/verificar_usuario.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'correo='+mail+"&contrasena="+password
            }).then(function successCallback(response) {
                if(response.data.estado=='logueado'){
                    var sesion=response.data.estado;
                    var correo=response.data.correo;
                    var id_perfil=response.data.id_perfil;
                    var id=response.data.id_usuario;
                    var nombre=response.data.nombre;
                    var ap_paterno=response.data.ap_paterno;
                    var ap_materno=response.data.ap_materno;
                    var id_empresa=response.data.id_empresa;

                    sessionService.setSesion(sesion);
                    sessionService.setEmail(correo);
                    sessionService.setId(id);
                    //sessionService.setContrasena(password);
                    sessionService.setNombre(nombre);
                    sessionService.setApPaterno(ap_paterno);
                    sessionService.setApMaterno(ap_materno);
                    sessionService.setIdPerfil(id_perfil);
                    sessionService.setIdEmpresa(id_empresa);

                    toggleService.toggleVentana();

                    if(sessionService.getIdPerfil()=='1'){
                        $location.path('/home_admin');
                    }else{
                        $location.path('/home')
                    }
                }else{
                    var sesion=response.data.estado;
                    sessionService.setSesion(sesion);
                    alert('Correo o contraseña incorrectos');
                }
            }, function errorCallback(response) {
                alert('Base de datos no disponible');
                console.log('Error al llamar datos: '+response.data.error);
            });
        },
        guardarSesion:function (correo,contrasena) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/guardar_sesion.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'correo='+correo+'&contrasena='+contrasena
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    console.log('Sesión guardada');
                }else{
                    alert("Error al guardar sesión");
                }
            },function errorCallback(response) {
                console.log('Error al conectarse al servidor');
            });
        },
        getSesion:function (callback) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/get_sesion.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    callback(response.data.correo,response.data.contrasena);
                }else{
                    callback(null,null);
                    console.log(response.data.error);
                }
            },function errorCallback(response) {
                console.log('Error al conectarse al servidor');
            });
        },
        destroySesion:function () {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/destroy_sesion.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    console.log(response.data.estado);
                }else{
                    console.log(response.data.error);
                }
            },function errorCallback(response) {
                alert('Error al conectarse al servidor');
            })
        }
    }
}]);

