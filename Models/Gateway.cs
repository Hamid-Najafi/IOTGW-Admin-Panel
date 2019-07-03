
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IOTGW_Admin_Panel.Models
{

    public class Gateway
    {
        public int ID { get; set; }
        [Required]
        [StringLength(30)]
        public string Name { get; set; }
        [Required]
        [StringLength(100)]
        public string Description { get; set; }
        public ICollection<Node> Nodes { get; set; }

    }
}