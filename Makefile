ROOT_DIR:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

API_PORT := 80
API_HOST := $(shell ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1')
LISTEN_HOST := 0.0.0.0
CERT_DIR ?= $(ROOT_DIR)/certs

.PHONY: run
run:
	@echo http://$(API_HOST):80
	poetry run python manage.py runserver $(LISTEN_HOST):$(API_PORT)

.PHONY: livereload
livereload:
	poetry run python manage.py livereload

.PHONY: frontend-build
frontend-build:
	cd ./frontend && yarn run build

.PHONY: frontend
frontend:
	cd ./frontend && \
	REACT_APP_API_HOST=http://$(API_HOST):$(API_PORT) \
		yarn run start

.PHONY: watch-frontend
watch-frontend:
	cd frontend/src && reflex -r '\.js$\' -- sh -c 'make --directory=../.. frontend-dev'
