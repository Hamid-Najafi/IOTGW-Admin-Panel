using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using IOTGW_Admin_Panel.Helpers;
using IOTGW_Admin_Panel.Models;
using System.Linq.Expressions;
using System;

namespace IOTGW_Admin_Panel.Services
{
    public interface INodeService
    {
        // Dont use Task<> Cause cant catch : throw new AppException
        IEnumerable<Node> GetAll();
        Node GetById(int id);
        IEnumerable<MessageDto> GetMessagesForNode(int id);
        Node Create(Node node);
        void Update(Node node);
        void Delete(int id);
        Node ClaimCheck(int id);
    }

    public class NodeService : INodeService
    {

        private readonly DataBaseContext _context;

        public NodeService(DataBaseContext context)
        {
            _context = context;
        }
        public IEnumerable<Node> GetAll()
        {
            if (!_context.Nodes.Any())
                throw new AppException("No Node");

            //return _context.Nodes.Include(x => x.Gateway).ToList();
            return _context.Nodes.ToList();

        }
        // Typed lambda expression for Select() method. 
        private static readonly Expression<Func<Message, MessageDto>> AsMessageDto =
            x => new MessageDto
            {
                Id = x.Id,
                Title = x.Title,
                NodeName = x.Node.Name,
                SourceNode = x.SourceNode,
                RecievedDateTime = x.RecievedDateTime,
                Data = x.Data
            };
        public Node GetById(int id)
        {
            var node = _context.Nodes.AsNoTracking().FirstOrDefault(n => n.Id == id);

            if (node == null)
                throw new AppException("Node not found");

            return node;
        }
        public IEnumerable<MessageDto> GetMessagesForNode(int id)
        {
            var messages = _context.Messages.Include(n => n.Node)
            .Where(n => n.NodeId == id)
            .Select(AsMessageDto).ToList();

            if (messages == null)
                throw new AppException("Node doesnt have any messages");

            return messages;

        }
        public Node Create(Node node)
        {
            if (_context.Nodes.Any(x => x.Name == node.Name))
                throw new AppException("Node Name '" + node.Name + "' is already taken");

            if (!_context.Gateways.Any(x => x.Id == node.GatewayId))
                throw new AppException("Gateway Id '" + node.GatewayId + "' doesnt exist");


            _context.Nodes.Add(node);
            _context.SaveChanges();

            return node;
        }

        public void Update(Node nodeParam)
        {
            if (nodeParam.Gateway == null)
            {
                throw new AppException("Node Params are null");
            }
            //get currect node in db
            var node = _context.Nodes.AsNoTracking().FirstOrDefault(n => n.Id == nodeParam.Id);

            if (node == null)
                throw new AppException("Node not found");

            if (nodeParam.Name != null)
            {
                if (nodeParam.Name != node.Name)
                {
                    // node name has changed so check if the new one is already taken
                    if (_context.Nodes.Any(x => x.Name == nodeParam.Name))
                        throw new AppException("Node Name '" + nodeParam.Name + "' is already taken");
                }
                node.Name = nodeParam.Name;
            }
            if (!string.IsNullOrWhiteSpace(nodeParam.Config))
                node.Config = nodeParam.Config;

            // Change gateway
            if (nodeParam.GatewayId != node.GatewayId)
                node.GatewayId = nodeParam.GatewayId;

            // update node properties / cant chane Role
            if (!string.IsNullOrWhiteSpace(nodeParam.Description))
                node.Description = nodeParam.Description;

            _context.Nodes.Update(node);
            _context.SaveChanges();
        }
        public void Delete(int id)
        {
            var node = _context.Nodes.AsNoTracking().FirstOrDefault(n => n.Id == id);

            if (node == null)
                throw new AppException("Node not found");

            else
            {
                _context.Nodes.Remove(node);
                _context.SaveChanges();
            }
        }
        public Node ClaimCheck(int id)
        {
            var node = _context.Nodes.Include(n => n.Gateway).FirstOrDefault(n => n.Id == id);
            if (node == null)
                throw new AppException("Node not found");
            return node;
        }

    }
}