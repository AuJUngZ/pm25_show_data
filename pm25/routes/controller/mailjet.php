<?php

use App\Application\Mailjet\MailjetInterface;
use Slim\App;

return function (App $app) {

    $app->post('/mailjet', function ($request, $response, $args) use ($app) {
        $contaienr = $app->getContainer()->get(MailjetInterface::class);
        $body = $contaienr->registerSend();
        $response->getBody()->write(json_encode(['status' => 'success', 'data' => $body]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    });
};
