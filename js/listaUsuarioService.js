app.factory("listaUsuarioService",["$http",function ($http) {
    return{
        getListaUsuario:function (id_empresa,callback) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/get_usuarios.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'id_empresa='+id_empresa
            }).then(function successCallback(response) {
                if(response.data.length>0){
                    var listaUsuarios=[];

                    for(var i=0;i<response.data.length;i++){
                        listaUsuarios.push(response.data[i]);
                    }

                    callback(listaUsuarios);
                }
            },function errorCallback(response) {
                console.log('Error al obtener lista de usuarios');
            });
        }
    }
}]);
