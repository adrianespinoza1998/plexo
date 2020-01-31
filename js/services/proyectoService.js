app.factory("proyectoService",["$http","guardarIdProyecto",function ($http,guardarIdProyecto) {
    return{
        getProyectos:function (id_usuario,callback) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/get_proyectos_indexados.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'id_usuario='+id_usuario
            }).then(function successcallback(response){
                if(response.data.length>0){

                    if(response.data.error==null){
                        var listaProyectos=[];

                        for(var i=0;i<response.data.length;i++){
                            listaProyectos.push(response.data[i]);
                        }
                        callback(listaProyectos);
                    }else{
                        console.log.error(response.data.error);
                    }
                }else{
                    console.log('No hay proyectos');
                }
            }, function errorCallback(response) {
                console.log('Error al leer proyectos:'+response.data.message);
            });
        },
        crearProyecto:function (id_tipo_proyecto, id_empresa, id_administrador, nombre_proyecto, link_proyecto,
                                id_edificio) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/crear_proyecto.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'id_tipo_proyecto='+id_tipo_proyecto+'&id_empresa='+id_empresa+'&id_administrador='+id_administrador+
                    '&nombre_proyecto='+nombre_proyecto+'&link_proyecto='+link_proyecto+
                    '&id_edificio='+id_edificio
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    alert('Proyecto creado');
                }else{
                    alert('Error: '+response.data.error);
                }
            },function errorCallback(response) {
                alert('Error al conectarse a la BD');
            });
        },
        addPermiso:function (id_proyecto,id_usuario,id_administrador_proyecto) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/crear_permiso.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'id_proyecto='+id_proyecto+'&id_usuario='+id_usuario+'&id_administrador_proyecto='+id_administrador_proyecto
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    console.log('permisos entregados');
                }else{
                    console.log('error: '+response.data.error);
                }
            },function errorCallback(response) {
                alert('error al otorgar permiso');
            });
        },
        getMaxIdProyecto:function (callback) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/get_max_id_proyecto.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    var id_proyecto=response.data.id_proyecto;
                    //guardarIdProyecto.setIdProyecto(id_proyecto);
                    callback(id_proyecto);
                }else{
                    console.log(response.data.error);
                }
            },function errorCallback(response) {
                alert('Error al conectarse a la base de datos');
            });
        }
    }
}]);
