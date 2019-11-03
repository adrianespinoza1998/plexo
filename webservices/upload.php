<?php
//header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
//header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: process-data');
header('Content-Type: application/json');
/*header("Access-Control-Allow-Credentials", "true");
header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");*/
//header('Content-Type: undefined');

if(isset($_FILES['file']['name'])) {
//if(!empty($_FILES)){

    /* Getting file name */
    $filename = $_FILES['file']['name'];

    /* Location */
    $location='upload/';
    //$location='/var/www/html/proyectos';

    if(is_dir($location)){
        if(is_writable($location)){
            if(move_uploaded_file($_FILES['file']['tmp_name'],$location.$filename)){
                /*$arr = array("name"=>$filename);
                echo json_encode($arr);*/
                $salida['estado']='Archivo subido';
            }else{
                $salida['error']='Error al mover archivo '.$_FILES['file']['error'];
                echo json_encode($salida);
            }
        }else{
            $salida['error']='Carpeta sin los permisos';
            echo json_encode($salida);
        }
    }else{
        $salida['error']='Directorio no valido';
        echo json_encode($salida);
    }

    //print_r($_FILES);
}else{
    $salida['error']='No hay archivo';
    echo json_encode($salida);
}
?>