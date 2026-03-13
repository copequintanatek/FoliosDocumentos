using FoliosDocumentos.Api.DTOs;

namespace FoliosDocumentos.Api.Services;

public interface IEventService
{
    Task<EventResponse> CreateEventAsync(CreateEventRequest request, string userId);
    Task<IEnumerable<EventResponse>> GetAllEventsAsync();
    Task<EventResponse?> GetEventByIdAsync(int id);
}
