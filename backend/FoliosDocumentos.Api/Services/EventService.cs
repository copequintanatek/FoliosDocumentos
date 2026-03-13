using FoliosDocumentos.Api.DTOs;
using FoliosDocumentos.Api.Models;
using FoliosDocumentos.Api.Repositories;

namespace FoliosDocumentos.Api.Services;

public class EventService : IEventService
{
    private readonly IEventRepository _repository;

    public EventService(IEventRepository repository)
    {
        _repository = repository;
    }

    public async Task<EventResponse> CreateEventAsync(CreateEventRequest request, string userId)
    {
        if (request.EventDate.Date < DateTime.UtcNow.Date)
            throw new InvalidOperationException("La fecha del evento debe ser actual o futura.");

        bool duplicate = await _repository.ExistsByNameAndDateAsync(request.Name, request.EventDate);
        if (duplicate)
            throw new InvalidOperationException("Ya existe un evento con ese nombre en la misma fecha.");

        var ev = new Event
        {
            Name = request.Name,
            Description = request.Description,
            EventDate = request.EventDate,
            OrganizerName = request.OrganizerName,
            CreatedByUserId = userId,
            CreatedAt = DateTime.UtcNow
        };

        var created = await _repository.CreateAsync(ev);
        return MapToResponse(created);
    }

    public async Task<IEnumerable<EventResponse>> GetAllEventsAsync()
    {
        var events = await _repository.GetAllAsync();
        return events.Select(MapToResponse);
    }

    public async Task<EventResponse?> GetEventByIdAsync(int id)
    {
        var ev = await _repository.GetByIdAsync(id);
        return ev is null ? null : MapToResponse(ev);
    }

    private static EventResponse MapToResponse(Event ev) => new()
    {
        Id = ev.Id,
        Name = ev.Name,
        Description = ev.Description,
        EventDate = ev.EventDate,
        OrganizerName = ev.OrganizerName,
        CreatedAt = ev.CreatedAt
    };
}
