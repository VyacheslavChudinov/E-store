using API.Data;
using API.DTOs;
using API.Entities.OrderAggregator;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly PaymentService _paymentService;
        private readonly BasketService _basketService;
        private readonly IConfiguration _config;
        private readonly StoreContext _context;
        public PaymentsController(StoreContext context, PaymentService paymentService,
            BasketService basketService, IConfiguration config)
        {
            _basketService = basketService;
            _paymentService = paymentService;
            _config = config;
            _context = context;
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

            await _basketService.SaveBasket();

            return basket.MapTo<BasketDto>();
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var stripeEvent = EventUtility.ConstructEvent(json,
                Request.Headers["Stripe-Signature"],
                _config["StripeSettings:WhSecret"]);

            var charge = (Charge)stripeEvent.Data.Object;
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.PaymentIntentId == charge.PaymentIntentId);

            if (charge.Status == "succeeded")
            {
                order.OrderStatus = OrderStatus.PaymentReceived;
            }

            await _context.SaveChangesAsync();

            return new EmptyResult();
        }
    }
}