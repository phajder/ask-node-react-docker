# React client app

## Uruchamianie

Aby uruchomić apkę, wystarczy wywołać polecenie `npm start`. W przypadku, gdy jest to kontener, należy dodatkowo dodać zmienną `CI=true`, by przełączenie między uruchomieniem serwera a watchera nie spowodowało zatrzymania jego pracy.

## Dark/light mode

Jeżeli ciemny tryb jest niewygodny/niepraktyczny w użytkowaniu, wystarczy zmienić (lub usunąć) klasę _dark_ z tagu html w pliku [index.html](/public/index.html#L2)

## TODO

- Wyświetlanie błędów podczas pobierania danych z serwera jest w konsoli jsowej. Brakuje wyświetlania alertu. Warto więc włączyć konsolę, jeżeli przycisk do pobierania nie działa.

## Useful links

1. https://github.com/shadcn-ui/ui/issues/463
