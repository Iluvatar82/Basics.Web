using Basics.Geometry;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using Basics.Extensions;
using Basics.Web.Animation;

namespace Basics.Web.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AnimatableController : ControllerBase
    {

        private readonly ILogger<RaysController> logger;

        public AnimatableController(ILogger<RaysController> logger)
        {
            this.logger = logger;
        }

        [HttpGet]
        public IEnumerable<Animatable> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 50).Select(_ =>
            {
                var vector = new Vector2D(rng.NextDouble().Map(0, 1, -1, 1), rng.NextDouble().Map(0, 1, -1, 1));
                vector.Normalize();
                return new Animatable(new Ray2D(new Point2D(rng.NextDouble().Map(0, 1, 0, 720), rng.NextDouble().Map(0, 1, 0, 720)), vector));
            }).ToList();
        }
    }
}