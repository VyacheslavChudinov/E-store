using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregator;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace API.Extensions
{
    public static class MappingExtensions
    {
        private static IMapper _mapper;

        public static void InitializeMapper(IMapper mapper)
        {
            _mapper = mapper;
        }

        public static BasketDto MapTo<BasketDto>(this Basket basket)
        {
            return _mapper.Map<BasketDto>(basket);
        }

        public static OrderDto MapTo<OrderDto>(this Order order)
        {
            return _mapper.Map<OrderDto>(order);
        }

        public static IQueryable<OrderDto> MapToOrderDto(this IQueryable<Order> query)
        {
            return query.ProjectTo<OrderDto>(_mapper.ConfigurationProvider);
        }
    }
}