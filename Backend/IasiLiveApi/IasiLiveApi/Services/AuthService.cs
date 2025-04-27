using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using IasiLiveApi.Controllers;
using IasiLiveApi.Domain;
using IasiLiveApi.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace IasiLiveApi.Services;

public class AuthService(ApplicationDbContext context, IConfiguration configuration) : IAuthService
{
    public async Task<string?> LoginAsync(LoginDTO request)
    {
        var user = context.Users.FirstOrDefault(u => u.Username == request.Username);
        if (user is null)
        {
            return null;
        }

        if (new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, request.Password) != PasswordVerificationResult.Success)
        {
            return null;
        }
        
        return CreateToken(user);
    }
    
    public async Task<UserResponse?> RegisterAsync(RegisterDTO request)
    {
        if (await context.Users.AnyAsync(u => u.Username == request.Username))
        {
            return null;
        }
        
        var user = new User();
        var hashedPassword = new PasswordHasher<User>()
            .HashPassword(user, request.Password);
            
        user.Username = request.Username;
        user.PasswordHash = hashedPassword;
        user.Email = request.Email;
        user.Role = request.Role;
        user.Firstname = request.Firstname;
        user.Lastname = request.Lastname;

        
        await context.Users.AddAsync(user);
        await context.SaveChangesAsync();

        return new UserResponse
        {
            Id = user.Id,
            Username = user.Username,
        };
    }
    
    private string CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(configuration.GetValue<string>("AppSettings:Token")!));
            
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

        var tokenDescriptor = new JwtSecurityToken(
            issuer: configuration.GetValue<string>("AppSettings:Issuer"),
            audience: configuration.GetValue<string>("AppSettings:Audience"),
            claims: claims,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: creds
        );
            
        return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
    }
}