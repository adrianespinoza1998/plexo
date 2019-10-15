app.factory("estanciaService",["$http",function ($http) {
    return{
        listarEstancia:function (id_recinto,callback) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/listar_estancia.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'id_estancia='+id_estancia
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    var listaEstancia=[];

                    for(var i=0;i<response.data.length){
                        listaEstancia.push(response.data[i]);
                    }

                    callback(listaEstancia);
                }else{
                    console.log('Error: '+response.data.error);
                }
            }, function errorCallback(response) {

            });
        }
    }
}]);
