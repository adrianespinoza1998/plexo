app.factory("recintoService",["$http",function ($http) {
    return{
        createRecinto:function (id_edificio,nombre_recinto,num_piso) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/crear_recinto.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'id_edificio='+id_edificio+'&nombre_recinto='+nombre_recinto+'&numero_piso='+num_piso
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    alert('Recinto creado');
                }else{
                    alert('Error: '+response.data.error);
                }
            }, function errorCallback(response) {
                alert('Error al conectarse a la base de datos');
            });
        },
        listarRecinto:function (id_edificio,callback) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/listar_recinto.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'id_edificio='+id_edificio
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    var listaRecinto=[]

                    for(var i=0;i<response.data.length;i++){
                        listaRecinto.push(response.data[i]);
                        console.log(listaRecinto[i]);
                    }

                    callback(listaRecinto);
                }
            }, function errorCallback(response) {
                alert('Error al conectarse a la base de datos');
            });
        }
    }
}]);
