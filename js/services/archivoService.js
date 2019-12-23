app.factory("archivoService",["$http",function ($http) {
    return{
        uploadArchivo:function (fd) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/upload.php',
                method:'POST',
                transformRequest:angular.identity,
                headers:{'Content-Type':undefined, 'Process-Data':false},
                data:fd
            }).then(function successCallback(response) {
                if(response.data.error!=null){
                    console.log('Error: '+response.data.error);
                }
            }, function errorCallback(response) {
                console.log('Error al conectarse a la base de datos');
            });
        }
    }
}]);
