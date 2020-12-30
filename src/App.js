import ReactRogue from './ReactRogue';
import Hud from './Hud';
import Footer from './Footer';

const App = () => {
  return (
    <div className="App">
      <Hud />
      <div>
        <ReactRogue
          width={40}
          height={40}
          tilesize={16}/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
