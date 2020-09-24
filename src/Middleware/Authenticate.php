<?php


namespace ChromeExtension\Middleware;

use Closure;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

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
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function handle(Request $request, Closure $next)
    {
        if (! $this->checkToken($request)) {
            abort(403);
        }

        return $next($request);
    }

    /**
     * @param Request $request
     * @return bool
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    private function checkToken(Request $request)
    {
        $response = $this->getResponse($request->get('token', 'default'));

        $this->checkResponseStatus($response->getStatusCode());

        $result = json_decode((string)$response->getBody(), true);

        return 200 === $result['status'];
    }

    /**
     * @param string $token
     * @return \Psr\Http\Message\ResponseInterface
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    private function getResponse(string $token)
    {
        $client = new Client();
        $authRoute = env('AUTH_ROUTE', 'https://');

        return $client->get($authRoute . $token)
            ->withHeader('X-CSRF-TOKEN', csrf_token());
    }

    /**
     * @param int $responseCode
     */
    private function checkResponseStatus(int $responseCode)
    {
        if (200 !== $responseCode) {
            abort($responseCode);
        }
    }

}
