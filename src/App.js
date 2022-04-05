import create from 'zustand'
import {devtools} from "zustand/middleware";

const useStore = create(devtools((set)=>({
  count : 0,
  up(){
      set((state) => ({count : state.count + 1}))
  }
})))
function App() {
  const {count, up} = useStore();
  return (
    <div className="App">
        <button onClick={() => {up();}}>버튼</button>
      <p>사람 : {count}</p>
      <Card></Card>
    </div>
  );
}

function Card() {
    const {count} = useStore();
  return (
      <div className="App">
        <p>카드 : {count}</p>
      </div>
  );
}



export default App;
