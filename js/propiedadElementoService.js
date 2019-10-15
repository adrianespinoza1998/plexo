app.factory("propiedadElementoService",["$http","guardarPropiedadService",function ($http,guardarPropiedadService) {
    return{
        getPropiedades:function (mesh,id_proyecto) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/get_propiedad.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'mesh='+mesh+'&id_proyecto='+id_proyecto
            }).then(function successCallback(response) {
                if(response.data.error=='no existe propiedad'){
                    var id_propiedad='';
                    var id_categoria='';
                    var valor='';

                    guardarPropiedadService.setId_propiedad(id_propiedad);
                    guardarPropiedadService.setId_categoria(id_categoria);
                    guardarPropiedadService.setValor(valor);
                }else{
                    var id_propiedad=response.data.id_propiedad;
                    var id_categoria=response.data.id_categoria;
                    var valor=response.data.valor;

                    guardarPropiedadService.setId_propiedad(id_propiedad);
                    guardarPropiedadService.setId_propiedad(id_categoria);
                    guardarPropiedadService.setValor(valor);
                }
            }, function errorCallback(response) {
                alert('Error al buscar elemento:'+response.data.message);
            });
        }
    }
}]);
