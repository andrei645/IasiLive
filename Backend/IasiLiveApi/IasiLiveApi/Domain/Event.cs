namespace IasiLiveApi.Domain
{
    public class Event
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string Category { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
    }

}