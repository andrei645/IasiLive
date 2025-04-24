using IasiLiveApi.Domain;

namespace IasiLiveApi.Application
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetEventsAsync();
        Task<Event> GetEventByIdAsync(Guid id);
        Task AddEventAsync(Event ev);
        Task<bool> UpdateEventAsync(Event ev);
        Task<bool> DeleteEventAsync(Guid id);
    }
}