using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api_Alumnos.Models
{
    public class Materia
    {
        [Key]
        public int Id_Materia{ get; set; }
        public string MateriaDescripcion{ get; set; }
    }
}
