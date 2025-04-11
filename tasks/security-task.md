# Security tasks
Ćwiczenie polega na eksplorowaniu funkcjonowania konteneryzacji w systemie operacyjnym. Kolejność (niemal) dowolna.

## Wymagania początkowe
1. Stwórz maszynę wirtualną EC2, np. za pomocą [skryptu](https://github.com/phajder/tf-ec2-creator).
2. Zainstaluj dockera: https://docs.docker.com/engine/install/debian/
3. Zainstaluj k3s: https://docs.k3s.io/quick-start

## Zadania
* Co można zrobić w dockerze? Sprawdź, jak działa docker (słowa kluczowe: client-server, daemon, unix socket), czym są parametry/flagi privileged, pid. Przetestuj działanie poleceń whoami, capsh --print ps aux.
* Linux capabilities: https://man7.org/linux/man-pages/man7/capabilities.7.html. Jak wpływają na pracę kontenera?
* Spróbuj potestować działanie niniejszej aplikacji, np. odbierając jej wszystkie capabilities, modyfikując użytkownika/grupę, zarówno podczas uruchamiania jak i przy budowaniu obrazu.
* Praca z k3s. Potestuj na przykładzie poda z nginx następujące:
    * Linux capabilities
    * Usunięcie wszystkich capabilities
    * Czym jest i jak działa CAP_NET_BIND_SERVICE? 
* Security w kubernetesie:
    * https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/
    * https://kubernetes.io/docs/reference/access-authn-authz/rbac/
    * Sprawdź działanie PodSecurity na przykładzie: https://kubernetes.io/docs/tutorials/security/cluster-level-pss/
* (Opcjonalnie) Sprawdź aplikację [trivy](https://github.com/aquasecurity/trivy). Przetestuj na obrazie [dvwa](https://github.com/digininja/DVWA/pkgs/container/dvwa).
* (Opcjonalnie) Podatności linux kernela:
    * Dirty COW: https://github.com/firefart/dirtycow
* (Opcjonalnie) Podatność Dirty pipe vs runc:
    * https://securitylabs.datadoghq.com/articles/dirty-pipe-container-escape-poc/
    * https://github.com/DataDog/security-lab-pocs/pkgs/container/dirtypipe-container-breakout
    * Simple demo: https://github.com/DataDog/security-labs-pocs/tree/main/proof-of-concept-exploits/dirtypipe-container-breakout
