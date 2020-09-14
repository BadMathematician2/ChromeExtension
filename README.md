ChromeExtension

route - /api/domain
для роботи слід зробити міграцію: php artisan migrate
дані надсилати у форматі вигляду {domain: 'test', columns: ['type', 'price']},
якщо columns не вказати, то поверне всю інформацію про об'єкт.
