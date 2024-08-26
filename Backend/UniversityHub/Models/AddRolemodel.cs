using System.ComponentModel.DataAnnotations;

namespace UniversityHub.Models
{
    public class AddRolemodel
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
