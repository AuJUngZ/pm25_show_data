<?php

namespace App\Application\LineNotify;
class LineNotify implements LineNotifyInterface
{

    private string $token = 'wEj2nF89cYGVbtIoNy0FDzYB4LEHboOdorEPB7cwXfG';

    public function send($message)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://notify-api.line.me/api/notify");
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, "message=$message");
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        $header = array('Content-type: application/x-www-form-urlencoded', 'Authorization: Bearer ' . $this->token,);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($ch);
        curl_close($ch);
    }

    public function sendWithImage($message, $image)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://notify-api.line.me/api/notify");
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_POST, 1);

        $message = strip_tags($message);
        $image_path = realpath($image);
        if(function_exists('curl_file_create')) {
            $cFile = curl_file_create($image_path);
        } else {
            $cFile = '@' . realpath($image);
        }

        curl_setopt($ch, CURLOPT_POSTFIELDS, array('message' => $message, 'imageFile' => $cFile));
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        $header = array('Content-type: multipart/form-data', 'Authorization: Bearer ' . $this->token,);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($ch);
        curl_close($ch);
    }
}
