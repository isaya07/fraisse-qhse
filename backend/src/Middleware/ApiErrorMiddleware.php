<?php
declare(strict_types=1);

namespace App\Middleware;

use Cake\Core\Configure;
use Cake\Http\Exception\HttpException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Cake\Http\Response;

/**
 * Middleware pour gérer les erreurs API
 */
class ApiErrorMiddleware implements MiddlewareInterface
{
    /**
     * Traiter la requête et retourner une réponse
     *
     * @param \Psr\Http\Message\ServerRequestInterface $request
     * @param \Psr\Http\Server\RequestHandlerInterface $handler
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        // Vérifier si c'est une requête API
        $path = $request->getUri()->getPath();
        if (strpos($path, '/api/') === 0) {
            try {
                return $handler->handle($request);
            } catch (\Exception $e) {
                // Gérer les erreurs pour les requêtes API
                $statusCode = 500;
                $message = 'An internal error occurred';

                if ($e instanceof HttpException) {
                    $statusCode = $e->getCode();
                    $message = $e->getMessage();
                    
                    // S'assurer que le code de statut est dans la plage appropriée
                    if ($statusCode < 400 || $statusCode >= 600) {
                        $statusCode = 500;
                    }
                } else {
                    // Pour les erreurs internes, ne pas exposer les détails sensibles en production
                    if (!Configure::read('debug')) {
                        $message = 'An internal error occurred';
                    } else {
                        $message = $e->getMessage();
                    }
                }

                // Créer une réponse JSON avec le bon code de statut
                $response = new Response();
                $response = $response->withType('application/json');
                $response = $response->withStatus($statusCode);
                $response = $response->withStringBody(json_encode([
                    'error' => [
                        'message' => $message,
                        'code' => $statusCode
                    ]
                ]));
                
                return $response;
            }
        }

        // Pour les requêtes non-API, laisser le comportement normal
        return $handler->handle($request);
    }
}