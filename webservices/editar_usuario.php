<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['id_usuario']) && isset($_POST['correo']) && isset($_POST['contrasena']) && isset($_POST['nombre'])
    && isset($_POST['ap_paterno']) && isset($_POST['ap_materno'])){


    $id_usuario=$_POST['id_usuario'];
    $correo=$_POST['correo'];
    $contrasena=password_hash($_POST['contrasena'],PASSWORD_BCRYPT,['cost'=>12]);
    $nombre=$_POST['nombre'];
    $ap_paterno=$_POST['ap_paterno'];
    $ap_materno=$_POST['ap_materno'];

    $salida=array();

    $queryUpdateCorreo="UPDATE usuario SET correo='".$correo."' WHERE id_usuario=".$id_usuario;
    $queryUpdateContrasena="UPDATE usuario SET contrasena='".$contrasena."' WHERE id_usuario=".$id_usuario;
    $queryUpdateNombre="UPDATE usuario SET nombre='".$nombre."' WHERE id_usuario=".$id_usuario;
    $queryUpdateApPaterno="UPDATE usuario SET ap_paterno='".$ap_paterno."' WHERE id_usuario=".$id_usuario;
    $queryUpdateApMaterno="UPDATE usuario SET ap_materno='".$ap_materno."' WHERE id_usuario=".$id_usuario;

    if(!$ejecutarUpdateCorreo=$conexion->query($queryUpdateCorreo)){
        $salida['error']='No se pudo actualizar el correo';
        die(json_encode($salida));
    }

    if(!$ejecutarUpdateContrasena=$conexion->query($queryUpdateContrasena)){
        $salida['error']='No se pudo actualizar la contraseña';
        die(json_encode($salida));
    }

    if(!$ejecutarUpdateNombre=$conexion->query($queryUpdateNombre)){
        $salida['error']='No se pudo actualizar el nombre';
        die(json_encode($salida));
    }

    if(!$ejecutarUpdateApPaterno=$conexion->query($queryUpdateApPaterno)){
        $salida['error']='No se pudo actualizar el apellido paterno';
        die(json_encode($salida));
    }

    if(!$ejecutarUpdateApMaterno=$conexion->query($queryUpdateApMaterno)){
        $salida['error']='No se pudo actualizar el apellido materno';
        die(json_encode($salida));
    }

    $salida['estado']='datos actualizados';
    $salida['error']='ninguno';
    echo json_encode($salida);
}else{
    $salida['error']='Campos vacios';
    echo json_encode($salida);
}

$conexion->close();
?>
