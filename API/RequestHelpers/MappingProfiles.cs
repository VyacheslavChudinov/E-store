using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregator;
using AutoMapper;

namespace API.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<CreateProductDto, Product>();
        CreateMap<UpdateProductDto, Product>();

        CreateMap<Basket, BasketDto>()
            .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items));

        CreateMap<BasketItem, BasketItemDto>()
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Product.Name))
            .ForMember(dest => dest.PictureUrl, opt => opt.MapFrom(src => src.Product.PictureUrl))
            .ForMember(dest => dest.Brand, opt => opt.MapFrom(src => src.Product.Brand))
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Product.Type))
            .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Product.Price));

        CreateMap<Order, OrderDto>()
            .ForMember(dest => dest.OrderStatus, opt => opt.MapFrom(src => src.OrderStatus.ToString()))
            .ForMember(dest => dest.Total, opt => opt.MapFrom(src => src.GetTotal()))
            .ForMember(dest => dest.OrderItems, opt => opt.MapFrom(src => src.OrderItems));

        CreateMap<OrderItem, OrderItemDto>()
            .ForMember(dest => dest.ProductId, opt => opt.MapFrom(src => src.OrderedItemSnapshot.ProductId))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.OrderedItemSnapshot.Name))
            .ForMember(dest => dest.PictureUrl, opt => opt.MapFrom(src => src.OrderedItemSnapshot.PictureUrl))
            .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
            .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity));
    }
}