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

if(isset($_POST['email'])){
    $email=$_POST['email'];

    $query="SELECT correo FROM usuario WHERE correo='".$email."'";

    $ejecutarQuery=$conexion->query($query);

    if($ejecutarQuery->num_rows>0){

        function generateRandomString($length = 10) {
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $charactersLength = strlen($characters);
            $randomString = '';
            for ($i = 0; $i < $length; $i++) {
                $randomString .= $characters[rand(0, $charactersLength - 1)];
            }
            return $randomString;
        }

        $password=generateRandomString();
        $hash=password_hash($password,PASSWORD_BCRYPT,['cost'=>12]);

        $queryPassword="UPDATE usuario SET contrasena='".$hash."' WHERE correo='".$email."'";

        if($conexion->query($queryPassword)){
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
            $mail->addAddress($email);
            $mail->Subject='Recuperar contraseña';
            $mail->isHTML(true);

            $body='Para recuperar su cuenta, por favor utilize esta nueva contraseña <br>'
                .'y modifiquela al iniciar sesión. <br>'
                .'Contraseña: '.$password.' <br>'
                .'No responda este correo, para ingresar a su cuenta vaya a www.plexobuilding.com/plexo en su web browser';

            $mail->Body=$body;

            if(!$mail->send()){
                $salida['error']='Error al enviar correo';
                echo json_encode($salida);
            }else{
                $salida['estado']='Correo enviado';
                echo json_encode($salida);
            }

        }else{
            $salida['error']='Error al modificar contraseña';
            echo json_encode($salida);
        }

    }else{
        $salida['error']="El email ingresado no se encuentra registrado";
        echo json_encode($salida);
    }

}else{
    $salida['error']="Email vacio";
    echo json_encode($salida);
}

?>