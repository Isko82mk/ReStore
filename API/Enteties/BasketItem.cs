using System.ComponentModel.DataAnnotations.Schema;

namespace API.Enteties
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        //BasketItem navigatin properties, how does it get from the basket item to the product , other words
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}