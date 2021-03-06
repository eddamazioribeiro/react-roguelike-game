class Entity {
  constructor(x, y, size, attributes) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.attributes = {...attributes};
  }

  action(verb, world) {
    console.log(`Verb: ${verb}`);
  }

  draw(context) {
    context.fillStyle = this.attributes.color || 'white';
    context.textBaseline = 'hanging';
    context.font = 'bold 16px Helvetica';
    context.fillText(
      this.attributes.ascii,
      this.x * this.size +
        (this.attributes.offset ? this.attributes.offset.x : 0),
      this.y * this.size +
        (this.attributes.offset ? this.attributes.offset.y : 0)
    );
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}

export default Entity;