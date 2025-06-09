using IasiLiveApi.Domain;

public interface IReviewRepository
{
    Task<IEnumerable<Review>> GetReviewsByEventIdAsync(Guid eventId);
    Task AddReviewAsync(Review review);
}