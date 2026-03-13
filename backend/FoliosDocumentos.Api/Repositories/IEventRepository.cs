using FoliosDocumentos.Api.Models;

namespace FoliosDocumentos.Api.Repositories;

public interface IEventRepository
{
    Task<Event> CreateAsync(Event ev);
    Task<bool> ExistsByNameAndDateAsync(string name, DateTime date);
    Task<IEnumerable<Event>> GetAllAsync();
    Task<Event?> GetByIdAsync(int id);
}
