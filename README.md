ChromeExtension

route - /api/domain.

для роботи слід зробити міграцію: php artisan migrate

дані надсилати у форматі вигляду {domain: 'test', columns: ['type', 'price'], manager: 'App\Models\Manager', token: 'token'}, якщо columns не вказати, то поверне всю інформацію про об'єкт.

можна встановит через composer командою composer require wtg-package/chrome-extension
