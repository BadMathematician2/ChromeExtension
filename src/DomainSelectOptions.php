<?php


namespace ChromeExtension;

/**
 * Class DomainSelectOptions
 * @package App\Packages\ChromeExtension\src
 */
class DomainSelectOptions
{
    private function columns()
    {
        return [
            'status', 'type', 'url_status', 'link_type', 'link_position', 'tech_status', 'country',
        ];
    }

    private function status()
    {
        return [
            1 => 'URL_IS_NOT_IN_DB',
            2 => 'URL_IS_IN_DB',
            3 => 'URL_IS_IN_DB_BUT_SITE_IS_UNDER_MODERATION',
        ];
    }

    private function type()
    {
        return [
            1 => 'CT',
            2 => 'AR',
            3 => 'FR',
            4 => 'LL',
            5 => 'PC',
            6 => 'HM',
            7 => 'FT',
            8 => 'MP',
            9 => 'SB',
        ];
    }

    private function url_status()
    {
        return [
            1 => '200',
            2 => '404',
        ];
    }

    private function link_type()
    {
        return [
            1 => 'DF',
            2 => 'ND',
            3 => 'RD',
            4 => 'IL',
        ];
    }

    private function link_position()
    {
        return [
            1 => 'Up',
            2 => 'Middle',
            3 => 'Down',
        ];
    }

    private function tech_status()
    {
        return [
            1 => 'rejected',
            2 => 'site does not work',
            3 => 'not thematic',
            4 => 'back link',
        ];
    }



    private function country()
    {
        return [
            1 => 'EN',
            2 => 'FR',
            3 => 'ES',
            4 => 'UA',
        ];
    }

    /**
     * @param string $option
     * @return array
     */
    public function getOption(string $option) : array
    {
        return $this->{$option}();
    }

    /**
     * @param string $option
     * @param int $value
     * @return string
     */
    public function getOptionValue(string $option, int $value) : string
    {
        return $this->getOption($option)[$value];
    }
}
