# zustand

1. 왜 ? 
 - Redux 불편, 많은 코드를 작성
 - ContextApi 의도치 않은 리렌더링

2. create, devtools, storage
 - create : store 생성
 - devtools : React Devtools 사용
 - storage : Session/Local Storage 저장
```React
const useStore = create(devtools((set)=>({
  count : 0,
    counter : 0 ,
  setCount(){
      set((state) => ({count : state.count + 1}))
  },
  setCounter(){
      set((state) => ({counter : state.counter + 1}))
  },
}),
{
    name: "food-storage",
    getStorage: () => sessionStorage,
}))

```

3. setState, getState
 - React 외부에서 State 관리 가능
 - Axios Interceptor, AgGrid Config에서 호출할 때 State 사용 못했던 곳 사용
```
  useStore.setState({counter : counter + 1} );
  
  useStore2.getState().someState
```
