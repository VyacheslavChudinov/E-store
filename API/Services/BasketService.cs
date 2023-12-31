using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class BasketService
    {
        public static readonly string BuyerIdCookieKey = "buyerId";
        private StoreContext _context;

        public BasketService(StoreContext context)

        {
            _context = context;
        }

        public async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                return null;
            }

            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        public void RemoveBasket(Basket basket)
        {
            if (basket is null) { return; }

            _context.Baskets.Remove(basket);
        }

        public async Task<Boolean> SaveBasket()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}