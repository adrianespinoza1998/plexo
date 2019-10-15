<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['mesh']) && $_POST['id_proyecto']){
    $mesh=$_POST['mesh'];
    $id_proyecto=$_POST['id_proyecto'];

    $query="SELECT prop.id_categoria,prope.id_propiedad,prope.valor FROM propiedades_elemento prope JOIN propiedades prop ON prope.id_propiedad=prop.id_propiedad WHERE prope.mesh='".$mesh."' AND prope.id_proyecto=".$id_proyecto;
    $ejecutarQuery=$conexion->query($query);

    if($ejecutarQuery->num_rows>0){
        $row=$ejecutarQuery->fetch_array();
        $salida['id_propiedad']=$row['id_propiedad'];
        $salida['valor']=$row['valor'];
        $salida['id_categoria']=$row['id_categoria'];
        echo json_encode($salida);
    }else{
        $salida['error']='no existe propiedad';
        echo json_encode($salida);
    }
}else{
    $salida['error']='Faltan datos';
}

$conexion->close();
?>
