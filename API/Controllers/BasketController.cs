using API.Data;
using API.DTO;
using API.Enteties;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<BasketDTO>> GetBasket()
        {
            Basket basket = await RetriveBasket();

            if (basket == null) return NotFound();
            return new BasketDTO
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Brand = item.Product.Brand,
                    Name = item.Product.Name,
                    PictureUrl = item.Product.PictureUrl,
                    Price = item.Product.Price,
                    Quantity = item.Quantity,
                    Type = item.Product.Type
                }).ToList()
            };
        }
        [HttpPost] //api/basket?productId=3&quantity=3
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            //get basket or create basket
            Basket basket = await RetriveBasket() ?? CreateNewBasket();
            Product product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();

            basket.AddItem(product, quantity);

            bool result = await _context.SaveChangesAsync() > 0;

            if (result) return StatusCode(201);
            return BadRequest(new ProblemDetails { Title = "Problem saving item in the basket" });

        }
        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            Basket basket = await RetriveBasket();
            if (basket == null) return NotFound(new ProblemDetails { Title = "Basket not found" });

            basket.RemoveItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Item not remouved from the basket" });
        }

        //HELPERS
        private async Task<Basket> RetriveBasket()
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(basket => basket.BuyerId == Request.Cookies["buyerId"]);
        }
        private Basket CreateNewBasket()
        {
            var buyerId = Guid.NewGuid().ToString();

            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(120) };

            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }

    }
}