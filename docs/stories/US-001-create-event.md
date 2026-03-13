# US-001: Crear evento

## Context

El sistema debe permitir a los organizadores registrar eventos para los
cuales se emitirán documentos oficiales (constancias, reconocimientos o
agradecimientos).

Cada evento será el contenedor principal de:

-   asistentes
-   plantillas de documentos
-   solicitudes de folios
-   documentos generados

Sin un evento registrado no es posible iniciar el proceso de generación
de documentos.

------------------------------------------------------------------------

# User Story

Como organizador de evento\
quiero registrar un evento en el sistema\
para poder generar documentos oficiales para los asistentes.

------------------------------------------------------------------------

# Acceptance Criteria

1.  El usuario autenticado puede crear un evento.
2.  El evento debe tener nombre obligatorio.
3.  El evento debe tener fecha del evento.
4.  El evento debe tener un organizador responsable.
5.  El evento queda asociado al usuario que lo creó.
6.  El evento queda disponible para crear plantillas y solicitar folios.

------------------------------------------------------------------------

# Inputs

  Campo           Tipo     Obligatorio   Descripción
  --------------- -------- ------------- ------------------------
  name            string   sí            nombre del evento
  description     string   no            descripción del evento
  eventDate       date     sí            fecha del evento
  organizerName   string   sí            responsable del evento

------------------------------------------------------------------------

# Outputs

Evento registrado en el sistema.

Respuesta API:

    {
      "id": 1,
      "name": "Congreso de Tecnología Educativa",
      "eventDate": "2026-04-10"
    }

------------------------------------------------------------------------

# Business Rules

-   Solo usuarios autenticados pueden crear eventos.
-   El nombre del evento no puede repetirse el mismo día.
-   El evento debe tener fecha futura o actual.

------------------------------------------------------------------------

# Technical Context

Frontend: React + Vite\
Backend: ASP.NET Core Web API\
Base de datos: SQL Server\
ORM: Entity Framework Core

------------------------------------------------------------------------

# Affected Components

Frontend

pages/events/CreateEventPage.jsx\
services/eventService.js

Backend

Controllers/EventsController.cs\
Services/EventService.cs\
Repositories/EventRepository.cs\
Models/Event.cs

Database

Table: Events

------------------------------------------------------------------------

# Suggested Implementation

Entidad principal:

Event

Campos:

Id\
Name\
Description\
EventDate\
OrganizerName\
CreatedByUserId\
CreatedAt

Endpoint API:

POST /api/events

------------------------------------------------------------------------

# Edge Cases

-   Nombre vacío
-   Fecha inválida
-   Usuario no autenticado
-   Evento duplicado

------------------------------------------------------------------------

# Tests

Casos de prueba:

1.  Crear evento válido
2.  Crear evento sin nombre
3.  Crear evento sin fecha
4.  Usuario no autenticado intenta crear evento

------------------------------------------------------------------------

# Definition of Done

-   [ ] Endpoint POST /api/events implementado
-   [ ] Validaciones funcionando
-   [ ] Evento guardado en base de datos
-   [ ] API documentada
-   [ ] Tests básicos implementados
-   [ ] Pull Request creado

------------------------------------------------------------------------

# AI Execution Plan

1.  Crear modelo Event
2.  Crear tabla Events en base de datos
3.  Crear repository
4.  Crear service
5.  Crear controller
6.  Crear endpoint POST /api/events
7.  Crear formulario en frontend

------------------------------------------------------------------------

# Git Instructions

Branch

feature/us-001-create-event

Commit

feat: implement US-001 create event

PR Title

US-001 Create event
