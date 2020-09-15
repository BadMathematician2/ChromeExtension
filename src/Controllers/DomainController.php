<?php


namespace ChromeExtension\Controllers;


use App\Http\Controllers\Controller;
use ChromeExtension\Models\Domain;
use Illuminate\Http\Request;

/**
 * Class DomainController
 * @package ChromeExtension\Controllers
 */
class DomainController extends Controller
{

    const STATUS = [
        0 => 'Invalid domain',
        1=> 'Invalid columns',
        2=> 'Domain not found',

    ];

    /**
     * @param Request $request
     * @return false|string
     */
    public function index(Request $request)
    {
        $domain = $request->get('domain');

        if (null === $domain) {
            return self::STATUS[0];
        }

        try {
            $model = Domain::query()
                ->select($request->get('columns', ['*']))
                ->where('domain', $domain)->first();
            if (null === $model) {
                return self::STATUS[2];
            }

            return $model;

        } catch (\Exception $exception) {
            return self::STATUS[1];
        }
    }

}
