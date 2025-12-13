all: build run

build:
	docker build -t airfile .

#on relie le port du pc a la machine
run:
	docker run -p 3000:3000 --name airfile_container airfile

down:
	docker stop airfile_container

fclean:
	docker rm airfile_container
	docker rm -v $(docker ps -a -q)
	docker volume prune -f


.PHONY: all build run down fclean
