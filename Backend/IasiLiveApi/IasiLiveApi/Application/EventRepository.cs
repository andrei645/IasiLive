using Microsoft.EntityFrameworkCore;
using IasiLiveApi.Domain;
using IasiLiveApi.Infrastructure;

namespace IasiLiveApi.Application
{
    public class EventRepository : IEventRepository
    {
        private readonly ApplicationDbContext context;

        public EventRepository(ApplicationDbContext context)
        {
            this.context=context;
        }
        public async Task AddEventAsync(Event ev)
        {
            await context.Events.AddAsync(ev);
            await context.SaveChangesAsync();
        }

        public async Task<bool> DeleteEventAsync(Guid id)
        {
            var ev = await context.Events.FindAsync(id);
            if (ev == null)
            {
                return false;
            }
            context.Remove(ev);
            await context.SaveChangesAsync();
            return true;
        }

        public async Task<Event> GetEventByIdAsync(Guid id)
        {
            return await context.Events.FindAsync(id);
        }

        public async Task<IEnumerable<Event>> GetEventsAsync()
        {
            return await context.Events.ToListAsync();
        }

        public async  Task<bool> UpdateEventAsync(Event ev)
        {
            var findEvent = await context.Events.FindAsync(ev.Id);
            if (findEvent == null)
            {
                return false;
            }
            findEvent.Title = ev.Title;
            findEvent.Location = ev.Location;
            findEvent.Description = ev.Description;
            await context.SaveChangesAsync();
            return true;
        }
    }
}