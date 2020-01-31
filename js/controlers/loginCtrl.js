app.controller("loginCtrl",["$scope","loginService","$uibModal","$timeout","$window",
    function ($scope, loginService,$uibModal,$timeout,$window) {

    /*$window.sessionStorage.clear();
    $window.localStorage.clear();*/

    $scope.isChecked=false;

    $scope.mail="";
    $scope.pass="";

    $scope.circulo=false;

    $scope.mostrar=function (){
        $timeout(function () {
            this.circulo=true;
        },2000);
    }

    $scope.forgotPassword=function(){
        var ventana=$uibModal.open({
            templateUrl:'https://www.plexobuilding.com/plexo/html/forgot_email.html',
            controller: function ($scope,$uibModalInstance,recuperarContrasenaService) {
                $scope.cerrarEmail=function () {
                    $uibModalInstance.close();
                }

                $scope.email='';

                $scope.recuperar=function (){
                    recuperarContrasenaService.forgotPassword($scope.email);
                }
            }
        });
    }

    $scope.login=function () {
        var email=$scope.mail;
        var passw=$scope.pass;
        loginService.login(email,passw);
    };
}]);
