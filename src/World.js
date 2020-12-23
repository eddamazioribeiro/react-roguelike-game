
import {Map} from 'rot-js';
import Player from './Player';

class World {
  constructor(width, height, tilesize) {
    this.width = width;
    this.height = height;
    this.tilesize = tilesize;
    this.worldmap = new Array(this.width);
    this.entities = [new Player(0, 0, 16)];
    this.history = ['You entered the Dungeon...', '==='];

    for (let x = 0; x < this.width; x++) {
      this.worldmap[x] = new Array(this.height);
    }
  }

  get player() {
    return this.entities[0];
  }

  add(entity) {
    this.entities.push(entity);
  }

  remove(entity) {
    this.entities = this.entities.filter(e => e !== entity);
  }

  getEntityAtLocation(x, y) {
    return this.entities.find(e => e.x === x && e.y === y);
  }

  movePlayer(dx, dy) {
    this.moveEntity(this.player, dx, dy)
  }

  moveMonsters() {
    this.entities.forEach(e => {
      if (this.isMovable(e) && this.isNPC(e)) {
        // 0: none, x: 1, y: 2, 3: both
        let axis = Math.round(Math.random() * 3);
        let x = (axis === 3 || axis === 1) ? (Math.round(Math.random()) * 2 - 1) : 0;
        let y = (axis === 3 || axis === 2) ? (Math.round(Math.random()) * 2 - 1) : 0;

        this.moveEntity(e, x, y)
      }
    });
  }

  moveEntity(entity, dx, dy) {
    let xAux = entity.x + dx;
    let yAux = entity.y + dy;
    let entityAt = this.getEntityAtLocation(xAux, yAux);

    if (entityAt && entity.attributes.class === 'player') {
      entityAt.action('bump', this);
      return;
    }

    if (!this.isWall(xAux, yAux)) {
      entity.move(dx, dy);
    }
  }

  isWall(dx, dy) {
    return (
      this.worldmap[dx] === undefined || 
      this.worldmap[dy] === undefined || 
      this.worldmap[dx][dy] === 1);
  }

  isMovable(entity) {
    return entity.attributes.movable !== undefined
      && entity.attributes.movable;
  }

  isNPC(entity) {
    return entity.attributes.class !== undefined
      && entity.attributes.class === 'npc';
  }

  moveToSpace(entity) {
    for (let x = entity.x; x < this.width; x++) {
      for (let y = entity.y; y < this.height; y++) {
        if (this.worldmap[x][y] === 0
          && !this.getEntityAtLocation(x, y)) {
          entity.x = x;
          entity.y = y;

          return;
        }
      }
    }
  }

  createCellularMap() {
    var map = new Map.Cellular(this.width, this.height, {connected: true});
    map.randomize(0.5);

    var userCallback = (x, y, value) => {
      if (x === 0 || y === 0 || x === this.width -1 || y === this.height -1) {
        this.worldmap[x][y] = 1; // create wall around edges of map
        return;
      }

      this.worldmap[x][y] = (value === 0) ? 1 : 0;
    }

    map.create(userCallback);
    map.connect(userCallback, 1);
  }

  draw(context) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.worldmap[x][y] === 1) {
          this.drawWall(context, x, y);
        }
      }
    }
    
    this.entities.forEach(e => {
      e.draw(context);
    });
  }

  drawWall(context, x, y) {
    context.fillStyle = '#000';
    context.fillRect(
      x * this.tilesize,
      y * this.tilesize,
      this.tilesize,
      this.tilesize
    );
  }

  addToHistory(history) {
    this.history.push(history);

    if (this.history.length > 6) this.history.shift();
  }
}

export default World;