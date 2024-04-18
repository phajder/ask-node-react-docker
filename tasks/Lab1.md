# Administracja sieciami komputerowymi 2024

---

# Lab1

**Cel ćwiczenia: Wykorzystanie konteneryzacji do stworzenia zdalnego środowiska deweloperskiego dla rozproszonej aplikacji webowej na przykładzie platformy Docker**

## Zadania

**UWAGA! W ćwiczeniu należy korzystać wyłącznie z systemów Linuxowych**

Przydatne polecenia można znaleźć w [dockumentacji](https://docs.docker.com/engine/reference/commandline/cli/) oraz w [Docker cheat sheet](https://docs.docker.com/get-started/docker_cheatsheet.pdf).

---

### Przygotowanie platformy [1 pkt]

1. Stwórz maszynę wirtualną do pracy. Skorzystaj z dostarczonego [opisu](/infra/README.md).
2. Jeżeli wszystkie czynności zostały wykonane prawidłowo, poniższe polecenie powinno wykonać się bez błędów i zwrócić pustą tabelę z uruchomionymi kontenerami.

   ```bash
   docker ps
   ```

   Przykładowy zrzut ekranu z konsoli:
   ![ssh to vm](/res/ssh-verify.png)

3. Wybierz preferowany sposób pracy: przez terminal lub IDE. W [opisie](/infra/README.md) konfiguracji infrastruktury znajduje się opis dla VS Code.
4. Skolnuj to repozytorium i przejdź do jego katalogu głównego (ask-node-react-docker, nazwa repozytorium).

---

### Baza danych [2 pkt]

1. Pobierz obraz bazy danych z repozytorium [DockerHub](https://hub.docker.com/) na maszynę. Wspierane przez aplikację bazy to mysql lub mariadb.
2. Uruchom bazę danych w kontenerze, inicjalizując ją danymi ze skryptu [db.sql](/db/db.sql). Są trzy możliwe rozwiązania:
   - Stworzenie kontenera z bazą a następnie wczytanie skryptu z wykorzystaniem polecenia docker exec. Przykład dla mysql:
     ```bash
     docker exec -i <nazwa_kontenera> sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < /path/to/db.sql
     ```
   - Stworzenie własnego obrazu, w którym skrypt [db.sql](/db/db.sql) zostanie skopiowany do katalogu /docker-entrypoint-initdb.d w kontenerze.
   - Zmapowanie skryptu do kontenera jako wolumin
3. Zweryfikuj prawidłowe działanie kontenera z bazą za pomocą polecenia `docker ps`. Jeżeli kontener nie widnieje jako uruchomony, wówczas nastąpił błąd. Tip: `docker logs <nazwa_kontenera>` wyświetli na ekran logi kontenera, w których znaleźć można opisy błędów.
4. Zweryfikuj prawidłowy import bazy danych poleceniem:
   ```bash
   docker exec -it <nazwa_kontenera> mysql -udockerdb -p
   ```
   Należy podać hasło do bazy. Znaleźć je można w [skrypcie](/db/db.sql#L19)
5. Jeżeli udało się zalogować do bazy danych, sprawdź czy znajduje się tam baza o nazwie dockerdb. Jeżeli tak, wówczas czynności uruchomienia bazy w kontenerze zostały wykonane prawidłowo.

---

### Aplikacja backendowa [2 pkt]

1. Pobierz obraz Node z repozytorium [DockerHub](https://hub.docker.com/_/node) na maszynę. Najlepiej wybrać tag _lts_.
2. W katalogu server uzupełnij plik [Dockerfile](/server/Dockerfile) odpowiednimi instrukcjami, pozwalającymi na uruchomienie aplikacji.
   - Jako polecenie wykonawcze (CMD/ENTRYPOINT) wskaż `npm run dev`.
   - **Nie kopiuj** kodu źródłowego!
3. Zbuduj obraz poleceniem `docker build -t <obraz_backendu>:0.1 .` w katalogu server.
4. Uruchom kontener z backendem poleceniem `docker run`. Uwzględnij:
   - Uruchom kontener tak, by nie blokował konsoli (deatched, -d).
   - Na potrzeby testów możesz opublikować port (-p), by zweryfikować poprawność działania aplikacji.
   - Wykorzystaj zmienne środowiskowe w pliku .env (-e lub --env-file).
   - Zmapuj kod źródłowy aplikacji jako wolumin do kontenera (-v i/lub `docker volume`).
5. Sprawdź, czy kontener jest uruchomiony i zweryfikuj poprawność jego działania, odwołując się do endpointu /api, który powinien zwrócić obiekt JSON z tekstem _Hello world!_.
6. Zmodyfikuj treść komunikatu zwracanego przez endpoint /api w pliku [api/index.ts](/server/src/api/index.ts#L8). Zapisz plik.
7. Jeżeli endpoint zwraca zmieniony tekst, wszystkie czynności zostały wykonane prawidłowo.

---

### Aplikacja frontendowa [2 pkt]

1. Pobierz lub wykorzystaj obraz Node z poprzedniej części. Najlepiej wybrać tag _lts_.
2. W katalogu client uzupełnij plik [Dockerfile](/client/Dockerfile) odpowiednimi instrukcjami pozwalającymi na uruchomienie.
   - Jako polecenie wykonawcze (CMD/ENTRYPOINT) wskaż `npm start`
   - **Nie kopiuj** kodu źródłowego!
3. Zbuduj obraz poleceniem `docker build -t <obraz_frontendu>:0.1 .` w katalogu client.
4. Uruchom kontener z frontendem poleceniem `docker run`. Uwzględnij:
   - Uruchom kontener tak, by nie blokował konsoli (deatched, -d).
   - Opublikuj port (-p). Domyślny port aplikacji to 3000. Zmapuj go 3333.
   - By klient uruchomił się poprawnie, niezbędne jest ustawienie zmiennej CI=true (-e).
   - Zmapuj kod źródłowy aplikacji z katalogu src jako wolumin do kontenera (-v).
   - Zmapuj katalog public jako wolumin do kontenera (-v).
5. Sprawdź, czy kontener jest uruchomiony i zweryfikuj poprawność jego działania, wchodząc pod adres maszyny (lub localhost przy port-forwardingu z VS Code) na port 3333.
6. Zmodyfikuj tekst dowolnego z dwóch przycisków: [_Load data_](/client/src/components/Layout/Layout.tsx#L37) lub [_Flush data_](/client/src/components/Layout/Layout.tsx#L40). Zapisz plik.
7. Jeżeli wyświetli się logo Reacta i dwa przyciski (mogą być ukryte po naciśnięciu logo) ze zmienionym tekstem, czynności zostały wykonane prawidłowo.

---

### Część problemowa: połączenie wszystkich komponentów aplikacji [3 pkt]

1. Bez wprowadzenia dodatkowych modyfikacji, działanie przycisku _Load data_ zwraca błąd (timeout lub internatl server error).
2. Połącz ze sobą kontenery backendu oraz bazy danych.
   - Aplikacja wykorzystuje zmienne środowiskowe do konfiguracji bazy. Ustaw zmienną [DB_HOST](/server/.env#L7) na właściwą.
   - Niektóre zmiany mogą wymagać ponownego stworzenia kontenera. Jeżeli to konieczne, usuń niewłaściwy i stwórz nowy.
3. Zweryfikuj poprawność połączenia, odpytując endpoint /api/products. Powinien on zwrócić listę produktów. Jeżeli występuje błąd, wykorzystaj polecenie `docker logs`, by znaleźć przyczynę.
4. Połącz ze sobą kontenery frontendu i backendu.
   - Aplikacja wykorzystuje wewnętrzny serwer proxy. Adres backendu, do którego proxowane są zapytania znajduje się w pliku [package.json](/client/package.json#L9) klienta.
   - Niektóre zmiany mogą wymagać ponownego stworzenia kontenera. Jeżeli to konieczne, usuń niewłaściwy i stwórz nowy.
5. Zweryfikuj poprawność połączenia poprzez załadowanie danych przyciskiem _Load data_. Finalny rezultat:
   ![ui-preview](/res/ui-preview.png)
6. Jeżeli obydwa przyciski działają prawidłowo i wszystkie aplikacje uruchomione zostały jako kontenery dockera, wszystkie czynności w ramach tego ćwiczenia zostały wykonane prawidłowo.

Tip: Do wykonania tej sekcji przydatne będzie utworzenie własnej sieci w dockerze poleceniem `docker network` (lepsze rozwiązanie) lub `docker inspect` jeżeli kontenery umieszczone zostały w domyślnej sieci (gorsze rozwiązanie).

---

# Uwagi

1. Jako potwierdzenie wykonania ćwiczenia należy wykonać sprawozdanie w formie docx (pdf, preferowane) lub markdown.
2. Należy umieścić wszystkie niezbędne zdjęcia i opisy pokazujące przebieg ćwiczenia.
3. Sprawozdanie nie musi być bardzo szczegółowe, jednak powinno odzwierciedlać sekwencję wykonywanych kroków oraz uzasadnienie, co i dlaczego się stało.
4. Sprawozdanie należy umieścić na platformie UPEL do następnych zajęć.
5. Pozostałe dwa laboratoria wymagają wiedzy z tego ćwiczenia, gdyż będą wykorzystywać tą samą aplikację.
6. Jeżeli aplikacja kliencka w trybie deweloperskim zwraca komunikat _Invalid host header_, wówczas przy uruchomieniu kontenera należy dodać opcję `DANGEROUSLY_DISABLE_HOST_CHECK=true`.

---

# Linki

1. https://docs.docker.com/network/network-tutorial-standalone/
2. https://www.digitalocean.com/community/questions/how-to-ping-docker-container-from-another-container-by-name
