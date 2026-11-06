import { useEffect, useState } from "react";
import api from "./services/api";
import { Search, Leaf, Dna, Globe2, Shuffle } from "lucide-react";

function App() {
  const [search, setSearch] = useState("");

  const [apiStatus, setApiStatus] = useState("Verificando conexão...");

  useEffect(() => {
    api
      .get("/api/health")
      .then(() => setApiStatus("API conectada"))
      .catch(() => setApiStatus("API indisponível"));
  }, []);

  function handleSearch() {
    if (!search.trim()) return;

    alert(`Pesquisa de espécies: ${search}`);
  }

  return (
    <div className="min-h-screen bg-[#F5F7F2]">
      <header className="bg-[#173F35] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <Leaf size={30} className="text-[#70A889]" />
            <span className="text-2xl font-bold">BioAtlas</span>
          </div>

          <nav className="hidden gap-8 md:flex">
            <a href="#" className="hover:text-[#70A889]">
              Início
            </a>
            <a href="#" className="hover:text-[#70A889]">
              Explorar
            </a>
            <a href="#" className="hover:text-[#70A889]">
              Extintos
            </a>
            <a href="#" className="hover:text-[#70A889]">
              Sobre
            </a>
          </nav>
        </div>
      </header>

      <div className="border-b border-[#E1E8DF] bg-white px-6 py-2">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm">
          <span
            className={`h-2 w-2 rounded-full ${
              apiStatus === "API conectada" ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-gray-600">{apiStatus}</span>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6">
        <section className="py-24 text-center">
          <span className="mb-5 inline-block rounded-full bg-[#E1EDE4] px-4 py-2 text-sm font-semibold text-[#245B43]">
            Enciclopédia Digital da Biodiversidade
          </span>

          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-[#173F35] md:text-6xl">
            Explore a diversidade da vida na Terra
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Descubra animais, plantas, fungos e organismos extintos através de
            informações científicas e bases de dados especializadas.
          </p>

          <div className="mx-auto mt-10 flex max-w-2xl gap-2 rounded-xl bg-white p-2 shadow-lg">
            <Search className="ml-3 mt-3 text-gray-400" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSearch();
              }}
              placeholder="Pesquise por nome popular ou científico..."
              className="min-w-0 flex-1 bg-transparent px-2 py-3 outline-none"
            />

            <button
              onClick={handleSearch}
              className="rounded-lg bg-[#245B43] px-5 py-3 font-semibold text-white hover:bg-[#173F35]"
            >
              Pesquisar
            </button>
          </div>
        </section>

        <section className="grid gap-5 pb-20 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Fauna",
              description: "Explore espécies animais.",
              icon: <Globe2 size={30} />,
            },
            {
              title: "Flora",
              description: "Descubra o mundo vegetal.",
              icon: <Leaf size={30} />,
            },
            {
              title: "Filogenia",
              description: "Conheça relações evolutivas.",
              icon: <Dna size={30} />,
            },
            {
              title: "Descoberta",
              description: "Encontre espécies aleatórias.",
              icon: <Shuffle size={30} />,
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[#E1E8DF] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-5 text-[#397B58]">{item.icon}</div>

              <h2 className="text-xl font-bold text-[#173F35]">{item.title}</h2>

              <p className="mt-2 text-gray-600">{item.description}</p>
            </article>
          ))}
        </section>
      </main>

      <footer className="bg-[#173F35] px-6 py-8 text-center text-sm text-white">
        BioAtlas © 2026 — Enciclopédia Digital da Biodiversidade
      </footer>
    </div>
  );
}

export default App;
