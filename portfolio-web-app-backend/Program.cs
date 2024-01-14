using Microsoft.EntityFrameworkCore;

var options = new WebApplicationOptions
{
    Args = args,
    WebRootPath = "public"
};

var builder = WebApplication.CreateBuilder(options);

builder.Services.AddDbContext<StockSimContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("StockSimConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        corsBuilder => corsBuilder.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddHttpClient();

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowSpecificOrigin");

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();