<?php


namespace ChromeExtension\Middleware;

use Closure;

/**
 * Class Authenticate
 * @package ChromeExtension\Middleware
 */
class Authenticate
{
    /**
     * @param \Illuminate\Http\Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (null === $request->get('token')) {
            abort(403);
        }
        if (null === \Sentinel::getUserRepository()->findByPersistenceCode($request->get('token'))) {
            abort(403);
        }

        return $next($request);
    }
}
