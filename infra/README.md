# Przygotowanie infrastruktury do wdrożenia aplikacji

Na potrzeby niniejszego ćwiczenia przygotowano skrypt tworzący i konfigurujący maszynę wirtualną na chmurze AWS.

## Uruchomienie platformy AWS Academy

1. Zaloguj się do platformy AWS Academy. Każdy powinien otrzymać zaproszenie na uczelniany adres mailowy.

   Dane dostępowe:

   - login: <nr_indeksu>@student.agh.edu.pl
   - password: ustalony przy rejestracji

2. Z zakładki dashboard wejdź do kursu PH summer 2022/23 (Learner lab) i wybierz sekcję modules. Znajdują się w niej materiały przedstawiające korzystanie z platformy (Student Guide.pdf), terminal z dostępem do AWS (Learner lab) oraz ankieta podsumowująca (ja nie widzę wyników).
3. Uruchom konsolę wchodząc w Learner lab. Może być wymagane wyrażenie zgody na warunki korzystania z usługi. Rezultat, będący początkiem ćwiczenia, przedstawiono na poniższym rysunku.

   ![Learner lab console](/res/learner-lab-console.png)

4. By rozpocząć pracę z platformą, należy wystartować lab przyciskiem _Start lab_. Gdy przy linku do AWS zapali się zielona kontrolka, platforma jest gotowa do pracy. **UWAGA! Po zakończeniu pracy proszę wyłączać platformę przyciskiem _End lab_, by uniknąć niepotrzebnego wykorzystania środków**.

5. Wszelkie uwagi co do korzystania z platformy zostały zapisane w sekcji Readme, wyświetlanej domyślnie. Gdy nie jest ona widoczna, należy nacisnąć przycisk _Readme_.

## Instalacja terraforma

Jeżeli środowisko do pracy pozwala na instalację oprogramowania, należy zainstalować terraforma, zgodnie z [dokumentacją](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli). W przeciwnym przypadku należy przejść do kolejnej sekcji.

### Pobieranie prekompilowanej binarki

