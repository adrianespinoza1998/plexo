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
                            console.log(listaProyectos[i]);
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
        }
    }
}]);
