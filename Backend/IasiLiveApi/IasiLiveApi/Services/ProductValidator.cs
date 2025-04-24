using FluentValidation;
using IasiLiveApi.Domain;

namespace IasiLiveApi.Services
{
    public class ProductValidator : AbstractValidator<Product>
    {
        public ProductValidator()
        {
            RuleFor(p => p.Name).NotEmpty().WithMessage("Name is required")
                .Length(3,150).WithMessage("Name should be between 3 and 150 characters");
            RuleFor(p => p.Price).GreaterThan(0).WithMessage("Price should be greater than 0")
                .LessThanOrEqualTo(100000).WithMessage("Price should not be greater than 10000");
        }
    }
}
