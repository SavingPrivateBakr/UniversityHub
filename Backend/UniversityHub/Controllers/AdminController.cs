using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniversityHub.Data;
using UniversityHub.Models;

namespace UniversityHub.Controllers
{
    [Route("admin")]
    [ApiController]
    [Authorize(Policy = "admin")]
    public class AdminController : ControllerBase
    {

        private readonly DatabaseContext _db;

        public AdminController(DatabaseContext db)
        {
            _db = db;

        }
        [HttpGet("GetAllApplications")]
        public async Task<IActionResult> GetApplication()
        {
          


            List<Applications> ww = await _db.applications.Where(w=>w.ApprovalStatus==false)
                .ToListAsync();

            if (ww.Count == 0)
            {
                return NotFound(new { message = "No Application has been applied." });
            }


            return Ok(ww);

        }


        [HttpPost("VerifyApplication")]
        public async Task<IActionResult> AddApplication([FromForm] verifyItems apper)
        {
            Guid guid = Guid.Parse(apper.Id);
       
            Applications one =await _db.applications.FirstOrDefaultAsync(w => guid == w.Id);

            if (one == null)
            {
                return BadRequest("The field is required.");
            }
            else
            {
                one.ApprovalStatus=true;
                one.Descussion = apper.Discuss;
            }


            


        

            await _db.SaveChangesAsync();
            return Ok(new { message = "File uploaded successfully" });
        }
    }
}
