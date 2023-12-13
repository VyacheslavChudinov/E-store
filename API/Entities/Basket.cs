namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            var productInBasket = Items.FirstOrDefault(product => product.ProductId == product.Id);
            if (productInBasket is null)
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity });

                return;
            }

            productInBasket.Quantity += quantity;
        }


        public void RemoveItem(int productId, int quantity)
        {
            var productInBasket = Items.Find(product => productId == product.Id);
            if (productInBasket is not null)
            {
                var newQuantity = productInBasket.Quantity - quantity;
                productInBasket.Quantity = newQuantity >= 0 ? newQuantity : 0;
            }

            if (productInBasket.Quantity == 0)
            {
                Items.Remove(productInBasket);
            }
        }
    }
}