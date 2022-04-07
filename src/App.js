import create from 'zustand'
import {devtools, persist} from "zustand/middleware";
import {useMemo} from "react";
import SubScribeComp from "./SubScribeComp";

const useStore = create(persist((set)=>({
  count : 0,
    counter : 0 ,
  callCard(){
      set((state) => ({count : state.count + 1}))
  },
  callPerson(){
      set((state) => ({counter : state.counter + 1}))
  },
}),
    {
        name: "food-storage",
        getStorage: () => sessionStorage,
    }))
function outState(counter){
    useStore.setState({counter : counter + 1} );
}

function App() {
  return (
    <div className="App">
        <Person></Person>
      <Card></Card>
        <SubScribeComp></SubScribeComp>
    </div>
  );
}

function Card() {
    const {counter, callPerson} = useStore();
    console.log('Card')
  return useMemo (() => (
      <div className="App">
          <button onClick={() => outState(counter)}>외부 호출</button>
          <button onClick={() => {callPerson();}}>버튼</button>
        <p>카드 : {counter}</p>
      </div>
  ), [counter]);
}

function Person() {
    console.log('Person')

    const {count, callCard} = useStore();
    return useMemo ( () => (
        <div className="App">
            <button onClick={() => {callCard();}}>버튼</button>
            <p>사람 : {count}</p>
        </div>
    ), [count]);
}


export default App;
