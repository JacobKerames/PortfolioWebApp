using Microsoft.AspNetCore.Mvc;

namespace portfolio_web_app_backend.Controllers;

[ApiController]
[Route("[controller]")]
public class PdfController : ControllerBase
{
    [HttpGet]
    [Route("get-pdf")]
    public async Task<IActionResult> GetPdfAsync()
    {
        var filePath = "wwwroot/files/Jacob Kerames - Resume.pdf";

        var memory = new MemoryStream();
        using (var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
        {
            await stream.CopyToAsync(memory);
        }
        memory.Position = 0;

        var fileName = "Jacob Kerames - Resume.pdf";
        Response.Headers.ContentDisposition = $"inline; filename=\"{fileName}\"";
        return File(memory, "application/pdf");
    }
}
