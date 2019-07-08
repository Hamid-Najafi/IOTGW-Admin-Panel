using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IOTGW_Admin_Panel.Models
{
    public class GatewayDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Description { get; set; }
    }
}