using System.ComponentModel.DataAnnotations;

namespace IOTGW_Admin_Panel.Models
{
    public enum NodeType
    {
        WiFi, Zigbee, Bluetooth, LoRa, GSM, Ethernet
    }

    public class Node
    {
        public int ID { get; set; }
        [Required]
        [StringLength(30)]
        public string Name { get; set; }
        [Required]
        public string Config { get; set; }

        [StringLength(100)]
        public string Description { get; set; }
        [Required]
        public NodeType Type { get; set; }

    }
}