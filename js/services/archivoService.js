app.factory("archivoService",["$http",function ($http) {
    return{
        uploadArchivo:function (fd,callback) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/upload.php',
                method:'POST',
                transformRequest:angular.identity,
                headers:{'Content-Type':undefined, 'Process-Data':false},
                data:fd
            }).then(function successCallback(response) {
                if(response.data.error!=null){
                    console.log('Error: '+response.data.error);
                }else{
                    callback(response.data.file_name);
                }
            }, function errorCallback(response) {
                console.log('Error al conectarse a la base de datos');
            });
        },
        deleteArchivo:function (nombre_archivo) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/delete_archivo.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'nombre_archivo='+nombre_archivo
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    console.log('Archivo eliminado');
                }else{
                    console.log('Error: '+response.data.error);
                }
            },function errorCallback(response) {
                console.log('Error al conectarse a plexo');
            });
        }
    }
}]);
