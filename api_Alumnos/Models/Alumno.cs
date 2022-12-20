using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api_Alumnos.Models
{
    public class Alumno

    {
        [Key]
        public int Id_Alumno{ get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public int Matricula { get; set; }
        public int Id_Materia { get; set; }

    }
}
