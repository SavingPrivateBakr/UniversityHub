namespace UniversityHub.Models
{
    public class Applications
    {

        public Guid Id { get; set; }

        public string StudentName { get; set; }

        public string UniversityName { get; set; }

       public string Files { get; set; }
        public bool ApprovalStatus { get; set; }

        public string Descussion { get; set; }
        public ApplicationUser User { get; set; }
    }
}
