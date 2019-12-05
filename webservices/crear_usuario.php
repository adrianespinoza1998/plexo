<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

include 'PHPMailer-master/src/PHPMailer.php';
include 'PHPMailer-master/src/SMTP.php';
include 'PHPMailer-master/src/Exception.php';

include 'auth_mail_plexo.php';

if(isset($_POST['nombre']) && isset($_POST['ap_paterno']) && isset($_POST['ap_materno']) && isset($_POST['rut'])
    && isset($_POST['id_empresa']) && isset($_POST['correo'])){

    $nombre=$_POST['nombre'];
    $ap_paterno=$_POST['ap_paterno'];
    $ap_materno=$_POST['ap_materno'];
    $rut=$_POST['rut'];
    $id_empresa=$_POST['id_empresa'];
    $correo=$_POST['correo'];

    //Crear contraseña
    $password=strtolower(substr($nombre,0,1).$ap_paterno);
    $contrasena=password_hash($password,PASSWORD_BCRYPT,['cost'=>12]);

    $query="INSERT INTO usuario VALUES(0,2,".$id_empresa.",'".$correo."','".$contrasena."','".$rut."','".$nombre."','".$ap_paterno."','".$ap_materno."')";

    if($conexion->query($query)==true){
        $mail = new PHPMailer(true);

        $mail->IsSMTP();

        //$mail->SMTPDebug=2;
        $mail->Host='smtp.gmail.com';
        $mail->CharSet='UTF-8';
        $mail->Port=465;
        $mail->SMTPSecure='ssl';
        $mail->SMTPAuth=true;
        $mail->Username=CORREO_PLEXO;
        $mail->Password=CONTRASEÑA_CORREO;
        $mail->setFrom(CORREO_PLEXO,'Plexo');
        $mail->addReplyTo(CORREO_PLEXO,'Plexo');
        $mail->addAddress($correo);
        $mail->Subject='Registro Plexo';
        $mail->isHTML(true);

        $body='Su mail ha sido ingresado a la plataforma de Plexo <br>'
        .'User: '.$correo.' <br>'
        .'Contraseña: '.$password.' <br>'
        .'No responda este correo, para ingresar a su cuenta vaya a www.plexobuilding.com/plexo en su web browser';

        $mail->Body=$body;

        if(!$mail->send()){
            $salida['error']='error al enviar correo';
            echo json_encode($salida);
        }else{
            $salida['estado']='correo enviado';
            echo json_encode($salida);
        }
    }else{
        $salida['error']='usuario no insertado';

        echo json_encode($salida);
    }

}else{
    $salida['error']='uno o mas campos vacios';

    echo json_encode($salida);
}
?>
