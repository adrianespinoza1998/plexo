app.controller("homeCtrl",["$scope", "sessionService", "toggleService", "$location","$window", "medicionService",
    "guardarMedicionService", "proyectoService", "parteHabitacionService","$uibModal",
    "usuarioService","categoriaService", "guardarCategoriaService","edificioService","$mdSidenav","loginService",
    function ($scope, sessionService, toggleService, $location,$window, medicionService,guardarMedicionService,
              proyectoService, parteHabitacionService,$uibModal,usuarioService,categoriaService,
              guardarCategoriaService,edificioService,$mdSidenav,loginService) {

        $scope.openLeftMenu = function() {
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

        //var contrasena=sessionService.getContrasena();
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
                   if(i==0){
                       $scope.linkProyecto=lista[i].link_proyecto;
                   }
               }
            });

            $scope.listaProyecto=listaProyectos;
            console.log($scope.linkProyecto);
        }

        cargarProyectos();

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

                    $scope.modificar=function () {
                        if($scope.contrasena==$scope.validarContrasena){
                            usuarioService.updateUsuario(sessionService.getId(),$scope.email,$scope.contrasena,$scope.nombre,
                                $scope.ap_paterno,$scope.ap_materno);
                        }else{
                            alert("Contraseñas no coindiden");
                        }
                    };

                }
            });
        };

        $scope.verMantencion=function () {
            var idMesh=localStorage.getItem("id_mesh");
            if(idMesh==null){
                alert("Por favor, seleccione una parte de la habitación");
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
                alert("Por favor, seleccione una parte de la habitación");
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
                alert("Por favor, seleccione una parte de la habitación");
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
            var iframe=document.getElementById('modelo');
            iframe.innerHTML="<p>Hola</p>"

            var element=iframe.contentWindow.document.getElementById('prueba');

            element.innerHTML="<script>alert('prueba')</script>";
        }
}]);
