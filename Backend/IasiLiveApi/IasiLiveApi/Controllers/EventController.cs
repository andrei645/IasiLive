using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using IasiLiveApi.Application;
using IasiLiveApi.Domain;

namespace IasiLiveApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository repository;
        private readonly IValidator<Event> validator;

        public EventController(IEventRepository repository, IValidator<Event> validator)
        {
            this.repository=repository;
            this.validator = validator;
        }

        [HttpGet]
        public async Task<IEnumerable<Event>> GetEvents()
        {
            return await repository.GetEventsAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(Guid id)
        {
            var ev = await repository.GetEventByIdAsync(id);
            if (ev == null)
            {
                return NotFound();
            }
            return ev;
        }

        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent([FromBody] Event ev)
        {
            var validationResult = await validator.ValidateAsync(ev);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }
            await repository.AddEventAsync(ev);
            return CreatedAtAction("GetEvent", new { id = ev.Id }, ev);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvent(Guid id, Event ev)
        {
            var validatorResult = await validator.ValidateAsync(ev);
            if (!validatorResult.IsValid)
            {
                return BadRequest(validatorResult.Errors);
            }
            if (id != ev.Id)
            {
                return BadRequest("ID from route and body don't match.");
            }
            if (!await repository.UpdateEventAsync(ev))
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            if (!await repository.DeleteEventAsync(id))
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
