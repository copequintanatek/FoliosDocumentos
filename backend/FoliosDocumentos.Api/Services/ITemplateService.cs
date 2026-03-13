using FoliosDocumentos.Api.DTOs;

namespace FoliosDocumentos.Api.Services;

public interface ITemplateService
{
    Task<TemplateResponse> CreateTemplateAsync(CreateTemplateRequest request);
    Task<IEnumerable<TemplateResponse>> GetTemplatesByEventAsync(int eventId);
    Task<TemplateResponse?> GetTemplateByIdAsync(int id);
}
