import create from 'zustand'
import {devtools, persist} from "zustand/middleware";
import {useMemo} from "react";

const useStore = create(persist((set)=>({
  count : 0,
    counter : 0 ,
  callCard(){
      set((state) => ({count : state.count + 1}))
  },
  callPerson(){
      set((state) => ({counter : state.counter + 1}))
  },
})))
function App() {
    const {callCard, callPerson} = useStore();
  return (
    <div className="App">
        <button onClick={() => {callCard();}}>버튼</button>
        <button onClick={() => {callPerson();}}>버튼</button>
        <Person></Person>
      <Card></Card>
    </div>
  );
}

function Card() {
    const {counter} = useStore();
    console.log('Card')
  return useMemo (() => (
      <div className="App">
        <p>카드 : {counter}</p>
      </div>
  ), [counter]);
}

function Person() {
    console.log('Person')
    const {count} = useStore();
    return useMemo ( () => (
        <div className="App">
            <p>사람 : {count}</p>
        </div>
    ), [count]);
}


export default App;
