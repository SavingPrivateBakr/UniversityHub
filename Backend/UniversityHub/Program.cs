using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using UniversityHub.Models;
using UniversityHub.Data;
using Microsoft.EntityFrameworkCore;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using UniversityHub.Service;
using MediatR;
using UniversityHub.JWT_optimizer;
using Microsoft.Extensions.DependencyInjection;
using Serilog; // Add MediatR for CQRS

namespace UniversityHub
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(builder.Configuration).CreateLogger();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder.AllowAnyOrigin() // Allows any origin
                               .AllowAnyMethod() // Allows any HTTP method
                               .AllowAnyHeader(); // Allows any header
                    });
            });
            // Configure JWT settings
            builder.Services.Configure<JWT>(builder.Configuration.GetSection("JWT"));

            // Add Identity services
            builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<DatabaseContext>().AddDefaultTokenProviders();

            builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));


            // Register custom services
            builder.Services.AddScoped<IAuth, Auth>();
            builder.Services.AddScoped<IPostinngUniversity, PostingUniversity>();

            // Configure database context
            builder.Services.AddDbContext<DatabaseContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
            );

            // Configure authentication
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(o =>
            {
                o.RequireHttpsMetadata = false;
                o.SaveToken = false;
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidIssuer = builder.Configuration["JWT:Issuer"],
                    ValidAudience = builder.Configuration["JWT:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
                };
            });


            builder.Services.AddAuthorization(options =>
            {
                // Define a policy named 'user' if that's what you intend to use
                options.AddPolicy("user", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    // You can add additional requirements here if needed
                });
                options.AddPolicy("admin", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    // You can add additional requirements here if needed
                });
            });


            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Host.UseSerilog();
            var app = builder.Build();
           
            // Configure the HTTP request pipeline
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
          
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();

            app.UseCors("AllowAllOrigins");
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
