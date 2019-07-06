using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IOTGW_Admin_Panel.Models;
using WebApi.Services;
using Microsoft.AspNetCore.Authorization;
using IOTGW_Admin_Panel.Helpers;
using AutoMapper;

namespace IOTGW_Admin_Panel.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private IUserService _userService;
        private IMapper _mapper;

        public UsersController(DataBaseContext context, IUserService userService, IMapper mapper)
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
        [Authorize(Roles = Role.Admin)]
        [HttpPost("register")]
        public IActionResult Register(User userParam)
        {
            // map dto to entity
            var user = _mapper.Map<User>(userParam);

            try
            {
                // save 
                _userService.Create(user, userParam.Password);
                return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
                //return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// Update a specific User.
        /// </summary>
        /// <param name="id"></param>   
        /// <param user="User Item"></param>   
        [HttpPut("{id}")]
        public IActionResult Update(int id, User userParam)
        {
            if (id != userParam.Id)
            {
                return BadRequest();
            }

            // only allow admins to access other user records
            var currentUserId = int.Parse(User.Identity.Name);
            if (id != currentUserId && !User.IsInRole(Role.Admin))
            {
                return Forbid();
            }

            // map dto to entity and set id
            var user = _mapper.Map<User>(userParam);
            user.Id = id;

            try
            {
                // save 
                _userService.Update(user, userParam.Password);
                return NoContent();
                //return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }

        }

        /// <summary>
        /// Deletes a specific User.
        /// </summary>
        /// <param name="id"></param>   
        [HttpDelete("{id}")]
        [Authorize(Roles = Role.Admin)]
        public IActionResult DeleteUser(int id)
        {
            // only allow admins to access other user records
            var currentUserId = int.Parse(User.Identity.Name);
            if (id != currentUserId && !User.IsInRole(Role.Admin))
            {
                return Forbid();
            }
            try
            {
                _userService.Delete(id);
                return NoContent();
                //return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return NotFound();
            }
        }
    }
}