app.controller("homeCtrl",["$scope", "sessionService", "toggleService", "$location","$window", "medicionService",
    "guardarMedicionService", "proyectoService", "parteHabitacionService","$uibModal",
    "usuarioService","categoriaService", "guardarCategoriaService","edificioService",
    function ($scope, sessionService, toggleService, $location,$window, medicionService,guardarMedicionService,
              proyectoService, parteHabitacionService,$uibModal,usuarioService,categoriaService,
              guardarCategoriaService,edificioService) {

        $scope.showProyecto=false;

        $scope.listaCategoria = [];

        $scope.nodes = [];

        $scope.fechaMantencion = '';

        $scope.propiedadElemento = '';

        $scope.listaProyecto = [];

        $scope.listaEdificio = [];

        $scope.linkProyecto='';

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

        function cargarProyectos() {
            var indice=0;

            var id_empresa = sessionService.getIdEmpresa();

            var listaProyecto=[];
            var listaEdificio=[];

            /*edificioService.getEdificio(id_empresa,function (lista) {
                for(var i=0;i<lista.length;i++){
                    var proyectos=[];

                    indice=i;

                    proyectoService.getProyectos(id_empresa,lista[i].id_edificio,function (listado) {
                        for(var f=0;f<listado.length;f++){
                            proyectos.push(listado[i]);
                            if(indice==0 && f==0){
                                $scope.linkProyecto=listado[i].link_proyecto;
                            }
                        }
                    });

                    listaProyecto.push({'edificio':'','proyectos':proyectos});

                    console.log(listaProyecto[i]);

                    proyectos=[];
                }
            });

            $scope.listaProyecto=listaProyecto;*/

            edificioService.getEdificio(id_empresa,function (listado) {
                for(var f=0;f<listado.length;f++){
                    listaEdificio.push(listado[i]);
                    console.log(listaEdificio[i]);
                }
            });

            proyectoService.getProyectos(id_empresa, 1,function (lista) {
                for (var i = 0; i < lista.length; i++) {
                    if(i==0){
                        $scope.linkProyecto=lista[i].link_proyecto;
                    }
                    listaProyecto.push(lista[i]);
                    console.log(listaProyecto[i]);
                }
            });
            $scope.listaProyecto=listaProyecto;

            console.log($scope.listaProyecto[0]);

            $scope.listaProyecto=[{
                edificio:'Edificio 1',
                nodes:[{
                    proyecto:'Oficina Simioslab'
                }]
            }]

            $scope.linkProyecto='importing_gltf_BananaTree_2.html';
        }

        cargarProyectos();

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

        //var id=sessionService.getId();

        var email=sessionService.getEmail();
        $scope.email=email;

        $scope.hide=false;

        var nombre=sessionService.getNombre();
        $scope.nombre=nombre;

        var ap_paterno=sessionService.getApPaterno();
        $scope.ap_paterno = ap_paterno;

        var ap_materno=sessionService.getApMaterno();
        $scope.ap_materno=ap_materno;

        //var contrasena=sessionService.getContrasena();
        $scope.contrasena='';

        $scope.showSide=toggleService.hideNav;
        $scope.showProyectos=toggleService.hideProyectos;

        toggleService.toggleVentana();

        $scope.activarSideNav=function() {
            toggleService.toggleSideNav();
            $scope.showSide=toggleService.hideNav;
        };

        $scope.cerrarSesion=function () {
            sessionService.closeSesion();
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
                templateUrl:'http://www.plexobuilding.com/plexo/html/actualizar_usuario.html'
            });
        };

        $scope.verMantencion=function () {
            var idMesh=localStorage.getItem("id_mesh");
            if(idMesh==null){
                alert("Por favor, seleccione una parte de la habitación");
            }else{
                var ventanaDatos=$uibModal.open({
                    templateUrl: 'http://www.plexobuilding.com/plexo/html/mantencion.html'
                });
            }
        };

        $scope.verPropiedad=function(){
            var idMesh=localStorage.getItem("id_mesh");
            if(idMesh==null){
                alert("Por favor, seleccione una parte de la habitación");
            }else{
                var ventanaDatos=$uibModal.open({
                    templateUrl: 'http://www.plexobuilding.com/plexo/html/propiedad.html',
                });
            }
        }

        $scope.verElemento=function(){
            var idMesh=localStorage.getItem("id_mesh");
            if(idMesh==null){
                alert("Por favor, seleccione una parte de la habitación");
            }else{
                var ventanaDatos=$uibModal.open({
                    templateUrl: 'http://www.plexobuilding.com/plexo/html/elemento.html',
                });
            }
        }

        $scope.modificar=function () {
            usuarioService.updateUsuario(sessionService.getId(),$scope.email,$scope.contrasena,$scope.nombre,
                $scope.ap_paterno,$scope.ap_materno);
        };

        $scope.anadirCategoria=function () {
            var mensaje=prompt('Ingrese nueva categoría');
        };

        $scope.anadirPropiedad=function () {
            var mensaje=prompt('Ingrese nueva propiedad');
        };

        $scope.toggleProyecto=function () {
            if($scope.showProyecto){
                $scope.showProyecto=false;
            }else{
                $scope.showProyecto=true;
            }
        }
}]);
