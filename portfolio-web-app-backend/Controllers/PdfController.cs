using Microsoft.AspNetCore.Mvc;

namespace portfolio_web_app_backend.Controllers;

[ApiController]
[Route("[controller]")]
public class PdfController : ControllerBase
{
    [HttpGet]
    [Route("get-pdf")]
    public IActionResult GetPdf()
    {
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "public", "Jacob Kerames - Resume.pdf");

				if (!System.IO.File.Exists(filePath))
        {
            return NotFound("File not found.");
        }
				
        var fileBytes = System.IO.File.ReadAllBytes(filePath);
        Response.Headers.Add("Content-Disposition", "inline; filename=Jacob Kerames - Resume.pdf");
        return File(fileBytes, "application/pdf");
    }
}
