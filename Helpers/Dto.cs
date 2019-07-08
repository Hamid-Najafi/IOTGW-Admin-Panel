using System;
using System.Linq.Expressions;
using IOTGW_Admin_Panel.Models;

namespace IOTGW_Admin_Panel
{
    public static class Dto
    {
        public static readonly Expression<Func<Gateway, GatewayDto>> AsGatewayDto =
            x => new GatewayDto
            {
                Id = x.Id,
                Name = x.Name,
                UserId = x.UserId,
                UserName = x.User.Username,
                Description = x.Description,
            };
        public static readonly Expression<Func<Node, NodeDto>> AsNodeDto =
            x => new NodeDto
            {
                Id = x.Id,
                Name = x.Name,
                GatewayId = x.GatewayId,
                GatewayName = x.Gateway.Name,
                Config = x.Config,
                Description = x.Description,
                Type = x.Type
            };
        public static readonly Expression<Func<Message, MessageDto>> AsMessageDto =
            x => new MessageDto
            {
                Id = x.Id,
                Title = x.Title,
                NodeName = x.Node.Name,
                SourceNode = x.SourceNode,
                RecievedDateTime = x.RecievedDateTime,
                Data = x.Data
            };
    }
}