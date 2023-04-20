<?php

use DI\ContainerBuilder;
use App\Application\Mailjet\MailjetInterface;
use App\Application\Mailjet\Mailjet;

return function (ContainerBuilder $containerBuilder) {
    $containerBuilder->addDefinitions([
        MailjetInterface::class => function(){
            return new Mailjet();
        }
    ]);
};
