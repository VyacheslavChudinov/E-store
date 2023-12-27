using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregator;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class OrdersController : BaseApiController
    {
        private StoreContext _context;
        private BasketService _basketService;
        private UserManager<User> _userManager;
        public OrdersController(StoreContext context, BasketService basketService, UserManager<User> userManager)
        {
            _context = context;
            _basketService = basketService;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await _context.Orders
                .Where(o => o.BuyerId == User.Identity.Name)
                .MapToOrderDto()
                .ToListAsync();
        }


        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            return await _context.Orders
                .Where(o => o.BuyerId == User.Identity.Name && o.Id == id)
                .MapToOrderDto()
                .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder([FromBody] CreateOrderDto orderDto)
        {
            var basket = await _basketService.RetrieveBasket(User.Identity.Name);
            if (basket is null) { return BadRequest(new ProblemDetails { Title = "Can't find basket" }); }

            var orderItems = new List<OrderItem>();
            foreach (var basketItem in basket.Items)
            {
                var product = await _context.Products.FindAsync(basketItem.Id);
                orderItems.Add(new OrderItem
                {
                    Price = product.Price,
                    Quantity = basketItem.Quantity,
                    OrderedItemSnapshot = new OrderedItemSnapshot
                    {
                        Name = product.Name,
                        PictureUrl = product.PictureUrl,
                        ProductId = product.Id
                    }
                });

                product.QuantityInStock -= basketItem.Quantity;
            }

            var subtotal = orderItems.Sum(item => item.Price * item.Quantity);
            var deliveryFee = subtotal > 10000 ? 0 : 500;

            var order = new Order
            {
                BuyerId = User.Identity.Name,
                OrderItems = orderItems,
                ShippingAddress = orderDto.ShippingAddress,
                Subtotal = orderItems.Sum(item => item.Price * item.Quantity),
                DeliveryFee = deliveryFee
            };

            _context.Orders.Add(order);
            _basketService.RemoveBasket(basket);

            if (orderDto.SaveAddress)
            {
                var user = await _context.Users
                    .Include(i => i.Address)
                    .FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
                user.Address = new UserAddress
                {
                    Address1 = orderDto.ShippingAddress.Address1,
                    Address2 = orderDto.ShippingAddress.Address2,
                    Country = orderDto.ShippingAddress.Country,
                    City = orderDto.ShippingAddress.City,
                    Zip = orderDto.ShippingAddress.Zip,
                    State = orderDto.ShippingAddress.State,
                    Name = orderDto.ShippingAddress.Name,
                };

                _context.Update(user);
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (!result)
            {
                return BadRequest(new ProblemDetails { Title = "Problem creating order" });
            }

            return CreatedAtRoute("GetOrder", new { Id = order.Id }, order.Id);
        }
    }
}