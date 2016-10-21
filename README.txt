run>edit configuration... > mavem > Command line: clean package tomcat7:run
что бы отключить тесты при старте ервера добавить -DskipTests после run
[liquibase:update] будет добавлен позже

/resources/application.properties изменить пользователя и пароль
в базе создать схему onlinestockgroupproject

File > Settings > Plugins > Browse repositories... > Search for "lombok" > Install Plugin
устанавливает плаги lombok для idea. После этого сущности помечаем анотацией @Data и при компиляции
будет автаматически сгенерены гетеры сетеры конструктор toString getHash и т.д.
Описание:
https://projectlombok.org/features/Data.html
Офф сайт:
https://projectlombok.org/download.html

