using FoliosDocumentos.Api.Data;
using FoliosDocumentos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FoliosDocumentos.Api.Repositories;

public class EventRepository : IEventRepository
{
    private readonly AppDbContext _context;

    public EventRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Event> CreateAsync(Event ev)
    {
        _context.Events.Add(ev);
        await _context.SaveChangesAsync();
        return ev;
    }

    public async Task<bool> ExistsByNameAndDateAsync(string name, DateTime date)
    {
        var dateOnly = date.Date;
        return await _context.Events.AnyAsync(e =>
            e.Name == name && e.EventDate.Date == dateOnly);
    }

    public async Task<IEnumerable<Event>> GetAllAsync()
    {
        return await _context.Events.OrderByDescending(e => e.CreatedAt).ToListAsync();
    }

    public async Task<Event?> GetByIdAsync(int id)
    {
        return await _context.Events.FindAsync(id);
    }
}
