app.controller("loginCtrl",["$scope","loginService","$uibModal",
    function ($scope, loginService,$uibModal) {

    $scope.mail="";
    $scope.pass="";

    $scope.forgotPassword=function(){
        var ventana=$uibModal.open({
            templateUrl:'https://www.plexobuilding.com/plexo/html/forgot_email.html'
        });
    }

    $scope.login=function () {
        var email=$scope.mail;
        var passw=$scope.pass;
        loginService.login(email,passw);
    };
}]);
