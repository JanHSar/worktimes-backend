# Datenbank

Die Konfiguration der Datenbankverbindung befindet sich in der Datei `config/config.json`. Voreingestellt ist eine Verbindung zu eine PostgreSQL Datenbank.

```
"username": "postgres",
"password": null,
"database": "postgres",
"host": "127.0.0.1",
"port": 5433,
"dialect": "postgresql"
```

Die Datenbank und das Schema müssen bereits erstellt sein, anschließend können die Migrations und Seeder ausgeführt werden.

```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Vordefinierte Benutzer sind: 
  
    Name: Hans
    Passwort: wdUser

    Name: Julia
    Passwort: wdUser

# Start der API
Zunächst die node Modules installieren, danach starten. 

    npm install
    npm start
