app.factory("edificioService",["$http","guardarCrearService",function ($http,guardarCrearService) {
    return{
        getEdificio:function (id_empresa) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/get_edificio.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'id_empresa='+id_empresa
            }).then(function successCallback(response) {
                if(response.data.length>0){
                    if(response.data.error==null){
                        var listaEdificios=[];

                        for(var i=0;i<response.data.length;i++){
                            listaEdificios.push(response.data[i])
                        }
                    }else{
                        console.log(response.data.error);
                    }
                }else{
                    console.log('No hay edificios');
                }
            }, function errorCallback(response) {
                console.log('Error al buscar edificios en la base de datos:'+response.data.error);
            });
        },
        listarEdificios:function (callback) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/listar_edificio.php',
                method:'VIEW',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(function successCallbcak(response) {
                if(response.data.error==null){
                    var listaEdificio=[];

                    for(var i=0;i<response.data.length;i++){
                        listaEdificio.push(response.data[i]);
                    }

                    callback(listaEdificio);
                }else{
                    console.log('No hay edificios');
                }
            }, function errorCallback(response) {
                console.log('Error al conectarse a la BD');
            })
        },
        crearEdificio:function (nombre_edificio,direccion,nro,num_pisos,callback) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/crear_edificio.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'nombre_edificio='+nombre_edificio+'&direccion='+direccion+'&nro='+nro+'&num_pisos='+num_pisos
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    guardarCrearService.setEdificioSelected(response.data.id);
                    console.log(guardarCrearService.getEdificioSelected());
                    alert('Edificio creado');
                    callback();
                }else{
                    alert('Error al crear edificio');
                    console.log(response.data.error);
                }
            },function errorCallback(response) {
                alert('Error al conectarse a la BD');
                console.log(response.data.error);
            });
        }
    }
}]);