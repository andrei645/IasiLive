using IasiLiveApi.Domain;

namespace IasiLiveApi.Services;

public interface IAuthService
{
    Task<UserResponse?> RegisterAsync(RegisterDTO request);
    Task<string?> LoginAsync(LoginDTO request);
}