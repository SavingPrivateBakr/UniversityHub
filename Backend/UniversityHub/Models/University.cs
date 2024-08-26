using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace UniversityHub.Models
{
 
    public class University
    {
        [Key]
        public Guid Id { get; set; }
        public string? alpha_two_code { get; set; }
        [AllowNull]
        public string?[] web_pages { get; set; }

        [AllowNull]
        public string? country { get; set; }

     
        public string[]? domains { get; set; }

        public string name { get; set; }
       

    }
}
