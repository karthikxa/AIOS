FROM ubuntu:22.04
RUN apt-get update && \
    apt-get install -y coturn gettext-base && \
    rm -rf /var/lib/apt/lists/*
COPY turnserver.conf.template /etc/turnserver.conf.template
COPY start.sh /start.sh
RUN chmod +x /start.sh
EXPOSE 3478 3478/udp 49152-65535/udp
CMD ["/start.sh"]
