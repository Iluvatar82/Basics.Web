using Basics.Geometry;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Basics.Web.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VectorsController : ControllerBase
    {

        private readonly ILogger<VectorsController> logger;

        public VectorsController(ILogger<VectorsController> logger)
        {
            this.logger = logger;
        }

        [HttpGet]
        public IEnumerable<Vector2D> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 10).Select(_ => new Vector2D(rng.NextDouble(), rng.NextDouble())).ToList();
        }
    }
}