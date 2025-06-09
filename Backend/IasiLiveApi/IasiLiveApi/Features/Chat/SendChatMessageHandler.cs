using IasiLiveApi.Services;
using MediatR;
namespace IasiLiveApi.Features.Chat;

public class SendChatMessageHandler: IRequestHandler<SendChatMessageCommand, string>
{
    private readonly IChatService _chatService;

    public SendChatMessageHandler(IChatService chatService)
    {
        _chatService = chatService;
    }

    public async Task<string> Handle(SendChatMessageCommand request, CancellationToken cancellationToken)
    {
        return await _chatService.GetChatResponseAsync(request.Message);
    }
}