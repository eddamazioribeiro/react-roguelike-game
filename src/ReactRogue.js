import React, {useRef, useEffect, useState} from 'react';
import InputManager from './InputManager';
import Player from './Player';
import World from './World';

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
    setWorld(newWorld);
  }, []);

  const handleInput = (action, data) => {
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.movePlayer(data.x, data.y);
    setWorld(newWorld);
  }

  return (
    <canvas
      ref={canvasRef}
      width={width  * tilesize}
      height={height * tilesize}
      style={{border: '1px solid black'}}>
    </canvas>
  );
}

export default ReactRogue;
