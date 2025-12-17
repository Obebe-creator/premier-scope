FROM php:8.2-apache

RUN docker-php-ext-install pdo pdo_mysql


RUN a2enmod rewrite headers
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

COPY ./public /var/www/html
COPY ./src /var/www/src

# Apache document root is /var/www/html (public)
