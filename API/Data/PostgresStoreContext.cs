using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class PostgresStoreContext : StoreContext
{
    public PostgresStoreContext(DbContextOptions options, IConfiguration configuration)
        : base(options, configuration)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // Use connection string provided at runtime by FlyIO.
        var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

        if (string.IsNullOrEmpty(connUrl))
        {
            options.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));

            return;
        }

        // Parse connection URL to connection string for Npgsql
        connUrl = connUrl.Replace("postgres://", string.Empty);
        var pgUserPass = connUrl.Split("@")[0];
        var pgHostPortDb = connUrl.Split("@")[1];
        var pgHostPort = pgHostPortDb.Split("/")[0];
        var pgDb = pgHostPortDb.Split("/")[1];
        var pgUser = pgUserPass.Split(":")[0];
        var pgPass = pgUserPass.Split(":")[1];
        var pgHost = pgHostPort.Split(":")[0];
        var pgPort = pgHostPort.Split(":")[1];
        var updatedHost = pgHost.Replace("flycast", "internal");
        var connString = $"Server={updatedHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";

        options.UseNpgsql(connString);
    }
}