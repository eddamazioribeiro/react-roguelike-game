import Entity from "./Entity";

class Player extends Entity{
  attributes = {
    name: 'Player',
    ascii: '@',
    health: 10,
    color: 'red'
  }
  
  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}

export default Player;