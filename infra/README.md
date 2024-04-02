# Przygotowanie infrastruktury do wdrożenia aplikacji

Na potrzeby niniejszego ćwiczenia przygotowano skrypt tworzący i konfigurujący maszynę wirtualną na chmurze AWS.

## Instalacja terraforma

Do uruchomienia skryptu należy zainstalować terraforma, zgodnie z [dokumentacją](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli).

Po instalacji należy sprawdzić, czy polecenie działa prawidłowo, np. wywołując je z terminala.

```bash
terraform
```

### Pobieranie prekompilowanej binarki

W przypadku braku możliwości instalacji oprogramowania (AWS Academy, laby), należy pobrać skompilowaną binarkę terraforma, dostępną na [stronie](https://developer.hashicorp.com/terraform/install). Jeżeli dostęp do maszyny jest wyłącznie zdalny, należy wówczas wykorzystać terminalowe polecenia,np. curl czy wget. Po pobraniu należy wypakować binarkę do katalogu _infra_.

## Konfiguracja środowiska deweloperskiego

Kroki opisane w tej części należy wykonać tylko jeden raz, tuż po rozpoczęciu pracy z repo.

### Generacja pary kluczy

Do łączenia się z maszyną wirtualną wykorzystać należy parę kluczy. By z niej skorzystać, podczas uruchomienia skryptu należy wskazać klucz publiczny, który zostanie skopiowany na maszynę. W celu ich wygenerowania trzeba skorzystać z polecenia _ssh-keygen_, wybierając stosowny algorytm. Poniższe polecenie generuje parę kluczy z wykorzystaniem algorytmu ed25519.

```bash
ssh-keygen -t ed25519
```

Klucz domyślnie znajduje się w katalogu ~/.ssh i będzie mieć nazwę id_ed25519, które można zmienić w trakcie generacji lub wykorzystując opcję -f. **W dalszej części opisu wykorzystano nazwę domyślną.**

### Inicjalizacja terraforma

W celu uruchomienia skryptu, należy zainicjalizować terraforma poleceniem _init_.

```bash
terraform init
```

Jeżeli inicjalizacja została wykonana poprawnie, można przejść do dalszej części instrukcji.

## Tworzenie infrastruktury

W tej części opisano sposób tworzenia infrastruktury za pomocą terraforma. Należy ją wykonać każdorazowo, chyba że zasoby nie zostały zniszczone przy pomocy polecenia _destroy_.

Aby uruchomić tworzenie maszyny wirtualnej, należy skorzystać z polecenia _apply_.

```bash
terraform apply
```

By móc stworzyć poprawnie zasoby, terraform poprosi o podanie klucza publicznego. Wówczas należy wkleić zawartość pliku klucza publicznego. Można również wskazać go podczas uruchamiania polecenia _apply_.

```bash
terraform apply -var "public_key=$(<id_ed25519.pub)"
```

Na ekranie wyświeli się plan tworzonej infrastruktury, który należy potwierdzić słowem **yes** (jest to wyjaśnione w trakcie wykonywania polecenia _apply_).

Stworzenie maszyny wirtualnej powinno zająć nie dłużej niż minutę, jednakże cały proces jej prawidłowej konfiguracji może się wydłużyć do kilku minut.

## Połączenie ssh z maszyną wirtualną

By połączyć się przez ssh z maszyną wirtualną należy wskazać właściwy adres IP, nazwę użytkownika oraz klucz prywatny. W tym celu należy wywołać klienta ssh:

```bash
ssh -i ~/.ssh/id_ed25519 ubuntu@ip
```

Przy pierwszym połączeniu z maszyną należy zgodzić się co do prawidłowości przesłanego przez serwer fingerprintu.

## Weryfikacja gotowości do pracy

Po zalogowaniu się na maszynę należy wywołać polecenie _docker ps_.

```bash
docker ps
```

Powinien wyświetlić się wyłącznie nagłówek tabeli uruchomionych kontenerów. Dodatkowe uwagi:

- _Command not found_ - system nie jest gotowy do pracy.
- _Permission denied_ - należy się przelogować.

Jeżeli polecenie działa poprawnie, można rozpocząć pracę z maszyną.

## Niszczenie infrastruktury

Po zakończonej pracy należy zniszczyć stworzone zasoby, by nie zostały naliczone dodatkowe opłaty. W tym celu należy wywołać polecenie _destroy_.

```bash
terraform destroy
```

**UWAGA!** W wyniku wykonania tego polecenia zniszczone zostaną wszystkie stworzone przez terraforma zasoby, włącznie z zawartymi na nich danymi. Nie jest możliwe ich przywrócenie, więc należy kończyć pracę, upewniwszy się wcześniej, że wszystkie dane zostały skopiowane na inną maszynę.

## Dodatkowe informacje

### Zmiana domyślnego obrazu maszyny

Domyślnie wybranym obrazem maszyny jest ubuntu 22.04 LTS. By to zmienić, należy zmienić wartość zmiennej _ec2_ami_ podczas wykonania polecenia _apply_ lub w pliku [variables](./variables.tf#L21). AMI ID można znaleźć na platformie AWS, podczas tworzenia maszyny wirtualnej w usłudze EC2.

**UWAGA!** [Skrypt](./install_docker.sh) do automatycznej instalacji dockera został napisany wyłącznie pod systemy ubuntu, debian oraz amazon linux 2023. W innych przypadkach należy samodzielnie zainstalować system, zgodnie z [dokumentacją](https://docs.docker.com/engine/install/).

### Domyślni użytkownicy w obrazach AWS

Jeżeli maszyna została stworzona z innym systemem niż zdefiniowany w konfiguracji, należy wybrać właściwą nazwę domyślnego użytkownika.

| **OS**             | **Username** |
| :----------------- | :----------- |
| Amazon Linux 2023  | ec2-user     |
| Ubuntu 22.04 LTS   | ubuntu       |
| Debian 12 Bookworm | admin        |

### Pobieranie zmiennych terraforma

Skrypt jako wyjście zwraca dwa adresy maszyny: prywatny oraz publiczny. O ile pierwszy jest niezmienny, o tyle drugi może zmienić się w dowolnym momencie, np. w wyniku restartu interfejsu, maszyny, jej migracji lub innych operacji po stronie dostawcy. By uzyskać te wartości można w dowolnym momencie wywołać polecenie _output_.

```bash
terraform output
```

### Konfiguracja remote ssh w VS Code

W celu uproszczenia pracy z kodem, warto skonfigurować swoje IDE do pracy na zdalnym serwerze. W tej instrukcji zawarto skrótowy opis konfiguracji wtyczki [Remote-SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) w VS Code. Pełny natomiast dostępny jest na [oficjalnej stronie](https://code.visualstudio.com/docs/remote/ssh).

1. Uruchom VS Code.
2. Zainstaluj wtyczkę remote-ssh.
3. Przejdź do menu _Remote Explorer_ (powinna być ostatnia na liście po lewej stronie).
4. Wybierz hosta, do którego chcesz się połączyć.

Jeżeli na liście nie ma żadnego hosta, należy go dodać poprzez opcje (zębatka przy _ssh targets_). Otworzy to plik ~/.ssh/config. Opis konfiguracji pojedynczego wpisu zawarto poniżej.

**UWAGA!** Takie podejście instaluje komponenty serwerowe VS Code na zdalnej maszynie. Oznacza to, że wszelkie wtyczki do pracy z kodem muszą zostać tam zainstalowane, niezależnie od konfiguracji lokalnej.

### Config klienta ssh do uproszczonego połączenia

W celu skrócenia/uproszczenia polecenia nawiązującego połączenie ssh z maszyną, można stworzyć config, w którym zawarte zostaną wszystkie niezbędne informacje. Jest to plik ~/.ssh/config. Należy dodać do niego następujący wpis:

```
Host ask-ubuntu
    HostName <IP>
    User ubuntu
    Port 22
    IdentityFile ~/.ssh/id_ed25519
```

Za _\<IP\>_ należy podstawić adres IP maszyny. Należy również podmienić ścieżkę _IdentityFile_ do klucza prywatnego. Jeżeli system na wirtualce jest inny niż ubuntu, trzeba zmienić również nazwę użytkownika.

Posiadając taki wpis w pliku konfiguracyjnym połączenie z maszyną można wykonać za pomocą polecenia `ssh ask-ubuntu`.
