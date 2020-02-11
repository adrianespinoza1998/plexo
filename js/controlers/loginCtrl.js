app.controller("loginCtrl",["$scope","loginService","$uibModal","$timeout","$window","$mdDialog",
    function ($scope, loginService,$uibModal,$timeout,$window,$mdDialog) {

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

    /*$scope.mostrar=function (){
        $timeout(function () {
            this.circulo=true;
        },3000);
    }*/

    $timeout(function () {
        this.circulo=true;
        this.mostrarPagina=true;
    },3000);

    $scope.forgotPassword=function(){
        var ventana=$uibModal.open({
            templateUrl:'https://www.plexobuilding.com/plexo/html/forgot_email.html',
            controller: function ($scope,$uibModalInstance,recuperarContrasenaService) {
                $scope.cerrarEmail=function () {
                    $uibModalInstance.close();
                }

                $scope.email="";

                $scope.recuperar=function ($event){
                    if($scope.email!=''){
                        var parent=angular.element(document.getElementById('ventanaForgot'));
                        recuperarContrasenaService.forgotPassword($scope.email,parent,$event);
                    }else{
                        var parent=angular.element(document.getElementById('ventanaForgot'));
                        $mdDialog.show({
                            parent: parent,
                            targetEvent: $event,
                            template:
                                '<md-dialog aria-label="List dialog">' +
                                '  <md-dialog-content class="text-center">'+
                                '   <div style="padding: 10px">Email vacio<div>'+
                                '    <md-button ng-click="closeDialog()" class="md-primary">' +
                                '      Ok' +
                                '    </md-button>' +
                                '  </md-dialog-actions>' +
                                '</md-dialog>',
                            locals: {
                                items: $scope.items
                            },
                            controller: function ($scope, $mdDialog, items) {
                                $scope.items = items;
                                $scope.closeDialog = function() {
                                    $mdDialog.hide();
                                }
                            }
                        });
                    }
                }
            }
        });
    }

    $scope.login=function () {
        if($scope.mail!='' && $scope.pass!=''){
            if($scope.isChecked){
                loginService.guardarSesion($scope.mail,$scope.pass);
            }

            var email=$scope.mail;
            var passw=$scope.pass;
            loginService.login(email,passw);
        }else{
            $mdDialog.show($mdDialog.alert({
                textContent:'Uno o más campos vacios',
                ok:'OK'
            }));
        }
    };

    $scope.$on('$viewContentLoaded',function () {
        $scope.circulo=true;
        $scope.mostrarPagina=true;
    })
}]);
