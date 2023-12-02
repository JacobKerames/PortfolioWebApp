namespace PortfolioWebApp.ClientApp.Models.StockSimModels;

public class User
{
    public int Id { get; set; }
    public List<Trade> Trades { get; set; }  // User's trade history
}