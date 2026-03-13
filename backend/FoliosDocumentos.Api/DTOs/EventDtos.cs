using System.ComponentModel.DataAnnotations;

namespace FoliosDocumentos.Api.DTOs;

public class CreateEventRequest
{
    [Required(ErrorMessage = "El nombre del evento es obligatorio.")]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Description { get; set; }

    [Required(ErrorMessage = "La fecha del evento es obligatoria.")]
    public DateTime EventDate { get; set; }

    [Required(ErrorMessage = "El nombre del organizador es obligatorio.")]
    [MaxLength(200)]
    public string OrganizerName { get; set; } = string.Empty;
}

public class EventResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime EventDate { get; set; }
    public string OrganizerName { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
