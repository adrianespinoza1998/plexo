app.controller("homeAdminCtrl",["$scope", "sessionService", "toggleService", "$location","$window","$uibModal",
    "usuarioService","tipoProyectoService","empresaService","listaUsuarioService","edificioService",
    "recintoService","estanciaService","medicionService","archivoService","proyectoService", "guardarIdEdificio",
    "$mdSidenav","$route","guardarCrearService","$parse","$interval","$timeout","loginService","$mdDialog",
    function ($scope, sessionService, toggleService, $location,$window,$uibModal,usuarioService,
              tipoProyectoService,empresaService,listaUsuarioService,edificioService,recintoService,
              estanciaService,medicionService,archivoService,proyectoService,guardarIdEdificio,
              $mdSidenav,$route,guardarCrearService,$parse,$interval,$timeout,loginService,$mdDialog) {

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

    $scope.seleccionarCrear=function(link){
        $scope.linkOpcion=link;
        guardarCrearService.setCrear(link);
    }

    $scope.customer={};

    $scope.listaOpciones=[{title:'Empresa',link:'html/crear_empresa.html'},{title:'Usuario',link:'html/crear_usuario.html'}
    ,{title:'Proyecto',link:'html/crear_proyecto.html'}]

    //Mostrar estancias
    $scope.numEstancias=1;

    $scope.linkOpcion="";

    $scope.showCrear=false;

    $scope.changeCrear=function(){
        if($scope.showCrear){
            $scope.showCrear=false;
        }else{
            $scope.showCrear=true;
        }
    }

    //Datos empresa
    $scope.nombreEmpresa='';
    $scope.direccionEmpresa='';
    $scope.nro='';
    $scope.telefonoEmpresa='';

    //Datos usuario
    $scope.nombre_usuario='';
    $scope.ap_paterno_usuario='';
    $scope.ap_materno_usuario='';
    $scope.rut='';
    $scope.dv='';
    $scope.id_empresa_usuario='';
    $scope.correo_usuario='';
    $scope.validarContrasena='';
    $scope.listaDv=['0','1','2','3','4','5','6','7','8','9','k'];

    //Datos edificio
    $scope.nombreEdificio='';
    $scope.direccionEdificio='';
    $scope.nroEdificio='';
    $scope.numPisos='';

    //Datos recinto
    $scope.idEdificio='';
    $scope.nombreRecinto='';
    $scope.numPiso='';
    $scope.idRecinto='';

    //Datos proyecto
    $scope.idEmpresa='';
    $scope.idTipoProyecto='';

    var nombreProyecto='';
    var direccionProyecto='';

    $scope.nombreProyecto='';

    $interval(function () {
        guardarCrearService.setNombre($scope.nombreProyecto);
    },500);

    $scope.empresaSelected='';
    $scope.tipoProyectoSelected='';
    $scope.adminSelected='';
    $scope.edificioSelected='';
    $scope.recintoSelected='';

    $scope.getAdmin=function (id_empresa) {
        $scope.listaUsuarios=getAdmin(id_empresa);
        $scope.idEmpresa=id_empresa;
        guardarIdEdificio.setIdEmpresa(id_empresa);
        console.log($scope.idEmpresa);
    }

    if(guardarCrearService.getCrear()!=null){
        $scope.linkOpcion=guardarCrearService.getCrear();

        if(guardarCrearService.getEmpresaSelected()!=null){
            $scope.empresaSelected=guardarCrearService.getEmpresaSelected();
            $scope.idEmpresa=guardarCrearService.getEmpresaSelected();
            console.log(guardarCrearService.getEmpresaSelected());
            $scope.getAdmin(guardarCrearService.getEmpresaSelected());

            if(guardarCrearService.getAdminSelected()!=null){
                $scope.adminSelected=guardarCrearService.getAdminSelected();
                $scope.idAdmin=guardarCrearService.getAdminSelected();
                console.log(guardarCrearService.getAdminSelected());
            }
        }

        if(guardarCrearService.getTipoProyectoSelected()!=null){
            $scope.tipoProyectoSelected=guardarCrearService.getTipoProyectoSelected();
            console.log(guardarCrearService.getTipoProyectoSelected());
        }

        if(guardarCrearService.getEdificioSelected()!=null){
            $scope.listaEdificio=cargarEdificios();
            $scope.edificioSelected=guardarCrearService.getEdificioSelected();
            $scope.idEdificio=guardarCrearService.getEdificioSelected();
            guardarIdEdificio.setIdEdificio(guardarCrearService.getEdificioSelected());
            console.log(guardarCrearService.getEdificioSelected());
        }

        $scope.listaRecintos=cargarRecintos(guardarIdEdificio.getIdEdificio());

        if(guardarCrearService.getRecintoSelected()!=null){
            $scope.recintoSelected=guardarCrearService.getRecintoSelected();
            $scope.idRecinto=guardarCrearService.getRecintoSelected();
            console.log(guardarCrearService.getRecintoSelected());
        }

        if(guardarCrearService.getNombre()!=null){
            $scope.nombreProyecto=guardarCrearService.getNombre();
            console.log($scope.nombreProyecto+','+guardarCrearService.getNombre());
        }

        /*if(guardarCrearService.getDireccion()!=null){
            $scope.direccionProyecto=guardarCrearService.getDireccion();
            console.log($scope.direccionProyecto+','+guardarCrearService.getDireccion());
        }*/
    }

    $scope.proyecto={
        nombreProyecto:function (Nombre) {
            return arguments.length ? (nombreProyecto = Nombre) : nombreProyecto;
        },
        direccionProyecto:function (Direccion) {
            return arguments.length ? (direccionProyecto = Direccion) : direccionProyecto;
        }
    }

    $scope.idAdmin='';
    $scope.estancia=[];
    $scope.idEstancia='';

    function cargarTiposProyectos(){

        var listaTiposProyectos=[];

        tipoProyectoService.getTipoProyecto(function (datos) {
            for(var i=0;i<datos.length;i++){
                listaTiposProyectos.push(datos[i]);
            }
        });

        return listaTiposProyectos;
    }

    $scope.tiposProyectos=cargarTiposProyectos();

    function cargarEmpresas(){

        var listadoEmpresas=[];

        empresaService.getEmpresa(function (listado) {
            for(var i=0;i<listado.length;i++){
                listadoEmpresas.push(listado[i]);
            }
        });

        return listadoEmpresas;
    }

    $scope.listaEmpresas=cargarEmpresas();

    function cargarEdificios() {
        var listaEdificios = [];

        edificioService.listarEdificios(function (listadoEdificio) {
            for (var i = 0; i < listadoEdificio.length; i++) {
                listaEdificios.push(listadoEdificio[i]);
            }
        });

        return listaEdificios;
    }

    $scope.listaEdificio=cargarEdificios();

    $scope.idEdificio=guardarIdEdificio.getIdEdificio();

    function cargarRecintos(id_edificio) {
        var listaRecinto=[];

        recintoService.listarRecinto(id_edificio,function (lista) {
            for(var i=0;i<lista.length;i++){
                listaRecinto.push(lista[i]);
            }
        });

        return listaRecinto;
    }

    $scope.listaRecintos=cargarRecintos(guardarIdEdificio.getIdEdificio());

    function getAdmin(id_empresa){
        var listaAdmin=[];

        listaUsuarioService.getListaUsuario(id_empresa,function (listado) {
            for(var i=0;i<listado.length;i++){
                listaAdmin.push(listado[i]);
            }
        });

        return listaAdmin;
    }

    function limpiarDatos(listaEdificio,listaRecinto,listaEstancia){
        listaEdificio=[];
        listaRecinto=[];
        listaEstancia=[];
    }

    var email=sessionService.getEmail();
    $scope.correo=email;

    var nombre=sessionService.getNombre();
    $scope.nombre=nombre;

    var ap_paterno=sessionService.getApPaterno();
    $scope.ap_paterno = ap_paterno;

    //Barra lateral
    $scope.showSide=toggleService.hideNav;
    $scope.showProyectos=toggleService.hideProyectos;

    toggleService.toggleVentana();

    $scope.activarSideNav=function() {
        toggleService.toggleSideNav();
        $scope.showSide=toggleService.hideNav;
    }

    $scope.cerrarSesion=function () {
        sessionService.closeSesion();
        loginService.destroySesion();
        $window.location.href='../index.html';
    }

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
                    var parent=angular.element(document.getElementById('ventanaUsuario'));
                    if($scope.email!='' && $scope.contrasena!='' && $scope.nombre!='' && $scope.ap_paterno!='' && $scope.ap_materno!=''){
                        if($scope.contrasena==$scope.validarContrasena){
                            usuarioService.updateUsuario(sessionService.getId(),$scope.email,$scope.contrasena,$scope.nombre,
                                $scope.ap_paterno,$scope.ap_materno,parent,$event,$scope);
                        }else{
                            //alert('Las contraseñas no coinciden');
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
                        //alert('Uno o más campos vacios');
                        var parent=angular.element(document.getElementById('ventanaUsuario'));
                        /*$mdDialog.show($mdDialog.alert({
                            textContent:'Uno o más campos vacios',
                            ok:'OK'
                        }));*/
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
                }
            }
        });
    }

    //Devuelve a la pantalla de inicio
    $scope.home=function () {
        $location.path('/home');
    }

    //Obtiene el administrador de proyecto
    $scope.admin=function (id_empresa) {
        $scope.id_empresa_usuario=id_empresa;
    }

    $scope.crearEmpresa=function () {
        if($scope.nombreEmpresa!='' && $scope.direccionEmpresa!='' && $scope.nro!='' && $scope.telefonoEmpresa!=''){
            var telefono=parseInt($scope.telefonoEmpresa);
            if(telefono>9999999 && telefono<100000000){
                empresaService.createEmpresa($scope.nombreEmpresa,$scope.direccionEmpresa,$scope.nro,$scope.telefonoEmpresa);
            }else{
                //alert("Introdusca un telefono de 8 numeros")
                $mdDialog.show($mdDialog.alert({
                    textContent:'Introdusca un telefono de 8 números',
                    ok:'OK'
                }));
            }
        }else{
            //alert('Uno o más campos vacios');
            $mdDialog.show($mdDialog.alert({
                textContent:'Uno o más campos vacios',
                ok:'OK'
            }));
        }
    }

    function validarUsuario(nombre,ap_paterno,ap_materno,rut,correo){
        var validar=true;
        if(nombre.length<4 && ap_paterno.length<4 && ap_materno.length<4 && rut.length<9 && rut.length>9 && correo.length<5){
            alert('Largo de datos incorrectos');
            validar=true;
            return validar;
        }
        return validar;
    }

    $scope.getId=function(id_empresa){
        $scope.id_empresa_usuario=id_empresa;
    }

    $scope.crearUsuario=function () {
        if($scope.nombre_usuario!='' && $scope.ap_paterno_usuario!='' && $scope.ap_materno_usuario!='' && $scope.rut!=''
        && $scope.id_empresa_usuario!='' && $scope.id_empresa_usuario!='--' && $scope.correo_usuario!='' && $scope.dv!='' && $scope.dv!='--'){
            if(validarUsuario($scope.nombre_usuario,$scope.ap_paterno_usuario,$scope.ap_materno_usuario,$scope.rut,
                $scope.correo_usuario)){
                usuarioService.createUsuario($scope.nombre_usuario,$scope.ap_paterno_usuario,$scope.ap_materno_usuario,
                    $scope.rut,$scope.id_empresa_usuario,$scope.correo_usuario,$scope.dv);
            }else{
                //alert('Formulario mal llenado');
                $mdDialog.show($mdDialog.alert({
                    textContent:'Formulario mal llenado',
                    ok:'OK'
                }));
            }
        }else{
            //alert('Uno o más campos vacios');

            $mdDialog.show($mdDialog.alert({
                textContent:'Uno o más campos vacios',
                ok:'OK'
            }));

            console.log('usuario:'+$scope.nombre_usuario+', ap_paterno:'+$scope.ap_paterno_usuario+', ap_materno:'+
            $scope.ap_materno_usuario+', rut:'+$scope.rut+', id_empresa:'+$scope.id_empresa_usuario+', correo:'+
                $scope.correo_usuario);
        }
    }

    //Muestra ventana para crear edificio
    $scope.ventanaEdificio=function () {
        $uibModal.open({
            templateUrl:'https://www.plexobuilding.com/plexo/html/edificio.html',
            controller: function ($scope, $uibModalInstance,edificioService,$route,guardarCrearService,guardarIdEdificio) {
                $scope.cerrarEdificio=function () {
                    $uibModalInstance.close();
                }

                $scope.nombreEdificio='';
                $scope.direccionEdificio='';
                $scope.nroEdificio='';
                $scope.numPisos='';

                $scope.crearEdificios=function ($event) {
                    if($scope.nombreEdificio!='' && $scope.direccionEdificio!='' && $scope.nroEdificio!='' && $scope.numPisos!=''){

                        edificioService.crearEdificio($scope.nombreEdificio,$scope.direccionEdificio,$scope.nroEdificio,$scope.numPisos,function () {
                            guardarCrearService.setCrear("html/crear_proyecto.html");
                            guardarCrearService.setEmpresaSelected(guardarIdEdificio.getIdEmpresa());
                            guardarCrearService.setTipoProyectoSelected(guardarIdEdificio.getIdTipoProyecto());
                            guardarCrearService.setAdminSelected(guardarIdEdificio.getIdAdmin());
                            guardarCrearService.setRecintoSelected(guardarIdEdificio.getIdRecinto());
                            $route.reload();

                            $scope.listaEdificio=cargarEdificios();
                        });

                        this.cerrarEdificio();
                    }else{
                        //alert('Campos del formulario vacios');
                        /*$mdDialog.show($mdDialog.alert({
                            textContent:'Uno o más campos vacios',
                            ok:'OK'
                        }));*/
                        var parent=angular.element(document.getElementById('ventanaEdificio'));
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
                }
            }
        });
    }
    
    $scope.ventanaRecintos=function () {
        $uibModal.open({
            templateUrl:'https://www.plexobuilding.com/plexo/html/recinto.html',
            controller: function ($scope,$uibModalInstance,guardarIdEdificio,recintoService,guardarCrearService,$route) {
                $scope.cerrarRecinto=function () {
                    $scope.listaRecintos=cargarRecintos(guardarIdEdificio.getIdEdificio());
                    $uibModalInstance.close();
                }

                $scope.idEdificio=guardarIdEdificio.getIdEdificio();

                $scope.crearRecinto=function ($event) {

                    if($scope.idEdificio!='' && $scope.idEdificio!=null){
                        console.log($scope.idEdificio+','+$scope.nombreRecinto+','+$scope.numPiso);
                        recintoService.createRecinto(guardarIdEdificio.getIdEdificio(),$scope.nombreRecinto,$scope.numPiso,function () {
                            guardarCrearService.setCrear("html/crear_proyecto.html");

                            guardarCrearService.setEmpresaSelected(guardarIdEdificio.getIdEmpresa());
                            guardarCrearService.setTipoProyectoSelected(guardarIdEdificio.getIdTipoProyecto());
                            guardarCrearService.setAdminSelected(guardarIdEdificio.getIdAdmin());
                            guardarCrearService.setEdificioSelected(guardarIdEdificio.getIdEdificio());

                            $route.reload();

                        });
                        this.cerrarRecinto();
                    }else{
                        //alert('id edificio vacio');
                        /*$mdDialog.show($mdDialog.alert({
                            textContent:'Edificio no seleccionado',
                            ok:'OK'
                        }));*/
                        var parent=angular.element(document.getElementById('ventanaRecinto'));
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
                }
            }
        });
    }

    $scope.getIdEdificio=function(id_edificio){
        $scope.idEdificio=id_edificio;
    }
    
    $scope.cargarRecinto=function (id_edificio) {
        $scope.idEdificio=id_edificio;
        console.log($scope.idEdificio);
        guardarIdEdificio.setIdEdificio(id_edificio);
        $scope.listaRecintos=cargarRecintos(id_edificio);
    }

    $scope.guardarRecinto=function (id_recinto) {
        $scope.idRecinto=id_recinto;
        guardarIdEdificio.setIdRecinto(id_recinto);
    }

    $scope.cargarCajas=function (id_cajas) {
        $scope.ncaja=id_cajas;
    }

    $scope.crearProyecto=function () {
        if(document.getElementById('file').files[0]!=null && guardarIdEdificio.getIdEmpresa()!=null &&
            guardarIdEdificio.getIdTipoProyecto()!=null && $scope.nombreProyecto!='' && guardarIdEdificio.getIdAdmin()!=null
            && guardarIdEdificio.getIdEdificio()!=null){
            var fd = new FormData();
            var files = document.getElementById('file').files[0];
            fd.append('file',files);
            var link='https://www.plexobuilding.com/plexo/webservices/upload/'+files.name;
            var extension='';
            for(var i=0;i<files.name.length;i++){
                if(files.name.substring(i,i+1)=='.'){
                    extension=files.name.substring(i,files.name.length);
                }
            }

            if(extension=='.html') {
                archivoService.uploadArchivo(fd,function (file) {
                    link='https://www.plexobuilding.com/plexo/webservices/upload/'+file;
                    proyectoService.crearProyecto(guardarIdEdificio.getIdTipoProyecto(), guardarIdEdificio.getIdEmpresa()
                        , guardarIdEdificio.getIdAdmin(), $scope.nombreProyecto, link,guardarIdEdificio.getIdEdificio());

                    proyectoService.getMaxIdProyecto(function (id) {
                        console.log(id);
                        proyectoService.addPermiso(id,guardarIdEdificio.getIdAdmin(),guardarIdEdificio.getIdAdmin());

                        console.log('id_empresa:'+$scope.idEmpresa+', id_tipo_proyecto:'+$scope.idTipoProyecto+', id_admin:'+
                            $scope.idAdmin+', nombre_proyecto:'+$scope.nombreProyecto+', direccion_proyecto:'+$scope.nombreProyecto
                            +', link:'+link+', id_edificio:'+$scope.idEdificio);

                        if($scope.idRecinto!=''){
                            recintoService.indexarRecinto($scope.idRecinto,id);
                        }
                    });
                });

            }else{
                //alert('Tipo de archivo incorrecto, no es un documento html');
                $mdDialog.show($mdDialog.alert({
                    textContent:'Tipo de archivo incorrecto, no es un documento html',
                    ok:'OK'
                }));
            }
        }else{
            //alert('Uno o más campos vacios');
            $mdDialog.show($mdDialog.alert({
                textContent:'Uno o más campos vacios',
                ok:'OK'
            }));
        }
    }

    $scope.tipoProyecto=function (id_tipo) {
        $scope.idTipoProyecto=id_tipo;
        guardarIdEdificio.setIdTipoProyecto(id_tipo);
    }

    $scope.setAdmin=function (id) {
        $scope.idAdmin=id;
        guardarIdEdificio.setIdAdmin(id);
    }

    $scope.setEstancia=function (id) {
        $scope.idEstancia=id;
    }

    $scope.setDv=function (dv) {
        $scope.dv=dv;
        console.log($scope.dv);
    }
}]);
