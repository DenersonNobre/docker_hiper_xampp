FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=America/Sao_Paulo

# Install tzdata first
RUN apt-get update && apt-get install -y tzdata

# Install base packages
RUN apt-get update && apt-get install -y \
    apache2 \
    php \
    libapache2-mod-php \
    mysql-server \
    wget \
    curl \
    unzip \
    openjdk-21-jdk \
    supervisor \
    git \
    ca-certificates \
    gnupg \
    procps

# Install Node.js 24.x
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y nodejs=24.* || apt-get install -y nodejs

# Install phpMyAdmin
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y phpmyadmin

# Install Tomcat 11.x
RUN wget https://downloads.apache.org/tomcat/tomcat-11/v11.0.21/bin/apache-tomcat-11.0.21.tar.gz \
    && tar xzf apache-tomcat-11.0.21.tar.gz -C /opt \
    && mv /opt/apache-tomcat-11.0.21 /opt/tomcat \
    && rm apache-tomcat-11.0.21.tar.gz

# Create directories and set permissions
COPY htdocs /var/www/html
RUN mkdir -p /var/run/mysqld /run/mysqld \
    && chown -R mysql:mysql /var/run/mysqld /run/mysqld
RUN usermod -a -G mysql www-data
RUN chown -R root:root /opt/tomcat && chmod -R 755 /opt/tomcat

# Copy config files
COPY config/my.cnf /etc/mysql/conf.d/my.cnf
COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY config/server.js /var/www/html/server.js
COPY config/entrypoint.sh /entrypoint.sh

# Create log dir
RUN mkdir -p /var/log

# Set entrypoint
ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]

EXPOSE 80 3306 8080 3000
# Permitir conexões MySQL remotas (sobrescreve Ubuntu default)
RUN sed -i 's/bind-address.*=.*127.0.0.1/bind-address = 0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf
