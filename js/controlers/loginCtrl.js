app.controller("loginCtrl",["$scope","loginService","$uibModal","$timeout","$window",
    function ($scope, loginService,$uibModal,$timeout,$window) {

    $scope.mostrarPagina=false;

    loginService.getSesion(function (correo,contrasena) {
        if(correo!=null){
            loginService.login(correo,contrasena);
        }else{
            $scope.mostrarPagina=true;
        }
    });

    $scope.isChecked=false;

    $scope.mail="";
    $scope.pass="";

    $scope.circulo=false;

    $scope.mostrar=function (){
        $timeout(function () {
            this.circulo=true;
        },3000);
    }

    $scope.forgotPassword=function(){
        var ventana=$uibModal.open({
            templateUrl:'https://www.plexobuilding.com/plexo/html/forgot_email.html',
            controller: function ($scope,$uibModalInstance,recuperarContrasenaService) {
                $scope.cerrarEmail=function () {
                    $uibModalInstance.close();
                }

                $scope.email="";

                $scope.recuperar=function (){
                    recuperarContrasenaService.forgotPassword($scope.email);
                }
            }
        });
    }

    $scope.login=function () {
        if($scope.isChecked){
            loginService.guardarSesion($scope.mail,$scope.pass);
        }

        var email=$scope.mail;
        var passw=$scope.pass;
        loginService.login(email,passw);
    };
}]);
