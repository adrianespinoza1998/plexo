app.controller("homeCtrl",["$scope", "sessionService", "toggleService", "$location","$window", "medicionService",
    "guardarMedicionService", "proyectoService", "parteHabitacionService","$uibModal",
    "usuarioService","categoriaService", "guardarCategoriaService","edificioService","$mdSidenav","loginService","$mdDialog",
    "$document",
    function ($scope, sessionService, toggleService, $location,$window, medicionService,guardarMedicionService,
              proyectoService, parteHabitacionService,$uibModal,usuarioService,categoriaService,
              guardarCategoriaService,edificioService,$mdSidenav,loginService,$mdDialog,$document) {

        var idPerfil=sessionService.getIdPerfil();
        $scope.idPerfil=idPerfil;

        $scope.mostrarAdministrar=false;

        if($scope.idPerfil=='1'){
            $scope.mostrarAdministrar=true;
        }

        $scope.administrar=function(){
            $location.path('/home_admin');
        }

        $scope.openLeftMenu = function() {
            $mdSidenav('left').toggle();
        }

        $scope.onload=function(){
            $mdSidenav('left').toggle();
        }

        $scope.mostrarOpciones=true;

        $scope.toggleOpciones=function(){
            $scope.mostrarOpciones=!$scope.mostrarOpciones;
        }

        $scope.showProyecto=false;

        $scope.listaCategoria = [];

        $scope.nodes = [];

        $scope.fechaMantencion = '';

        $scope.propiedadElemento = '';

        $scope.listaProyecto = [];

        $scope.listaEdificio = [];

        $scope.linkProyecto='';

        var id=sessionService.getId();

        var email=sessionService.getEmail();
        $scope.email=email;

        var nombre=sessionService.getNombre();
        $scope.nombre=nombre;

        var ap_paterno=sessionService.getApPaterno();
        $scope.ap_paterno = ap_paterno;

        $scope.hide=false;

        $scope.contrasena='';

        $scope.showSide=toggleService.hideNav;
        $scope.showProyectos=toggleService.hideProyectos;

        function cargarProyectos() {
            var listaProyectos=[];

            console.log(id);

            proyectoService.getProyectos(id,function (lista) {
               for(var i=0;i<lista.length;i++){
                   listaProyectos.push(lista[i]);
                   console.log(listaProyectos[i]);
               }
            });

            return listaProyectos;
        }

        $scope.listaProyecto=cargarProyectos();

        var cargarDatos = setInterval(cargarMedicion, 5000);

        function cargarMedicion() {
            var numCajas = 2;

            if (localStorage.getItem('co2_2' != null)) {
                guardarMedicionService.limpiarDatos();
            }

            medicionService.getMedicion(2);

            localStorage.setItem('co2_2', guardarMedicionService.getCo2());
            localStorage.setItem('temp_2', guardarMedicionService.getTemperatura());
            localStorage.setItem('hum_2', guardarMedicionService.getHumedad());
        }

        cargarMedicion();

        for(var i=0;i<$scope.listaProyecto.length;i++){
            console.log($scope.listaProyecto[i]);
        }

        if(localStorage.getItem("id_mesh")!=null){
            localStorage.removeItem("id_mesh");
        }

        categoriaService.getCategoria(1);

        for(var i=0;i<parseInt(guardarCategoriaService.getLargoDatos());i++){
            $scope.listaCategoria.push(guardarCategoriaService.getCategoria('categoria['+i+']'));
            console.log('categoria:'+$scope.listaCategoria[i]);
        }

        toggleService.toggleVentana();

        $scope.activarSideNav=function() {
            toggleService.toggleSideNav();
            $scope.showSide=toggleService.hideNav;
        };

        $scope.cerrarSesion=function () {
            sessionService.closeSesion();
            loginService.destroySesion();
            $window.location.href='../index.html';
        };

        $scope.cargarProyecto=function(proyecto){
            for(var i=0;i<parseInt(guardarProyectoService.getLargoProyecto());i++){
                if(guardarProyectoService.getNombreProyecto('nom_'+i)==proyecto){
                    $scope.linkProyecto=guardarProyectoService.getLinkProyecto('link_'+i);
                    localStorage.removeItem("id_mesh");
                }
            }
        };

        $scope.mostrarProyectos=function () {
            toggleService.toggleProyectos();
            $scope.showProyectos=toggleService.hideProyectos;
        };

        $scope.editarDatos=function () {
            var modal=$uibModal.open({
                templateUrl:'https://www.plexobuilding.com/plexo/html/actualizar_usuario.html',
                controller: function ($scope,$uibModalInstance,sessionService) {
                    $scope.cerrarDatos=function () {
                        $uibModalInstance.close();
                    }

                    var email=sessionService.getEmail();
                    $scope.email=email;

                    var nombre=sessionService.getNombre();
                    $scope.nombre=nombre;

                    var ap_paterno=sessionService.getApPaterno();
                    $scope.ap_paterno = ap_paterno;

                    var ap_materno=sessionService.getApMaterno();
                    $scope.ap_materno=ap_materno;

                    $scope.contrasena='';

                    $scope.validarContrasena='';

                    $scope.modificar=function ($event) {
                        if($scope.nombre!='' & $scope.ap_paterno!='' && $scope.ap_materno!='' && $scope.email!='' &&
                        $scope.contrasena!='' && $scope.validarContrasena!='',parent,$event){
                            if($scope.contrasena==$scope.validarContrasena){
                                var parent=angular.element(document.getElementById('ventanaUsuario'));
                                usuarioService.updateUsuario(sessionService.getId(),$scope.email,$scope.contrasena,$scope.nombre,
                                    $scope.ap_paterno,$scope.ap_materno,parent,$event,$scope);
                            }else{
                                var parent=angular.element(document.getElementById('ventanaUsuario'));
                                $mdDialog.show({
                                    parent: parent,
                                    targetEvent: $event,
                                    template:
                                        '<md-dialog aria-label="List dialog">' +
                                        '  <md-dialog-content class="text-center">'+
                                        '   <div style="padding: 10px">Contraseñas no coinciden<div>'+
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
                        }else{
                            var parent=angular.element(document.getElementById('ventanaUsuario'));
                            $mdDialog.show({
                                parent: parent,
                                targetEvent: $event,
                                template:
                                    '<md-dialog aria-label="List dialog">' +
                                    '  <md-dialog-content class="text-center">'+
                                    '   <div style="padding: 10px">Uno o más campos vacios<div>'+
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
                    };

                }
            });
        };

        $scope.verMantencion=function () {
            var idMesh=localStorage.getItem("id_mesh");
            if(idMesh==null){
                //alert("Por favor, seleccione una parte de la habitación");
                $mdDialog.show($mdDialog.alert({
                    textContent:'Por favor, seleccione una parte de la habitación',
                    ok:'OK'
                }));
            }else{
                var ventanaDatos=$uibModal.open({
                    templateUrl: 'https://www.plexobuilding.com/plexo/html/mantencion.html',
                    controller: function ($scope,$uibModalInstance) {
                        $scope.cerrarMantencion=function () {
                            $uibModalInstance.close();
                        }
                    }
                });
            }
        };

        $scope.verPropiedad=function(){
            var idMesh=localStorage.getItem("id_mesh");
            if(idMesh==null){
                //alert("Por favor, seleccione una parte de la habitación");
                $mdDialog.show($mdDialog.alert({
                    textContent:'Por favor, seleccione una parte de la habitación',
                    ok:'OK'
                }));
            }else{
                var ventanaDatos=$uibModal.open({
                    templateUrl: 'https://www.plexobuilding.com/plexo/html/propiedad.html',
                    controller: function ($scope,$uibModalInstance) {
                        $scope.cerrarPropiedad=function () {
                            $uibModalInstance.close();
                        }
                    }
                });
            }
        }

        $scope.verElemento=function(){
            var idMesh=localStorage.getItem("id_mesh");
            if(idMesh==null){
                $mdDialog.show($mdDialog.alert({
                    textContent:'Por favor, seleccione una parte de la habitación',
                    ok:'OK'
                }));
            }else{
                var ventanaDatos=$uibModal.open({
                    templateUrl: 'https://www.plexobuilding.com/plexo/html/elemento.html',
                    controller: function ($scope,$uibModalInstance) {
                        $scope.cerrarElemento=function () {
                            $uibModalInstance.close();
                        }
                    }
                });
            }
        }

        $scope.anadirCategoria=function () {
            var mensaje=prompt('Ingrese nueva categoría');
        };

        $scope.anadirPropiedad=function () {
            var mensaje=prompt('Ingrese nueva propiedad');
        };

        $scope.toggleProyecto=function (link) {
            $scope.linkProyecto=link;
            console.log($scope.linkProyecto);
        }
        
        $scope.crearEstancia=function () {
            var iframe = document.getElementById("modelo");
            var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

            innerDoc.getElementById('crearEstancia').innerHTML="var crearEstancia=new xeogl.Mesh({\n" +
                "\n" +
                "        geometry: new xeogl.PlaneGeometry({\n" +
                "            primitive: \"triangles\",\n" +
                "            center: ["+localStorage.getItem('coord_0')+",0.001,"+localStorage.getItem('coord_1')+"],\n" +
                "            xSize: 1,\n" +
                "            zSize: 1,\n" +
                "            xSegments: 10,\n" +
                "            zSegments: 10\n" +
                "        }),\n" +
                "\n" +
                "        material: new xeogl.PhongMaterial({\n" +
                "            diffuseMap: new xeogl.Texture({\n" +
                "                src: 'https://www.plexobuilding.com/plexo/xeogl-master/examples/textures/diffuse/UVCheckerMap08-1024.png'\n" +
                "            })\n" +
                "        })\n" +
                "    });" +
                "" +
                "crearEstancia.highlighted=true";

            console.log(localStorage.getItem('coord_0'));
            console.log(localStorage.getItem('coord_1'));
        }

        $scope.definirEstancia=function () {
            var iframe = document.getElementById("modelo");
            var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

            innerDoc.getElementById('definirEstancia').innerHTML="var definirEstancia=new xeogl.Mesh({\n" +
                "\n" +
                "            geometry: new xeogl.BoxGeometry({\n" +
                "                center: [-0.3,0.3,0.2],\n" +
                "                xSize: 0.3,  // Half-size on each axis; BoxGeometry is actually two units big on each side.\n" +
                "                ySize: 0.3,\n" +
                "                zSize: 0.3\n" +
                "            }),\n" +
                "\n" +
                "            material: new xeogl.PhongMaterial({\n" +
                "                diffuseMap: new xeogl.Texture({\n" +
                "                    src: \"https://www.plexobuilding.com/plexo/xeogl-master/examples/textures/diffuse/UVCheckerMap08-1024.png\"\n" +
                "                })\n" +
                "            })\n" +
                "        });" +
                "" +
                "definirEstancia.highlighted=true;"
        }
}]);
