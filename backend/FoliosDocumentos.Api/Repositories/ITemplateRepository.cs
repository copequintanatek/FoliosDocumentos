using FoliosDocumentos.Api.Models;

namespace FoliosDocumentos.Api.Repositories;

public interface ITemplateRepository
{
    Task<Template> CreateAsync(Template template);
    Task<IEnumerable<Template>> GetByEventIdAsync(int eventId);
    Task<Template?> GetByIdAsync(int id);
}
