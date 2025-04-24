using IasiLiveApi.Domain;

namespace IasiLiveApi.Application
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetProductsAsync();
        Task<Product> GetProductByIdAsync(Guid id);
        Task AddProductAsync(Product product);
        Task<bool> UpdateProductAsync(Product product);
        Task<bool> DeleteProductAsync(Guid id);
    }
}
