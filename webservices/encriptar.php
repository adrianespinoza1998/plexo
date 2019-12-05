<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

$contrasena=password_hash("admin",PASSWORD_BCRYPT,['cost'=>12]);

/*$query="UPDATE usuario SET contrasena='".$contrasena."' WHERE id_usuario=1";

if($conexion->query($query)==true){
    $salida['estado']='correcto';
    $salida['contraseña']=$contrasena;

    echo json_encode($salida);
}else{
    $salida['error']='error al ejecutar query';

    echo json_encode($salida);
}*/

$query="UPDATE usuario SET contrasena='".$contrasena."' WHERE correo='admin@simioslab.com'";

if($conexion->query($query)==true){
    $salida['estado']='correcto';
    $salida['contraseña']=$contrasena;

    echo json_encode($salida);
}else{
    $salida['error']='error al ejecutar query';

    echo json_encode($salida);
}
?>