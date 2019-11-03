app.factory("archivoService",["$http",function ($http) {
    return{
        /*uploadArchivo:function (fd) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/upload.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:fd
                url:'https://www.plexobuilding.com/plexo/webservices/upload.php',
                method:'POST',
                transformRequest:angular.identity,
                headers:{'Content-Type':undefined, 'Process-Data':false},
                data:fd
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    console.log('Proyecto subido');
                    console.log(response.data);
                }else{
                    alert('Error: '+response.data.error);
                }
            },function errorCallback(response) {
                alert('Error al conectarse al sistema');
            });
        }*/
        uploadArchivo:function (fd) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/upload.php',
                method:'POST',
                transformRequest:angular.identity,
                headers:{'Content-Type':undefined, 'Process-Data':false},
                data:fd
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    alert('Archivo subido');
                    console.log(response.data);
                }else{
                    alert('Error: '+response.data.error);
                }
            }, function errorCallback(response) {
                //alert('Error al conectarse al sistema');
            });
        }
    }
}]);
