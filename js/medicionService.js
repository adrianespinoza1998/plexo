app.factory("medicionService",["$http","guardarMedicionService",function ($http,guardarMedicionService) {
    return{
        getMedicion:function (ncaja) {
            $http({
                url:'https://www.bimplexus.com/api/get_datos.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'ncaja='+ncaja
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
        },
        listarCaja:function (callback) {
            $http({
                url:'https://www.bimplexus.com/api/get_cajas.php',
                method: 'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    var listaCajas=[];

                    for(var i=0;i<response.data.length;i++){
                        listaCajas.push(response.data[i]);
                    }

                    callback(listaCajas);
                }else{
                    alert('Error: '+response.data.error);
                }
            },function errorCallback(response) {
                console.log('error al conectarse a la base de datos');
            });
        }
    }
}]);
