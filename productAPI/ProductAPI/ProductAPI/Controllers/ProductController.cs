using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductAPI.Contract;
using ProductAPI.DTO;

namespace ProductAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductServices _services;
        public ProductController(IProductServices services)
        {
            _services = services;
        }

        [HttpPost]
        public async  Task<ActionResult<bool>> AddProduct(ProductDTO productDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _services.AddProductAsync(productDto);
            if (result)
            {
                return Ok(true);
            }
            else
            {
                return StatusCode(500, "Failed To Add Product");
            }
        }

        [HttpGet]
        public async Task <ActionResult<IEnumerable<ProductDTO>>> GetAllProduct()
        {
            var products = await _services.GetAllProductsAsync();
            return Ok(products);
        }

        [HttpPut]
        public async Task <ActionResult<bool>> UpdateProduct(int id, ProductDTO productDto)
        {
            if(id != productDto.Id)
            {
                return BadRequest("Product Mismatch!");
            }
            var result = await _services.UpdateProductAsync(productDto);
            if (result)
            {
                return Ok(true);
            }
            else
            {
                return StatusCode(500, "Failed to Update Product");
            }
        }

        [HttpGet("{id}")]
        public async Task <ActionResult<ProductDTO>> GetProductIdByAsync(int id)
        {
            var product = await _services.GetProductByIdAsync(id);
            if(product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteProduct(int id)
        {
            var result = await _services.DeleteProductAsync(id);
            if (result)
            {
                return Ok(true);
            }
            else
            {
                return StatusCode(500, "Failed to delete product.");
            }
        }

       

    }
}
