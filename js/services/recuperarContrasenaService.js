app.factory("recuperarContrasenaService",["$http","$mdDialog",function ($http,$mdDialog) {
    return{
        forgotPassword:function (email,parent,$event) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/recuperar_email.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'email='+email
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    //alert(response.data.estado);
                    /*$mdDialog.show($mdDialog.alert({
                        textContent:response.data.estado,
                        ok:'OK'
                    }));*/
                    $mdDialog.show({
                        parent: parent,
                        targetEvent: $event,
                        template:
                            '<md-dialog aria-label="List dialog">' +
                            '  <md-dialog-content class="text-center">'+
                            '   <div style="padding: 10px">'+response.data.estado+'<div>'+
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
                }else{
                    //alert(response.data.error);
                    /*$mdDialog.show($mdDialog.alert({
                        textContent:response.data.error,
                        ok:'OK'
                    }));*/
                    $mdDialog.show({
                        parent: parent,
                        targetEvent: $event,
                        template:
                            '<md-dialog aria-label="List dialog">' +
                            '  <md-dialog-content class="text-center">'+
                            '   <div style="padding: 10px">'+response.data.error+'<div>'+
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
            },function errorCallback(response) {
                    console.log('Error al conectarse a la base de datos');
            })
        }
    }
}]);
