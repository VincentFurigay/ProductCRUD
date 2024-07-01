using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProductAPI.Contract;
using ProductAPI.Data;
using ProductAPI.DTO;
using ProductAPI.Model;

namespace ProductAPI.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ProductContext _context;
        private readonly IMapper _mapper;
        public ProductRepository(ProductContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> AddProductAsync(Product product)
        {
            await _context.Products.AddAsync(product);
            return await SaveAsync();
        }

        public async Task<ProductDTO> GetProductByIdAsync(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(i => i.Id == id);
            return _mapper.Map<ProductDTO>(product);
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if(product == null)
            {
                return false;
            }

            _context.Products.Remove(product);
            return await SaveAsync();

        }

        public async Task<IEnumerable<ProductDTO>> GetAllProductAsync()
        {
            var products = await _context.Products.ToListAsync();
            return _mapper.Map<IEnumerable<ProductDTO>>(products);
        }

        private async Task <bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateProductAsync(Product product)
        {
            _context.Products.Update(product);
            return await SaveAsync();
        }

    }
}
