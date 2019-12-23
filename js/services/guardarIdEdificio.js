app.factory('guardarIdEdificio',["$window",function ($window) {
    return{
        getIdEdificio:function () {
            return $window.sessionStorage.getItem('id_edificio');
        },
        setIdEdificio:function (value) {
            return $window.sessionStorage.setItem('id_edificio',value);
        }
    }
}])
