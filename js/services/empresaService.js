app.factory("empresaService",["$http",function ($http) {
    return{
        getEmpresa:function (callback) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/get_empresa.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'usuario=DmXFjQIwcwq8DdP4hu3c&contrasena=HTG1PyX9t1USjOHJk3Km'
            }).then(function successCallback(response) {
                if(response.data.length>0){
                    var listaEmpresas=[];

                    for(var i=0;i<response.data.length;i++){
                        listaEmpresas.push(response.data[i]);
                    }

                    callback(listaEmpresas);
                }
            },function errorCallback(response) {
                console.log("Error al obtener empresas en base de datos");
            });
        },
        createEmpresa:function (nombre_empresa,direccion,nro,telefono) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/crear_empresa.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'nombre_empresa='+nombre_empresa+'&direccion='+direccion+'&nro='+nro+'&telefono='+telefono
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    alert('Empresa Creada');
                }else{
                    alert('Error al crear empresa: '+response.data.error);
                }
            }, function errorCallback(response) {
                console.log('Error al introducir datos a bd');
            });
        }
    }
}]);
