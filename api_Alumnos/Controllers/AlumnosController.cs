using api_Alumnos.Context;
using api_Alumnos.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Cors;

namespace api_Alumnos.Controllers
{
   //[EnableCors(origins: "http://localhost:3000/", headers: "*", methods:"*")]
    [ApiController]
    [Route("api/[controller]")]
    public class AlumnosController:ControllerBase
    {
        private readonly AppDBContext context;

        public AlumnosController(AppDBContext context) {
            
            this.context = context;
        
        }

        //Metodo GET
        [HttpGet]
        public ActionResult Get() {

            try 
            {
                return Ok(context.Alumnos.ToList());
            }
            catch (Exception e) 
            {
                return BadRequest(e.Message);
            }
        }

        //Metodo GET trayendo datos por id
        [HttpGet("{id}", Name = "get_alumno")]
        public ActionResult Get(int id)
        {
            try
            {
                var alumno = context.Alumnos.FirstOrDefault(x => x.Id_Alumno == id);
                return Ok(alumno);
            }
            catch (Exception e) 
            {
                return BadRequest(e.Message);
            }
        }

        //Metodo Post
        [HttpPost]
        public ActionResult Post([FromBody] Alumno alumno)
        {
            try {

                context.Alumnos.Add(alumno);
                context.SaveChanges();
                return CreatedAtRoute("get_alumno", new { id = alumno.Id_Alumno }, alumno);
            }
            catch (Exception e) 
            {
                return BadRequest(e.Message);
            }
        }

        //Metodo PUT
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Alumno alumno)
        {
            try
            {
                if (alumno.Id_Alumno == id)
                {
                    context.Entry(alumno).State = EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("get_alumno", new { id = alumno.Id_Alumno }, alumno);
                }
                else 
                {
                    return BadRequest();
                }
            }
            catch (Exception e) 
            {
                return BadRequest(e.Message);
            }
        }

        //Metodo DELETE
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try 
            {
                var alumno = context.Alumnos.FirstOrDefault(x => x.Id_Alumno == id);
                if (alumno != null)
                {
                    context.Alumnos.Remove(alumno);
                    context.SaveChanges();
                    return Ok(id);
                }
                else 
                {
                    return BadRequest();
                }
            }
            catch (Exception e) 
            {
                return BadRequest(e.Message);
            }
        }
    }
}
