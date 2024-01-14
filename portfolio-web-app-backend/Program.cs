using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000", // Development origin
                "https://jacobkerames.com" // Production origin
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<StockSimContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("StockSimConnection")));

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();
app.Run();
