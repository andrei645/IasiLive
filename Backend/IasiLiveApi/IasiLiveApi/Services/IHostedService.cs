using System.Diagnostics;

namespace IasiLiveApi.Services;

public class WebScraperStartupService : IHostedService
{
    public Task StartAsync(CancellationToken cancellationToken)
    {
        Console.WriteLine($"[{DateTime.Now}] Pornesc scraping...");

        RunScript("scraper-zilesinopti.py");
        RunScript("scraper-360uaic.py");

        Console.WriteLine($"[{DateTime.Now}] Scraping lansat.");
        return Task.CompletedTask;
    }

    private void RunScript(string scriptName)
    {
        // Determină calea absolută a scriptului
        var projectRoot = Directory.GetParent(AppContext.BaseDirectory)!.Parent!.Parent!.Parent!;
        var scriptPath = Path.Combine(projectRoot.FullName, "Scraper", scriptName);

        Console.WriteLine($"[{DateTime.Now}] Rulez scriptul: {scriptPath}");

        var psi = new ProcessStartInfo
        {
            FileName = "python",
            Arguments = $"\"{scriptPath}\"",
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true
        };

        var process = Process.Start(psi);
        if (process != null)
        {
            process.OutputDataReceived += (sender, e) => Console.WriteLine(e.Data);
            process.BeginOutputReadLine();
        }
        else
        {
            Console.WriteLine($"[{DateTime.Now}] Eroare la lansarea scriptului {scriptName}");
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}