app.factory("usuarioService",["$http","sessionService","$mdDialog",function ($http,sessionService,$mdDialog) {
    return{
        updateUsuario:function (id_usuario,correo,contrasena,nombre,ap_paterno,ap_materno,parent,$event,$scope) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/editar_usuario.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'id_usuario='+id_usuario+'&correo='+correo+'&contrasena='+contrasena+'&nombre='+nombre+
                    '&ap_paterno='+ap_paterno+'&ap_materno='+ap_materno
            }).then(function successCallback(response) {
                if(response.data.error=='ninguno'){
                    sessionService.setEmail(response.data.correo);
                    //sessionService.setContrasena(response.data.contrasena);
                    sessionService.setNombre(response.data.nombre);
                    sessionService.setApPaterno(response.data.ap_paterno);
                    sessionService.setApMaterno(response.data.ap_materno);
                    //alert('Datos actualizados');
                    /*$mdDialog.show($mdDialog.alert({
                        textContent:'Datos actualizados',
                        ok:'OK'
                    }));*/
                    $mdDialog.show({
                        parent: parent,
                        targetEvent: $event,
                        template:
                            '<md-dialog aria-label="List dialog">' +
                            '  <md-dialog-content class="text-center">'+
                            '   <div style="padding: 10px">Datos actualizados<div>'+
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
                    var mensaje=response.data.error;
                    console.log(mensaje);
                }
            },function errorCallback(response) {
                //alert('Error al buscar usuarios en base de datos:'+response.data.error);
                /*$mdDialog.show($mdDialog.alert({
                    textContent:'Error al buscar usuarios en base de datos:'+response.data.error,
                    ok:'OK'
                }));*/
                $mdDialog.show({
                    parent: parent,
                    targetEvent: $event,
                    template:
                        '<md-dialog aria-label="List dialog">' +
                        '  <md-dialog-content class="text-center">'+
                        '   <div style="padding: 10px">Error al buscar usuarios en base de datos: '+response.data.error+'<div>'+
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
            });
        },
        createUsuario:function (nombre,ap_paterno,ap_materno,rut,id_empresa,correo,dv) {
            $http({
                url:'https://www.plexobuilding.com/plexo/webservices/crear_usuario.php',
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:'nombre='+nombre+'&ap_paterno='+ap_paterno+'&ap_materno='+ap_materno+'&rut='+rut+'&id_empresa='
                    +id_empresa+'&correo='+correo+'&dv='+dv
            }).then(function successCallback(response) {
                if(response.data.error==null){
                    //alert('Usuario creado');
                    $mdDialog.show($mdDialog.alert({
                        textContent:'Usuario creado',
                        ok:'OK'
                    }));
                }else{
                    //alert('Error al crear usuario');
                    $mdDialog.show($mdDialog.alert({
                        textContent:'Error al crear usuario: '+response.data.error,
                        ok:'OK'
                    }));
                    console.log(response.data.error);
                }
            }, function errorCallback(response) {
                //alert('Error al conectarse a la BD');
                $mdDialog.show($mdDialog.alert({
                    textContent:'Error al conectarse a la BD',
                    ok:'OK'
                }));
            });
        }
    }
}]);
