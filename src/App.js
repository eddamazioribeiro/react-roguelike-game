import ReactRogue from './ReactRogue';

const App =  () => {
  return (
    <div className="App">
      <h2>Welcome to React Roguelike Game</h2>
      <hr></hr>
      <div>
        <ReactRogue
          width={40}
          height={40}
          tilesize={16}/>
      </div>
    </div>
  );
}

export default App;
