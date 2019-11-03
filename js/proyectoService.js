app.factory("proyectoService",["$http",function ($http) {
    return{
        getProyectos:function (id_empresa,id_edificio,callback) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/get_proyectos.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'id_empresa='+id_empresa+'&id_edificio='+id_edificio
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
        crearProyecto:function (id_tipo_proyecto, id_empresa, id_administrador, nombre_proyecto, direccion, link_proyecto,
                                id_edificio) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/crear_proyecto.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'id_tipo_proyecto='+id_tipo_proyecto+'&id_empresa='+id_empresa+'&id_administrador='+id_administrador+
                    '&nombre_proyecto='+nombre_proyecto+'&direccion='+direccion+'&link_proyecto='+link_proyecto+
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
        }
    }
}]);
