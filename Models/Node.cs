using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IOTGW_Admin_Panel.Models
{
    public static class NodeType
    {
        public const string WiFi = "WiFi";
        public const string Zigbee = "Zigbee";
        public const string Bluetooth = "Bluetooth";
        public const string LoRa = "LoRa";
        public const string GSM = "GSM";
        public const string Ethernet = "Ethernet";
    }
    public class Node
    {
        public int Id { get; set; }

        [Required]
        public int GatewayId { get; set; }

        [Required]
        [StringLength(30)]
        public string Name { get; set; }
        [Required]
        public string Config { get; set; }

        [StringLength(100)]
        public string Description { get; set; }
        [Required]
        public string Type { get; set; }

        // Navigation propertie
        [ForeignKey("GatewayId")]
        public Gateway Gateway { get; set; }
        public ICollection<Message> Messages { get; set; }

    }
}