
.PHONY: run
run:
	poetry run python manage.py runserver

.PHONY: livereload
livereload:
	poetry run python manage.py livereload

.PHONY: frontend-build
frontend-build:
	cd ./frontend && yarn run build

.PHONY: frontend-dev
frontend-dev:
	cd ./frontend && yarn run dev

.PHONY: watch-frontend
watch-frontend:
	cd frontend/src && reflex -r '\.js$\' -- sh -c 'make --directory=../.. frontend-dev'
