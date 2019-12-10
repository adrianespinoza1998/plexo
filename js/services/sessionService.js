app.factory("sessionService",["$window",function ($window) {
    return{
        setSesion:function (value) {
            return $window.localStorage.setItem("sesion",value);
        },
        setEmail:function (value) {
            return $window.localStorage.setItem("email", value);
        },
        getSesion:function () {
            return $window.localStorage.getItem("sesion");
        },
        getEmail:function () {
            return $window.localStorage.getItem("email");
        },
        closeSesion:function () {
            return $window.localStorage.setItem("sesion","deslogueado");
        },
        getId:function(){
            return $window.localStorage.getItem("id");
        },
        setId:function (value) {
            return $window.localStorage.setItem("id",value);
        },
        getNombre:function () {
            return $window.localStorage.getItem("nombre");
        },
        setNombre:function (value) {
            return $window.localStorage.setItem("nombre",value);
        },
        getApPaterno:function () {
            return $window.localStorage.getItem("ap_paterno");
        },
        setApPaterno:function (value) {
            return $window.localStorage.setItem("ap_paterno",value);
        },
        getApMaterno:function () {
            return $window.localStorage.getItem("ap_materno");
        },
        setApMaterno:function (value) {
            return $window.localStorage.setItem("ap_materno",value);
        },
        getIdPerfil:function () {
            return $window.localStorage.getItem('id_perfil');
        },
        setIdPerfil:function (value) {
            return $window.localStorage.setItem('id_perfil',value);
        },
        getIdEmpresa:function () {
            return $window.localStorage.getItem('id_empresa');
        },
        setIdEmpresa:function (value) {
            return $window.localStorage.setItem('id_empresa',value);
        }
    }
}]);
