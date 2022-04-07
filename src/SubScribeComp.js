import React, {useEffect} from "react";

import create from "zustand";

const [useStore, api] = create((set) => ({
	coords: [0, 0],
	set: (fn) => set(fn)
}));

const Coord = () => {
	// Connect to the store on mount, disconnect on unmount, catch state-changes in a callback
	const input = React.useRef(null);
	useEffect(
		() =>
			api.subscribe(
				(coords) => {
					input.current.value = coords[0];
				},
				(store) => store.coords
			),
		[]
	);
	return <input ref={input} />;
};

const useStore2 = create(() => ({ paw: true, snout: true, fur: true }))

// Getting non-reactive fresh state
const paw = useStore2.getState().paw
// Listening to all changes, fires synchronously on every change
const unsub1 = useStore2.subscribe(console.log)
// Updating state, will trigger listeners
// Unsubscribe listeners
// Destroying the store (removing all listeners)


const Coord2 = () => {
	// Connect to the store on mount, disconnect on unmount, catch state-changes in a callback
	const [value, setValue] = React.useState(0);
	useEffect(
		() =>
			api.subscribe(
				(coords) => {
					setValue(coords);
				},
				(store) => store.coords
			),
		[]
	);
	return <input value={value} />;
};

const setSubscribe = () => {
	console.log(paw)
	useStore2.setState({paw : !paw})
	console.log(useStore2.getState().paw);
	unsub1();
}


function SubScribeComp(props) {
	const set = useStore((store) => store.set);
	useEffect(() => {
		const handler = ({ screenX, screenY }) => {
			set((state) => {
				state.coords = [screenX, screenY];
			});
		};
		window.addEventListener("mousemove", handler);
		return () => window.removeEventListener("mousemove", handler);
	}, [set]);
	return (
		<div>
			<button onClick={setSubscribe}>Subscribe</button>
			<Coord />
			<Coord2 />
		</div>
	);
}

export default SubScribeComp;