app.factory("medicionService",["$http","guardarMedicionService",function ($http,guardarMedicionService) {
    return{
        getMedicion:function (ncaja) {
            $http({
                url:'https://52.201.131.104/api/get_datos.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'usuario=DmXFjQIwcwq8DdP4hu3c&contrasena=HTG1PyX9t1USjOHJk3Km&ncaja='+ncaja
            }).then(function successCallback(response) {
                if(response.data.error==null){

                    var co2=response.data.co2;
                    var temperatura=response.data.temperatura;
                    var humedad=response.data.humedad;

                    guardarMedicionService.setCo2(co2);
                    guardarMedicionService.setTemperatura(temperatura);
                    guardarMedicionService.setHumedad(humedad);

                    console.log(response.data);
                }else{
                    console.log('No hay mediciones');
                }
            },function errorCallback(response) {
                console.log('Error al buscar lugar en base de datos');
            });
        }
    }
}]);
