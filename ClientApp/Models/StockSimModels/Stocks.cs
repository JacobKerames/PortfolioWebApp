using System.Text.Json.Serialization;

namespace PortfolioWebApp.ClientApp.Models.StockSimModels;

public class Stock
{
    [JsonPropertyName("symbol")]
    public string Ticker { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }
}