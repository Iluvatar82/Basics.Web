using Basics.Geometry;
using System.Threading.Tasks;

namespace Basics.Web.Animation
{
    public class Animatable
    {
        private Ray2D _baseInformation;

        public Point2D Position { get => _baseInformation.Origin; set => _baseInformation.Origin = value; }
        public Vector2D Force { get => _baseInformation.Direction; set => _baseInformation.Direction = value; }
        public Ray2D ForceToDraw
        {
            get
            {
                var toDraw = (Ray2D)_baseInformation.Clone();
                toDraw.Direction.X *= 25;
                toDraw.Direction.Y *= 25;
                return toDraw;
            }
        }

        public Animatable() => _baseInformation = new Ray2D();

        public Animatable(Ray2D baseInformation)
        {
            _baseInformation = baseInformation;
        }

        public void Step()
        {
            var max = 720;
            Position += Force;

            if (Position.X < 0 || Position.X > max)
                Force.X *= -1;

            if (Position.Y < 0 || Position.Y > max)
                Force.Y *= -1;
        }
    }
}