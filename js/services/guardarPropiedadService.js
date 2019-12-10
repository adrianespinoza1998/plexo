app.factory("guardarPropiedadService",["$window",function ($window) {
    return{
        getId_propiedad:function () {
            return $window.sessionStorage.getItem('id_propiedad');
        },
        setId_propiedad:function (value) {
            return $window.sessionStorage.setItem('id_propiedad',value);
        },
        getId_categoria:function () {
            return $window.sessionStorage.getItem('id_categoria');
        },
        setId_categoria:function (value) {
            return $window.sessionStorage.setItem('id_categoria',value);
        },
        getValor:function () {
            return $window.sessionStorage.getItem('valor');
        },
        setValor:function (value) {
            return $window.sessionStorage.setItem('valor',value);
        }
    }
}]);
