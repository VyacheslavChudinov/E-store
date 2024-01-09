using API.DTOs;
using API.Entities;
using AutoMapper;

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
    }
}