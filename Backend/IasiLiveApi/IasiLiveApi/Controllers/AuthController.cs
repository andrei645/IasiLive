using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using IasiLiveApi.Application;
using IasiLiveApi.Domain;
using IasiLiveApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace IasiLiveApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
            
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(RegisterDTO request)
        {
            var user = await authService.RegisterAsync(request);
            
            if (user is null)
            {
                return BadRequest("Username already exists.");
            }
            
            return Ok(user);
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginDTO request)
        {
           var token = await authService.LoginAsync(request);
           
           if (token is null)
           {
               return BadRequest("Invalid username or password.");
           }
           
           return Ok(token);
        }
        
        [Authorize]
        [HttpGet]
        public IActionResult AuthenticatedEndpoint()
        {
            return Ok("You are authenticated.");
        }
        
        [Authorize(Roles = "Admin")]
        [HttpGet("admin")]
        public IActionResult AdminOnlyEndpoint()
        {
            return Ok("You are admin.");
        }
    }
}
