import Navbar from "@/public/components/navbar";

export function Home() {
    return (
        <>
            <Navbar />
            <div className="home">
                <h1>Academia de Kun fu</h1>
                <p>On this sitio puedes aprender sobre tecnicas de meditacion para dormir a tus oponentess</p>
            </div>
        </>
    );
}


export default Home;