app.controller("homeAdminCtrl",["$scope", "sessionService", "toggleService", "$location","$window","$uibModal",
    "usuarioService","tipoProyectoService","empresaService","listaUsuarioService","edificioService",
    "recintoService","estanciaService","medicionService","archivoService","proyectoService","guardarIdProyecto",
    function ($scope, sessionService, toggleService, $location,$window,$uibModal,usuarioService,
              tipoProyectoService,empresaService,listaUsuarioService,edificioService,recintoService,
              estanciaService,medicionService,archivoService,proyectoService,guardarIdProyecto) {

    $scope.customer={};

    //Mostrar estancias

    $scope.numEstancias=1;

    $scope.linkOpcion="html/crear_empresa.html";

    $scope.mostrarEdificio=true;

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
    $scope.validarContrasena='';

    //Datos edificio
    $scope.nombreEdificio='';
    $scope.direccionEdificio='';
    $scope.numPisos='';

    //Datos recinto
    $scope.idEdificio='';
    $scope.nombreRecinto='';
    $scope.numPiso='';

    //Datos estancia
    $scope.idRecinto='';
    $scope.nombreEstancia='';
    $scope.ncaja='';

    //Datos proyecto
    $scope.idEmpresa='';
    $scope.idTipoProyecto='';
    $scope.nombreProyecto='';
    $scope.direccionProyecto='';
    $scope.idAdmin='';
    $scope.estancia=[];
    $scope.idEstancia='';

    function cargarTiposProyectos(){

        var listaTiposProyectos=[];

        tipoProyectoService.getTipoProyecto(function (datos) {
            for(var i=0;i<datos.length;i++){
                listaTiposProyectos.push(datos[i]);
                if(i==0){
                    $scope.idTipoProyecto=listaTiposProyectos[i].id_tipo_proyecto;
                }
            }
        });

        return listaTiposProyectos;
    }

    $scope.tiposProyectos=cargarTiposProyectos();

    function cargarEmpresas(){

        var listadoEmpresas=[];

        empresaService.getEmpresa(function (listado) {
            for(var i=0;i<listado.length;i++){
                if(i==0){
                    localStorage.setItem('primera_empresa',listado[i].id_empresa);
                    $scope.idEmpresa=localStorage.getItem('primera_empresa');
                    $scope.id_empresa_usuario=listado[i].id_empresa;
                }
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
                if (i == 0) {
                    //localStorage.setItem('id_edificio',listadoEdificio[i].id_edificio);
                    $window.localStorage.setItem("id_edificio", listadoEdificio[i].id_edificio);
                }
            }
        });

        return listaEdificios;
    }

    $scope.listaEdificio=cargarEdificios();

    $scope.idEdificio=$window.localStorage.getItem('id_edificio');

    function cargarRecintos(id_edificio) {
        var listaRecinto=[];

        recintoService.listarRecinto(id_edificio,function (lista) {
            for(var i=0;i<lista.length;i++){
                listaRecinto.push(lista[i]);
                if(i==0){
                    localStorage.setItem('id_recinto',listaRecinto[i].id_recinto);
                    $scope.idRecinto=localStorage.getItem('id_recinto');
                }
            }
        });

        return listaRecinto;
    }

    $scope.listaRecintos=cargarRecintos($scope.idEdificio);

    function cargarEstancias(id_recinto) {
        var listaEstancia=[];

        estanciaService.listarEstancia(id_recinto,function (lista) {
            if(lista.length>0){
                for (var i=0;i<lista.length;i++){
                    listaEstancia.push(lista[i]);
                    if(i==0){
                        $scope.idEstancia=listaEstancia[i].id_estancia;
                    }
                }
            }
        });

        return listaEstancia;
    }

    estancias=cargarEstancias(localStorage.getItem('id_recinto'));

    function cargarCajas(){
        var listaCajas=[];

        medicionService.listarCaja(function (lista) {
            for(var i=0;i<lista.length;i++){
                listaCajas.push(lista[i]);
                if(i==0){
                    $scope.ncaja=listaCajas[i].id_slab_caja;
                }
            }
        });

        return listaCajas;
    }

    function limpiarDatos(listaEdificio,listaRecinto,listaEstancia){
        listaEdificio=[];
        listaRecinto=[];
        listaEstancia=[];
    }

    $scope.listaCajas=cargarCajas();

    $scope.listaEstancias=estancias;

    var email=sessionService.getEmail();
    $scope.email=email;

    var nombre=sessionService.getNombre();
    $scope.nombre=nombre;

    var ap_paterno=sessionService.getApPaterno();
    $scope.ap_paterno = ap_paterno;

    var ap_materno=sessionService.getApMaterno();
    $scope.ap_materno=ap_materno;

    $scope.contrasena='';


    //Barra lateral
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
            templateUrl:'https://www.plexobuilding.com/plexo/html/actualizar_usuario.html',
            controller: function ($scope,$uibModalInstance) {
                $scope.cerrarDatos=function () {
                    $uibModalInstance.close();
                }
            }
        });
    };

    //Modificar usuario
    $scope.modificar=function () {
        if($scope.email!='' && $scope.contrasena!='' && $scope.nombre!='' && $scope.ap_paterno!='' && $scope.ap_materno!=''){
            if($scope.contrasena==$scope.validarContrasena){
                usuarioService.updateUsuario(sessionService.getId(),$scope.email,$scope.contrasena,$scope.nombre,
                    $scope.ap_paterno,$scope.ap_materno);
            }else{
                alert('Las contraseñas no coinciden');
            }
        }else{
            alert('Uno o más campos vacios');
        }
    };

    //Devuelve a la pantalla de inicio
    $scope.home=function () {
        $location.path('/home');
    }

    var usuarios=null;

    //Carga administradores de proyectos
    function getAdmin(){
        var listaAdmin=[];

        listaUsuarioService.getListaUsuario(localStorage.getItem("primera_empresa"),function (listado) {
            for(var i=0;i<listado.length;i++){
                listaAdmin.push(listado[i]);
                if(i==0){
                    $scope.idAdmin=listaAdmin[i].id_usuario;
                }
            }
        });

        usuarios=listaAdmin;
    }

    getAdmin();

    //Obtiene el administrador de proyecto
    $scope.admin=function (id_empresa) {
        $scope.idEmpresa=id_empresa;

        var listadoUsuario=[];

        listaUsuarioService.getListaUsuario(id_empresa,function (listado) {
            for(var i=0;i<listado.length;i++){
                listadoUsuario.push(listado[i]);
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

    //Muestra ventana para crear edificio
    $scope.ventanaEdificio=function () {
        $uibModal.open({
            templateUrl:'https://www.plexobuilding.com/plexo/html/edificio.html',
            controller: function ($scope, $uibModalInstance) {
                $scope.cerrarEdificio=function () {
                    $uibModalInstance.close();
                }
            }
        })
    }

    $scope.crearEdificios=function () {
        if($scope.nombreEdificio!='' && $scope.direccionEdificio!='' && $scope.numPisos!=''){
            edificioService.crearEdificio($scope.nombreEdificio,$scope.direccionEdificio,$scope.numPisos,function (estado) {
                if(estado){
                    $scope.listaEdificio=[];
                    var listaEdificios=cargarEdificios();
                    for(var i=0;i<listaEdificios.length;i++){
                        $scope.listaEdificio.push(listaEdificios[i]);
                    }
                    //cargarRecintos(listaEdificios[i].id_edificio);
                }
            });
            $scope.$watchCollection("listaEdificio",function (newValue,oldValue) {
                if(newValue==oldValue){
                    console.log('Colección no actualizada');
                    $scope.listaEdificio=cargarEdificios();
                }else{
                    console.log('Colección actualizada');
                    console.log($scope.listaEdificio);
                }
            });
        }else{
            alert('Campos del formulario vacios');
        }
    }
    
    $scope.ventanaRecintos=function () {
        $uibModal.open({
            templateUrl:'https://www.plexobuilding.com/plexo/html/recinto.html',
            controller: function ($scope,$uibModalInstance) {
                $scope.cerrarRecinto=function () {
                    $uibModalInstance.close();
                }
            }
        });
    }

    $scope.ventanaEstancia=function () {
        $uibModal.open({
            templateUrl:'https://www.plexobuilding.com/plexo/html/estancia.html',
            controller: function ($scope,$uibModalInstance) {
                $scope.cerrarEstancia=function () {
                    $uibModalInstance.close();
                }
            }
        });
    }

    $scope.getIdEdificio=function(id_edificio){
        $scope.idEdificio=id_edificio;
    }

    $scope.crearRecinto=function () {
        $scope.idEdificio=$window.localStorage.getItem('id_edificio');
        if($scope.idEdificio!=''){
            recintoService.createRecinto($scope.idEdificio,$scope.nombreRecinto,$scope.numPiso);
        }else{
            alert('id edificio vacio');
        }
    }
    
    $scope.cargarRecinto=function (id_edificio) {
        $scope.idEdificio=id_edificio;
        $scope.listaRecintos=cargarRecintos(id_edificio);
        $scope.listaEstancias=cargarEstancias($scope.idRecinto);
        $window.localStorage.removeItem('id_edificio');
        $window.localStorage.setItem('id_edificio',id_edificio);
        limpiarDatos($scope.listaEdificio,$scope.listaRecintos,$scope.listaEstancias);
    }

    $scope.cargarEstancia=function (id_recinto) {
        $scope.listaEstancias=cargarEstancias(id_recinto);
    }

    $scope.crearEstancia=function () {
        if($scope.nombreEstancia!='' && $scope.idRecinto!='' && $scope.ncaja!=''){
            estanciaService.crearEstancia($scope.idRecinto,$scope.nombreEstancia,$scope.ncaja);
            cargarEstancias($scope.idRecinto);
        }else {
            alert('Uno o más campos vacios');
        }
    }

    $scope.cargarCajas=function (id_cajas) {
        $scope.ncaja=id_cajas;
    }

    $scope.crearProyecto=function () {
        if(document.getElementById('file').files[0]!=null && $scope.idEmpresa!='' && $scope.idTipoProyecto!=''
            && $scope.nombreProyecto!='' && $scope.direccionProyecto!='' && $scope.idAdmin!='' && $scope.idEdificio!=''){
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
                archivoService.uploadArchivo(fd);
                proyectoService.crearProyecto($scope.idTipoProyecto, $scope.idEmpresa, $scope.idAdmin, $scope.nombreProyecto,
                    $scope.direccionProyecto, link, $scope.idEdificio);

                proyectoService.getMaxIdProyecto(function (id) {
                    console.log(id);
                    proyectoService.addPermiso(id,$scope.idAdmin,$scope.idAdmin);

                    if($scope.idRecinto!='' && $scope.idEstancia!=''){
                        recintoService.indexarRecinto($scope.idRecinto,id);
                    }
                });

                for(var i=0;i<$scope.estancia.length;i++){
                    console.log($scope.estancia[i]);
                }
            }else{
                alert('Tipo de archivo incorrecto, no es un documento html');
            }
        }else{
            alert('Uno o más campos vacios');
        }
    }

    $scope.tipoProyecto=function (id_tipo) {
        $scope.idTipoProyecto=id_tipo;
    }

    $scope.setAdmin=function (id) {
        $scope.idAdmin=id;
    }

    $scope.setEstancia=function (id) {
        $scope.idEstancia=id;
    }
}]);
