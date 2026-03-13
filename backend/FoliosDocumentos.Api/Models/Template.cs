namespace FoliosDocumentos.Api.Models;

public enum DocumentType
{
    CONSTANCIA,
    RECONOCIMIENTO,
    AGRADECIMIENTO
}

public class Template
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int EventId { get; set; }
    public Event Event { get; set; } = null!;
    public DocumentType DocumentType { get; set; }
    public string? LogoUrl { get; set; }
    public string? BodyText { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
