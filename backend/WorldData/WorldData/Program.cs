using Microsoft.EntityFrameworkCore;
using WorldData.Data;
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000");
                      });
});

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<APIContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors(MyAllowSpecificOrigins); // This should allow me to use CORS


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
