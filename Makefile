install:
	make -C frontend install

start-frontend:
	make -C frontend start-frontend

start-backend:
	make -C frontend start-backend

start:
	make start-backend & make start-frontend

deploy:
	git push heroku main
