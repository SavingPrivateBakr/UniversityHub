namespace UniversityHub.Models
{
    public class SendingCv
    {
        public string StudentName { get; set; }

        public string UniversityName { get; set; }

        public MemoryStream Files { get; set; }
        public bool ApprovalStatus { get; set; }
    }
}
