using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class SqliteStoreContext : StoreContext
{
    public SqliteStoreContext(DbContextOptions options, IConfiguration configuration)
        : base(options, configuration)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite(_configuration.GetConnectionString("DefaultConnection"));
    }
}