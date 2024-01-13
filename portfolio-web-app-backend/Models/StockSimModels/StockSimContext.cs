using Microsoft.EntityFrameworkCore;
using portfolio_web_app_backend.Models.StockSimModels;

public class StockSimContext : DbContext
{
    public StockSimContext(DbContextOptions<StockSimContext> options) : base(options)
    {
    }

    public DbSet<Stock> Stocks { get; set; }
    public DbSet<Trade> Trades { get; set; }
    public DbSet<User> Users { get; set; }
}