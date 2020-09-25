<?php


namespace ChromeExtension\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

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
        if (! $this->checkToken($request['token'])) {
            abort(403);
        }

        return $next($request);
    }

    /**
     * @param string $token
     * @return bool
     */
    private function checkToken(string $token) : bool
    {
        return $token;
        $response = $response = Http::withHeaders([
            'X-CSRF-TOKEN' => csrf_token(),
        ])->get($this->getAuthUrl($token));

        $this->checkResponseStatus($response->status());

        $result = json_decode((string)$response->body(), true);

        if (null === $result) {
            return false;
        }

        return 'OK' === $result['status'];
    }

    /**
     * @param string $token
     * @return string
     */
    private function getAuthUrl(string $token) : string
    {
        return env('AUTH_ROUTE', 'https://auth.wtgspain.com/auth') . '?token=' . $token;
    }

    /**
     * @param int $httpStatusCode
     */
    private function checkResponseStatus(int $httpStatusCode)
    {
        if (200 !== $httpStatusCode) {
            abort($httpStatusCode);
        }
    }

}
