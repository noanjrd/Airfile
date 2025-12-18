all:
	cd src && sudo docker compose up -d --build 

build:
	cd src && sudo docker compose build

up:
	cd src && sudo docker compose up -d

down:
	cd src && sudo docker compose down

fclean:
	cd src && sudo docker compose down -v

.PHONY: all build start down fclean
