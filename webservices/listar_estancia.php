<?php
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['id_recinto']){

}else{
    $salida['error']='id_recinto vacio';

    echo json_encode($salida);
}
?>