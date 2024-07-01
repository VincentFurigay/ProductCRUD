using AutoMapper;
using ProductAPI.DTO;
using ProductAPI.Model;

namespace ProductAPI.Map
{
    public class MappingProfile: Profile
    {
        public MappingProfile() 
        {
            CreateMap<Product, ProductDTO>().ReverseMap();
        }
    }
}
