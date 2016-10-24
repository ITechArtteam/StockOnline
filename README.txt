run>edit configuration... > mavem > Command line: clean package liquibase:update tomcat7:run
что бы отключить тесты при старте сервера добавить -DskipTests после run

/resources/application.properties изменить пользователя и пароль
в базе создать схему и юзера:
CREATE SCHEMA `stock_online` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci';
CREATE USER 'orel.dmitriy' IDENTIFIED BY '1234567';
GRANT ALL PRIVILEGES ON `stock_online`.* TO 'orel.dmitriy' WITH GRANT OPTION;

File > Settings > Plugins > Browse repositories... > Search for "lombok" > Install Plugin
устанавливает плаги lombok для idea. После этого сущности помечаем анотацией @Data и при компиляции
будет автаматически сгенерены гетеры сетеры конструктор toString getHash и т.д.
Описание:
https://projectlombok.org/features/Data.html
Офф сайт:
https://projectlombok.org/download.html

