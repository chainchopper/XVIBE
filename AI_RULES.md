# VIBER AI Development Rules

## Tech Stack Overview
The application is built using a modern, versatile stack to support both the main app and plugin ecosystem.
- **Core Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/UI (for the main dashboard)
- **Containerization:** Docker & Docker Compose
- **Orchestration:** Kubernetes
- **WordPress Plugin:** Standard PHP plugin structure.

## Library & Implementation Guidelines

### Frontend & Dashboard
- **Charts:** Use Recharts for data visualization, following the patterns for custom tooltips and responsive containers as shown in the search results.
- **Animations:** Implement modern, smooth animations for the UI to "rejuvenate" the frontend. Consider `framer-motion` or similar libraries if not present.
- **Icons:** Use Lucide React for icons.

### Backend & Services
- **API Calls:** Use the native `fetch` API or a lightweight wrapper.
- **Database:** Support for multiple databases (existing, plus new PostgreSQL and Redis). Use environment variables to configure the connection.
- **AI Service Configuration:** All AI API keys and endpoints (OpenAI, Anthropic, Ollama, etc.) must be configurable via environment variables and the plugin admin panels.

### Containerization & Orchestration
- **Docker:** All services must be defined in `docker-compose.yml`. Images should be multi-stage where appropriate.
- **Kubernetes:** All manifests must be placed in the `/k8s/` directory. Follow the patterns in the search results: use `Deployment` for pods and `Service` to expose them. The `bb.yaml` example is a good starting point.

### Plugin Development
- **WordPress:** Follow standard WordPress plugin development practices. The admin form for configuration variables should be secure and use the WordPress Settings API.
- **cPanel/DirectAdmin:** Adhere to the respective documentation for these platforms to create native-looking and functioning plugins.

### General Rules
- **TypeScript:** Write all new code in TypeScript. Avoid `any` types.
- **Configuration:** Never hardcode API keys or secrets. All must be referenced from environment variables.
- **Rebranding:** Be vigilant. No trace of "XVIBE", cloudflare, or vibesdk should remain in the final code. All new components should reflect the "VIBER" and "Powered By Nirvana" branding.