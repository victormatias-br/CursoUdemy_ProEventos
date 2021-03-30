using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.Persistence;
using ProEventos.Domain;
using ProEventos.Persistence.Contextos;
using ProEventos.Application.Contratos;
using Microsoft.AspNetCore.Http;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {

        // public IEnumerable<Evento> _evento = new Evento[]{
        //         new Evento{
        //             EventoId = 1,
        //             Tema = "Angular 11 e .NET 5",
        //             Local = "Belo Horizonte",
        //             Lote = "1o Lote",
        //             QtdPessoas = 250,
        //             DataEvento = DateTime.Now.AddDays(2),
        //             ImagemURL = "foto2.png"
        //         },
        //         new Evento{
        //             EventoId = 2,
        //             Tema = "Angular e suas novidades",
        //             Local = "São Paulo",
        //             Lote = "2o Lote",
        //             QtdPessoas = 350,
        //             DataEvento = DateTime.Now.AddDays(4),
        //             ImagemURL = "foto5.png"
        //         }
        //     };

        private readonly IEventosService _eventosService;

        public EventoController(IEventosService eventosService)
        {
            this._eventosService = eventosService;

        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var eventos = await _eventosService.GetAllEventosAsync(true);
                if (eventos == null) return NotFound("Nenhum evento encontrado");

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos: Erro {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var eventos = await _eventosService.GetEventoByIdAsync(id, true);
                if (eventos == null) return NotFound("Nenhum evento por Id encontrado");

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos por Id: Erro {ex.Message}");
            }
        }

        [HttpGet("tema/{tema}")]
        public async Task<IActionResult> GetByTema(string tema)
        {
            try
            {
                var eventos = await _eventosService.GetAllEventosByTemaAsync(tema, true);
                if (eventos == null) return NotFound("Nenhum evento por tema encontrado");

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos por tema: Erro {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Evento model)
        {
            try
            {
                var eventos = await _eventosService.AddEvento(model);
                if (eventos == null) return BadRequest("Erro ao tentar adicionar Evento");

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar salvar evento: Erro {ex.Message}");
            }
        }

        [HttpPut("{eventoId}")]
        public async Task<IActionResult> Put(int eventoId, Evento model)
        {
            try
            {
                var eventos = await _eventosService.UpdateEvento(eventoId, model);
                if (eventos == null) return BadRequest("Erro ao tentar atualizar Evento.");

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar evento: Erro {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int eventoId)
        {
            try
            {
                if(await _eventosService.DeleteEvento(eventoId))
                    return Ok("Evento deletado"); 
                else
                    return BadRequest("Evento não deletado"); 
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar evento: Erro {ex.Message}");
            }
        }

    }


}
