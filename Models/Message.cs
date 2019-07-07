using System;
using System.ComponentModel.DataAnnotations;

namespace IOTGW_Admin_Panel.Models
{

    public class Message
    {
        public int Id { get; set; }

        public int NodeId { get; set; }

        [Required]
        public string SourceNode { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        //[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime RecievedDateTime { get; set; }

        [Required]
        public string Data { get; set; }
        public Message()
        {
            RecievedDateTime = DateTime.Now;
        }

        public Node Node { get; set; }

    }
}