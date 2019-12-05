app.factory("guardarIdProyecto",["$window",function ($window) {
    return{
        getIdProyecto:function () {
            return $window.sessionStorage.getItem('id_proyecto');
        },
        setIdProyecto:function (value) {
            return $window.sessionStorage.setItem('id_proyecto',value);
        }
    }
}]);
