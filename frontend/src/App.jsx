import Router from './router';
import Header from './components/Header';

function App() {
    return (
        <>
            <Header />

            <main className="w-full h-screen relative">
                <Router />
            </main>
        </>
    );
}

export default App;
