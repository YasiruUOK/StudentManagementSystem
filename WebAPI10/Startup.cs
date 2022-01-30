using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI10.Data;
using WebAPI10.Repository;

namespace WebAPI10
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
            services.AddControllers();
            services.AddScoped<IStudentRepository, StudentRepository>();
            services.AddScoped< IClassRoomRepository, ClassroomRepository>();
            services.AddScoped<ITeacherRepository, TeacherRepository>();
            services.AddScoped<ISubjectRepository, SubjectRepository>();
            services.AddScoped<IAllocateSubjectRepository, AllocateSubjectRepository>();
            services.AddScoped<IAllocateClassroomRepository, AllocateClassroomRepository>();
            services.AddScoped<ISubjectsAndTeachersDetailsOfClassRepository, SubjectsAndTeachersDetailsOfClassRepository>();
            services.AddDbContext<SchoolDBContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DevConnection")));
            services.AddCors(options => options.AddDefaultPolicy(
                builder=>builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()
                ));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            

        }
    }
}
