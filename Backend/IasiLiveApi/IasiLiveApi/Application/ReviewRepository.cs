using Microsoft.EntityFrameworkCore;
using IasiLiveApi.Domain;
using IasiLiveApi.Infrastructure;
namespace IasiLiveApi.Application;

public class ReviewRepository : IReviewRepository
{
    private readonly ApplicationDbContext _context;

    public ReviewRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Review>> GetReviewsByEventIdAsync(Guid eventid)
    {
        return await _context.Reviews
            .Where(r => r.EventId == eventid)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();
    }

    public async Task AddReviewAsync(Review review)
    {
        await _context.Reviews.AddAsync(review);
        await _context.SaveChangesAsync();
    }
}
