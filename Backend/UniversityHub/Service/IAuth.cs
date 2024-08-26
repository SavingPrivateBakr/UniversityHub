using UniversityHub.Models;

namespace UniversityHub.Service
{
    public interface IAuth
    {

        public  Task<AuthModel> Register(RegisterModel Register);

        public  Task<AuthModel> Login(LoginModel login);
    }
}
