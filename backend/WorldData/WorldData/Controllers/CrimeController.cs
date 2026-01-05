using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WorldData.Data;
using WorldData.Entities;




namespace WorldData.Controllers
{


  [ApiController]
  [Route("api/[controller]")]
  public class CrimeController : ControllerBase
  {
    private readonly APIContext _context;

    public CrimeController(APIContext context) 
    {
      _context = context;
    }



    [HttpGet("all")] // This had to be paginated since my database had too many rows, so I couldn't display all of the information which sucks, but it is what it is.
      public async Task<ActionResult<IEnumerable<CrimeEntity>>> GetAllCrimeData(int page = 1, int pageSize = 500) 
      {


        if (page < 1)
        {
          page = 1;
        }
        var data = await _context.CrimeDataContext
          .Skip((page - 1) * pageSize)
          .Take(pageSize)
          .ToListAsync();

        return Ok(data);
      }

    [HttpGet("name")]
    public async Task<ActionResult<IEnumerable<CrimeEntity>>> GetCrimeByName(string text,int page = 1, int pageSize=500) {

            var data = await _context.CrimeDataContext
              .Where(c => c.CrimeCodeDesc.Contains(text))
              .Skip((page - 1) * pageSize)
              .Take(pageSize)
              .ToListAsync(); ;

        return Ok(data);

        }




  }
}
