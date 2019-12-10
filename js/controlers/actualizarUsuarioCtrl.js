app.controller("actualizarUsuarioCtrl",["$scope","sessionService","editarUsuarioService",
    function ($scope, sessionService, editarUsuarioService) {
    var nombre=sessionService.getNombre()
    $scope.nombre=nombre;

    var ap_paterno=sessionService.getApPaterno();
    $scope.ap_paterno=ap_paterno;

    var ap_materno=sessionService.getApMaterno();
    $scope.ap_materno=ap_materno;

    var email=sessionService.getEmail();
    $scope.email=email;

    var contrasena=sessionService.getContrasena();
    $scope.contrasena=contrasena;

    $scope.modificar=function () {
        var id=sessionService.getId();
        editarUsuarioService.updateUsuario(id,$scope.email,$scope.contrasena,$scope.nombre,$scope.ap_paterno,$scope.ap_materno);
    }
}]);
