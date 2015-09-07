# Build/Run (for debian based distros)


Linux
```bash
apt-get install -y git docker.io
git clone https://github.com/op-hui/mu2ch-ci.git
cd mu2ch-ci
docker build -t mu2ch-test .
```

Windows 

Нужен, Python 2.7+, при установке тыкаем последнюю галочку [Добавить в /path]
Установить http://git-scm.com/

открываем cmd
Создать новую папку в любом месте с названием к примеру evennia_server
пишем к ней путь в cd
```
cd c:\evennia_server
pip install virtualenv
virtualenv pyenv
pyenv\Scripts\activate
```
После этой команды должен появится слева текст в скобочках (pyenv)
```
git clone https://github.com/evennia/evennia.git
```
Появится папка evennia, далее
```
cd evennia
pip install -e .
```
НЕ ПРОЕБИТЕ ТОЧКУ!111
Некст
```
cd с:\evennia_server\
git clone https://github.com/op-hui/mu2ch
```

появится папка mu2ch-master
заходим туда и создаем в папке server папку logs, профит, едем дальше
```
cd mu2ch-master
mkdir server\logs
```

поменять
```
 WEBSOCKET_CLIENT_URL = "ws://localhost"
```
в файле  server\conf\settings.py

```
cd mu2ch-master
evennia -i start
```

Выключается через 
```
evennia stop
```

Вуаля, всё работаЄ
