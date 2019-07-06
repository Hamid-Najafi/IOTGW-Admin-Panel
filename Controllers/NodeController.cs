using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using IOTGW_Admin_Panel.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace IOTGW_Admin_Panel.Controllers
{
    [ApiController]
    [Route("api/gateway/[controller]")]
    public class NodeController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public NodeController(DataBaseContext context)
        {
            _context = context;
        }
        // GET: api/Todo
        [HttpGet]
        [Produces("application/json")]
        //   [Consumes(ConsumesAttribute)]
        public async Task<ActionResult<IEnumerable<Node>>> GetTodoItems()
        {
            return await _context.Nodes.ToListAsync();
        }
        // GET: api/Todo/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<Node>> GetTodoItem(int id)
        {
            var todoItem = await _context.Nodes.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return Ok(todoItem);
        }

        [HttpPost]
        public async Task<ActionResult<Node>> PostTodoItem(Node item)
        {
            _context.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTodoItem), new { id = item.Id }, item);
        }
        // PUT: api/Todo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(int id, Node item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        /// <summary>
        /// Deletes a specific TodoItem.
        /// </summary>
        /// <param name="id"></param>   
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            var node = await _context.Nodes.FindAsync(id);

            if (node == null)
            {
                return NotFound();
            }

            _context.Nodes.Remove(node);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}