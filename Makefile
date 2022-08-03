install:
	make -C frontend install

start-frontend:
	make -C frontend start-frontend

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

deploy:
	git push heroku main
