import Entity from "./Entity";

class Player extends Entity{
  inventory = [];

  attributes = {
    name: 'Player',
    ascii: '@',
    health: 10,
    color: 'red'
  }
  
  move(dx, dy) {
    if (this.attributes.health <= 0) return;
    this.x += dx;
    this.y += dy;
  }

  add(item) {
    this.inventory.push(item);
  }
}

export default Player;