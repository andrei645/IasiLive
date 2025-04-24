using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using IasiLiveApi.Application;
using IasiLiveApi.Domain;

namespace IasiLiveApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository repository;
        private readonly IValidator<Product> validator;

        public ProductsController(IProductRepository repository, IValidator<Product> validator)
        {
            this.repository=repository;
            this.validator=validator;
        }

        [HttpGet]
        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await repository.GetProductsAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(Guid id)
        {
            var product = await repository.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            var validationResult = await validator.ValidateAsync(product);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }
            await repository.AddProductAsync(product);
            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(Guid id, Product product)
        {
            var validatorResult = await validator.ValidateAsync(product);
            if (!validatorResult.IsValid)
            {
                return BadRequest(validatorResult.Errors);
            }
            if (id != product.Id)
            {
                return BadRequest();
            }
            if (!await repository.UpdateProductAsync(product))
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            if (!await repository.DeleteProductAsync(id))
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
