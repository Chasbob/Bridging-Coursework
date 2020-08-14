
.PHONY: run
run:
	poetry run python manage.py runserver

.PHONY: frontend-build
frontend-build:
	cd ./frontend && yarn run build

.PHONY: watch-frontend
watch-frontend:
	cd frontend/src && reflex -r '\.js$\' -- sh -c 'make --directory=../.. frontend-build'
