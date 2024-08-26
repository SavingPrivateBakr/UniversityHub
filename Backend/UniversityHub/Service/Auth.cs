using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UniversityHub.Data;
using UniversityHub.JWT_optimizer;
using UniversityHub.Models;

namespace UniversityHub.Service
{
    public class Auth : IAuth
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly JWT _jwt;

        private readonly DatabaseContext   _dbContext;

        public Auth(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IOptions<JWT> jwt, DatabaseContext _dbContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _jwt = jwt.Value;
           this._dbContext =  _dbContext;
        }

        public async Task<AuthModel> Register(RegisterModel Register)
        {
            await _roleManager.CreateAsync(new IdentityRole
            {
                Name = "user"
            });
            if (await _userManager.FindByEmailAsync(Register.Email) is not null) {
                return new AuthModel
                {
                    Message = "This Email is Already registerd"

                };
            }

            if (await _userManager.FindByNameAsync(Register.username) is not null)
                return new AuthModel { Message = "Username is already registered!" };

            var user = new ApplicationUser
            {   
                
                UserName = Register.username,
                Email = Register.Email,
                firstName = Register.firstname,
                lastName = Register.lastname
                
            };

           var check= await _userManager.CreateAsync(user,Register.Password);
            if (!check.Succeeded)
            {
                string error = null;
                foreach (var i in check.Errors)
                {
                    error+=( i.Description);
                }
                return new AuthModel
                {
                    Message = error,
                };
            }
            AddRolemodel mm = new AddRolemodel
            {

                Role = "user",
                UserId = user.Id,
            };
            await AddRoleAsync(mm);

            var jwtSecurityToken = await CreateJwtToken(user);

            return new AuthModel
            {
                Email = user.Email,
                ExpiresOn = jwtSecurityToken.ValidTo,
                IsAuthenticated = true,
                Roles = new List<string> { "User" },
                Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                Username = user.UserName
            };
        }

        public async Task<AuthModel> Login(LoginModel login)
        {
           ApplicationUser result1= await _userManager.FindByEmailAsync(login.Email);

            
         

            if(result1 == null )
            {
                return new AuthModel
                {
                    Message = "No email is assigned "
                };

            }

            bool isPasswordCorrect = await _userManager.CheckPasswordAsync(result1,login.Password);
            if (!isPasswordCorrect)
            {
                return new AuthModel
                {
                    Message = "Please check your email or password again"
                };
            }
            

            var jwtSecurityToken = await CreateJwtToken(result1);

            return new AuthModel
            {
                Email = result1.Email,
                ExpiresOn = jwtSecurityToken.ValidTo,
                IsAuthenticated = true,
                Roles = new List<string> {"User"},
                Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                Username = result1.UserName
            };



        }

        public async Task<string> AddRoleAsync(AddRolemodel model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);

            if (user is null || !await _roleManager.RoleExistsAsync(model.Role))
                return "Invalid user ID or Role";

            if (await _userManager.IsInRoleAsync(user, model.Role))
                return "User already assigned to this role";

            var result = await _userManager.AddToRoleAsync(user, model.Role);

            return result.Succeeded ? string.Empty : "Sonething went wrong";
        }


        private async Task<JwtSecurityToken> CreateJwtToken(ApplicationUser user)
        {
            
            var userClaims = await _userManager.GetClaimsAsync(user);
            var userRoles = await _userManager.GetRolesAsync(user);

            var roleClaims = new List<Claim>();
           foreach(var role in userRoles)
            {
                roleClaims.Add(new Claim("role",role));
            }

         
          
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id),
              
            }
            .Union(userClaims)
            .Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: claims,
                expires: DateTime.Now.AddHours(_jwt.DurationInDays),
                signingCredentials: signingCredentials);

            return jwtSecurityToken;
        }
    }
}
