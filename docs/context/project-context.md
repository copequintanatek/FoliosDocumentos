# Project Context

Sistema Web de Gestión de Folios para Documentos Oficiales ITSON

## Problem

Actualmente la emisión de constancias, reconocimientos y agradecimientos
para eventos institucionales requiere procesos manuales para:

-   generar documentos
-   asignar folios
-   recolectar firmas
-   entregar documentos finales

Esto genera errores en folios, dificultad para rastrear documentos y
retrasos en la firma de responsables.

------------------------------------------------------------------------

## Objective

Desarrollar un sistema web que permita:

-   gestionar eventos
-   diseñar plantillas de documentos
-   solicitar folios institucionales
-   gestionar firmas de responsables
-   generar documentos finales listos para impresión o distribución

------------------------------------------------------------------------

## Actors

Los actores principales del sistema son:

-   Event Creator (Organizador del evento)
-   Signatory (Responsable de firmar documentos)
-   Administrator (Administrador del sistema)
-   System

------------------------------------------------------------------------

## Document Types

Los documentos que el sistema podrá generar son:

-   Constancia
-   Reconocimiento
-   Agradecimiento

Cada tipo de documento tiene su propio prefijo en el folio
institucional.

------------------------------------------------------------------------

## Folio Structure

El sistema debe generar folios institucionales con la siguiente
estructura:

    N<Tipo><Año>-<Consecutivo>

### Donde

Tipo de documento:

-   C = Constancia
-   R = Reconocimiento
-   A = Agradecimiento

Año:

Se representa con los últimos tres dígitos del año.

Ejemplo:

2026 → 026

### Ejemplo de folio

    NR026-005

Significa:

-   N = documento institucional
-   R = Reconocimiento
-   026 = año 2026
-   005 = consecutivo del documento

------------------------------------------------------------------------

## Main Capabilities

El sistema debe permitir:

-   Crear eventos
-   Diseñar plantillas de documentos
-   Solicitar folios institucionales
-   Aprobar solicitudes de folios
-   Gestionar firmas de responsables
-   Generar documentos finales

------------------------------------------------------------------------

## Signature Workflow

1.  El organizador crea un evento.
2.  El organizador diseña una plantilla de documento.
3.  El organizador selecciona los firmantes.
4.  El organizador solicita folios.
5.  El administrador aprueba la solicitud de folios.
6.  El sistema envía los documentos a los firmantes.
7.  Los firmantes registran su firma.
8.  El sistema genera los documentos finales.

------------------------------------------------------------------------

## Final Output

El sistema generará un archivo PDF consolidado que contendrá todos los
documentos del evento.

Características:

-   Un solo archivo PDF
-   Cada página representa un documento individual
-   Cada documento incluye su folio institucional
-   Cada documento incluye las firmas correspondientes

Este PDF estará listo para impresión o para ser dividido por páginas si
es necesario.
