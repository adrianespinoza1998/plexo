<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['id_usuario'])){

    $id_usuario=$_POST['id_usuario'];

    $query="SELECT pr.nombre_proyecto, pr.link_proyecto FROM proyectos pr JOIN permisos_proyecto per ON pr.id_proyecto=per.id_proyecto WHERE per.id_usuario=".$id_usuario;

    $ejecutarQuery=$conexion->query($query);

    if($ejecutarQuery->num_rows>0){
        $salida=array();

        $i = 0;

        while ($row = mysqli_fetch_assoc($ejecutarQuery)) {
            $salida[$i] = $row;
            $i++;
        }

        echo json_encode($salida);

    }else{
        $salida['error']='no hay permisos';
        echo json_encode($salida);
    }
}else{
    $salida['error']='No hay id_usuario';
    echo json_encode($salida);
}
?>