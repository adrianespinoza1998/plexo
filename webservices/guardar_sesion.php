<?php

header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

if(isset($_POST['correo']) && isset($_POST['contrasena'])){

    $correo=$_POST['correo'];
    $contrasena=$_POST['contrasena'];

    session_start([
        'cookie_lifetime' => 86400,
        'gc_maxlifetime' => 86400,
    ]);

    $_SESSION['correo']=$correo;
    $_SESSION['contrasena']=$contrasena;

    $salida['estado']='Sesión guardada';

    echo json_encode($salida);

}else{
    $salida['error']="Correo o contraseña vacios";
    echo json_encode($salida);
}

?>