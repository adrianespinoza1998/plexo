app.factory("tipoProyectoService",["$http",function ($http) {
    return{
        getTipoProyecto:function (callback) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/get_tipo_proyecto.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'usuario=DmXFjQIwcwq8DdP4hu3c&contrasena=HTG1PyX9t1USjOHJk3Km'
            }).then(function successcallback(response) {
                if(response.data.length>0){
                    var tiposProyectos=[];

                    for(var i=0;i<response.data.length;i++){
                        tiposProyectos.push(response.data[i]);
                    }

                    callback(tiposProyectos);
                }
            },function errorcallback(response) {
                console.log('Error al cargar tipo de proyecto');
            });
        }
    }
}]);
