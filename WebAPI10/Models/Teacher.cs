using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI10.Models
{
    [Table("teacher")]
    public class Teacher
    {
        [Key]
        public int teacherID { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        [Required(ErrorMessage = "First Name is required")]
        [StringLength(100, ErrorMessage = "First Name can't be longer than 100 characters")]
        public string firstName { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        [Required(ErrorMessage = "Last Name is required")]
        [StringLength(100, ErrorMessage = "Last Name can't be longer than 100 characters")]
        public string lastName { get; set; }

        [Column(TypeName = "nvarchar(12)")]
        [Required(ErrorMessage = "Contact Number is required")]
        [StringLength(12, ErrorMessage = "Contact Number can't be longer than 12 characters")]
        public string contactNo { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        [Required(ErrorMessage = "Email Address is required")]
        [StringLength(100, ErrorMessage = "Email Address can't be longer than 100 characters")]
        public string emailAddress { get; set; }
    }
}
