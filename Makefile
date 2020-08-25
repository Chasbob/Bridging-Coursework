ROOT_DIR:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

API_PORT := 443
API_HOST := $(shell ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1')
LISTEN_HOST := 0.0.0.0
CERT_DIR ?= $(ROOT_DIR)/certs

.PHONY: run
run: $(CERT_DIR)
	@echo http://$(API_HOST):80
	poetry run python manage.py runsslserver --certificate $(CERT_DIR)/server.crt --key $(CERT_DIR)/server.key $(LISTEN_HOST):$(API_PORT)

.PHONY: livereload
livereload:
	poetry run python manage.py livereload

.PHONY: frontend-build
frontend-build:
	cd ./frontend && yarn run build

.PHONY: frontend-dev
frontend-dev:
	cd ./frontend && yarn run dev

.PHONY: frontend
frontend:
	cd ./frontend && \
	REACT_APP_API_HOST=https://$(API_HOST):$(API_PORT) \
		HTTPS=true \
		SSL_CRT_FILE=$(CERT_DIR)/server.crt \
		SSL_KEY_FILE=$(CERT_DIR)/server.key \
		NODE_EXTRA_CA_CERTS=$(NODE_EXTRA_CA_CERTS) \
		yarn run start

.PHONY: watch-frontend
watch-frontend:
	cd frontend/src && reflex -r '\.js$\' -- sh -c 'make --directory=../.. frontend-dev'

$(CERT_DIR):
	mkdir -p $(CERT_DIR)
	mkcert -cert-file $(CERT_DIR)/server.crt -key-file $(CERT_DIR)/server.key \
		localhost \
		$(API_HOST) \
		$(LISTEN_HOST)
