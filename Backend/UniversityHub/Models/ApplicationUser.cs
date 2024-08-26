using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace UniversityHub.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string firstName { get; set; }
        [Required]
        public string lastName { get; set; }

        public List<Applications> applications { get; set; }


     
    }
}
