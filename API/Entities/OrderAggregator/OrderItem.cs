namespace API.Entities.OrderAggregator
{
    public class OrderItem
    {
        public int Id { get; set; }
        public long Price { get; set; }
        public int Quantity { get; set; }

        public OrderedItemSnapshot OrderedItemSnapshot { get; set; }
    }
}