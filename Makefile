all: cd src && docker-compose up -d --build 

build:
	cd src && docker-compose build

#on relie le port du pc a la machine
start:
	cd src && docker-compose up

down:
	cd src && docker-compose down

fclean:
	cd src && docker-compose down -v

.PHONY: all build start down fclean
