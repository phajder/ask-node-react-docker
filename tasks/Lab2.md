# Administracja sieciami komputerowymi 2024

---

# Lab2

**Cel ćwiczenia: Podejście deklaratywne do stworzenia zdalnego środowiska deweloperskiego i produkcyjnego dla rozproszonej aplikacji webowej z wykorzystaniem narzędzia docker-compose**

## Zadania

**UWAGA! W ćwiczeniu należy korzystać wyłącznie z systemów Linuxowych**

Aby wykonać ćwiczenie, potrzebne będą pliki Dockerfile z Lab1 w aplikacjach [serwerowej](/server/Dockerfile) oraz [klienckiej](/client/Dockerfile).

---

### Automatyzacja przy pomocy docker compose [4 pkt]

Przygotuj skrypt [compose.yaml](/compose.yaml), uruchamiający aplikację w formie deweloperskiej (jak na lab2):

1. Wykorzystaj Dockerfile z lab2 do budowania obrazów przez docker-compose
2. Wszystkie parametry podawane przy uruchomieniu kontenerów podaj w docker-compose.yml
3. **UWAGA!** Na maszynę hosta udostępnij wyłącznie port do aplikacji klienckiej!

---

### Custom networking w dockerze [2 pkt]

1. Umieść kontenery w odpowiednich sieciach:
   - backend: ma zawierać kontenery backendu oraz bazy danych
   - frontend: ma zawierać kontenery frontendu i backendu.
2. Ustaw customową adresację stworzonych sieci. Za `x` podstaw wartość obliczoną wg wzoru: `numer_albumu mod 200`. Jeżeli adresacja koliduje z adresacją w sieci lokalnej (labowej lub domowej), zmień na inną.
   ![custom networks](/res/docker-compose-network.svg)

---

### Produkcyjny Dockerfile apki klienckiej [2 pkt]

Zbuduj produkcyjną wersję aplikacji frontendowej:

1. Stwórz nowy Dockerfile, w którym aplikacja zostanie uruchomiona w wersji produkcyjnej.
2. Wykorzystaj [multi-stage build](https://docs.docker.com/build/building/multi-stage/), by zbudować aplikację:
   - Stage 1: [node](https://hub.docker.com/_/node). Należy zbudować wersję produkcyjną poleceniem `npm run build`.
   - Stage 2: [nginx](https://hub.docker.com/_/nginx). Wykorzystaj szablon pliku konfiguracyjnego [nginx.conf](/client/nginx.conf.template). Zwróć uwagę na zmienne środowiskowe, które należy ustawić.
3. Docelowy plik nginx.conf powinien znaleźć się w kontenerze pod ścieżką `/etc/nginx/nginx.conf`. Tip: wykorzystaj zmienną środowiskową NGINX_ENVSUBST_OUTPUT_DIR.
4. Do testowania prawidłowości działania kontenera opartego o nowy obraz można zakomentować sekcję upstream.
5. Zweryfikuj prawidłowość działania aplikacji, wchodząc w przeglądarkę na port 80 pod adresem maszyny, na której jest ona hostowana.

---

### Prodykcyjna wersja compose.yaml [2 pkt]

Przygotuj wersję produkcyjną aplikacji z wykorzystaniem docker-compose:

1. Stwórz osobny plik docker-compose.production.yml i zawrzyj w nim konfigurację.
2. Zmodyfikuj [nazwę hosta i port w upstreamie](/client/nginx.conf#L15).
3. Uruchomienie aplikacji powinno odbyć się automatycznie przy pomocy polecenia `docker-compose up` (można dodać parametr `-d`).
4. Odpowiedz na pytania, wskazując różnice w kodzie:
   - Jakie będą różnice między środowiskami dev i prod?
   - Jakie różnice pojawiają się w konfiguracji docker-compose.yaml?
   - Jak wykorzystać wiele plików yml i dlaczego?
   - Jaka jest rola docker-compose.override.yml?
   - Wykorzystaj [dokumentację](https://docs.docker.com/compose/extends/).
