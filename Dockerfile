From ubuntu

MAINTAINER OP HUI "mu2ch@mail.ru"

RUN apt-get update
RUN apt-get install -y git python-virtualenv python-dev
RUN groupadd -r evennia
RUN useradd -md /home/evennia -r -g evennia evennia 
RUN chown -R evennia:evennia ~evennia
USER evennia 
WORKDIR /home/evennia
RUN pip install virtualenv 
RUN virtualenv .evennia_venv
RUN git clone https://github.com/evennia/evennia.git
USER root
# workaround for site-packages
RUN /bin/bash -c "source /home/evennia/.evennia_venv/bin/activate \
&& cd /home/evennia/evennia \
&& pip install -e . \
"
USER evennia
WORKDIR /home/evennia/evennia
RUN git clone https://github.com/op-hui/mu2ch mudach
RUN mkdir -p mudach/server/logs
RUN /bin/bash -c "source /home/evennia/.evennia_venv/bin/activate && (cd mudach && evennia migrate && evennia -i start)"
