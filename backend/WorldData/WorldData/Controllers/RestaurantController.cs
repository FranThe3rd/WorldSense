
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WorldData.Data;
using WorldData.Entities;

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


        [HttpGet("all")] // This had to be paginated since my database had too many rows, so I couldn't display all of the information which sucks, but it is what it is.
        public async Task<ActionResult<IEnumerable<RestaurantEntity>>> GetAllRestaurantData(int page = 1, int pageSize = 500)
        {

            var totalCount = await _context.RestaurantDataContext.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            if (page < 1)
            {
                page = 1;
            }
            var data = await _context.RestaurantDataContext
              .Skip((page - 1) * pageSize)
              .Take(pageSize)
              .ToListAsync();

            return Ok(new
            {
                TotalPages = totalPages,
                Data = data
            });
        }



        [HttpGet("name")]
        public async Task<ActionResult<IEnumerable<RestaurantEntity>>> GetRestaurantByName(string text, int page = 1, int pageSize = 500)
        {

            var totalCount = await _context.RestaurantDataContext.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var data = await _context.RestaurantDataContext
              .Where(c => c.Title.Contains(text))
              .Skip((page - 1) * pageSize)
              .Take(pageSize)
              .ToListAsync(); ;

            return Ok(new
            {
                TotalPages = totalPages,
                Data = data
            });

        }

        




    }
}


