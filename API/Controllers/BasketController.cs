using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {

        private readonly StoreContext _context;
        private readonly BasketService _basketService;
        public BasketController(StoreContext context, BasketService basketService)
        {
            _context = context;
            _basketService = basketService;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await _basketService.RetrieveBasket(GetBuyerId());
            if (basket is null)
            {
                Response.Cookies.Delete(BasketService.BuyerIdCookieKey);
                return NotFound();
            }

            return basket?.MapTo<BasketDto>();
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await _basketService.RetrieveBasket(GetBuyerId());
            if (basket is null) { basket = CreateBasket(); }

            var product = await _context.Products.FirstOrDefaultAsync(product => product.Id == productId);
            if (product is null) { return BadRequest(new ProblemDetails { Title = "Product doesn't exist" }); }

            basket.AddItem(product, quantity);

            var isSaved = await _context.SaveChangesAsync() > 0;
            if (!isSaved)
            {
                return BadRequest(new ProblemDetails { Title = "Error saving item in basket" });
            }

            return CreatedAtRoute("GetBasket", basket?.MapTo<BasketDto>());
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await _basketService.RetrieveBasket(GetBuyerId());
            if (basket is null)
            {
                return NotFound();
            }

            try
            {
                basket.RemoveItem(productId, quantity);
            }
            catch (Exception ex)
            {
                return BadRequest(new ProblemDetails { Title = ex.Message });
            }

            var isSaved = await _context.SaveChangesAsync() > 0;
            if (!isSaved)
            {
                return BadRequest(new ProblemDetails { Title = "Error removing item from basket" });
            }

            return Ok(); ;
        }

        private Basket CreateBasket()
        {

            var buyerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(3) };
                Response.Cookies.Append(BasketService.BuyerIdCookieKey, buyerId, cookieOptions);
            }

            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);

            return basket;
        }



        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies[BasketService.BuyerIdCookieKey];
        }


    }
}