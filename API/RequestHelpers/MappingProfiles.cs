using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.RequestHelpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<CreateProductDto, Product>();

            CreateMap<Basket, BasketDto>()
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items));

            CreateMap<BasketItem, BasketItemDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Product.Name))
                .ForMember(dest => dest.PictureUrl, opt => opt.MapFrom(src => src.Product.PictureUrl))
                .ForMember(dest => dest.Brand, opt => opt.MapFrom(src => src.Product.Brand))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Product.Type))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Product.Price));
        }
    }
}