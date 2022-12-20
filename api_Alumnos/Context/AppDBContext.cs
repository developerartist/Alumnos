using api_Alumnos.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api_Alumnos.Context
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { 
        
        }

        public DbSet<Alumno> Alumnos { get; set; }
        public DbSet<Materia> Materias{ get; set; }


    }
}
