run>edit configuration... > mavem > Command line: clean package liquibase:update tomcat7:run -DskipTests
что бы включить тесты при старте сервера удалите -DskipTests после run

--------------------------------maven--------------------------------------------------------
maven обновляем до версии 3.3.9.
если версия ниже 3.1.0 за удасться запустить проект

--------------------------------database------------------------------------------------------
/resources/application.properties изменить пользователя и пароль
в базе создать схему и юзера:
CREATE SCHEMA `stock_online` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci';
CREATE USER 'orel.dmitriy' IDENTIFIED BY '1234567';
GRANT ALL PRIVILEGES ON `stock_online`.* TO 'orel.dmitriy' WITH GRANT OPTION;

если при старте во время создания таблиц упала программа, то перед следующим стартом удалите созданные таблицы
иначе будет ошика создания таблиц.

--------------------------------frontend------------------------------------------------------
для того, что бы не пересобирать каждый раз проект когда вносим изменения в наши js, делаем финт ушами:
1) открываем терминал в папке src/main/frontend/
2) выполняем команду webpack --watch
Терминал должен "зависнуть" после "+ 429 hidden modules", не выключаем терминал, разрабатываем на реакт.

все JS файлы ложим в src/main/frontend/src иначе они не попаду в сборку
точка входа index.jsx
css файлы пока ложим в webapp/resources/css и подключаем в WEB-INF/index.jsp

--------------------------------lombok---------------------------------------------------------
ПОКА НЕ РАБОТАЕТ
File > Settings > Plugins > Browse repositories... > Search for "lombok" > Install Plugin
устанавливает плаги lombok для idea. После этого сущности помечаем анотацией @Data и при компиляции
будет автаматически сгенерены гетеры сетеры конструктор toString getHash и т.д.
Описание:
https://projectlombok.org/features/Data.html
Офф сайт:
https://projectlombok.org/download.html

