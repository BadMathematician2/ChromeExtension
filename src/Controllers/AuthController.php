<?php


namespace ChromeExtension\Controllers;


use App\Http\Controllers\Controller;
use ChromeExtension\DomainSelectOptions;
use ChromeExtension\Models\Domain;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Sentinel;


class AuthController extends Controller
{

    public function extAuth()
    {

        $credentials = [
            'email' => $this->request->input('email'),
            'password' => $this->request->input('password')
        ];

        Sentinel::Authenticate($credentials);

        if (Sentinel::check()) {

            $token = Session::get('cartalyst_sentinel');

            return view('token')->with(['token'=>$token]);
        }
        return 'error';

    }



}
