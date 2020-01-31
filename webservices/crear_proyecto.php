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
    $nombre_proyecto=$_POST['nombre_proyecto'];
    $link_proyecto=$_POST['link_proyecto'];
    $id_edificio=$_POST['id_edificio'];

    $queryBuscarProyecto="SELECT nombre_proyecto FROM proyectos WHERE nombre_proyecto='".$nombre_proyecto."'";
    $ejecutarBuscarProyectos=$conexion->query($queryBuscarProyecto);

    if($ejecutarQuery->num_rows>0){
        $row=$ejecutarBuscarProyectos->fetch_assoc();
        if(substr($row['nombre_proyecto'],strlen($row['nombre_proyecto'])-1,1)==')' &&
            substr($row['nombre_proyecto'],strlen($row['nombre_proyecto'])-3,1)=='('){
            try{
                $numero_repeticion=intval(substr($row['nombre_proyecto'],$row['nombre_proyecto']-3,1));
                $nombreProyectoRepetido=substr($row['nombre_proyecto'],0,$row['nombre_proyecto']-4)."(".($numero_repeticion+1).")";

                $query="INSERT INTO proyectos VALUES(0,".$id_tipo_proyecto.",".$id_empresa.",".$id_administrador.",'".$nombreProyectoRepetido.
                    "','".$link_proyecto."',".$id_edificio.")";

                $ejecutarQuery=$conexion->query($query);

                if($ejecutarQuery==true){

                    $salida['estado']='Proyecto creado';
                    echo json_encode($salida);

                }else{
                    $salida['error']='error al insertar proyecto en bd';
                    echo json_encode($salida);
                }
            }catch (Exception $e){
                $nombreProyectoRepetido=substr($row['nombre_proyecto'],0,$row['nombre_proyecto']-4)."(1)";

                $query="INSERT INTO proyectos VALUES(0,".$id_tipo_proyecto.",".$id_empresa.",".$id_administrador.",'".$nombreProyectoRepetido.
                    "','".$link_proyecto."',".$id_edificio.")";

                $ejecutarQuery=$conexion->query($query);

                if($ejecutarQuery==true){

                    $salida['estado']='Proyecto creado';
                    echo json_encode($salida);

                }else{
                    $salida['error']='error al insertar proyecto en bd';
                    echo json_encode($salida);
                }
            }
        }else{
            $nombreProyectoRepetido=substr($row['nombre_proyecto'],0,$row['nombre_proyecto']-4)."(1)";

            $query="INSERT INTO proyectos VALUES(0,".$id_tipo_proyecto.",".$id_empresa.",".$id_administrador.",'".$nombreProyectoRepetido.
                "','".$link_proyecto."',".$id_edificio.")";

            $ejecutarQuery=$conexion->query($query);

            if($ejecutarQuery==true){

                $salida['estado']='Proyecto creado';
                echo json_encode($salida);

            }else{
                $salida['error']='error al insertar proyecto en bd';
                echo json_encode($salida);
            }
        }
    }else{
        $query="INSERT INTO proyectos VALUES(0,".$id_tipo_proyecto.",".$id_empresa.",".$id_administrador.",'".$nombre_proyecto.
            "','".$link_proyecto."',".$id_edificio.")";

        $ejecutarQuery=$conexion->query($query);

        if($ejecutarQuery==true){

            $salida['estado']='Proyecto creado';
            echo json_encode($salida);

        }else{
            $salida['error']='error al insertar proyecto en bd';
            echo json_encode($salida);
        }
    }

}else{
    $salida['error']='uno o mas datos vacios';
    echo json_encode($salida);
}
$conexion->close();
?>