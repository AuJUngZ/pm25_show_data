<?php

namespace App\Application\Middleware;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Http\Message\ResponseInterface;
class ValidateToken{
    //this is not complete for security reasons
    private string $token = "1234567890";

    public function __invoke(ServerRequestInterface $request, RequestHandlerInterface $handler): \Slim\Psr7\Response|\Slim\Psr7\Message|ResponseInterface
    {
        if($request->getHeader('token') == null){
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode([
                'status' => 'error code 401',
                'message' => 'Token not found.'
            ]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
        }else{
            $header = $request->getHeader('token')[0];
        }
        if($header === $this->token){
            //pass the request to the next middleware
            return $handler->handle($request);
        }else{
            //return a response
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode([
                'status' => 'error code 401',
                'message' => 'Invalid token.'
            ]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
        }
    }
}
