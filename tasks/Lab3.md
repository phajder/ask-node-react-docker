# Administracja sieciami komputerowymi 2024

---

# Lab3

**Cel ćwiczenia: Publiczne i prywatne wdrożenie aplikacji webowej z wykorzystaniem reverse proxy w modelu cloud native**

## Zadania

**UWAGA! W ćwiczeniu należy korzystać wyłącznie z systemów Linuxowych**

Aby wykonać ćwiczenie, należy mieć gotowy skrypt [`compose.yaml`](/compose.yaml) z [Lab2](/tasks/Lab2.md) oraz uruchomioną zgodnie z [opisem](/infra/README.md) maszynę wirtualną na AWS.

---

### Traefik Proxy [2 pkt]

W pliku [proxy/compose.yaml](/proxy/compose.yaml) stwórz serwis Traefik Proxy:

1. Obraz dostępny jest na [DockerHubie](https://hub.docker.com/_/traefik).
2. Dashboard ma zostać udostępniony wyłącznie na lokalnym interfejsie.
3. Proxy ma nasłuchiwać na portach hosta 80 oraz 443.
4. Stwórz sieć o nazwie _proxy_ i dodaj do niej serwis Traefika. Może być tworzona zarówno przez compose jak i docker cli.
5. Sprawdź działanie dashboarda, wykorzystując port forwarding (ssh lub we wtyczce remote-ssh w VS Code).
6. Przykłady konfiguracji znajdują się w [dokumentacji](https://doc.traefik.io/traefik/).

---

### DuckDNS domains [1 pkt]

Stwórz dwie domeny w serwisie [DuckDNS](https://www.duckdns.org):

1. Publiczną - jako nazwę przyjmij dowolnie wybraną przez siebie i dostępną nazwę. Przypisz jej publiczny adres maszyny wirtualnej na AWS.
2. Lokalną - użyj tej samej nazwy z suffixem _-local_, np. phajder-local. Przypisz jej adres interfejsu loopback, tj. 127.0.0.1.

---

### Serwis dostępny publicznie - React client [2 pkt]

Zmodyfikuj własny plik [compose.yaml](/compose.yaml), gdzie znajduje się aplikacja kliencka, tak aby Traefik automatycznie udostępnił serwis na zewnątrz.

1. Serwis musi zostać umieszczony w sieci _proxy_, stworzonej w punkcie 1.
2. Wskaż właściwy router Traefika, by usługa była dostępna publicznie.
3. Sprawdź działanie poprzez wejście pod adres domeny publicznej.

---

### Serwis dostępny lokalnie - phpmyadmin [2 pkt]

Dodaj usługę phpmyadmin do własnego pliku [compose.yaml](/compose.yaml):

1. Obraz dostępny jest na [DockerHubie](https://hub.docker.com/_/phpmyadmin).
2. Połącz go z bazą danych w osobno stworzonej w tym celu sieci.
3. Umieść serwis w sieci _proxy_, stworzonej w punkcie 1.
4. Skonfiguruj serwis tak, aby Traeifk udostępnił usługę pod domeną lokalną.
5. Sprawdź działanie serwisu, wykorzystując port forwarding (ssh lub we wtyczce remote-ssh w VS Code).

---

### SSL Offloading with Traefik [3 pkt]

Skonfiguruj Traefika i udostępniane serwisy, by włączyć SSL na obydwu domenach z wykorzystaniem certyfikatow Let's Encrypt:

1. Wykorzystaj DNS Challenge oraz DuckDNS jako providera. Zmienne środowiskowe są dostępne w dokumentacji [kliencie Let's Encrypt](https://go-acme.github.io/lego/dns/duckdns/). W większości przypadków wystarczy wyłacznie zmienna DUCKDNS_TOKEN.
2. **Stwórz wolumen, by trwale przechować wygenerowane certyfikaty!** W przeciwnym przypadku po restarcie compose zostaną one utracone. Let's Encrypt ma [limit](https://letsencrypt.org/docs/rate-limits/) na liczbę wydanych certyfikatów na domenę!
3. W serwisach dodaj odpowiednie domeny w konfiguracji tls. Uwzględnij również możliwość wprowadzenia subdomen (_\*.nazwa_domeny.duckdns.org_).
4. Sprawdź działanie aplikacji klienckiej na publicznej domenie oraz prawidłowość certyfikatu SSL.
5. Sprawdź działanie phpmyadmina na lokalnej domenie oraz prawidłowość certyfikatu SSL.

---

## Dodatkowe informacje
1. Jeżeli phpmyadmin zwraca błąd 404 (/ oraz /phpmyadmin)
