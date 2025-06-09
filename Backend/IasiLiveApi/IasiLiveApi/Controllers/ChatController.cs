using IasiLiveApi.Features.Chat;
using Microsoft.AspNetCore.Mvc;
using MediatR;

namespace IasiLiveApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly IMediator _mediator;

    public ChatController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] SendChatMessageCommand command)
    {
        var response = await _mediator.Send(command);
        return Ok(response);
    }
}