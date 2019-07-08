using System;
using System.Linq.Expressions;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using IOTGW_Admin_Panel.Helpers;
using IOTGW_Admin_Panel.Models;

namespace IOTGW_Admin_Panel.Services
{
    public interface IGatewayService
    {
        // Dont use Task<> Cause cant catch : throw new AppException
        IEnumerable<Gateway> GetAll();
        Gateway GetById(int id);
        IEnumerable<NodeDto> GetNodesForGateway(int id);
        Gateway Create(Gateway gateway);
        void Update(Gateway gateway);
        void Delete(int id);
    }

    public class GatewayService : IGatewayService
    {

        private readonly DataBaseContext _context;

        public GatewayService(DataBaseContext context)
        {
            _context = context;
        }
        public IEnumerable<Gateway> GetAll()
        {
            if (!_context.Gateways.Any())
                throw new AppException("No Gateway");
            //return _context.Gateways.Include(x => x.User).ToList();
            return _context.Gateways.ToList();
        }
        // Typed lambda expression for Select() method. 
        private static readonly Expression<Func<Node, NodeDto>> AsNodeDto =
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
        public Gateway GetById(int id)
        {
            var gateway = _context.Gateways.Find(id);

            if (gateway == null)
                throw new AppException("Gateway not found");

            return gateway;
        }
        public IEnumerable<NodeDto> GetNodesForGateway(int id)
        {
            var nodes = _context.Nodes.Include(n => n.Gateway)
            .Where(n => n.GatewayId == id)
            .Select(AsNodeDto).ToList();

            if (nodes == null)
                throw new AppException("Gateway doesnt have any node");

            return nodes;

        }
        public Gateway Create(Gateway gateway)
        {

            if (_context.Gateways.Any(x => x.Name == gateway.Name))
                throw new AppException("Gateway Name '" + gateway.Name + "' is already taken");

            if (!_context.Users.Any(x => x.Id == gateway.UserId))
                throw new AppException("Gateway User Id '" + gateway.UserId + "' doesnt exist");


            _context.Gateways.Add(gateway);
            _context.SaveChanges();

            return gateway;
        }

        public void Update(Gateway gatewayParam)
        {
            //get currect gateway in db
            var gateway = _context.Gateways.Find(gatewayParam.Id);

            if (gateway == null)
                throw new AppException("Gateway not found");

            if (gatewayParam.Name != null)
            {
                if (gatewayParam.Name != gateway.Name)
                {
                    // gatewayname has changed so check if the new gatewayname is already taken
                    if (_context.Gateways.Any(x => x.Name == gatewayParam.Name))
                        throw new AppException("gatewayname " + gatewayParam.Name + " is already taken");
                }
                gateway.Name = gatewayParam.Name;
            }

            // Change owner
            if (gatewayParam.UserId != gateway.UserId)
                gateway.UserId = gatewayParam.UserId;

            // update gateway properties / cant chane Role
            if (!string.IsNullOrWhiteSpace(gatewayParam.Description))
                gateway.Description = gatewayParam.Description;

            _context.Gateways.Update(gateway);
            _context.SaveChanges();
        }
        public void Delete(int id)
        {
            var gateway = _context.Gateways.Find(id);

            if (gateway == null)
                throw new AppException("Gateway not found");

            else
            {
                _context.Gateways.Remove(gateway);
                _context.SaveChanges();
            }
        }

    }
}