app.factory('guardarCrearService',["$window",function ($window) {
    return{
        getCrear:function () {
            return $window.localStorage.getItem('crear');
        },
        setCrear:function (value) {
            return $window.localStorage.setItem('crear',value);
        },
        getEmpresaSelected:function () {
            return $window.localStorage.getItem('empresa_selected');
        },
        setEmpresaSelected:function (value) {
            return $window.localStorage.setItem('empresa_selected',value);
        },
        getTipoProyectoSelected:function () {
            return $window.localStorage.getItem('tipo_proyecto_selected');
        },
        setTipoProyectoSelected:function (value) {
            return $window.localStorage.setItem('tipo_proyecto_selected',value);
        },
        getAdminSelected:function () {
            return $window.localStorage.getItem('admin_selected');
        },
        setAdminSelected:function (value) {
            return $window.localStorage.setItem('admin_selected',value);
        },
        getEdificioSelected:function () {
            return $window.localStorage.getItem('edificio_selected');
        },
        setEdificioSelected:function (value) {
            return $window.localStorage.setItem('edificio_selected',value);
        },
        getRecintoSelected:function () {
            return $window.localStorage.getItem('recinto_selected');
        },
        setRecintoSelected:function (value) {
            return $window.localStorage.setItem('recinto_selected',value);
        },
        getNombre:function () {
            return $window.localStorage.getItem('nombre_proyecto');
        },
        setNombre:function (value) {
            return $window.localStorage.setItem('nombre_proyecto',value);
        },
        getDireccion:function () {
            return $window.localStorage.getItem('direccion_proyecto');
        },
        setDireccion:function (value) {
            return $window.localStorage.setItem('direccion_proyecto',value);
        },
        limpiar:function () {
            return $window.localStorage.clear();
        }
    }
}]);
