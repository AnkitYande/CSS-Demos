// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Common = Matter.Common,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Svg = Matter.Svg,
  Vertices = Matter.Vertices;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false,
    background: "#1b3d38"
  }
});

var left = Bodies.rectangle(0, 0, 20, window.innerHeight * 10, {
  isStatic: true
});
var right = Bodies.rectangle(window.innerWidth, 0, 20, window.innerHeight * 10, {
  isStatic: true
});

var ground = Bodies.rectangle(
  0,
  window.innerHeight -5,
  window.innerWidth * 2,
  10,
  { isStatic: true }
);

// add all of the bodies to the world
Composite.add(engine.world, [left, right, ground]);

function getX() {
  return Math.random() * (window.innerWidth - 100) + 100;
}
function getY() {
  return 0 - Math.random() * window.innerHeight * 8;
}


function createBody(id, x, y) {
  item = document.getElementById(id);
  body = Matter.Bodies.fromVertices(
    x,
    y,
    Matter.Svg.pathToVertices(item),
    {
      friction: 0.1,
      render: {
        fillStyle: item.getAttribute("fill"),
        strokeStyle: item.getAttribute("fill"),
        lineWidth: 1,
        sprite: {
          xScale: 5,
          yScale: 5
        }
      }
    },
    true
  );
  return body;
}

function createSimpleBody(id) {
  body = createBody(id, getX(), getY())
  Matter.Body.scale(body, 2, 2);
  return body;
}

function createComplexBody(items) {
  res = [];
  x = getX()
  y = getY()
  for (const item of items) {
    body = createBody(item[0], x, y+item[1])
    res.push(body)
  }
  body = Matter.Body.create({ parts: res });
  Matter.Body.scale(body, 2, 2);
  return body;
}

snapPea = createSimpleBody("snap-pea");
potato = createSimpleBody("potato");
carrot = createSimpleBody("carrot");
onion = createSimpleBody("onion");
pepper = createSimpleBody("pepper");

broccoli = createComplexBody([["broccoli1", 0], ["broccoli2", 65]]);
tomato = createComplexBody([["tomato1", 0], ["tomato2", 13]]);
corn = createComplexBody([["corn1", 0], ["corn2", 28]]);
mushroom = createComplexBody([["mushroom1", 0], ["mushroom3", 65],  ["mushroom2", 15]]);

pea = Matter.Bodies.circle(getX(), getY(), 50, {
  render: {
    fillStyle: "#75D254"
  }
});

veggies = [
  snapPea,
  potato,
  carrot,
  onion,
  pepper,
  pea,
  broccoli,
  mushroom,
  tomato,
  corn
];
Matter.Composite.add(engine.world, veggies);

var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });

World.add(engine.world, mouseConstraint);

render.mouse = mouse;

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);
