using FoliosDocumentos.Api.Data;
using FoliosDocumentos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FoliosDocumentos.Api.Repositories;

public class TemplateRepository : ITemplateRepository
{
    private readonly AppDbContext _context;

    public TemplateRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Template> CreateAsync(Template template)
    {
        _context.Templates.Add(template);
        await _context.SaveChangesAsync();
        return template;
    }

    public async Task<IEnumerable<Template>> GetByEventIdAsync(int eventId)
    {
        return await _context.Templates
            .Where(t => t.EventId == eventId)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    public async Task<Template?> GetByIdAsync(int id)
    {
        return await _context.Templates.FindAsync(id);
    }
}
