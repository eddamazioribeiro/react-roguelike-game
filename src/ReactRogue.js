import React, {useRef, useEffect, useState} from 'react';
import InputManager from './InputManager';
import Player from './Player';
import World from './World';

const ReactRogue = ({width, height, tilesize}) => {
  const canvasRef = useRef();
  const [player, setPlayer] = useState(new Player(1, 2, tilesize));
  const [world, setWorld] = useState(new World(width, height, tilesize));
  let inputManager = new InputManager();

  useEffect(() => {
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);
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
    player.draw(ctx);
  });

  const handleInput = (action, data) => {
    console.log(`handle input: ${action}:${JSON.stringify(data)}`);
    
    let newPlayer = new Player();
    Object.assign(newPlayer, player);

    newPlayer.move(data.x, data.y);
    setPlayer(newPlayer);
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
