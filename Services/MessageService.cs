using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using IOTGW_Admin_Panel.Helpers;
using IOTGW_Admin_Panel.Models;

namespace IOTGW_Admin_Panel.Services
{
    public interface IMessageService
    {
        // Dont use Task<> Cause cant catch : throw new AppException
        IEnumerable<Message> GetAll();
        Message GetById(int id);
        Message Create(Message message);
        void Delete(int id);
    }

    public class MessageService : IMessageService
    {
        private readonly DataBaseContext _context;

        public MessageService(DataBaseContext context)
        {
            _context = context;
        }
        public IEnumerable<Message> GetAll()
        {
            if (!_context.Messages.Any())
                throw new AppException("No Messages");
            //return _context.Messages.Include(x => x.Node).ToList();
            return _context.Messages.ToList();

        }
        public Message GetById(int id)
        {
            var message = _context.Messages.Find(id);

            if (message == null)
                throw new AppException("Message not found");

            return message;
        }
        public Message Create(Message message)
        {
            _context.Messages.Add(message);
            _context.SaveChanges();

            return message;
        }

        public void Delete(int id)
        {
            var message = _context.Messages.Find(id);

            if (message == null)
                throw new AppException("Message not found");

            else
            {
                _context.Messages.Remove(message);
                _context.SaveChanges();
            }
        }

    }
}