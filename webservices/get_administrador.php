<?php

header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['id_empresa'])){

    $id_empresa=$_POST['id_empresa'];

    $query=" SELECT id_usuario FROM usuario WHERE id_empresa=".$id_empresa." AND id_perfil=1";
    $ejecutarQuery=$conexion->query($query);

    if($ejecutarQuery->num_rows>0){
        $row=$ejecutarQuery->fetch_assoc();
        $salida['id_usuario']=$row['id_usuario'];

        echo json_encode($salida);
    }else{
        $salida['error']='No existen administradores';
        echo json_encode($salida);
    }
}else{
    $salida['error']='Uno o mas datos vacios';
}

$conexion->close();
?>
