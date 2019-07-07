using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using IOTGW_Admin_Panel.Models;
using IOTGW_Admin_Panel.Services;
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
            _mapper = mapper;
        }

        /// <summary>
        /// authenticate and generate JSON Web Token (JWT) 
        /// </summary>
        [AllowAnonymous]
        [HttpPost("authenticate")]
        //public IActionResult Authenticate([FromBody]User userParam)
        public IActionResult Authenticate(User userParam)
        {
            try
            {
                var user = _userService.Authenticate(userParam.Username, userParam.Password);
                return Ok(user);
            }
            catch (AppException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// gets Users list.
        /// </summary>
        [HttpGet]
        [Authorize(Roles = Role.Admin)]
        [Produces("application/json")]
        public ActionResult<IEnumerable<User>> GetAll()
        {
            try
            {
                var users = _userService.GetAll();
                var userMap = _mapper.Map<IList<User>>(users);
                return Ok(userMap);
            }
            catch (AppException ex)
            {
                return NotFound(ex.Message);
            }

        }

        /// <summary>
        /// gets a specific User.
        /// </summary>
        /// <param id="Id"></param> 
        [HttpGet("{id}")]
        [Produces("application/json")]
        public ActionResult<User> GetById(int id)
        {
            //var userMap = _mapper.Map<User>(user);

            // only allow admins to access other user records
            var currentUserId = int.Parse(User.Identity.Name);
            if (id != currentUserId && !User.IsInRole(Role.Admin))
                return Forbid();

            try
            {
                var user = _userService.GetById(id);
                var userMap = _mapper.Map<User>(user);
                return Ok(userMap);
            }
            catch (AppException ex)
            {
                return NotFound(ex.Message);
            }

        }

        /// <summary>
        /// Ctreate new User.
        /// </summary>
        /// <param user="User Item"></param> 
        [Authorize(Roles = Role.Admin)]
        //[HttpPost("register")]
        [HttpPost]
        [Produces("application/json")]
        public IActionResult Register(User userParam)
        {
            var userMap = _mapper.Map<User>(userParam);
            try
            {
                // save 
                _userService.Create(userMap, userParam.Password);
                return CreatedAtAction(nameof(GetById), new { id = userMap.Id }, userMap);
                //return Ok();
            }
            catch (AppException ex)
            {
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
            //only allow admins to access other user records
            var currentUserId = int.Parse(User.Identity.Name);
            if (id != currentUserId && !User.IsInRole(Role.Admin))
                return Forbid();

            var userMap = _mapper.Map<User>(userParam);
            userMap.Id = id;

            try
            {
                // save 
                _userService.Update(userMap, userMap.Password);
                return NoContent();
                //return Ok();
            }
            catch (AppException ex)
            {
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
                return NotFound(ex.Message);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e);
            }
        }
    }
}