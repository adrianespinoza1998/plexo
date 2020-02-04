app.factory("recuperarContrasenaService",["$http",function ($http) {
    return{
        forgotPassword:function (email) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/recuperar_email.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'email='+email
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    alert(response.data.estado);
                }else{
                    alert(response.data.error);
                }
            },function errorCallback(response) {
                    console.log('Error al conectarse a la base de datos');
            })
        }
    }
}]);
