app.factory("estanciaService",["$http",function ($http) {
    return{
        listarEstancia:function (id_recinto,callback) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/get_estancia.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'id_recinto='+id_recinto
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    var listaEstancia=[];

                    for(var i=0;i<response.data.length;i++){
                        listaEstancia.push(response.data[i]);
                    }

                    callback(listaEstancia);
                }else{
                    console.log('Error: '+response.data.error);
                }
            }, function errorCallback(response) {
                console.log('Error al conectarse a la base de datos');
            });
        },
        crearEstancia:function (id_recinto,nombre_estancia,ncaja) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/crear_estancia.php',
                method: 'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'id_recinto='+id_recinto+'&nombre_estancia='+nombre_estancia+'&ncaja='+ncaja
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    alert('Estancia creada');
                }else{
                    alert('Error: '+response.data.error);
                }
            },function errorCallback(response) {
                alert('Error al conectarse a la bd');
            });
        }
    }
}]);
