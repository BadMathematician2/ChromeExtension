<?php


namespace ChromeExtension\Middleware;

use Closure;
use Illuminate\Http\Request;

/**
 * Class Authenticate
 * @package ChromeExtension\Middleware
 */
class Authenticate
{
    /**
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ($this->checkPersistenceCode($request)) {
            abort(403);
        }

        return $next($request);
    }

    /**
     * @param Request $request
     * @return bool
     */
    private function checkPersistenceCode(Request $request)
    {
        return null === \Sentinel::getUserRepository()->findByPersistenceCode($request->get('token', 'default'));
    }

}
