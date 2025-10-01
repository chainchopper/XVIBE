# VIBER Project - AGENTS.md

## Project Overview
This is VIBER (rebranded from XVIBE), a comprehensive suite of "Powered By Nirvana" AI tools. It is designed to be deployed as a standalone service, via Docker/Kubernetes, or as a plugin for WordPress, cPanel, and DirectAdmin.

## Development Environment & Commands
- **Initial Setup:** After cloning, run `pnpm install` (or `npm install`) to install dependencies.
- **Docker:** Use `docker-compose up --build` to start the development environment with all dependent services.
- **Kubernetes:** Use `kubectl apply -f k8s/` to deploy the application to a Kubernetes cluster. Ensure Kubernetes is running in your Docker Desktop or other environment first.
- **Code Analysis:** Before making changes, thoroughly analyze the existing codebase to avoid recreating or breaking existing features. The user has emphasized this repeatedly.

## Key Directories & Files
- `/k8s/`: Directory for all Kubernetes manifest files (Deployments, Services, etc.).
- `/plugins/`: Contains subdirectories for `wordpress`, `cpanel`, and `directadmin` plugins.
- `/.env.example`: Template for all environment variables, including the extensive list provided by the user.

## Testing & Quality Assurance
- Run the full test suite with `pnpm test` before finalizing any changes.
- For Kubernetes deployments, always run `kubectl get deployments` and `kubectl get services` to verify all pods are running and services are correctly exposed.
- Test the WordPress plugin in a clean WordPress installation to ensure the admin settings page works and the frontend embeds correctly.

## Pull Request & Commit Guidelines
- **Commit Title Format:** `[VIBER] <Descriptive Title>`
- **Scope Tags:** Use tags like `[Branding]`, `[K8s]`, `[WP Plugin]`, `[Feature: TTS]` to indicate the change's scope.
- **Requirements:** Every commit must pass all existing tests and include updates to relevant documentation.