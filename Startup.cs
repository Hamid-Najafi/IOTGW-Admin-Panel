using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using IOTGW_Admin_Panel.Services;
using IOTGW_Admin_Panel.Models;
using IOTGW_Admin_Panel.Helpers;
using AutoMapper;

namespace IOTGW_Admin_Panel
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddAutoMapper(typeof(Startup));

            services.AddDbContext<DataBaseContext>(options =>
            //options.UseSqlite(Configuration.GetConnectionString("SqliteContext")));
            //options.UseInMemoryDatabase("ApplicationDbContext"));
            //options.UseMySql(Configuration.GetConnectionString("MySqlConnection")));
            options.UseSqlServer(Configuration.GetConnectionString("SQLServerConnection")));


            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v0.1",
                    Title = "IOT Gateway API",
                    Description = "IOT Gateway API for node and gateway and nodes managment",
                    //TermsOfService = new Uri("https://example.com/terms"),
                    Contact = new OpenApiContact
                    {
                        Name = "Hamid Najafi",
                        Email = "Hamid.Najafi@email.com",
                        //Url = new Uri("https://twitter.com/spboyer"),
                    },
                    License = new OpenApiLicense
                    {
                        Name = "Use under LICX",
                        //Url = new Uri("https://example.com/license"),
                    }
                });
            });

            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            var nodeConfigSection = Configuration.GetSection("NodesConfig");

            services.Configure<AppSettings>(appSettingsSection);
            services.Configure<NodeConfig>(nodeConfigSection);

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            // configure DI for application services
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IGatewayService, GatewayService>();
            services.AddScoped<INodeService, NodeService>();
            services.AddScoped<IMessageService, MessageService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // global cors policy
            app.UseCors(x =>
            {
                x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
            }
            );
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "IOT Gateway API V0.1");
            });

            app.UseAuthentication();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
