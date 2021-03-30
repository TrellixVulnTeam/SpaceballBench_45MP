FROM ubuntu:20.04
ENV DEBIAN_FRONTEND noninteractive
# Update
RUN apt-get update -y \
 && apt-get install -y \
 xvfb \
 npm \
 wget \
 && npm install -g n \
 && n stable

# && PATH="$PATH" \
# && exec bash \