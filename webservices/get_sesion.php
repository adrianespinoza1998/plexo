<?php

header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

session_start([
    'cookie_lifetime' => 86400,
    'gc_maxlifetime' => 86400,
]);

if(isset($_SESSION['correo']) && isset($_SESSION['contrasena'])){

    $correo=$_SESSION['correo'];
    $contrasena=$_SESSION['contrasena'];

    $salida['correo']=$correo;
    $salida['contrasena']=$contrasena;

    echo json_encode($salida);

}else{
    $salida['error']='No se a iniciado sesión';
    echo json_encode($salida);
}
?>