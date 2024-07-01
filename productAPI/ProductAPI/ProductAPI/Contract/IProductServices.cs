using ProductAPI.DTO;
using ProductAPI.Model;

namespace ProductAPI.Contract
{
    public interface IProductServices
    {
        Task<bool> AddProductAsync(ProductDTO productDto);
        Task <IEnumerable<ProductDTO>> GetAllProductsAsync();
        Task<ProductDTO> GetProductByIdAsync(int id);
        Task<bool> UpdateProductAsync(ProductDTO productDto);
        Task<bool> DeleteProductAsync(int id);

    }
}
