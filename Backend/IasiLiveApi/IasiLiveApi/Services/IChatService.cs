namespace IasiLiveApi.Services;

public interface IChatService
{
   public Task<string> GetChatResponseAsync(string message);
}