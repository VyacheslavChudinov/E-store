using API.Data;
using API.DTOs;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly PaymentService _paymentService;
        private readonly BasketService _basketService;
        public PaymentsController(PaymentService paymentService, BasketService basketService)
        {
            _basketService = basketService;
            _paymentService = paymentService;

        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
        {
            var basket = await _basketService.RetrieveBasket(User.Identity.Name);
            if (basket is null) { return NotFound(); }

            var paymentIntent = await _paymentService.CreateOrUpdatePaymentIntent(basket);
            if (paymentIntent is null) { return BadRequest(new ProblemDetails { Title = "Problem creating payment intent" }); }


            basket.PaymentIntentId = basket.PaymentIntentId ?? paymentIntent.Id;
            basket.ClientSecret = basket.ClientSecret ?? paymentIntent.ClientSecret;

            var isBasketSaved = await _basketService.SaveBasket();
            if (!isBasketSaved) { return BadRequest(new ProblemDetails { Title = "Problem updating basket with payment intent" }); }

            return basket.MapBasketToDto();
        }
    }
}