using FoliosDocumentos.Api.DTOs;
using FoliosDocumentos.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoliosDocumentos.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TemplatesController : ControllerBase
{
    private readonly ITemplateService _service;

    public TemplatesController(ITemplateService service)
    {
        _service = service;
    }

    [HttpGet("event/{eventId:int}")]
    public async Task<IActionResult> GetByEvent(int eventId)
    {
        var templates = await _service.GetTemplatesByEventAsync(eventId);
        return Ok(templates);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var template = await _service.GetTemplateByIdAsync(id);
        if (template is null)
            return NotFound(new { message = $"Plantilla {id} no encontrada." });
        return Ok(template);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTemplateRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var created = await _service.CreateTemplateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}
