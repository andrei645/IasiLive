using FluentValidation;
using IasiLiveApi.Domain;

namespace IasiLiveApi.Services
{
    public class EventValidator : AbstractValidator<Event>
    {
        public EventValidator()
        {
            RuleFor(v => v.Title).NotEmpty().WithMessage("Title is required")
                .Length(5,70).WithMessage("Title should be between 5 and 70 characters");
        }
    }
}