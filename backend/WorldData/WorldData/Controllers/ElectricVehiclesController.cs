using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WorldData.Data;
using WorldData.Models;




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



        [HttpGet] // This had to be paginated since my database had too many rows, so I couldn't display all of the information which sucks, but it is what it is.
        public async Task<ActionResult<IEnumerable<ElectricVehiclePopulationData>>> GetAllElectricVehiclesData(int page = 1, int pageSize = 10000) 
        {
            var data = await _context.EletricDataTable
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(data);
        }


    }
}
