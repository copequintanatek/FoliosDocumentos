# System Architecture

Sistema Web de Gestión de Folios de Documentos Oficiales ITSON

## Architecture Overview

El sistema seguirá una arquitectura de tres capas:

Frontend → API → Base de datos

Componentes:

-   Frontend: React + Vite
-   Backend: ASP.NET Core Web API
-   Database: SQL Server

------------------------------------------------------------------------

# Frontend

Tecnologías:

-   React
-   Vite
-   JavaScript o TypeScript
-   CSS / Tailwind (opcional)

Responsabilidades del frontend:

-   Interfaz de usuario
-   Gestión de eventos
-   Diseño de plantillas de documentos
-   Solicitud de folios
-   Flujo de firmas
-   Descarga de documentos PDF

El frontend consumirá la API REST del backend.

------------------------------------------------------------------------

# Backend

Tecnología:

ASP.NET Core Web API

Responsabilidades del backend:

-   Exponer API REST
-   Autenticación y autorización
-   Lógica de negocio
-   Generación de folios
-   Gestión de eventos
-   Gestión de plantillas de documentos
-   Flujo de aprobación de folios
-   Gestión de firmas
-   Generación de documentos PDF

Arquitectura interna recomendada:

Controller → Service → Repository → Database

Capas:

Controllers\
Reciben requests HTTP.

Services\
Implementan la lógica de negocio.

Repositories\
Acceso a datos.

Models / Entities\
Representación de las tablas de base de datos.

DTOs\
Objetos para comunicación con el frontend.

------------------------------------------------------------------------

# Database

Motor:

SQL Server

Responsabilidades:

-   Persistencia de eventos
-   Persistencia de plantillas
-   Registro de solicitudes de folios
-   Registro de firmas
-   Registro de documentos generados

Acceso a datos mediante:

-   Entity Framework Core

------------------------------------------------------------------------

# Main Modules

El backend se organizará en los siguientes módulos:

-   Authentication
-   Events
-   Templates
-   FolioRequests
-   Signatures
-   Documents

------------------------------------------------------------------------

# Document Generation

El backend generará documentos PDF utilizando la plantilla diseñada para
cada evento.

Cada documento incluirá:

-   Nombre del asistente
-   Tipo de documento
-   Folio institucional
-   Firmas de responsables
-   Logos institucionales

El sistema también generará un PDF consolidado con todos los documentos.

------------------------------------------------------------------------

# API Communication

El frontend se comunicará con el backend mediante API REST.

Ejemplos:

GET /api/events\
POST /api/events\
POST /api/folio-requests\
POST /api/signatures\
GET /api/documents/{eventId}/pdf

------------------------------------------------------------------------

# Security

El sistema debe incluir:

Autenticación basada en JWT.

Roles:

-   Administrator
-   EventCreator
-   Signatory

------------------------------------------------------------------------

# Suggested Repository Structure

/docs /context project-context.md architecture.md /stories

/src /backend /frontend

------------------------------------------------------------------------

# Development Workflow

1.  Se crea una historia de usuario en /docs/stories
2.  Se crea una rama feature
3.  Se implementa la funcionalidad
4.  Se genera Pull Request
5.  Se revisa el PR
6.  Se integra al repositorio principal
