using API.DTOs;
using API.Entities.OrderAggregator;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> MapToOrderDto(this IQueryable<Order> query)
        {
            return query.Select(order => new OrderDto
            {
                Id = order.Id,
                BuyerId = order.BuyerId,
                CreatedTime = order.CreatedTime,
                DeliveryFee = order.DeliveryFee,
                Subtotal = order.Subtotal,
                OrderStatus = order.OrderStatus.ToString(),
                Total = order.GetTotal(),
                ShippingAddress = order.ShippingAddress,
                OrderItems = order.OrderItems.Select(item => new OrderItemDto
                {
                    ProductId = item.OrderedItemSnapshot.ProductId,
                    Name = item.OrderedItemSnapshot.Name,
                    PictureUrl = item.OrderedItemSnapshot.PictureUrl,
                    Price = item.Price,
                    Quantity = item.Quantity,
                }).ToList()
            }).AsNoTracking();
        }
    }
}