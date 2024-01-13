namespace API.Entities;

public class Basket
{
    public int Id { get; set; }
    public string BuyerId { get; set; }
    public List<BasketItem> Items { get; set; } = new();

    public string PaymentIntentId { get; set; }
    public string ClientSecret { get; set; }

    public void AddItem(Product product, int quantity)
    {
        var productInBasket = Items.FirstOrDefault(item => item.ProductId == product.Id);
        if (productInBasket is null)
        {
            Items.Add(new BasketItem { Product = product, Quantity = quantity });

            return;
        }

        productInBasket.Quantity += quantity;
    }


    public void RemoveItem(int productId, int quantity)
    {
        var productInBasket = Items.FirstOrDefault(item => productId == item.ProductId);
        if (productInBasket is null) throw new Exception("Product was not found");

        var newQuantity = productInBasket.Quantity - quantity;
        productInBasket.Quantity = newQuantity >= 0 ? newQuantity : 0;

        if (productInBasket.Quantity == 0) Items.Remove(productInBasket);
    }
}