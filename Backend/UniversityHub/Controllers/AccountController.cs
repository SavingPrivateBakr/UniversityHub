using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using UniversityHub.Models;
using UniversityHub.Service;

namespace UniversityHub.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        public readonly IAuth auth;
        private readonly ILogger<AccountController> logger;

        public AccountController(IAuth _auth, ILogger<AccountController> logger)
        {
            this.auth = _auth;
            this.logger = logger;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel Register)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result =await auth.Register(Register);

            if (!result.IsAuthenticated)
            {
                return BadRequest(result.Message);
            }

            return Ok(result);
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody]LoginModel Login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await auth.Login(Login);

            if (!result.IsAuthenticated)
            {
                return BadRequest(result.Message);
            }
            this.logger.LogInformation($"{Login.Email}", DateTime.Now);

            return Ok(result);
        }

    }
}
