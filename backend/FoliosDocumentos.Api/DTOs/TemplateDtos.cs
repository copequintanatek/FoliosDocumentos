using System.ComponentModel.DataAnnotations;
using FoliosDocumentos.Api.Models;

namespace FoliosDocumentos.Api.DTOs;

public class CreateTemplateRequest
{
    [Required(ErrorMessage = "El nombre de la plantilla es obligatorio.")]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "El ID del evento es obligatorio.")]
    [Range(1, int.MaxValue, ErrorMessage = "El ID del evento debe ser mayor a 0.")]
    public int EventId { get; set; }

    [Required(ErrorMessage = "El tipo de documento es obligatorio.")]
    public DocumentType DocumentType { get; set; }

    [MaxLength(500)]
    public string? LogoUrl { get; set; }

    public string? BodyText { get; set; }
}

public class TemplateResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int EventId { get; set; }
    public string DocumentType { get; set; } = string.Empty;
    public string? LogoUrl { get; set; }
    public string? BodyText { get; set; }
    public DateTime CreatedAt { get; set; }
}
