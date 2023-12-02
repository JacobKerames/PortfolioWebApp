using Microsoft.EntityFrameworkCore;
using PortfolioWebApp.ClientApp.Models.StockSimModels;

public class StockSimContext : DbContext
{
    public StockSimContext(DbContextOptions<StockSimContext> options) : base(options)
    {
    }

    public DbSet<Stock> Stocks { get; set; }
    public DbSet<Trade> Trades { get; set; }
    public DbSet<User> Users { get; set; }
}