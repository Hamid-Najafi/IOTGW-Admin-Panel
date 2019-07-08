using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using IOTGW_Admin_Panel.Models;
using IOTGW_Admin_Panel.Services;
using IOTGW_Admin_Panel.Helpers;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace IOTGW_Admin_Panel.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MessagesController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private IMessageService _messageService;
        private IMapper _mapper;

        public MessagesController(DataBaseContext context, IMessageService messageService, IMapper mapper)
        {
            _context = context;
            _messageService = messageService;
            _mapper = mapper;
        }

        /// <summary>
        /// gets messages list.
        /// </summary>
        [HttpGet]
        [Authorize(Roles = Role.Admin)]
        [Produces("application/json")]
        public ActionResult<IEnumerable<Message>> GetAll()
        {
            try
            {
                var messages = _messageService.GetAll();
                var messageMap = _mapper.Map<IList<Message>>(messages);
                return Ok(messageMap);
            }
            catch (AppException ex)
            {
                return NotFound(ex.Message);
            }

        }

        /// <summary>
        /// gets a specific message.
        /// </summary>
        /// <param id="Id"></param> 
        [HttpGet("{id}")]
        [Produces("application/json")]
        public ActionResult<Message> GetById(int id)
        {
            var currentUserId = int.Parse(User.Identity.Name);

            try
            {
                var message = _messageService.ClaimCheck(id);
                if (message.Node.Gateway.UserId != currentUserId && !User.IsInRole(Role.Admin))
                    return Forbid();

                var message2 = _messageService.GetById(id);
                var messageMap = _mapper.Map<Message>(message2);
                return Ok(messageMap);
            }
            catch (AppException ex)
            {
                return NotFound(ex.Message);
            }

        }

        /// <summary>
        /// Ctreate new message.
        /// </summary>
        /// <param message="message Item"></param> 
        //[HttpPost("register")]
        [HttpPost]
        [Produces("application/json")]
        public IActionResult Create(Message messageParam)
        {
            var currentUserId = int.Parse(User.Identity.Name);

            var messageMap = _mapper.Map<Message>(messageParam);

            try
            {
                // Fobid Check
                // var message = _messageService.NodeClaimCheck(messageParam.NodeId);
                // if (message.Node.Gateway.UserId != currentUserId && !User.IsInRole(Role.Admin))
                //     return Forbid();
                _messageService.Create(messageMap);
                return CreatedAtAction(nameof(GetById), new { id = messageMap.Id }, messageMap);
                //return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(ex.Message);
            }
            return null;
        }

        /// <summary>
        /// Deletes a specific message.
        /// </summary>
        /// <param name="id"></param>   
        [HttpDelete("{id}")]
        public IActionResult Deletemessage(int id)
        {
            var currentUserId = int.Parse(User.Identity.Name);

            try
            {
                var message = _messageService.ClaimCheck(id);
                if (message.Node.Gateway.UserId != currentUserId && !User.IsInRole(Role.Admin))
                    return Forbid();

                _messageService.Delete(id);
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