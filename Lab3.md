# Administracja sieciami komputerowymi 2023

---

# Lab3
**Cel ćwiczenia: Podejście deklaratywne do stworzenia zdalnego środowiska deweloperskiego i produkcyjnego dla rozproszonej aplikacji webowej z wykorzystaniem narzędzia docker-compose**

## Zadania
**UWAGA! W ćwiczeniu należy korzystać wyłącznie z systemów Linuxowych**
1. [4 pkt] Przygotuj skrypt docker-compose.yml, uruchamiający aplikację w formie deweloperskiej (jak na lab2).
    - Wykorzystaj Dockerfile z lab2 do budowania obrazów przez docker-compose
    - Wszystkie parametry podawane przy uruchomieniu kontenerów podaj w docker-compose.yml
    - **UWAGA!** Na maszynę hosta udostępnij wyłącznie port do aplikacji klienckiej!
2. [1 pkt] Umieść kontenery w odpowiednich sieciach:
    - backend: ma zawierać kontenery backendu oraz bazy danych
    - frontend: ma zawierać kontenery frontendu i backendu.
3. [1 pkt] Ustaw customową adresację stworzonych sieci. Za `x` podstaw wartość obliczoną wg wzoru: `numer_albumu mod 200`. Jeżeli adresacja koliduje z adresacją w sieci lokalnej (labowej lub domowej), zmień na inną.
    ![custom-networks](/res/docker-compose-network.svg)
4. [2 pkt] Zbuduj produkcyjną wersję aplikacji frontendowej:
    - Stwórz nowy Dockerfile, w którym aplikacja zostanie uruchomiona w wersji produkcyjnej.
    - Wykorzystaj [multi-stage build](https://docs.docker.com/build/building/multi-stage/), by zbudować aplikację:
        * Stage 1: node. Należy zbudować wersję produkcyjną poleceniem `npm run build`.
        * Stage 2: nginx. Wykorzystaj plik konfiguracyjny [nginx.conf](/client/nginx.conf)
    - Plik nginx.conf powinien znaleźć się w kontenerze pod ścieżką `/etc/nginx/nginx.conf`
    - Do testowania prawidłowości działania kontenera opartego o nowy obraz można zakomentować sekcję upstream.
    - Zweryfikuj prawidłowość działania aplikacji, wchodząc w przeglądarkę na port 80 pod adresem maszyny, na której jest ona hostowana.
5. [2 pkt] Przygotuj wersję produkcyjną aplikacji z wykorzystaniem docker-compose:
    - Stwórz osobny plik docker-compose.production.yml i zawrzyj w nim konfigurację.
    - Zmodyfikuj [nazwę hosta i port w upstreamie](/client/nginx.conf#L15).
    - Jakie będą różnice między środowiskami dev i prod?
    - Jakie różnice pojawiają się w konfiguracji docker-compose.yaml?
    - Jak wykorzystać wiele plików yml i dlaczego?
    - Jaka jest rola docker-compose.override.yml?
    - Wykorzystaj [dokumentację](https://docs.docker.com/compose/extends/).
6. Uruchomienie aplikacji powinno odbyć się automatycznie przy pomocy polecenia `docker-compose up` (można dodać parametr `-d`).
