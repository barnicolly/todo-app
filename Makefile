up:
	cd docker && docker-compose up -d --build
ps:
	cd docker && docker-compose ps
remove:
	cd docker && docker-compose rm -s -f
run-node:
	cd docker && docker-compose exec node sh

go: up ps run-node

down:
	cd docker && docker-compose down

reload: remove go
