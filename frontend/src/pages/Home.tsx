import {
  Navbar,
  About,
  Contacts,
  Reviews,
  Teaching,
  Footer,
  Hero,
  SchedulingComponent,
} from "../components";

function App() {
  return (
    <>
      <header className="w-[100%] h-fit overflow-hidden relative">
        <Navbar />
        <Hero />
      </header>
      <main>
        <SchedulingComponent />
        <Reviews />
        <Contacts />
        <Teaching />
        <About />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
