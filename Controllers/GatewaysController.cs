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
    public class GatewaysController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private IGatewayService _gatewayService;
        private IMapper _mapper;

        public GatewaysController(DataBaseContext context, IGatewayService gatewayService, IMapper mapper)
        {
            _context = context;
            _gatewayService = gatewayService;
            _mapper = mapper;
        }

        /// <summary>
        /// gets gateways list.
        /// </summary>
        [HttpGet]
        [Authorize(Roles = Role.Admin)]
        [Produces("application/json")]
        public ActionResult<IEnumerable<Gateway>> GetAll()
        {
            try
            {
                var gateways = _gatewayService.GetAll();
                var gatewayMap = _mapper.Map<IList<Gateway>>(gateways);
                return Ok(gatewayMap);
            }
            catch (AppException ex)
            {
                return NotFound(ex.Message);
            }

        }

        /// <summary>
        /// gets a specific gateway.
        /// </summary>
        /// <param id="Id"></param> 
        [HttpGet("{id}")]
        [Produces("application/json")]
        public ActionResult<Gateway> GetById(int id)
        {
            var currentUserId = int.Parse(User.Identity.Name);

            try
            {
                var gateway = _gatewayService.GetById(id);

                if (gateway.UserId != currentUserId && !User.IsInRole(Role.Admin))
                    return Forbid();

                var gatewayMap = _mapper.Map<Gateway>(gateway);
                return Ok(gatewayMap);
            }
            catch (AppException ex)
            {
                return NotFound(ex.Message);
            }

        }

        /// <summary>
        /// Ctreate new gateway.
        /// </summary>
        /// <param gateway="gateway Item"></param> 
        [Authorize(Roles = Role.Admin)]
        //[HttpPost("register")]
        [HttpPost]
        [Produces("application/json")]
        public IActionResult Create(Gateway gatewayParam)
        {
            var gatewayMap = _mapper.Map<Gateway>(gatewayParam);
            try
            {
                _gatewayService.Create(gatewayMap);
                return CreatedAtAction(nameof(GetById), new { id = gatewayMap.Id }, gatewayMap);
                //return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Update a specific gateway.
        /// </summary>
        /// <param name="id"></param>   
        /// <param gateway="gateway Item"></param>   
        [HttpPut("{id}")]
        public IActionResult Update(int id, Gateway gatewayParam)
        {
            //only allow admins to access other gateway records
            var currentUserId = int.Parse(User.Identity.Name);

            if (gatewayParam.UserId != currentUserId && !User.IsInRole(Role.Admin))
                return Forbid();

            var gatewayMap = _mapper.Map<Gateway>(gatewayParam);
            gatewayMap.Id = id;

            try
            {
                // save 
                _gatewayService.Update(gatewayMap);
                return NoContent();
                //return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(ex.Message);
            }

        }

        /// <summary>
        /// Deletes a specific gateway.
        /// </summary>
        /// <param name="id"></param>   
        [HttpDelete("{id}")]
        [Authorize(Roles = Role.Admin)]
        public IActionResult Deletegateway(int id)
        {
            try
            {
                _gatewayService.Delete(id);
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
                return StatusCode(StatusCodes.Status500InternalServerError,e);
            }
        }

    }
}