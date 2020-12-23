import React, {useRef, useEffect, useState} from 'react';
import InputManager from './InputManager';
import World from './World';
import Spawner from './Spawner';

const ReactRogue = ({width, height, tilesize}) => {
  const canvasRef = useRef();
  let inputManager = new InputManager();
  const [world, setWorld] = useState(new World(width, height, tilesize));

  useEffect(() => {
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);

    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe(handleInput);
    }
  });

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, width * tilesize, height * tilesize);
    world.draw(ctx);
  });

  useEffect(() => {
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.moveToSpace(world.player);
    let spawner = new Spawner(newWorld);
    spawner.spawnLoot(13);
    setWorld(newWorld);
  }, []);

  const handleInput = (action, data) => {
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.movePlayer(data.x, data.y);
    setWorld(newWorld);
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width  * tilesize}
        height={height * tilesize}
        style={{border: '1px solid black', background: 'DimGrey'}}>
      </canvas>
      <ul>
        {world.player.inventory.map((item, index) => (
          <li key={index}>{item.attributes.name}</li>
        ))}
      </ul>
    </>
  );
}

export default ReactRogue;
