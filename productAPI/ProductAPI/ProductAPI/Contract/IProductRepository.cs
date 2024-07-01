using ProductAPI.DTO;
using ProductAPI.Model;

namespace ProductAPI.Contract
{
    public interface IProductRepository
    {
        Task <IEnumerable<ProductDTO>> GetAllProductAsync();
        Task<bool> AddProductAsync(Product product);
        Task<bool> UpdateProductAsync(Product product);
        Task<bool> DeleteProductAsync(int id);
        Task<ProductDTO> GetProductByIdAsync(int id); 
        
    }
}
