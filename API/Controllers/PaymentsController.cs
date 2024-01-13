using API.Data;
using API.DTOs;
using API.Entities.OrderAggregator;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace API.Controllers;

public class PaymentsController(StoreContext context, PaymentService paymentService,
        BasketService basketService, IConfiguration config)
    : BaseApiController
{
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
    {
        var basket = await basketService.RetrieveBasket(User.Identity?.Name);
        if (basket is null) return NotFound();

        var paymentIntent = await paymentService.CreateOrUpdatePaymentIntent(basket);
        if (paymentIntent is null) return BadRequest(new ProblemDetails { Title = "Problem creating payment intent" });


        basket.PaymentIntentId = basket.PaymentIntentId ?? paymentIntent.Id;
        basket.ClientSecret = basket.ClientSecret ?? paymentIntent.ClientSecret;

        await basketService.SaveBasket();

        return basket.MapTo<BasketDto>();
    }

    [HttpPost("webhook")]
    public async Task<ActionResult> StripeWebhook()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
        var stripeEvent = EventUtility.ConstructEvent(json,
            Request.Headers["Stripe-Signature"],
            config["StripeSettings:WhSecret"]);

        var charge = (Charge)stripeEvent.Data.Object;
        var order = await context.Orders.FirstOrDefaultAsync(o => o.PaymentIntentId == charge.PaymentIntentId);

        if (charge.Status == "succeeded") order.OrderStatus = OrderStatus.PaymentReceived;

        await context.SaveChangesAsync();

        return new EmptyResult();
    }
}