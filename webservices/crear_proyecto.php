<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['id_tipo_proyecto']) && isset($_POST['id_empresa']) && isset($_POST['id_administrador'])
    && isset($_POST['nombre_proyecto']) && isset($_POST['link_proyecto'])
    && isset($_POST['id_edificio'])){

    $id_tipo_proyecto=$_POST['id_tipo_proyecto'];
    $id_empresa=$_POST['id_empresa'];
    $id_administrador=$_POST['id_administrador'];
    $nombre_proyecto=strtolower($_POST['nombre_proyecto']);
    $link_proyecto=$_POST['link_proyecto'];
    $id_edificio=$_POST['id_edificio'];

    $queryBuscarProyecto="SELECT nombre_proyecto FROM proyectos WHERE LOWER(nombre_proyecto)='".$nombre_proyecto."' AND id_empresa=".$id_empresa;
    $ejecutarBuscarProyectos=$conexion->query($queryBuscarProyecto);

    if($ejecutarBuscarProyectos->num_rows>0){
        $salida['error']="Nombre de proyecto ya existe";
        echo json_encode($salida);
    }else{

        $query="INSERT INTO proyectos VALUES(0,".$id_tipo_proyecto.",".$id_empresa.",".$id_administrador.",'".$nombre_proyecto."','"
            .$link_proyecto."',".$id_edificio.")";

        $ejecutarQuery=$conexion->query($query);

        if($ejecutarQuery==true){
            $salida['estado']="Proyecto creado";
            echo json_encode($salida);
        }else{
            $salida['error']="Error al insertar proyecto";
            echo json_encode($salida);
        }
    }

}else{
    $salida['error']='uno o mas datos vacios';
    echo json_encode($salida);
}
$conexion->close();
?>