using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace IasiLiveApi.Services;

public class ChatService: IChatService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;

    public ChatService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }

    public async Task<string> GetChatResponseAsync(string message)
    {
        var apiKey = _config["OpenAI:ApiKey"];
        var payload = new
        {
            model = "gpt-3.5-turbo",
            messages = new[]
            {
                new { role = "system", content = "Ești un asistent care răspunde pe baza evenimentelor din Iași." },
                new { role = "user", content = message }
            }
        };
        
        if (string.IsNullOrWhiteSpace(apiKey))
            throw new InvalidOperationException("OpenAI API key not found in configuration.");

        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
        request.Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
        
        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();
        
        var result = await response.Content.ReadAsStringAsync();
        var json = JsonDocument.Parse(result);
        return json.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString() ?? "Niciun raspuns";
    }
}