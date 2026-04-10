# Security tasks 2
Ćwiczenie polega na eksplorowaniu aspektów bezpieczeństwa w konteneryzacji.

## Wymagania początkowe
Patrz do [tasku 1](/tasks/security/security-task.md), pkt 1-3.

## Zadania
1. Inspekcja - Image Vulnerability Scanning. Sprawdź obraz pod kątem podatności, wykorzystując narzędzia takie jak [trivy](https://trivy.dev/docs/latest/guide/) lub [docker scout](https://docs.docker.com/scout/). To zadanie może mieć dużo różnych rozwiązań i wniosków - najlepiej sprawdzać zmianę liczby wykrytych podatności w zależności od wersji zbudowanego obrazu (np. pełny obraz, debian-based, alpine, distroless).
2. Uprawnienia. Domyślnie, kontener budowany jest i działa z uprawnieniami roota. Zmodyfikuj obraz tak, aby to zmienić. Kroki do testowania:
    - Zbuduj obraz: `docker build -t <nazwa_obrazu> .` (kropka oznacza kontekst, tu aktualny folder).
    - Uruchom kontener: `docker start -d --name <nazwa_kontenera> <nazwa_obrazu>`.
    - Wejdź do powłoki kontenera: `docker exec -it <nazwa_kontenera> [bash|sh]` (wybierz powłokę: bash lub sh).
    - Uruchom polecenie instalujące jakieś oprogramowanie, np. `apt-get install nmap` dla debian-based lub `apk add nmap` dla alpine based.
    - Jeżeli polecenie się wykonuje - kontener działa z uprawnieniami roota.
    - Zmodyfikuj i wykonaj od początu, aż polecenie zacznie zwracać brak uprawnień.
3. Dev2prod, czyli jak dostarczać obrazy produkcyjne. Niniejsza aplikacja używa Reacta jako frontend, który w środowisku deweloperskim uruchamiany jest w nodzie. Takie uruchomienie produkcyjne skutkuje zwiększeniem ryzyka wystąpienia poważnych podatności. Zmień obraz tak, aby był jak najmniejszy:
    - Ponieważ frontend powinien działać w jak największym stopniu po stronie klienta, należy go zbudować do wersji statycznej html+js+css. Sposób wykonania opisano w [lab2 task 3](/tasks/Lab2.md#produkcyjny-dockerfile-apki-klienckiej-2-pkt).
    - Zbuduj obraz z innym tagiem i porównaj ich rozmiary (`docker images`).
4. Zarządzanie sekretami. Każda aplikacja potrzebuje dostępów do zasobów zewnętrznych, takich jak storage S3, baza danych, zewnętrzne API. Zwróć uwagę, jak uniknąć ich wycieku. Kontener uruchamiaj poleceniem `docker start --name <nazwa_kontenera> -d <nazwa_obrazu>`, a następnie wejść do jego powłoki (patrz pkt 2).
    - Do czego służy polecenie ENV w Dockerfile? Kiedy go używać?
    - Do czego służy polecenie COPY i co _dokładnie_ kopiuje? Co się kopiuje, z jakimi uprawnieniami (chmod/chown)?
    - Jaką funkcję pełni _dockerignore_ i czego **nie** robi?
    - Poeksperymentuj z buildem i sprawdź, co jest w kontenerze bezpośrednio po jego uruchomieniu. Wykorzystaj polecenia takie jak `ls`, `cat`, `grep` czy `echo`.
    - Jak prawidłowo skonfigurować kontener?
5. Kontener a zasoby. W odróżnieniu od maszyn wirtualnych, kontener domyślnie używa całych zasobów hosta. Wykonaj następujący scenariusz:
    - Wywołaj endpoint `/api/stress` i obserwuj zużycie pamięci, np. poleceniem `top` lub `htop`. Doinstaluj, jeżeli takiego nie ma
    - Sprawdź status kontenera poleceniem `docker ps` lub `docker ps -a`
    - Jeżeli nie można tego zrobić, uzasadnij przyczynę takiego stanu rzeczy.
    - Wdróż ewentualne poprawki, tak by temu przeciwdziałać.