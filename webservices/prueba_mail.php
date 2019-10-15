<?php
//ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

include 'PHPMailer-master/src/PHPMailer.php';
include 'PHPMailer-master/src/SMTP.php';
include 'PHPMailer-master/src/Exception.php';

include 'auth_mail_plexo.php';

$mail = new PHPMailer(true);

$mail->IsSMTP();

$mail->SMTPDebug=2;
$mail->Host='smtp.gmail.com';
$mail->CharSet='UTF-8';
$mail->Port=465;
$mail->SMTPSecure='ssl';
$mail->SMTPAuth=true;
$mail->Username=CORREO_PLEXO;
$mail->Password=CONTRASEÑA_CORREO;
$mail->setFrom(CORREO_PLEXO,'plexo');
$mail->addReplyTo(CORREO_PLEXO,'plexo');
$mail->addAddress('adrianespinozaarevalo@gmail.com');
$mail->Subject='Prueba';
$mail->msgHTML('Linea 1 </br> Linea 2 </br>');
$mail->AltBody='Mensaje de correo';

if(!$mail->send()){
    echo 'Error: '.$mail->ErrorInfo;
}else{
    echo 'Mensaje enviado';
}
