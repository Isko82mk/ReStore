using API.Data;
using API.Enteties;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

  public class ProductsController : BaseApiController
  {
    private readonly StoreContext _context;

    public ProductsController(StoreContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<List<Product>> GetProducts()
    {
      return await _context.Products.ToListAsync();

    }


    [HttpGet("{id}")]
    public async Task<Product> GetProduct(int id)
    {
      return await _context.Products.FindAsync(id);

    }

  }
}