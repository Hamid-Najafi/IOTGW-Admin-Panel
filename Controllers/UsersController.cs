using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IOTGW_Admin_Panel.Models;
using WebApi.Services;
using Microsoft.AspNetCore.Authorization;

namespace IOTGW_Admin_Panel.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private IUserService _userService;

        public UsersController(DataBaseContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        /// <summary>
        /// authenticate and generate JSON Web Token (JWT) 
        /// </summary>
        [AllowAnonymous]
        [HttpPost("authenticate")]
        //public IActionResult Authenticate([FromBody]User userParam)
        public IActionResult Authenticate(User userParam)
        {
            var user = _userService.Authenticate(userParam.Username, userParam.Password);

            if (user == null)

                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }

        /// <summary>
        /// gets Users list.
        /// </summary>
        [HttpGet]
        [Authorize(Roles = Role.Admin)]
        public ActionResult<IEnumerable<User>> GetUsers() //ASYNC
        {
            var users = _userService.GetAll();
            return Ok(users);
        }

        /// <summary>
        /// gets a specific User.
        /// </summary>
        /// <param id="Id"></param> 
        [HttpGet("{id}")]
        public ActionResult<User> GetUser(int id)
        {
            var user = _userService.GetById(id);

            if (user == null)
            {
                return NotFound();
            }

            // only allow admins to access other user records
            var currentUserId = int.Parse(User.Identity.Name);
            if (id != currentUserId && !User.IsInRole(Role.Admin))
            {
                return Forbid();
            }

            return Ok(user);
        }

        /// <summary>
        /// Ctreate new User.
        /// </summary>
        /// <param user="User Item"></param> 
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        /// <summary>
        /// Update a specific User.
        /// </summary>
        /// <param name="id"></param>   
        /// <param user="User Item"></param>   
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Deletes a specific User.
        /// </summary>
        /// <param name="id"></param>   
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var User = await _context.Users.FindAsync(id);

            if (User == null)
            {
                return NotFound();
            }

            _context.Users.Remove(User);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}