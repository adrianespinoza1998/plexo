app.factory("sessionService",["$window",function ($window) {
    return{
        setSesion:function (value) {
            return $window.sessionStorage.setItem("sesion",value);
        },
        setEmail:function (value) {
            return $window.sessionStorage.setItem("email", value);
        },
        getSesion:function () {
            return $window.sessionStorage.getItem("sesion");
        },
        getEmail:function () {
            return $window.sessionStorage.getItem("email");
        },
        closeSesion:function () {
            return $window.sessionStorage.setItem("sesion","deslogueado");
        },
        getId:function(){
            return $window.sessionStorage.getItem("id");
        },
        setId:function (value) {
            return $window.sessionStorage.setItem("id",value);
        },
        getNombre:function () {
            return $window.sessionStorage.getItem("nombre");
        },
        setNombre:function (value) {
            return $window.sessionStorage.setItem("nombre",value);
        },
        getApPaterno:function () {
            return $window.sessionStorage.getItem("ap_paterno");
        },
        setApPaterno:function (value) {
            return $window.sessionStorage.setItem("ap_paterno",value);
        },
        getApMaterno:function () {
            return $window.sessionStorage.getItem("ap_materno");
        },
        setApMaterno:function (value) {
            return $window.sessionStorage.setItem("ap_materno",value);
        },
        getIdPerfil:function () {
            return $window.sessionStorage.getItem('id_perfil');
        },
        setIdPerfil:function (value) {
            return $window.sessionStorage.setItem('id_perfil',value);
        },
        getIdEmpresa:function () {
            return $window.sessionStorage.getItem('id_empresa');
        },
        setIdEmpresa:function (value) {
            return $window.sessionStorage.setItem('id_empresa',value);
        },
        getRut:function () {
            return $window.sessionStorage.getItem('rut');
        },
        setRut:function (value) {
            return $window.sessionStorage.setItem('rut',value);
        }
    }
}]);
