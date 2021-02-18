class InputManager {
  observer = [];

  subscribe(fn) {
    this.observer.push(fn);
  }

  unsubscribe(fn) {
    this.observer = this.observer.filter(subscriber => subscriber !== fn);
  }

  broadcast(action, data) {
    this.observer.forEach(subscriber => {
      console.log('subscriber', subscriber);
      console.log('action', action);
      console.log('data', data);
      subscriber(action, data)
    });
  }

  handleKeys = e => {
    e.preventDefault();

    switch (e.keyCode) {
      case 37: // left arrow
        this.broadcast('move', {x: -1, y: 0});
        break;
      case 38: // up arrow
        this.broadcast('move', {x: 0, y: -1});
        break;
      case 39: // right arrow
        this.broadcast('move', {x: 1, y: 0});
        break;
      case 40: // down arrow
        this.broadcast('move', {x: 0, y: 1});
        break;
      default:
        break;              
    }
  }

  bindKeys() {
    document.addEventListener('keydown', this.handleKeys);
  }

  unbindKeys() {
    document.removeEventListener('keydown', this.handleKeys);
  }
}

export default InputManager;