using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IOTGW_Admin_Panel.Models
{

    public class Gateway
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        [Required]
        [StringLength(30)]
        public string Name { get; set; }

        [Required]
        [StringLength(120)]
        public string Description { get; set; }

        // Navigation propertie

        //[ForeignKey("UserId")]
        public User User { get; set; }
        public ICollection<Node> Nodes { get; set; }

    }
}