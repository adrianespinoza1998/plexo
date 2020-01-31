<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: process-data');
header('Content-Type: application/json');

if(isset($_FILES['file']['name'])) {

    $filename = $_FILES['file']['name'];

    $location='upload/';

    if(is_dir($location)){
        if(is_writable($location)){
            if(file_exists($location.$filename)){
                $new_file_name=md5(rand()*time()).".html";
                if(move_uploaded_file($_FILES['file']['tmp_name'],$location.$new_file_name)){

                    $salida['file_name']=$new_file_name;
                    $salida['estado']='Archivo subido';
                    echo json_encode($salida);
                }else{
                    $salida['error']='Error al mover archivo '.$_FILES['file']['error'];
                    echo json_encode($salida);
                }
            }else{
                if(move_uploaded_file($_FILES['file']['tmp_name'],$location.$filename)){
                    $salida['estado']='Archivo subido';
                    $salida['file_name']=$filename;
                    echo json_encode($salida);
                }else{
                    $salida['error']='Error al mover archivo '.$_FILES['file']['error'];
                    echo json_encode($salida);
                }
            }
        }else{
            $salida['error']='Carpeta sin los permisos';
            echo json_encode($salida);
        }
    }else{
        $salida['error']='Directorio no valido';
        echo json_encode($salida);
    }

}else{
    $salida['error']='No hay archivo';
    echo json_encode($salida);
}
?>