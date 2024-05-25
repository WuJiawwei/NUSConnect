const App = () => {
    return (
        <>
            <main className="p-0">
                <header className="text-black font-mono text-xl px-4 py-3.5 bg-green-200">
                    NUSConnect
                </header>
            </main>
            <button className="text-black font-mono text-lg py-1 px-2 bg-blue-300 rounded
            hover:bg-red-200 focus:outline-none">
                Login
            </button>
            <ul className="p-0.5">
                <li className="bg-white p-2 first:bg-amber-100 my-1">item1</li>
                <li className="bg-white p-2 first:bg-amber-100 my-1 odd:bg-blue-300
                                      even:bg-green-200">item2
                </li>
                <li className="bg-white p-2 first:bg-amber-100 my-1 odd:bg-blue-300
                                      even:bg-green-200">item3
                </li>
                <li className="bg-white p-2 first:bg-amber-100 my-1 odd:bg-blue-300
                                      even:bg-green-200">item4
                </li>
            </ul>
            
        </>
    )
};
export default App