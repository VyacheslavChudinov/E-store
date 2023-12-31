using API.Entities;
using Stripe;

namespace API.Services
{
    public class PaymentService
    {
        private readonly IConfiguration _config;
        public PaymentService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];
            var paymentService = new PaymentIntentService();

            var intent = new PaymentIntent();

            var subtotal = basket.Items.Sum(item => item.Product.Price * item.Quantity);
            var deliveryFee = subtotal > 10000 ? 500 : 0;

            if (string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = subtotal + deliveryFee,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> { "card" }
                };
                intent = await paymentService.CreateAsync(options);
                basket.PaymentIntentId = intent.Id;
                basket.ClientSecret = intent.ClientSecret;
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = subtotal + deliveryFee
                };
                intent = await paymentService.UpdateAsync(basket.ClientSecret, options);
            }

            return intent;
        }
    }
}