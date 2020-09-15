<?php


namespace ChromeExtension\Controllers;


use App\Http\Controllers\Controller;
use App\Packages\ChromeExtension\src\Exceptions\DomainNorFoundException;
use App\Packages\ChromeExtension\src\Exceptions\InvalidColumnsException;
use App\Packages\ChromeExtension\src\Exceptions\InvalidDomainException;
use ChromeExtension\DomainSelectOptions;
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
        1 => 'Invalid columns',
        2 => 'Domain not found',

    ];

    /**
     * @var Request
     */
    private $request;

    /**
     * @var DomainSelectOptions
     */
    private $selectHelper;

    /**
     * DomainController constructor.
     * @param Request $request
     * @param DomainSelectOptions $selectHelper
     */
    public function __construct(Request $request, DomainSelectOptions $selectHelper)
    {
        $this->request = $request;
        $this->selectHelper = $selectHelper;
    }

    /**
     * @return array|string
     * @throws InvalidDomainException
     */
    public function index()
    {

        $domain = $this->request->get('domain');

        if (null === $domain) {
            throw new InvalidDomainException('Invalid domain');
        }

        try {
            $model = Domain::query()
                ->select($this->request->get('columns', ['*']))
                ->where('domain', $domain)->first();

            if (null === $model) {
                throw new DomainNorFoundException('Sorry, your domain not found');
            }

            foreach ($this->selectHelper->getOption('columns') as $column) {
                if (isset($model[$column])) {
                    $model[$column] = $this->selectHelper->getOption($column)[$model[$column]];
                }
            }

            if (isset($model['manager_id'])) {
                $model->setManagerModel($this->request->get('manager'));
                $model['manager'] = $model->getManagerInfo();
            }

            return $model;

        } catch (\Exception $exception) {
            throw new InvalidColumnsException('Invalid columns');
        }
    }

    /**
     * @return array
     */
    public function options()
    {
        return $this->selectHelper->getOption($this->request->get('options'));
    }

}
