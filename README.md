# Swarm
![](https://img.shields.io/badge/stage-development-blue)

Swarm is a JavaScript based implementation of the autonomous characters described in [Steering Behaviors For Autonomous Characters](https://www.red3d.com/cwr/steer/gdc99/) by Craig W. Reynolds.

> For a better experience use a mouse.

## Running
The see this project in action just visit the [Github Page](https://billocap.github.io/swarm/) of it.

But if you want to clone this repository and run it locally you will need a server, I recommend using the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for [Visual Studio Code](https://code.visualstudio.com/) since that's the tool I'm using for the development of this project.

## Actions
- Move the mouse around to see the boids following it.
- Left click to make the mouse repel them.

## Parameters
The parameters define the properties the boids will have once they are created, to see this changes in action just click the **reset** button.
- **Amount**: Defines how many boids are drawn.
- **Mass**: The more massive the boid the bigger and less speed it has.
- **Force**: How much the mouse can attract or repel a boid.
- **Speed**: How fast can the boids move around, this parameter is affected by mass.

## Arrive Behavior
The checkbox **Slow Arrive** will toggle the _Arrive Behavior_ which makes the boids start to slow down as they approach their target.