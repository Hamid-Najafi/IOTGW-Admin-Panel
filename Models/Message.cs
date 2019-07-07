using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IOTGW_Admin_Panel.Models
{

    public class Message
    {
        public int Id { get; set; }

        [Required]
        public string SourceNode { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public string RecievedDate { get; set; }

        [Required]
        public string Data { get; set; }

    }
}