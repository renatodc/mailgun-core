using Microsoft.EntityFrameworkCore;
using MailgunCore.Properties;

namespace MailgunCore.Model
{
    public class Context : DbContext
    {
        public DbSet<Mail> Mail { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(Resources.connString);
        }
    }
}
