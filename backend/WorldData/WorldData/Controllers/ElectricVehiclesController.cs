using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WorldData.Data;
using WorldData.Entities;




namespace WorldData.Controllers
{


    [ApiController]
    [Route("api/[controller]")]
    public class ElectricVehiclesController : ControllerBase
    {
        private readonly APIContext _context;

        public ElectricVehiclesController(APIContext context) 
        {
            _context = context;
        }




        [HttpGet("all")] // This had to be paginated since my database had too many rows, so I couldn't display all of the information which sucks, but it is what it is.
        public async Task<ActionResult<IEnumerable<ElectricVehiclePopulationEntity>>> GetAllElectricVehicleData(int page = 1, int pageSize = 500)
        {

            var totalCount = await _context.EletricDataContext.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            if (page < 1)
            {
                page = 1;
            }
            var data = await _context.EletricDataContext
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
        public async Task<ActionResult<IEnumerable<ElectricVehiclePopulationEntity>>> GetElectricVehicleByName(string text, int page = 1, int pageSize = 500)
        {

            var totalCount = await _context.EletricDataContext.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var data = await _context.EletricDataContext
              .Where(c => c.Make.Contains(text))
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
