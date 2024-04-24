using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace Api.TimerTrigger.Function
{
    public class KeepApiAliveFunc
    {
        private readonly ILogger _logger;
        private readonly HttpClient _httpClient;

        public KeepApiAliveFunc(ILoggerFactory loggerFactory, IHttpClientFactory httpClientFactory)
        {
            _logger = loggerFactory.CreateLogger<KeepApiAliveFunc>();
            _httpClient = httpClientFactory.CreateClient();
        }

        [Function("KeepApiAliveFunc")]
        public async Task Run([TimerTrigger("0 */19 * * * *")] TimerInfo myTimer)
        {
            _logger.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");

            if (myTimer.ScheduleStatus is not null)
            {
                _logger.LogInformation($"Next timer schedule at: {myTimer.ScheduleStatus.Next}");
            }

            string apiUrl = "https://portfoliowebapp-backend.azurewebsites.net/Pdf/get-pdf";
            try
            {
                HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);
                if (response.IsSuccessStatusCode)
                {
                    _logger.LogInformation($"API call successful. Status code: {response.StatusCode}");
                }
                else
                {
                    _logger.LogError($"API call failed. Status code: {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception while calling API: {ex.Message}");
            }
        }
    }
}
