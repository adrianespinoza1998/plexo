<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['correo']) && isset($_POST['contrasena'])){

    $correo=$_POST['correo'];

    $contrasena=$_POST['contrasena'];

    $salida=array();

    $query="SELECT * FROM usuario WHERE correo='".$correo."'";
    $execQuery=$conexion->query($query);

    if($execQuery->num_rows>0){

        $row=$execQuery->fetch_assoc();

        if(password_verify($contrasena,$row['contrasena'])) {
            $salida['estado']='logueado';
            $salida['correo']=$row['correo'];
            $salida['id_perfil']=$row['id_perfil'];
            $salida['id_usuario']=$row['id_usuario'];
            $salida['nombre']=$row['nombre'];
            $salida['ap_paterno']=$row['ap_paterno'];
            $salida['ap_materno']=$row['ap_materno'];
            $salida['rut']=$row['rut'];
        }

    }else{
        $salida['estado']='deslogueado';
        $salida['error']='correo no existe';
    }

    echo json_encode($salida);

}else{
    $error=array();
    $error['error']='Correo o contraseña vacios';
    $error['estado']='deslogueado';

    echo json_encode($error);
}

$conexion->close();
?>