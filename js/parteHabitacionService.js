app.factory("parteHabitacionService",["$http",function ($http) {
    return{
        setMaterialHabitacion:function (id_parte_habitacion,material) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/update_parte_habitacion.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'id_parte_habitacion='+id_parte_habitacion+'&material='+material
            }).then(function successCallback(response) {
                if(response.data.estado=='datos actualizados'){
                    alert('Material actualizado');
                }
            },function errorCallback(response) {
                console.log('Error al buscar habitación:'+response.data.message);
            });
        }
    }
}]);
