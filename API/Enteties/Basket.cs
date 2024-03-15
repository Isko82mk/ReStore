namespace API.Enteties
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = [];


        public void AddItem(Product product, int quantity)
        {
            if (Items.All(item => item.ProductId != product.Id))
            {

                Items.Add(new BasketItem
                {
                    Product = product,
                    Quantity = quantity
                });
            }


            BasketItem existingItem = Items.FirstOrDefault(item => item.Id == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity;

        }


        public void RemoveItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if (item == null) return;

            item.Quantity -= quantity;
            if (item.Quantity <= 0) Items.Remove(item);

        }

    }
}