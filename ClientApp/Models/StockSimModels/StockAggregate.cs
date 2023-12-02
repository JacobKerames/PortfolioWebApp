using System.Text.Json.Serialization;

namespace PortfolioWebApp.ClientApp.Models.StockSimModels;

public class TimeWindow
{
    [JsonPropertyName("vw")]
    public double VolumeWeightedAveragePrice { get; set; }

    [JsonPropertyName("o")]
    public double OpenPrice { get; set; }

    [JsonPropertyName("c")]
    public double ClosePrice { get; set; }

    [JsonPropertyName("h")]
    public double HighPrice { get; set; }

    [JsonPropertyName("l")]
    public double LowPrice { get; set; }

    [JsonPropertyName("t")]
    public long Timestamp { get; set; }

    [JsonPropertyName("n")]
    public long NumTransactions { get; set; }
}

public class StockAggregate
{
    [JsonPropertyName("ticker")]
    public string Ticker { get; set; }

    [JsonPropertyName("queryCount")]
    public int QueryCount { get; set; }

    [JsonPropertyName("resultsCount")]
    public int ResultsCount { get; set; }

    [JsonPropertyName("adjusted")]
    public bool Adjusted { get; set; }

    [JsonPropertyName("results")]
    public List<TimeWindow> TimeWindow { get; set; }

    [JsonPropertyName("status")]
    public string Status { get; set; }

    [JsonPropertyName("request_id")]
    public string RequestId { get; set; }

    [JsonPropertyName("count")]
    public int Count { get; set; }
}
