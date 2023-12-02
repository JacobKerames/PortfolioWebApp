using Microsoft.AspNetCore.Mvc;
using PortfolioWebApp.ClientApp.Models.StockSimModels;
using System.Text.Json;

namespace PortfolioWebApp.Controllers;

[ApiController]
[Route("[controller]Api")]
public class StockController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly string _polygonApiKey;

    public StockController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _polygonApiKey = configuration["PolygonApiKey"];
    }

    [HttpGet("tickers")]
    public async Task<IActionResult> GetTickers()
    {
        var httpClient = _httpClientFactory.CreateClient();
        var polygonUrl = $"https://api.polygon.io/v3/reference/tickers?active=true&order=asc&limit=1000&sort=ticker&apiKey={_polygonApiKey}";
        var response = await httpClient.GetAsync(polygonUrl);
        response.EnsureSuccessStatusCode();
        var data = await response.Content.ReadAsStringAsync();

        var tickers = JsonSerializer.Deserialize<Stocks>(data);

        return Ok(tickers);
    }

    [HttpGet("ticker/{ticker}/{timeFrame}")]
    public async Task<IActionResult> GetTickerDetails(string ticker, string timeFrame)
    {
        var httpClient = _httpClientFactory.CreateClient();
        string multiplier;
        string timespan;
        var endDate = DateTime.UtcNow;
        DateTime startDate;
        switch (timeFrame)
        {
            case "1D":
                startDate = endDate.AddDays(-1);
                multiplier = "5";
                timespan = "minute";
                break;
            case "5D":
                startDate = endDate.AddDays(-5);
                multiplier = "30";
                timespan = "minute";
                break;
            case "1M":
                startDate = endDate.AddMonths(-1);
                multiplier = "1";
                timespan = "day";
                break;
            case "6M":
                startDate = endDate.AddMonths(-6);
                multiplier = "1";
                timespan = "day";
                break;
            case "1Y":
                startDate = endDate.AddYears(-1);
                multiplier = "1";
                timespan = "day";
                break;
            case "2Y":
                startDate = endDate.AddYears(-2);
                multiplier = "7";
                timespan = "day";
                break;
            default:
                return BadRequest("Invalid time frame parameter");
        }

        var polygonUrl = $"https://api.polygon.io/v2/aggs/ticker/{ticker}/range/{multiplier}/{timespan}/{startDate:yyyy-MM-dd}/{endDate:yyyy-MM-dd}?sort=asc&limit=50000&apiKey={_polygonApiKey}";
        var response = await httpClient.GetAsync(polygonUrl);
        response.EnsureSuccessStatusCode();
        var data = await response.Content.ReadAsStringAsync();

        var tickerDetails = JsonSerializer.Deserialize<StockAggregate>(data);

        return Ok(tickerDetails);
    }
}
