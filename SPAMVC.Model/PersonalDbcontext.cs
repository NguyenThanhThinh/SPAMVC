using SPAMVC.Model.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SPAMVC.Model
{
    public class PersonalDbcontext : DbContext
    {
        public PersonalDbcontext() : base("name=spademo")
        {

        }
        public DbSet<PersonalDetail> PersonalDetails { get; set; }
    }
}
