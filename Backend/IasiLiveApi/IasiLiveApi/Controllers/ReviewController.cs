using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using IasiLiveApi.Domain;
using Microsoft.AspNetCore.Authorization;

namespace IasiLiveApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReviewController : ControllerBase
{
    private readonly IReviewRepository _repository;

    public ReviewController(IReviewRepository repository)
    {
        _repository = repository;
    }

    [HttpGet("event/{eventId}")]
    public async Task<IActionResult> GetReviewsByEventId(Guid eventId)
    {
        var reviews = await _repository.GetReviewsByEventIdAsync(eventId);
        return Ok(reviews);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> AddReview([FromBody] Review review)
    {
        review.Id = Guid.NewGuid();
        review.CreatedAt = DateTime.UtcNow;
        review.Username = User.FindFirst(ClaimTypes.Name)?.Value ?? "Anonim";

        await _repository.AddReviewAsync(review);
        return Ok(review);
    }
}
