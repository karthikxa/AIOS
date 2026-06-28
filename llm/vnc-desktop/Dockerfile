FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV VNC_PASSWORD=secret
ENV DISPLAY=:0

RUN apt-get update && apt-get install -y \
    x11vnc \
    xvfb \
    fluxbox \
    xterm \
    net-tools \
    curl \
    wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p ~/.vnc && \
    x11vnc -storepasswd secret ~/.vnc/passwd

COPY startup.sh /startup.sh
RUN chmod +x /startup.sh

EXPOSE 5900

CMD ["/startup.sh"]
