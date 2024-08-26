using UniversityHub.Models;

namespace UniversityHub.Service
{
    public interface IPostinngUniversity
    {
        public Task<Applications> PostAsync(string username, string universityname);
    }
}
