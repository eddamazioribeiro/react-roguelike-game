import React, {useRef, useEffect, useState} from 'react';
import InputManager from './InputManager';
import World from './World';
import Spawner from './Spawner';
//
import Inventory from './Inventory';
import Journal from './Journal';

const ReactRogue = ({width, height, tilesize}) => {
  const canvasRef = useRef();
  let inputManager = new InputManager();
  const [world, setWorld] = useState(new World(width, height, tilesize));
  const [gameOver, setGameOver] = useState(false);

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
    showGameOver();
  }, [gameOver]);

  useEffect(() => {
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.moveToSpace(world.player);
    let spawner = new Spawner(newWorld);
    spawner.spawnLoot(15);
    spawner.spawnMonsters(13);
    spawner.spawnStairs();
    setWorld(newWorld);
  }, []);

  const handleInput = (action, data) => {
    if (!gameOver) {
      let newWorld = new World();
      Object.assign(newWorld, world);
      newWorld.movePlayer(data.x, data.y);
      newWorld.moveMonsters();
      setWorld(newWorld);

      if (newWorld.gameOver) setGameOver(true);
    }
  }

  const showGameOver = () => {
    if (gameOver) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.fillStyle = "red";
      ctx.font = "bold 56px Arial";
      ctx.textBaseline = 'middle';
      ctx.textAlign = "center";
      ctx.fillText("YOU DIED", ((width * tilesize) / 2), ((height * tilesize) / 2));
    }
  }

  return (
    <>
      <Inventory items={world.player.inventory}/>
      <canvas
        ref={canvasRef}
        width={width  * tilesize}
        height={height * tilesize}
        style={{border: '1px solid black', background: 'DimGrey'}}>
      </canvas>
      <Journal history={world.history}/>
    </>
  );
}

export default ReactRogue;
