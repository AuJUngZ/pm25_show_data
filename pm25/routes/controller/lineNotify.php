<?php

use App\Application\LineNotify\LineNotifyInterface;
use Slim\App;

return function(App $app){
    $app->post('/line-notify', function ($request, $response, $args) use ($app) {
        $container = $app->getContainer();
        $lineNotify = $container->get(LineNotifyInterface::class);
        $lineNotify->send('นี้เป็นเสียงจากเด็กวัด');
        $response->getBody()->write(json_encode(['status' => 'success']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    });
};
