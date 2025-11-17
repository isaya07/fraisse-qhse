<?php
declare(strict_types=1);

namespace App\Middleware;

use Cake\Http\Middleware\CsrfProtectionMiddleware;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

/**
 * Middleware CSRF conditionnel - désactive CSRF pour les routes API
 */
class ConditionalCsrfMiddleware extends CsrfProtectionMiddleware
{
    /**
     * Traiter la requête et appliquer ou non le CSRF en fonction de l'URL
     *
     * @param \Psr\Http\Message\ServerRequestInterface $request
     * @param \Psr\Http\Server\RequestHandlerInterface $handler
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $path = $request->getUri()->getPath();
        
        // Désactiver CSRF pour les routes API
        if (strpos($path, '/api/') === 0) {
            return $handler->handle($request);
        }
        
        // Appliquer CSRF pour les autres routes
        return parent::process($request, $handler);
    }
}