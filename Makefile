up:
	cd docker && docker-compose up -d --build
ps:
	cd docker && docker-compose ps
remove:
	cd docker && docker-compose rm -s -f
node:
	cd docker && docker-compose exec node sh
cs:
	cd docker && docker-compose exec node sh -c "npm run lint -- --fix"

go: up ps node

down:
	cd docker && docker-compose down

reload: remove go
