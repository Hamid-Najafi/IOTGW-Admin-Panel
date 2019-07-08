using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IOTGW_Admin_Panel.Models
{
    public class NodeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int GatewayId { get; set; }
        public string GatewayName { get; set; }
        public string Config { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
    }
}