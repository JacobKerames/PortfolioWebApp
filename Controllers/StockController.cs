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
    private readonly ILogger<StockController> _logger;

    public StockController(IHttpClientFactory httpClientFactory, IConfiguration configuration, ILogger<StockController> logger)
    {
        _httpClientFactory = httpClientFactory;
        _polygonApiKey = configuration["PolygonApiKey"];
        _logger = logger;
    }

    [HttpGet("ticker-search/{query}")]
    public async Task<IActionResult> GetTickers(string query)
    {
        var httpClient = _httpClientFactory.CreateClient();
        var searchUrl = $"https://ticker-2e1ica8b9.now.sh/keyword/{query}";
        var response = await httpClient.GetAsync(searchUrl);

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError($"External API call failed: {response.ReasonPhrase}");
            return StatusCode((int)response.StatusCode, "Error fetching tickers from external service.");
        }

        var data = await response.Content.ReadAsStringAsync();

        try
        {
            // Deserialize directly into a list of Stock objects
            var tickers = JsonSerializer.Deserialize<List<Stock>>(data);
            return Ok(tickers);
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "JSON deserialization error");
            return StatusCode(500, "An error occurred while processing the JSON data.");
        }
    }

    [HttpGet("ticker-performance/{ticker}/{timeFrame}")]
    public async Task<IActionResult> GetTickerDetails(string ticker, string timeFrame)
    {
        var httpClient = _httpClientFactory.CreateClient();
        string multiplier;
        string timespan;

        var estNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
        var endDate = new DateTime(estNow.Year, estNow.Month, estNow.Day, 20, 0, 0);

        endDate = endDate.DayOfWeek switch
        {
            DayOfWeek.Sunday => endDate.AddDays(-2),
            DayOfWeek.Monday => endDate.AddDays(-3),
            _ => endDate.AddDays(-1)
        };

        long startDateMilliseconds;

        switch (timeFrame)
        {
            case "1D":
                startDateMilliseconds = new DateTimeOffset(endDate.AddHours(-12).AddMinutes(-30)).ToUnixTimeMilliseconds();
                multiplier = "5";
                timespan = "minute";
                break;
            case "5D":
                startDateMilliseconds = new DateTimeOffset(endDate.AddDays(-5).AddHours(-12).AddMinutes(-30)).ToUnixTimeMilliseconds();
                multiplier = "30";
                timespan = "minute";
                break;
            case "1M":
                startDateMilliseconds = new DateTimeOffset(endDate.AddMonths(-1).AddHours(-12).AddMinutes(-30)).ToUnixTimeMilliseconds();
                multiplier = "1";
                timespan = "day";
                break;
            case "6M":
                startDateMilliseconds = new DateTimeOffset(endDate.AddMonths(-6).AddHours(-12).AddMinutes(-30)).ToUnixTimeMilliseconds();
                multiplier = "1";
                timespan = "day";
                break;
            case "1Y":
                startDateMilliseconds = new DateTimeOffset(endDate.AddYears(-1).AddHours(-12).AddMinutes(-30)).ToUnixTimeMilliseconds();
                multiplier = "1";
                timespan = "day";
                break;
            case "2Y":
                startDateMilliseconds = new DateTimeOffset(endDate.AddYears(-2).AddHours(-12).AddMinutes(-30)).ToUnixTimeMilliseconds();
                multiplier = "2";
                timespan = "day";
                break;
            default:
                startDateMilliseconds = new DateTimeOffset(endDate.AddDays(-1).AddHours(-12).AddMinutes(-30)).ToUnixTimeMilliseconds();
                multiplier = "1";
                timespan = "minute";
                break;
        }

        long endDateMilliseconds = new DateTimeOffset(endDate).ToUnixTimeMilliseconds();

        var polygonUrl = $"https://api.polygon.io/v2/aggs/ticker/{ticker}/range/{multiplier}/{timespan}/{startDateMilliseconds}/{endDateMilliseconds}?adjusted=false&sort=asc&limit=50000&apiKey={_polygonApiKey}";
        var response = await httpClient.GetAsync(polygonUrl);
        response.EnsureSuccessStatusCode();
        var data = await response.Content.ReadAsStringAsync();

        var tickerDetails = JsonSerializer.Deserialize<StockAggregate>(data);

        return Ok(tickerDetails);
    }
}
