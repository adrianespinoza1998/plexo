<?php

header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

if(isset($_POST['nombre_archivo'])){
    $nombre_arhivo=$_POST['nombre_archivo'];
    $location='upload/';

    if(file_exists($location.$nombre_arhivo)){
        if(unlink($location.$nombre_arhivo)){
            $salida['estado']="Archivo eliminado";
            echo json_encode($salida);
        }else{
            $salida['error']="Archivo no borrado";
            echo json_encode($salida);
        }
    }else{
        $salida['error']="No existe archivo";
        echo json_encode($salida);
    }

}else{
    $salida['error']='Nombre archivo vacio';
    echo json_encode($salida);
}
?>