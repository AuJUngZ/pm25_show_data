<?php

use DI\ContainerBuilder;
use App\Application\LineNotify\LineNotifyInterface;
use App\Application\LineNotify\LineNotify;

return function (ContainerBuilder $containerBuilder) {
    $containerBuilder->addDefinitions([
       LineNotifyInterface::class => function() {
        return new LineNotify();
       }
    ]);
};
