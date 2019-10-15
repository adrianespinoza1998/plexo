app.controller("homeAdminCtrl",["$scope", "sessionService", "toggleService", "$location","$window","$uibModal",
    "usuarioService","tipoProyectoService","empresaService","listaUsuarioService","edificioService","recintoService",
    function ($scope, sessionService, toggleService, $location,$window,$uibModal,usuarioService,
              tipoProyectoService,empresaService,listaUsuarioService,edificioService,recintoService) {

    $scope.linkOpcion="html/crear_empresa.html";

    $scope.showCrear=false;

    $scope.changeCrear=function(){
        if($scope.showCrear){
            $scope.showCrear=false;
        }else{
            $scope.showCrear=true;
        }
    }

    $scope.empresa=function () {
        $scope.linkOpcion="html/crear_empresa.html";
    }

    $scope.usuario=function () {
        $scope.linkOpcion="html/crear_usuario.html";
    }

    $scope.proyecto=function () {
        $scope.linkOpcion="html/crear_proyecto.html";
    }

    //Datos empresa
    $scope.nombreEmpresa='';
    $scope.direccionEmpresa='';
    $scope.telefonoEmpresa='';

    //Datos usuario
    $scope.nombre_usuario='';
    $scope.ap_paterno_usuario='';
    $scope.ap_materno_usuario='';
    $scope.rut='';
    $scope.id_empresa_usuario='';
    $scope.correo_usuario='';

    //Datos edificio
    $scope.nombreEdificio='';
    $scope.direccionEdificio='';
    $scope.numPisos='';

    //Datos recinto
    $scope.idEdificio='';
    $scope.nombreRecinto='';
    $scope.numPiso='';

    var tiposProyectos=null;

    function cargarTiposProyectos(){

        var listaTiposProyectos=[];

        tipoProyectoService.getTipoProyecto(function (datos) {
            for(var i=0;i<datos.length;i++){
                listaTiposProyectos.push(datos[i]);
            }
        });

        tiposProyectos=listaTiposProyectos;
    }

    cargarTiposProyectos();
    $scope.tiposProyectos=tiposProyectos;

    var empresas=null;

    function cargarEmpresas(){

        var listadoEmpresas=[];

        empresaService.getEmpresa(function (listado) {
            for(var i=0;i<listado.length;i++){
                if(i==0){
                    localStorage.setItem('primera_empresa',listado[i].id_empresa);
                    $scope.id_empresa_usuario=listado[i].id_empresa;
                }
                listadoEmpresas.push(listado[i]);
            }
        });

        empresas=listadoEmpresas;
    }

    cargarEmpresas();

    $scope.listaEmpresas=empresas;

    var edificios=null;

    function cargarEdificios(){
        var listaEdificios=[];

        edificioService.listarEdificios(function (listadoEdificio) {
            for(var i=0;i<listadoEdificio.length;i++){
                listaEdificios.push(listadoEdificio[i]);
                console.log(listaEdificios[i].nombre_edificio);
                if(i==0){
                    localStorage.setItem('id_edificio',listadoEdificio[i].id_edificio);
                }
            }
        });

        edificios=listaEdificios;
    }

    cargarEdificios();

    $scope.listaEdificio=edificios;

    $scope.idEdificio=localStorage.getItem('id_edificio');
    
    var recintos=null;
    
    function cargarRecintos() {
        var listaRecinto=[];

        recintoService.listarRecinto($scope.idEdificio,function (lista) {
            for(var i=0;i<lista.length;i++){
                listaRecinto.push(lista[i]);
            }
        });

        recintos=listaRecinto;
    }

    cargarRecintos();

    $scope.listaRecintos=recintos;

    var email=sessionService.getEmail();
    $scope.email=email;

    var nombre=sessionService.getNombre();
    $scope.nombre=nombre;

    var ap_paterno=sessionService.getApPaterno();
    $scope.ap_paterno = ap_paterno;

    var ap_materno=sessionService.getApMaterno();
    $scope.ap_materno=ap_materno;

    var contrasena=sessionService.getContrasena();
    $scope.contrasena=contrasena;

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

    $scope.editarDatos=function () {
        var modal=$uibModal.open({
            templateUrl:'http://www.plexobuilding.com/plexo/html/actualizar_usuario.html'
        });
    };

    $scope.modificar=function () {
        usuarioService.updateUsuario(sessionService.getId(),$scope.email,$scope.contrasena,$scope.nombre,
            $scope.ap_paterno,$scope.ap_materno);
    };

    $scope.home=function () {
        $location.path('/home');
    }

    var usuarios=null;

    function getAdmin(){
        var listaAdmin=[];

        console.log(localStorage.getItem("primera_empresa"));

        listaUsuarioService.getListaUsuario(localStorage.getItem("primera_empresa"),function (listado) {
            for(var i=0;i<listado.length;i++){
                listaAdmin.push(listado[i]);
                console.log(listaAdmin[i]);
            }
        });

        usuarios=listaAdmin;
    }

    getAdmin();

    $scope.admin=function (id_empresa) {
        var listadoUsuario=[];

        console.log(id_empresa);

        listaUsuarioService.getListaUsuario(id_empresa,function (listado) {
            for(var i=0;i<listado.length;i++){
                listadoUsuario.push(listado[i]);
                console.log(listadoUsuario[i]);
            }
        });

        usuarios=listadoUsuario;

        $scope.listaUsuarios=usuarios;
    }

    function validarEmpresa(telefono,direccion){
        var validar=false;

        if(isNaN(telefono)==false && telefono<1000000000 && telefono>99999999 && direccion.length>2){
            validar=true;
        }

        return validar;
    }

    $scope.listaUsuarios=usuarios;

    $scope.crearEmpresa=function () {
        if($scope.nombreEmpresa!='' && $scope.direccionEmpresa!='' && $scope.telefonoEmpresa!=''){
            var error=0;

            if(validarEmpresa($scope.telefonoEmpresa,$scope.direccionEmpresa)){
                empresaService.createEmpresa($scope.nombreEmpresa,$scope.direccionEmpresa,$scope.telefonoEmpresa);
            }else{
                alert('Error al ingresar empresa');
            }
        }else{
            alert('Uno o más campos vacios');
        }
    }

    function validarUsuario(nombre,ap_paterno,ap_materno,rut,correo){
        var validar=true;
        if(nombre.length<4 && ap_paterno.length<4 && ap_materno.length<4 && rut.length<9 && rut.length>9 && correo.length<5){
            alert('Largo de datos incorrectos');
            validar=false;
            return validar;
        }

        return validar;
    }

    $scope.getId=function(id_empresa){
        $scope.id_empresa_usuario=id_empresa;
    };

    $scope.crearUsuario=function () {
        if($scope.nombre_usuario!='' && $scope.ap_paterno_usuario!='' && $scope.ap_materno_usuario!='' && $scope.rut!=''
        && $scope.id_empresa_usuario!='' && $scope.correo_usuario!=''){
            if(validarUsuario($scope.nombre_usuario,$scope.ap_paterno_usuario,$scope.ap_materno_usuario,$scope.rut,
                $scope.correo_usuario)){
                usuarioService.createUsuario($scope.nombre_usuario,$scope.ap_paterno_usuario,$scope.ap_materno_usuario,
                    $scope.rut,$scope.id_empresa_usuario,$scope.correo_usuario);
            }else{
                alert('Formulario mal llenado');
            }
        }else{
            alert('Uno o más campos vacios');
        }
    }

    $scope.prueba=function (mensaje) {
        console.log(mensaje);
    }

    $scope.ventanaEdificio=function () {
        $uibModal.open({
            templateUrl:'https://www.plexobuilding.com/plexo/html/edificio.html'
        });
    }

    $scope.crearEdificios=function () {
        if($scope.nombreEdificio!='' && $scope.direccionEdificio!='' && $scope.numPisos!=''){
            edificioService.crearEdificio($scope.nombreEdificio,$scope.direccionEdificio,$scope.numPisos);
            cargarEdificios();
            $scope.listaEdificio=edificios;
        }else{
            alert('Campos del formulario vacios');
        }
    }
    
    $scope.ventanaRecintos=function () {
        $uibModal.open({
            templateUrl:'https://www.plexobuilding.com/plexo/html/recinto.html'
        });
    }

    $scope.getIdEdificio=function(id_edificio){
        $scope.idEdificio=id_edificio;
    }

    $scope.crearRecinto=function () {
        if($scope.idEdificio!=''){
            recintoService.createRecinto($scope.idEdificio,$scope.nombreRecinto,$scope.numPiso);
        }else{
            alert('id edificio vacio');
        }
    }
}]);
