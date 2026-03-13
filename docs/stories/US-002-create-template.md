# US-002: Diseñar plantilla de documento

## Context

Cada evento puede emitir documentos oficiales a los asistentes.

Estos documentos pueden ser:

-   Constancias
-   Reconocimientos
-   Agradecimientos

El organizador debe poder diseñar una plantilla base que será usada para
generar todos los documentos del evento.

La plantilla debe permitir incluir:

-   logos
-   texto
-   espacios para firmas
-   tipo de documento

------------------------------------------------------------------------

# User Story

Como organizador de evento\
quiero diseñar una plantilla de documento\
para generar documentos oficiales para los asistentes.

------------------------------------------------------------------------

# Acceptance Criteria

1.  El usuario puede crear una plantilla.
2.  La plantilla debe estar asociada a un evento.
3.  El usuario puede seleccionar el tipo de documento.
4.  El usuario puede agregar logos institucionales.
5.  El usuario puede agregar texto al documento.
6.  El usuario puede definir posiciones de firmas.

------------------------------------------------------------------------

# Inputs

  Campo          Tipo     Descripción
  -------------- -------- ------------------------
  templateName   string   nombre de la plantilla
  eventId        int      evento asociado
  documentType   enum     tipo de documento
  logoUrl        string   logo institucional
  bodyText       string   texto del documento

------------------------------------------------------------------------

# Document Types

Valores posibles:

CONSTANCIA\
RECONOCIMIENTO\
AGRADECIMIENTO

------------------------------------------------------------------------

# Outputs

Plantilla registrada en el sistema.

Ejemplo:

    {
      "id": 3,
      "templateName": "Constancia Congreso 2026",
      "documentType": "CONSTANCIA",
      "eventId": 1
    }

------------------------------------------------------------------------

# Business Rules

-   Una plantilla pertenece a un solo evento.
-   Un evento puede tener múltiples plantillas.
-   Cada plantilla tiene un tipo de documento.

------------------------------------------------------------------------

# Technical Context

Frontend: React + Vite\
Backend: ASP.NET Core Web API\
Base de datos: SQL Server

------------------------------------------------------------------------

# Affected Components

Frontend

pages/templates/CreateTemplatePage.jsx\
components/TemplateEditor.jsx

Backend

Controllers/TemplatesController.cs\
Services/TemplateService.cs\
Repositories/TemplateRepository.cs\
Models/Template.cs

Database

Table: Templates

------------------------------------------------------------------------

# Suggested Implementation

Entidad:

Template

Campos:

Id\
Name\
EventId\
DocumentType\
LogoUrl\
BodyText\
CreatedAt

Endpoint API

POST /api/templates

------------------------------------------------------------------------

# Edge Cases

-   Evento inexistente
-   Tipo de documento inválido
-   Plantilla sin nombre

------------------------------------------------------------------------

# Tests

Casos de prueba:

1.  Crear plantilla válida
2.  Crear plantilla sin nombre
3.  Crear plantilla con evento inexistente

------------------------------------------------------------------------

# Definition of Done

-   [ ] Endpoint POST /api/templates implementado
-   [ ] Plantilla guardada en base de datos
-   [ ] Validaciones funcionando
-   [ ] API documentada
-   [ ] Tests básicos implementados
-   [ ] Pull Request creado

------------------------------------------------------------------------

# AI Execution Plan

1.  Crear modelo Template
2.  Crear tabla Templates
3.  Crear repository
4.  Crear service
5.  Crear controller
6.  Crear endpoint POST /api/templates
7.  Crear editor básico en frontend

------------------------------------------------------------------------

# Git Instructions

Branch

feature/us-002-create-template

Commit

feat: implement US-002 create template

PR Title

US-002 Create document template
