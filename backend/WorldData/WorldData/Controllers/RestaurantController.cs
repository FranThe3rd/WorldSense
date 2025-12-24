
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WorldData.Data;
using WorldData.Models;


namespace WorldData.Controllers {

  [ApiController]
  [Route("api/[controller]")]

    public class RestaurantController : ControllerBase
  {
      

    private readonly APIContext _context;


    public RestaurantController(APIContext context) 
    {
      _context = context;
    }


        [HttpGet] // This had to be paginated since my database had too many rows, so I couldn't display all of the information which sucks, but it is what it is.

        public async Task<ActionResult<IEnumerable<Restaurants>>> GetAllRestaurantsData(int page = 1, int pageSize = 10000) 
        {
            var data = await _context.RestaurantTable
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(data);
        }




  }
}


