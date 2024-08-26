using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;
using System.IO;
using System.IO.Pipes;
using System.Text.Json;
using UniversityHub.Data;
using UniversityHub.Models;
using UniversityHub.Service;

namespace UniversityHub.Controllers
{
    [Route("University")]
    [ApiController]

    public class UniversityController : Controller
    {
        private readonly DatabaseContext _db;

        public UniversityController(DatabaseContext db)
        {
            _db = db;

        }
        [HttpGet("Universities")]
        public async Task<IActionResult> AllUniversities()
        {


            var result = await _db.universities.Where(w => w.Id != null).ToListAsync();

            if (result == null || !result.Any())
            {
                return NotFound("No universities found.");
            }

            return Ok(result);
        }

        [Authorize(Policy = "user")]
        [HttpPut("AddApplication")]
        public async Task<IActionResult> AddApplication([FromForm] CvUploading apper)
        {
            var user = _db.Users.FirstOrDefault(u => apper.User == u.Email);

            if (user == null)
            {
                return BadRequest("User not found.");
            }

            var application = new Applications
            {
                UniversityName = apper.UniversityName,
                StudentName = apper.StudentName,
                Files = apper.Files,
                User = user,
                ApprovalStatus = false,
                Descussion = "Pending",
            };

            await _db.applications.AddAsync(application);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Application submitted successfully" });
        }


        [Authorize(Policy = "user")]
        [HttpGet("ApplyApplication")]
        public async Task<IActionResult> GetApplication([FromHeader(Name = "apper")] string apper)
        {
            if (string.IsNullOrEmpty(apper))
            {
                return BadRequest(new { message = "The 'apper' field is required." });
            }
        
            
            List<Applications> ww = await _db.applications
                .Where(w => w.StudentName == apper)
                .ToListAsync();

            if (ww.Count == 0)
            {
                return NotFound(new { message = "No Application has been applied." });
            }
         

            return Ok(ww);

        }

    }

}