W przypadku braku możliwości instalacji oprogramowania (AWS Academy, komputery labowe), należy pobrać skompilowaną binarkę terraforma, dostępną na [stronie](https://developer.hashicorp.com/terraform/install). **Jeżeli dostęp do maszyny jest wyłącznie zdalny, należy wykorzystać terminalowe polecenia, np. curl czy wget.** Po pobraniu najlepiej rozpakować ją do katalogu `~/.local/bin`. Jeżeli nie istnieje, należy go stworzyć poleceniem `mkdir -p ~/.local/bin`.

By działała z dowolnego miejsca, należy dodać ścieżkę do niej do zmiennej PATH. Dla powłoki bash (weryfikacja poprzez polecenie `echo $0`):

```bash
echo "export PATH=\$PATH:~/.local/bin" >> ~/.bashrc
```

Należy zrestartować sesję, by polecenie zadziałało, np. ponowne włączenie terminala lub przeładowanie strony w przeglądarce (AWS Academy). Można też użyć polecenia `source ~/.bashrc`.

**UWAGA! W przypadku wykorzystywania innej powłoki niż bash konieczna jest zmiana pliku rc na odpowiedni, np. `~/.zshrc` dla zsh.**

### Weryfikacja poprawności działania terraforma

Po instalacji należy sprawdzić, czy polecenie działa prawidłowo, np. wywołując je z terminala. Powinien zwrócić następujący output:

```bash
➜  ~ terraform
Usage: terraform [global options] <subcommand> [args]

The available commands for execution are listed below.
The primary workflow commands are given first, followed by
less common or more advanced commands.

Main commands:
  init          Prepare your working directory for other commands
  validate      Check whether the configuration is valid
  plan          Show changes required by the current configuration
  apply         Create or update infrastructure
  destroy       Destroy previously-created infrastructure

All other commands:
  console       Try Terraform expressions at an interactive command prompt
  fmt           Reformat your configuration in the standard style
  force-unlock  Release a stuck lock on the current workspace
  get           Install or upgrade remote Terraform modules
  graph         Generate a Graphviz graph of the steps in an operation
  import        Associate existing infrastructure with a Terraform resource
  login         Obtain and save credentials for a remote host
  logout        Remove locally-stored credentials for a remote host
  metadata      Metadata related commands
  output        Show output values from your root module
  providers     Show the providers required for this configuration
  refresh       Update the state to match remote systems
  show          Show the current state or a saved plan
  state         Advanced state management
  taint         Mark a resource instance as not fully functional
  test          Execute integration tests for Terraform modules
  untaint       Remove the 'tainted' state from a resource instance
  version       Show the current Terraform version
  workspace     Workspace management

Global options (use these before the subcommand, if any):
  -chdir=DIR    Switch to a different working directory before executing the
                given subcommand.
  -help         Show this help output, or the help for a specified subcommand.
  -version      An alias for the "version" subcommand.
```

## Konfiguracja kluczy AWS

Platforma AWS Academy ma przygotowane odpowiednio klucze w konsoli. Jeżeli na niej wykonywane jest tworzenie maszyny za pomocą terraforma, należy przejść do następnej sekcji.

By jednak skonfigurować prawidłowo terraforma na własnej maszynie, należy skopiować klucze do AWS API z tej platformy. Są one dostępne w sekcji _AWS Details_, przycisk _Show_ przy AWS CLI. Zawartość należy, zgodnie z opisem na platformie, skopiować w odpowiednie miejsce katalogu domowego: `~/.aws/credentials`.

![AWS CLI credentials](/res/aws-academy-credentials.png)

Warto też stworzyć plik `~/.aws/config` o następującej zawartości:

```
[default]
region = us-east-1
```

Jeżeli w katalogu domowym znajdują się inne profile do AWS CLI, należy zmienić nazwę, aby były one unikalne.

**UWAGA! Klucz ten jest sesyjny - po upływie czasu lub deaktywacji labu na platformie AWS Academy są one zmieniane i proces kopiowania należy przeprowadzić ponownie, przed przystąpieniem do tworzenia infrastruktury.**

## Konfiguracja środowiska deweloperskiego

Kroki opisane w tej części należy wykonać tylko jeden raz, tuż po rozpoczęciu pracy z repo.

### Generacja pary kluczy

Do łączenia się z maszyną wirtualną wykorzystać należy parę kluczy. By z niej skorzystać, podczas uruchomienia skryptu należy wskazać klucz publiczny, który zostanie skopiowany na maszynę. W celu ich wygenerowania trzeba skorzystać z polecenia _ssh-keygen_, wybierając stosowny algorytm. Poniższe polecenie generuje parę kluczy z wykorzystaniem algorytmu ed25519.

```bash
ssh-keygen -t ed25519
```

Klucz domyślnie znajduje się w katalogu ~/.ssh i będzie mieć nazwę id_ed25519, które można zmienić w trakcie generacji lub wykorzystując opcję -f. **W dalszej części opisu wykorzystano nazwę domyślną.**

**UWAGA! Na platformie AWS Academy klucz generuje się do _złego_ katalogu - katalog domowy (~) do pracy jest podmontowany do lokalizacji, która różni się od /home, gdzie keygen zapisuje parę kluczy. Wówczas warto skorzystać z opcji -f, które wygeneruje ją we _właściwym_ katalogu.**

```bash
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519
```

Wygenerowany klucz można przenosić między swoimi sprzętami (komputer stacjonarny, laptop) i używać go do łączenia się z tworzoną wirtualką.

**UWAGA DLA WINDOWSA! Kopiując zawartość klucza, należy na końcu dodać dodatkowy znak końca linii. Inaczej występować będą błędy odczytu.**

### Klonowanie repozytorium

Przed uruchomieniem inicjalizacji terraforma należy skopiować repozytorium poleceniem:

```bash
git clone https://github.com/phajder/ask-node-react-docker
```

### Inicjalizacja terraforma

W celu uruchomienia skryptu, w katalogu [infra](/infra) należy zainicjalizować terraforma poleceniem _init_.

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
terraform apply -var "public_key=$(< ~/.ssh/id_ed25519.pub)"
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

Po zakończonej pracy (najlepiej po ostatnich labach) należy zniszczyć stworzone zasoby, by nie zostały naliczone dodatkowe opłaty. W tym celu należy wywołać polecenie _destroy_.

```bash
terraform destroy
```

Polecenie to można wykorzystać również w sytuacji, gdy z maszyną są problemy i to ona powoduje problemy w wykonaniu ćwiczenia. Po tym należy ponownie stworzyć maszynę poleceniem _apply_.

**UWAGA! W wyniku wykonania tego polecenia zniszczone zostaną wszystkie stworzone przez terraforma zasoby, włącznie z zawartymi na nich danymi. Nie jest możliwe ich przywrócenie, więc należy kończyć pracę, upewniwszy się wcześniej, że wszystkie dane zostały skopiowane na inną maszynę.**

## Dodatkowe informacje

### Pobieranie zmiennych terraforma

Skrypt jako wyjście zwraca dwa adresy maszyny: prywatny oraz publiczny. O ile pierwszy jest niezmienny, o tyle drugi może zmienić się w dowolnym momencie, np. w wyniku restartu interfejsu, maszyny, jej migracji lub innych operacji po stronie dostawcy. By uzyskać te wartości można w dowolnym momencie wywołać polecenie _output_.

```bash
terraform output
```

**UWAGA! Warto odświeżyć stan terraforma, szczególnie po dłuższej przerwie od pracy.**

### Odświeżanie stanu terraforma

Po restarcie maszyny wirtualnej lub po ponownym włączeniu labu na AWS Academy, istnieje możliwość desynchronizacji stanu terraforma z chmurą AWS. By go odświeżyć, należy wykonać polecenie:

```bash
terraform refresh -var "public_key=$(< ~/.ssh/id_ed25519.pub)"
```

UWAGA! Należy wskazać odpowiednią ścieżkę do klucza publicznego!

### Kopiowanie klucza z AWS Academy na własną maszynę

By wypisać klucz na ekran terminala, należy wykonać polecenie:

```bash
cat ~/.ssh/id_ed25519
```

**UWAGA! Na Windowsie należy dodać na końcu klucza prywatnego dodatkowy znak końca linii (enter).**

### Konfiguracja remote ssh w VS Code

W celu uproszczenia pracy z kodem, warto skonfigurować swoje IDE do pracy na zdalnym serwerze. W tej instrukcji zawarto skrótowy opis konfiguracji wtyczki [Remote-SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) w VS Code. Pełny natomiast dostępny jest na [oficjalnej stronie](https://code.visualstudio.com/docs/remote/ssh).

1. Uruchom VS Code.
2. Zainstaluj wtyczkę remote-ssh.
3. Przejdź do menu _Remote Explorer_ (powinna być ostatnia na liście po lewej stronie).
4. Wybierz hosta, do którego chcesz się połączyć.

Jeżeli na liście nie ma żadnego hosta, należy go dodać poprzez opcje (zębatka przy _ssh targets_). Otworzy to plik ~/.ssh/config. Opis konfiguracji pojedynczego wpisu zawarto poniżej.

**UWAGA! Takie podejście instaluje komponenty serwerowe VS Code na zdalnej maszynie. Oznacza to, że wszelkie wtyczki do pracy z kodem muszą zostać tam zainstalowane, niezależnie od konfiguracji lokalnej.**

### Config klienta ssh do uproszczonego połączenia

W celu skrócenia/uproszczenia polecenia nawiązującego połączenie ssh z maszyną, można stworzyć config, w którym zawarte zostaną wszystkie niezbędne informacje. Jest to plik `~/.ssh/config`. Należy dodać do niego następujący wpis:

```
Host ask-ubuntu
    HostName <IP>
    User ubuntu
    Port 22
    IdentityFile ~/.ssh/id_ed25519
```

Za _\<IP\>_ należy podstawić adres IP maszyny. Należy również podmienić ścieżkę _IdentityFile_ do klucza prywatnego. Jeżeli system na wirtualce jest inny niż ubuntu, trzeba zmienić również nazwę użytkownika.

Posiadając taki wpis w pliku konfiguracyjnym połączenie z maszyną można wykonać za pomocą polecenia `ssh ask-ubuntu`.

**UWAGA! Adres IP będzie się zmieniać po ponownym wystartowaniu labu na AWS Academy. Należy pamiętać o jego każdorazowej zmianie w pliku `~/.ssh/config`.**

### Zmiana domyślnego obrazu maszyny

Domyślnie wybranym obrazem maszyny jest ubuntu 22.04 LTS. By to zmienić, należy zmienić wartość zmiennej _ec2_ami_ podczas wykonania polecenia _apply_ lub w pliku [variables](./variables.tf#L21). AMI ID można znaleźć na platformie AWS, podczas tworzenia maszyny wirtualnej w usłudze EC2.

**UWAGA! [Skrypt](./install_docker.sh) do automatycznej instalacji dockera został napisany wyłącznie pod systemy ubuntu, debian oraz amazon linux 2023. W innych przypadkach należy samodzielnie zainstalować system, zgodnie z [dokumentacją](https://docs.docker.com/engine/install/).**

### Domyślni użytkownicy w obrazach AWS

Jeżeli maszyna została stworzona z innym systemem niż zdefiniowany w konfiguracji, należy wybrać właściwą nazwę domyślnego użytkownika.

| **OS**             | **Username** |
| :----------------- | :----------- |
| Amazon Linux 2023  | ec2-user     |
| Ubuntu 22.04 LTS   | ubuntu       |
| Debian 12 Bookworm | admin        |
