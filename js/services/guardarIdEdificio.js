app.factory('guardarIdEdificio',["$window",function ($window) {
    return{
        getIdEdificio:function () {
            return $window.localStorage.getItem('guardar_id_edificio');
        },
        setIdEdificio:function (value) {
            return $window.localStorage.setItem('guardar_id_edificio',value);
        },
        getIdEmpresa:function () {
            return $window.localStorage.getItem('guardar_id_empresa');
        },
        setIdEmpresa:function (value) {
            return $window.localStorage.setItem('guardar_id_empresa',value);
        },
        getIdTipoProyecto:function () {
            return $window.localStorage.getItem('guardar_id_tipo_proyecto');
        },
        setIdTipoProyecto:function (value) {
            return $window.localStorage.setItem('guardar_id_tipo_proyecto',value);
        },
        getIdAdmin:function () {
            return $window.localStorage.getItem('guardar_id_admin');
        },
        setIdAdmin:function (value) {
            return $window.localStorage.setItem('guardar_id_admin',value);
        },
        getIdRecinto:function () {
            return $window.localStorage.getItem('guardar_id_recinto');
        },
        setIdRecinto:function (value) {
            return $window.localStorage.setItem('guardar_id_recinto',value);
        }
    }
}])
