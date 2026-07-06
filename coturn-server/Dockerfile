FROM ubuntu:22.04
RUN apt-get update && \
    apt-get install -y coturn gettext-base netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*
COPY turnserver.conf.template /etc/turnserver.conf.template
COPY start.sh /start.sh
RUN chmod +x /start.sh
EXPOSE 3478 8080
CMD ["/start.sh"]
