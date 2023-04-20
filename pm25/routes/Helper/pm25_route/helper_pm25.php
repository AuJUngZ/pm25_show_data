<?php
use App\Application\Database\DatabaseInterface;
use App\Application\LineNotify\LineNotifyInterface;
use Slim\App;



//Query with date and time
function fetchWithDateAndTime(App $app, string $sort_order, string $start_date, string $end_date, string $start_time, string $end_time): false|string
{
    $conn = $app->getContainer()->get(DatabaseInterface::class)->getConnection();
    $sql = "SELECT * FROM pmv2 WHERE date BETWEEN str_to_date('$start_date','%Y-%m-%d') AND str_to_date('$end_date','%Y-%m-%d') AND time BETWEEN '$start_time' AND '$end_time' ORDER BY aqi $sort_order";
    $stm = $conn->query($sql);
    $data = $stm->fetchAll(\PDO::FETCH_OBJ);
    return json_encode($data);
}

/**
 * @param $request
 * @param App $app
 * @param $response
 * @return mixed
 */
function extracted($request, App $app, $response): mixed
{
    $sort_order = $request->getHeader('sort_order')[0];
    $start_date = $request->getHeader('start_date')[0];
    $end_date = $request->getHeader('end_date')[0];
    $start_time = $request->getHeader('start_time')[0];
    $end_time = $request->getHeader('end_time')[0];
//            $data = fetchWithAqi($app, $header);
    $data = fetchWithDateAndTime($app, $sort_order, $start_date, $end_date, $start_time, $end_time);
    $response->getBody()->write($data);
    return $response->withHeader('Content-Type', 'application/json');
}

function lineNotiy(App $app, $message): void{
    $container = $app->getContainer();
    $lineNotify = $container->get(LineNotifyInterface::class);
    $lineNotify->send($message);
}

function lineNotifyWithImage(App $app, $message, $image): void{
    $container = $app->getContainer();
    $lineNotify = $container->get(LineNotifyInterface::class);
    $lineNotify->sendWithImage($message, $image);
}