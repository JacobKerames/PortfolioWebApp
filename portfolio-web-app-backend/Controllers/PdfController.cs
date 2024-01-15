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
		var filePath = "wwwroot/files/Jacob Kerames - Resume.pdf";
		var memory = new MemoryStream();
		using (var stream = new FileStream(filePath, FileMode.Open))
		{
			stream.CopyTo(memory);
		}
		memory.Position = 0;

		var fileName = "Jacob Kerames - Resume.pdf";
		return File(memory, "application/pdf", fileName);
	}
}
