namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public List<BasketItem> BasketItems { get; set; } = new();
    }
}