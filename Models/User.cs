using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IOTGW_Admin_Panel.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "User Name")]
        [StringLength(30, MinimumLength = 4)]
        public string Username { get; set; }

        //[Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Token { get; set; }

        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }

        //[Required]
        public string Role { get; set; }

        [StringLength(20, MinimumLength = 4)]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [StringLength(20, MinimumLength = 4)]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Display(Name = "Full Name")]
        public string FullName
        {
            get
            {
                return LastName + ", " + FirstName;
            }
        }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Enrollment Date")]
        public DateTime EnrollmentDate { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        [DataType(DataType.PostalCode)]
        public int PostalCode { get; set; }

        public string CompanyName { get; set; }

        public ICollection<Gateway> Gateways { get; set; }

    }
}