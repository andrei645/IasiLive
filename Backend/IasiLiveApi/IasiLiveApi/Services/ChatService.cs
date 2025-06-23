using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using IasiLiveApi.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace IasiLiveApi.Services;

public class ChatService : IChatService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;
    private readonly ApplicationDbContext _db;

    public ChatService(HttpClient httpClient, IConfiguration config, ApplicationDbContext db)
    {
        _httpClient = httpClient;
        _config = config;
        _db = db;
    }

    public async Task<string> GetChatResponseAsync(string message)
    {
        var apiKey = _config["OpenAI:ApiKey"];
        if (string.IsNullOrWhiteSpace(apiKey))
            throw new InvalidOperationException("OpenAI API key not found in configuration.");

        // 🔍 Selectează evenimente relevante
        var relevantEvents = await _db.Events
            .Where(e =>
                message.ToLower().Contains("cultur") && e.Category.ToLower().Contains("cultur") ||
                message.ToLower().Contains("muzic") && e.Category.ToLower().Contains("muzic") ||
                message.ToLower().Contains("gastron") && e.Category.ToLower().Contains("gastron") ||
                message.ToLower().Contains("party") && e.Category.ToLower().Contains("party") ||
                message.ToLower().Contains("film") && e.Category.ToLower().Contains("film") ||
                message.ToLower().Contains("eveniment") // fallback
            )
            .OrderBy(e => e.Date)
            .Take(5)
            .ToListAsync();

        // 🧠 Formatează promptul
        var eventList = string.Join("\n", relevantEvents.Select(e =>
            $"- {e.Title} ({e.Date:dd MMMM yyyy}) - {e.Category}"
        ));

        var enhancedPrompt = message;

        if (!string.IsNullOrWhiteSpace(eventList))
        {
            enhancedPrompt =
                $"Utilizatorul a întrebat: '{message}'. Iată câteva evenimente care ar putea fi relevante:\n{eventList}\n\nRăspunde pe baza acestor date.";
        }

        var payload = new
        {
            model = "gpt-3.5-turbo",
            messages = new[]
            {
                new { role = "system", content = "Ești un asistent care oferă răspunsuri pe baza evenimentelor din Iași." },
                new { role = "user", content = enhancedPrompt }
            }
        };

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
            .GetString() ?? "Niciun răspuns";
    }
}
