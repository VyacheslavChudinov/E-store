using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly string BuyerCookieId = "buyerId";
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket is null) { return NotFound(); }

            return MapBasketToDto(basket);

        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket is null) { basket = CreateBasket(); }

            var product = await _context.Products.FirstOrDefaultAsync(product => product.Id == productId);
            if (product is null) { return NotFound(); }

            basket.AddItem(product, quantity);

            var isSaved = await _context.SaveChangesAsync() > 0;
            if (!isSaved)
            {
                return BadRequest(new ProblemDetails { Title = "Error saving item in basket" });
            }

            return CreatedAtRoute("GetBasket", MapBasketToDto(basket));
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket is null)
            {
                return NotFound();
            }

            basket.RemoveItem(productId, quantity);

            var isSaved = await _context.SaveChangesAsync() > 0;
            if (!isSaved)
            {
                return BadRequest(new ProblemDetails { Title = "Error removing item from basket" });
            }

            return Ok(); ;
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(3) };
            Response.Cookies.Append(BuyerCookieId, buyerId, cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);

            return basket;
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies[BuyerCookieId]);
        }

        private static BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    PictureUrl = item.Product.PictureUrl,
                    Brand = item.Product.Brand,
                    Type = item.Product.Type,
                    Price = item.Product.Price,
                    Quantity = item.Quantity,
                }).ToList()
            };
        }
    }
}