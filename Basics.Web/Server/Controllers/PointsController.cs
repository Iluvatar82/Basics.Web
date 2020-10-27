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
    public class PointsController : ControllerBase
    {

        private readonly ILogger<PointsController> logger;

        public PointsController(ILogger<PointsController> logger)
        {
            this.logger = logger;
        }

        [HttpGet]
        public IEnumerable<Point2D> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 10).Select(index => new Point2D(rng.NextDouble(), rng.NextDouble())).ToList();
        }
    }
}