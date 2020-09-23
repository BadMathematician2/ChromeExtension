<?php

namespace ChromeExtension\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Controller;

/**
 * Class ExtensionController
 * @package ChromeExtension\Controllers
 */
class ExtensionController extends Controller
{

    /**
     * @var Request
     */
    public $request;

    /**
     * ExtensionController constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\View\View|string
     */
    public function authenticate()
    {
        \Sentinel::Authenticate([
            'email' => $this->request->input('email'),
            'password' => $this->request->input('password')
        ]);

        if (\Sentinel::check()) {
            $token = Session::get('cartalyst_sentinel');

            return view('token')->with(['token'=>$token]);
        }

        return 'error';
    }

    /**
     * @return bool|\Cartalyst\Sentinel\Users\UserInterface
     */
    public function register()
    {
        return \Sentinel::register([
            'email' => $this->request->input('email'),
            'password' => $this->request->input('password')
        ]);
    }

    /**
     * @return bool
     */
    public function logout()
    {
        return \Sentinel::logout();
    }

}

