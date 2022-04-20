# About
Outracer is a simple arcade driving game that runs in the browser. It's written in TypeScript and uses ThreeJS for rendering. I made it mainly to play around with the [Entity Component System (ECS)](https://en.wikipedia.org/wiki/Entity_component_system) architecture. It can be found [here](https://outracerjs.herokuapp.com).

# Architecture Overview

## Entity 
Entities are basically game objects. They contain a numerical id field and a collection of Components. They extend the base Entity class, which provides logic for generating the id and getting all Components. New behaviors can be added to an entity by just adding a new component field, and this flexibility is the main advantage of ECS.

## Component
Components are "behaviors" that you attach to entities (Collision, Rendering, etc.). They have an id field that they share with whatever Entity they're tied to, which allows us to lookup related components by id. Similarly they also have a static componentType property that's needed for looking up components by types. Past that each Component subclass can vary quite a bit depending on what behavior they're implementing, but are essentially just data for that behavior with little logic of their own.

## System
If Entities and Components are primarily data storage, Systems are mainly data processing. Components are registered with Systems that request them (using the componentType field). Once registered, Systems process the new state of their Components each time the System's update method is called. The final piece of the Systems interface is the updatePriority, which allows a System to specify when it would like to be updated.

## Scene
The Scene class is essentially the glue between Entity/Component/System. Every Entity and System must be added to the Scene in order to be used in game. This is also where the main game loop lives, the Scene.update() method calls each System update call in priority order.

## ComponentManager
The ComponentManager is how the Scene passes Components to Systems. Everytime an Entity is added to the System, it's Components are taken and stored in the ComponentManager based on their componentType. When a System is added, it gets ComponentManager passed to it during the registerComponents method. This is it's chance to request whatever Components it needs to update.

