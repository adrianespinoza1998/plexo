<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['nombre_edificio']) && isset($_POST['direccion']) && isset($_POST['num_pisos']) && isset($_POST['nro'])){

    $id_empresa=$_POST['id_empresa'];
    $nombre_edificio=$_POST['nombre_edificio'];
    $direccion=$_POST['direccion'];
    $num_pisos=$_POST['num_pisos'];
    $nro=$_POST['nro'];

    $query="INSERT INTO edificio VALUES (0,'".$nombre_edificio."','".$direccion."',".$nro.",".$num_pisos.")";

    if($conexion->query($query)==true){
        $queryId="SELECT MAX(id_edificio) 'id' FROM edificio";
        $ejecutarQuery=$conexion->query($queryId);

        if($ejecutarQuery->num_rows>0){
            $row=$ejecutarQuery->fetch_assoc();

            $id=(int)$row['id'];

            $salida['id']=$id;
            $salida['estado']='edificio creado';

            echo json_encode($salida);
        }else{
            $salida['estado']='edificio creado';
            $salida['id']=0;

            echo json_encode($salida);
        }
    }else{
        $salida['error']='error al crear edificio';

        echo json_encode($salida);
    }
}else{
    $salida['error']='uno o mas campos vacios';
     echo json_encode($salida);
}
?>