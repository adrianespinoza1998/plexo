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
                if(response.data.error==null){
                    return true;
                }else{
                    alert('Error: '+response.data.error);
                    return false;
                }
            }, function errorCallback(response) {
                return false;
            });
        }
    }
}]);
