# Podmienky hodnotenia !!!
1. Projekt musi byt spustitelny cez "docker-compose build" a "docker-compose up" !!!!! V opacnom pripade projekt nebude hodnoteny (0b).
2. Pokial po zadani prikazov z bodu 1. nebude odpoved na http://localhost:8080 projekt nebude hodnoteny (0b).
3. Projekt musi pouzivat docker image node@18.12.1, inak nebude hodnoteny (0b).

# Ciel
Cielom zadania je vytvorit webovu aplikaciu pre monitorovanie osobnej kondicie. Aplikacia bude odpovedat na adrese localhost, porte 8080.

# Bodovanie
1    DB a praca s nou v ramci JS SUM 5
a       vahy                         1
b       [2nd param, 3rd param]       1
c       pouzivatelia                 1
d       metody                       1
e       reklama                      1

2    rozhranie aplikacie pouzivatela                                           SUM 12
a       stranky s moznostou registracie a prihlasenia pouzivatela                   1
        stranky so spravou merani
b         vlozit a zmazat merania                                                   2
c         import a export merani                                                    2
d       stranka so spravou metody (vlozit, zmazat)                                  2
        stranka s tabulkou a grafom udajov pouzivatela
e         moznostou vyberu casoveho rozsahu                                         2
          zobrazenie linearnej regresie
f           vaha                                                                    1
g           [2nd param] a [3rd param]                                               1
h         filtracia udajov podla metody                                             2
i       stranka s reklamou                                                          1

3    admin rozrhanie                                        SUM 3
a       so spravou pouzivatelov - vytvorit a zmazat pouzivatela 1
b       import pouzivatelov a export pouzivatelov               1
c       nastavenie reklamy a zobrazenie pocitadla               1

4    end-to-end test vlozenia vahy (simulacia network callov a pouzite mocha) 5

# [2nd param] a [3rd param]
13:00 spodny tlak, horny tlak
15:00 tep, kroky
17:00 obvod pas, obvod boky

# DB
RDB: mysql@8.0.31, postgresql@15.1, mariadb@10.9.4, ??? - inak sa opytajte (ziadne dokumentove DB, nie sqlite)
Vahy/[2nd param]/[3rd param]: id, datum (YYYY-MM-DD), hodnota, metoda (moze byt id, nazov alebo NULL/'')
Pouzivatelia: id, e-mail (unikatny), meno, heslo, vek, vyska
Metody: id, nazov, popis
Reklama: link k obrazku, link na ciel, pocitadlo

DB musi byt vytvorena pri build/up, neodovzdavate volume ani vlastny image DB.

# Rozhranie pouzivatel
stranky merani - vlozit merania (samostatne), importovat merania z CSV (datum YYYY-MM-DD, hodnota, typ (vaha/[2nd param]/[3rd param]), metoda), exportovat merania do CSV
stranka s reklamou - reklama sa bude zobrazovat kazdu minutu pouzivania aplikacie. Po stlaceni reklamy sa inkrementuje pocitadlo a presmeruje sa na cielovu adresu odkazu

# Rozhranie admin
stranka pre admina - import a export pouzivatelov v CSV (e-mail, meno, heslo, vek, vyska) reklama s moznostou zmeny linkov (img + href) a zobrazenie aktualneho stavu pocitadla reklamneho baneru

# Povolene kniznice a frameworky
React, Angular, Vue, Svelte
sequelize/nest.js/typeorm, express, jquery, axios
TypeScript
cokolvek ine - treba sa spytat
