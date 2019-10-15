app.factory("guardarCategoriaService",["$window",function ($window) {
    return{
        getCategoria:function (key) {
            return $window.sessionStorage.getItem(key);
        },
        setCategoria:function (key,value) {
            return $window.sessionStorage.setItem(key,value);
        },
        getLargoDatos:function () {
            return $window.sessionStorage.getItem('largo_categoria');
        },
        setLargoDatos:function (value) {
            return $window.sessionStorage.setItem('largo_categoria',value);
        }
    }
}]);
