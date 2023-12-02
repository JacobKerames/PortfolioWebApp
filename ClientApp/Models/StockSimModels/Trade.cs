namespace PortfolioWebApp.ClientApp.Models.StockSimModels;

public class Trade
{
    public int Id { get; set; }
    public int StockId { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; }
    public DateTime TradeDate { get; set; }
    public bool IsPurchase { get; set; }

    public Stock Stock { get; set; }
}