using System;
using System.ComponentModel.DataAnnotations;

namespace IOTGW_Admin_Panel.Models
{

    public class MessageDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int NodeId { get; set; }
        public string NodeName { get; set; }
        public string SourceNode { get; set; }
        public DateTime RecievedDateTime { get; set; }
        public string Data { get; set; }

    }
}