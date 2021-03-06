import Entity from './Entity';

class Monster extends Entity {
  action(verb, world) {
    if (verb === 'bump') {
      // attack
      if (world.player.attributes.health <= 0) return;
      
      world.addToHistory(`Player attacks ${this.attributes.name}`);
      this.attributes.health = this.attributes.health - 1;

      if (this.attributes.health <= 0) {
        world.addToHistory(`${this.attributes.name} dies!`);
        world.remove(this);
      } else {
        world.addToHistory(
          `${this.attributes.name}'s health = ${this.attributes.health}`);
        world.player.attributes.health = world.player.attributes.health - 1;

        if (world.player.attributes.health <= 0) {
          world.addToHistory('You have died!');
          world.player.attributes.ascii = '✝';
          world.gameOver = true;
        } else {
          world.addToHistory(
            `You have ${world.player.attributes.health} health`
            )
        }
      }
    } 
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}

export default Monster;