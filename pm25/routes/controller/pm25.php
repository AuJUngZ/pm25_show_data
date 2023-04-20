<?php

namespace App\Controllers;

use App\Application\Database\DatabaseInterface;
use App\Application\Middleware\ValidateToken;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;

require_once __DIR__ . '/../Helper/pm25_route/helper_pm25.php';

return function (App $app) {
    $app->group('/data', function (RouteCollectorProxy $group) use ($app) {
        $group->get('/fetch/aqi', function ($request, $response, $args) use ($app) {
            $header = $request->getHeader('sort_order')[0];
            return extracted($request, $app, $response);
        });

        $group->get('/fetch/value', function ($request, $response, $args) use ($app) {
//            $header = $request->getHeader('sort_order')[0];
//            $data = fetchWithValues($app, $header);
            return extracted($request, $app, $response);
        });
    })->add(new ValidateToken());

    $app->group('/upload-img', function (RouteCollectorProxy $group) use ($app) {
        $group->post('/upload', function ($request, $response, $args) use ($app) {
            $conn = $app->getContainer()->get(DatabaseInterface::class)->getConnection();
            $data_id = $request->getHeader('data_id')[0];
            $uploadedFiles = $request->getUploadedFiles();
            $uploadedFile = $uploadedFiles['image'];
            if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
                $filename = $uploadedFile->getClientFilename();
                $uploadedFile->moveTo(__DIR__ . "/../../public/img/$filename");

                $sql = "SELECT * FROM images WHERE data_id = $data_id";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $existData = $stmt->fetchAll(\PDO::FETCH_OBJ);

                if($existData) {
                    $sql = "UPDATE images SET name = :filename WHERE data_id = :data_id";
                    $stm = $conn->prepare($sql);
                    $stm->bindParam(':data_id', $data_id);
                    $stm->bindParam(':filename', $filename);
                    $stm->execute();
                }else{
                    $sql = "INSERT INTO images (data_id, name) VALUES (:data_id, :filename)";
                    $stm = $conn->prepare($sql);
                    $stm->bindParam(':data_id', $data_id);
                    $stm->bindParam(':filename', $filename);
                    $stm->execute();
                }
                $response->getBody()->write(json_encode([
                    "status" => "success upload code 200",
                    "data_id" => $data_id,
                    "filename" => $filename,
                ]));

                //Line notify
                $message = "Image is uploaded of data id:$data_id";
                lineNotifyWithImage($app, $message, __DIR__ . "/../../public/img/$filename");

                return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
            } else {
                $response->getBody()->write("File upload failed");
                return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
            }
        });

        $group->get('/fetch', function ($request, $response, $args) use ($app) {
            $conn = $app->getContainer()->get(DatabaseInterface::class)->getConnection();
            $data_id = $request->getHeader('data_id')[0];
            $sql = "SELECT * FROM images WHERE data_id = $data_id";
            $stm = $conn->query($sql);
            $data = $stm->fetchAll(\PDO::FETCH_OBJ);
            $response->getBody()->write(json_encode($data));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        });
    })->add(new ValidateToken());
};

