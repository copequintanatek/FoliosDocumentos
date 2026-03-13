using FoliosDocumentos.Api.DTOs;
using FoliosDocumentos.Api.Models;
using FoliosDocumentos.Api.Repositories;

namespace FoliosDocumentos.Api.Services;

public class TemplateService : ITemplateService
{
    private readonly ITemplateRepository _templateRepository;
    private readonly IEventRepository _eventRepository;

    public TemplateService(ITemplateRepository templateRepository, IEventRepository eventRepository)
    {
        _templateRepository = templateRepository;
        _eventRepository = eventRepository;
    }

    public async Task<TemplateResponse> CreateTemplateAsync(CreateTemplateRequest request)
    {
        var eventExists = await _eventRepository.GetByIdAsync(request.EventId);
        if (eventExists is null)
            throw new KeyNotFoundException($"El evento con ID {request.EventId} no existe.");

        var template = new Template
        {
            Name = request.Name,
            EventId = request.EventId,
            DocumentType = request.DocumentType,
            LogoUrl = request.LogoUrl,
            BodyText = request.BodyText,
            CreatedAt = DateTime.UtcNow
        };

        var created = await _templateRepository.CreateAsync(template);
        return MapToResponse(created);
    }

    public async Task<IEnumerable<TemplateResponse>> GetTemplatesByEventAsync(int eventId)
    {
        var templates = await _templateRepository.GetByEventIdAsync(eventId);
        return templates.Select(MapToResponse);
    }

    public async Task<TemplateResponse?> GetTemplateByIdAsync(int id)
    {
        var template = await _templateRepository.GetByIdAsync(id);
        return template is null ? null : MapToResponse(template);
    }

    private static TemplateResponse MapToResponse(Template t) => new()
    {
        Id = t.Id,
        Name = t.Name,
        EventId = t.EventId,
        DocumentType = t.DocumentType.ToString(),
        LogoUrl = t.LogoUrl,
        BodyText = t.BodyText,
        CreatedAt = t.CreatedAt
    };
}
