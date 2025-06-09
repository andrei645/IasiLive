using MediatR;

namespace IasiLiveApi.Features.Chat;

public class SendChatMessageCommand : IRequest<string>
{
    public string Message { get; set; } = string.Empty;   
}