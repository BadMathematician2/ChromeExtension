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
    /**
     * @param Request $request
     * @return false|string
     */
    public function index(Request $request)
    {
        try {
            $columns = $request->get('columns');
            $domain = $request->get('domain');
            $model = Domain::query()->where('domain', $domain)->get()[0];
            $result = [];
            foreach ($columns as $column) {
                $result[$column] = $model->getAttribute($column);
            }

            return json_encode($result);
        } catch (\Exception $exception) {

            return 'There is not object with such domain in DB';
        }
    }


}
