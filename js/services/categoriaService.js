app.factory("categoriaService",["$http","guardarCategoriaService",function ($http,guardarCategoriaService) {
    return{
        getCategoria:function (id_categoria) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/get_categoria.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'id_categoria='+id_categoria
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    guardarCategoriaService.setLargoDatos(response.data.length);
                    var id_categoria=response.data.id_categoria;
                    var categoria=response.data.categoria;

                    console.log(categoria);
                    guardarCategoriaService.setCategoria('categoria['+id_categoria+']',categoria);
                }else{
                    console.log('No hay categorias');
                    guardarCategoriaService.setLargoDatos(1);
                    guardarCategoriaService.setCategoria('categoria[0]','---');
                }
            }, function errorCallback(response) {
                console.log('Error al  obtener categoria');
            });
        }
    }
}]);
