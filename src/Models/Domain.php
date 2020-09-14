<?php

namespace ChromeExtension\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Domain
 * @package ChromeExtension\Models
 */
class Domain extends Model
{
    protected $table = 'domain_list';

    protected $guarded = ['id'];

    /**
     * domain_tematic: true - yes, false - no.
     * status: 0 - green, 1 - red, 2 - yellow.
     * type: CT, AR, FR, LL, PC, HM, FT, MP, SB.
     * price: 0 - free, 1 - not free.
     *
     */
}
