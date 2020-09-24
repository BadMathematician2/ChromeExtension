<?php


namespace ChromeExtension\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Manager;
use ChromeExtension\DomainSelectOptions;
use ChromeExtension\Models\Domain;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

/**
 * Class DomainController
 * @package ChromeExtension\Controllers
 */
class DomainController extends Controller
{
    const STATUS = [
        'ID' => 'THIS_DOMAIN_IS_INVALID',
        'IC' => 'THESE_COLUMNS_ARE_INVALID',
        'DNF' => 'DOMAIN_NOT_FOUND',
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
     * @var Model
     */
    private $managerModel = Manager::class;

    /**
     * @param Model $managerModel
     */
    public function setManagerModel(Model $managerModel): void
    {
        $this->managerModel = $managerModel;
    }
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
     */
    public function index()
    {

        $domain = $this->request->get('domain');

        if (null === $domain) {
            return static::STATUS['ID'];
        }

        try {
            $model = Domain::query()
                ->select($this->request->get('columns', ['*']))
                ->where('domain', $domain)->first();

            if (null === $model) {
                return static::STATUS['DNF'];
            }

            foreach ($this->selectHelper->getOption('columns') as $column) {
                if (isset($model[$column])) {
                    $model[$column] = $this->selectHelper->getOption($column)[$model[$column]];
                }
            }

            if (isset($model['manager_id'])) {
                $model->setManagerModel($this->managerModel);
                $model['manager'] = $model->getManagerInfo();
            }

            return $model;

        } catch (\Exception $exception) {
            return static::STATUS['IC'];
        }
    }

    /**
     * @return array|string
     */
    public function options()
    {
        if (null === $this->request->get('options')) {
            return 'You did not send options';
        }

        return $this->selectHelper->getOption($this->request->get('options'));
    }

}
