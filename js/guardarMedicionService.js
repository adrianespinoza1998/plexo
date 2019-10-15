app.factory("guardarMedicionService",["$window",function ($window) {
    return{
        getCo2:function () {
            return $window.sessionStorage.getItem('co2');
        },
        setCo2:function (value) {
            return $window.sessionStorage.setItem('co2',value);
        },
        getTemperatura:function () {
            return $window.sessionStorage.getItem('temp');
        },
        setTemperatura:function (value) {
            return $window.sessionStorage.setItem('temp',value);
        },
        getHumedad:function () {
            return $window.sessionStorage.getItem('hum');
        },
        setHumedad:function (value) {
            return $window.sessionStorage.setItem('hum',value);
        },
        limpiarDatos:function () {
            $window.sessionStorage.removeItem('co2');
            $window.sessionStorage.removeItem('temp');
            $window.sessionStorage.removeItem('hum');
        }
    }
}]);
