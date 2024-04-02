# Node server app

## Uruchamianie

Aplikacja ma dwa trzy sposoby uruchamiania:

1. `npm start` - uruchamia apkę w ts serverze, domyślny sposób uruchomienia.
2. `npm run dev` - uruchamia nodemona, który śledzi zmiany w kodzie i restartuje serwer. Uruchamiając bez dockera, wczytuje również plik .env ze zmiennymi środowiskowymi do ustawienia.
3. `npm run serve` - uruchamia zbudowany do wersji commonjs serwer. Należy poprzedzić to jego zbudowaniem: `npm run build`.

## Endpointy

- /api - zwraca hello world. Wykorzystywany głównie do testowania, czy serwer działa.
- /api/products - zwraca listę produktów pobraną z bazy danych (o ile podano prawidłowe zmienne środowiskowe).
