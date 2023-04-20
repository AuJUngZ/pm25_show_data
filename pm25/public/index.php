<?php

use App\Application\Settings\SettingInterface;
use DI\ContainerBuilder;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

$containerBuilder = new ContainerBuilder();

//Add settings to container
$settings = require __DIR__ . '/../app/settings.php';
$settings($containerBuilder);

//Add database to container
$database = require __DIR__ . '/../app/database.php';
$database($containerBuilder);

//Add line notify to container
$lineNotify = require __DIR__ . '/../app/lineNotify.php';
$lineNotify($containerBuilder);

//Add mailjet to container
$mailjet = require __DIR__ . '/../app/mailjet.php';
$mailjet($containerBuilder);

//Build container
$container = $containerBuilder->build();

AppFactory::setContainer($container);
$app = AppFactory::create();
$app->setBasePath("/pm25");

//Add Middleware
$middleware = require __DIR__ . '/../app/middleware.php';
$middleware($app);


//Add routes
$routes = require __DIR__ . '/../routes/controller/pm25.php';
$routes($app);

$routes = require __DIR__ . '/../routes/controller/lineNotify.php';
$routes($app);

$routes = require __DIR__ . '/../routes/controller/mailjet.php';
$routes($app);

$app->run();

