using System.ComponentModel.DataAnnotations;

namespace API.Entities.OrderAggregator
{
    public class Order
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        [Required]
        public ShippingAddress ShippingAddress { get; set; }
        public List<OrderItem> OrderItems { get; set; }
        public long Subtotal { get; set; }
        public long DeliveryFee { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public DateTime CreatedTime { get; set; } = DateTime.Now;

        public long GetTotal()
        {
            return Subtotal + DeliveryFee;
        }
    }
}