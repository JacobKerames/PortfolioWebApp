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

    [HttpGet("ticker/{ticker}")]
    public async Task<IActionResult> GetTickerDetails(string ticker)
    {
        var httpClient = _httpClientFactory.CreateClient();
        var endDate = DateTime.UtcNow;
        var startDate = endDate.AddMonths(-1);

        var polygonUrl = $"https://api.polygon.io/v2/aggs/ticker/{ticker}/range/1/day/{startDate:yyyy-MM-dd}/{endDate:yyyy-MM-dd}?adjusted=true&sort=asc&limit=50000&apiKey={_polygonApiKey}";
        var response = await httpClient.GetAsync(polygonUrl);
        response.EnsureSuccessStatusCode();
        var data = await response.Content.ReadAsStringAsync();

        var tickerDetails = JsonSerializer.Deserialize<StockAggregate>(data);

        return Ok(tickerDetails);
    }
}
