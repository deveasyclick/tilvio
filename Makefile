# Makefile for Tilvio project

# Variables
FRONTEND_DIR = frontend
BACKEND_DIR = backend

# Default target
.PHONY: all
all: help

# Help message
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make help                 - Show this help message"
	@echo "  make install              - Install all dependencies"
	@echo "  make install-frontend     - Install frontend dependencies"
	@echo "  make install-backend      - Install backend dependencies"
	@echo "  make dev                  - Run both frontend and backend in development mode"
	@echo "  make frontend             - Run frontend in development mode"
	@echo "  make backend              - Run backend in development mode"
	@echo "  make build                - Build both frontend and backend"
	@echo "  make build-frontend       - Build frontend"
	@echo "  make build-backend        - Build backend"
	@echo "  make clean                - Clean build artifacts"
	@echo "  make lint-frontend        - Lint frontend code"

# Installation targets
.PHONY: install
install: install-frontend install-backend

.PHONY: install-frontend
install-frontend:
	@echo "Installing frontend dependencies..."
	cd $(FRONTEND_DIR) && npm install

.PHONY: install-backend
install-backend:
	@echo "Installing backend dependencies..."
	go mod tidy

# Development targets
.PHONY: dev
dev:
	@echo "Starting development servers..."
	make -j 2 frontend backend

.PHONY: frontend
frontend:
	@echo "Starting frontend development server..."
	@cd $(FRONTEND_DIR) && npm run dev

.PHONY: backend
backend:
	@echo "Starting backend development server..."
	@cd $(BACKEND_DIR) && air

# Build targets
.PHONY: build
build: build-frontend build-backend

.PHONY: build-frontend
build-frontend:
	@echo "Building frontend..."
	@cd $(FRONTEND_DIR) && npm run build

.PHONY: build-backend
build-backend:
	@echo "Building backend..."
	@cd ${BACKEND_DIR} && go build cmd/api/main.go

# Clean target
.PHONY: clean
clean:
	@echo "Cleaning build artifacts..."
	rm -rf $(FRONTEND_DIR)/dist
	@# Add backend clean commands when implemented
	@# Example: rm -rf bin/

.PHONY: lint-frontend
lint-frontend:
	@echo "Linting frontend..."
	@cd ${FRONTEND_DIR} && npm run lint


.PHONY: lint-backend
lint-backend:
	@echo "Lint backend..."
	@cd backend && go fmt ./... && go vet ./...

.PHONY: format-frontend
format-frontend:
	@echo "Formatting frontend..."
	@cd ${FRONTEND_DIR} && npm run format