using Basics.Geometry;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using Basics.Extensions;

namespace Basics.Web.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RaysController : ControllerBase
    {

        private readonly ILogger<RaysController> logger;

        public RaysController(ILogger<RaysController> logger)
        {
            this.logger = logger;
        }

        [HttpGet]
        public IEnumerable<Ray2D> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(_ =>
            {
                var vector = new Vector2D(rng.NextDouble().Map(0, 1, -1, 1), rng.NextDouble().Map(0, 1, -1, 1));
                vector.Normalize();
                return new Ray2D(new Point2D(rng.NextDouble(), rng.NextDouble()), vector);
            }).ToList();
        }

        [HttpPost("intersections")]
        public IEnumerable<Point2D> Intersections(List<Ray2D> rays)
        {
            var results = new List<Point2D>();
            for(var i = 0; i < rays.Count - 1; i++)
            {
                for (var j = i + 1; j < rays.Count; j++)
                    results.Add(Ray2D.Intersection(rays[i], rays[j]));
            }

            return results;
        }
    }
}