<?php

declare(strict_types=1);

namespace App\Application\LineNotify;


interface LineNotifyInterface{
    public function send($message);
    public function sendWithImage($message, $image);
}
