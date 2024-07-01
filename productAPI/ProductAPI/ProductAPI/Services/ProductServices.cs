using AutoMapper;
using ProductAPI.Contract;
using ProductAPI.DTO;
using ProductAPI.Model;
using ProductAPI.Repository;

namespace ProductAPI.Services
{
    public class ProductServices : IProductServices
    {
        private readonly IProductRepository _repository;
        private readonly IMapper _mapper;
        public ProductServices(IProductRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<bool> AddProductAsync(ProductDTO productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            return await _repository.AddProductAsync(product);
        }

        public async Task<IEnumerable<ProductDTO>> GetAllProductsAsync()
        {
           return await _repository.GetAllProductAsync();
        }

        public async Task<bool> UpdateProductAsync(ProductDTO productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            return await _repository.UpdateProductAsync(product);
        }

        public async Task<ProductDTO> GetProductByIdAsync(int id)
        {
            return await _repository.GetProductByIdAsync(id);
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            return await _repository.DeleteProductAsync(id);
        }
    }
}
