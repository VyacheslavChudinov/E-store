using API.DTOs;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private UserManager<User> _userManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<User> userManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto userLoginInfo)
        {
            var user = await _userManager.FindByNameAsync(userLoginInfo.UserName);
            if (user == null) { return Unauthorized(); }

            var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, userLoginInfo.Password);
            if (!isPasswordCorrect) { return Unauthorized(); }

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto userRegisterInfo)
        {
            var user = new User { UserName = userRegisterInfo.UserName, Email = userRegisterInfo.Email };
            var createUserResponse = await _userManager.CreateAsync(user, userRegisterInfo.Password);

            if (!createUserResponse.Succeeded)
            {
                foreach (var error in createUserResponse.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<UserDto> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };
        }
    }
}