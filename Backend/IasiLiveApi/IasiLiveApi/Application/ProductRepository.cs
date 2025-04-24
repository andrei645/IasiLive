using Microsoft.EntityFrameworkCore;
using IasiLiveApi.Domain;
using IasiLiveApi.Infrastructure;

namespace IasiLiveApi.Application
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext context;

        public ProductRepository(ApplicationDbContext context)
        {
            this.context=context;
        }
        public async Task AddProductAsync(Product product)
        {
            await context.Products.AddAsync(product);
            await context.SaveChangesAsync();
        }

        public async Task<bool> DeleteProductAsync(Guid id)
        {
            var product = await context.Products.FindAsync(id);
            if (product == null)
            {
                return false;
            }
            context.Remove(product);
            await context.SaveChangesAsync();
            return true;
        }

        public async Task<Product> GetProductByIdAsync(Guid id)
        {
            return await context.Products.FindAsync(id);
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await context.Products.ToListAsync();
        }

        public async  Task<bool> UpdateProductAsync(Product product)
        {
            var findProduct = await context.Products.FindAsync(product.Id);
            if (findProduct == null)
            {
                return false;
            }
            findProduct.Name = product.Name;
            findProduct.Price = product.Price;
            await context.SaveChangesAsync();
            return true;
        }
    }
}
