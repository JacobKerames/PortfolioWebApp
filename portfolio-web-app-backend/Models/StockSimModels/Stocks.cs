using System.Text.Json.Serialization;

namespace portfolio_web_app_backend.Models.StockSimModels;

public class Stock
{
    [JsonPropertyName("symbol")]
    public string Ticker { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }
}