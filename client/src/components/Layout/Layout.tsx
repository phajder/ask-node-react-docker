import "../../styles/globals.css";

import { useState } from "react";

import { ActionButton, Products } from "@/components";

export default function Layout() {
  const [products, setProducts] = useState([]);

  async function loadData() {
    try {
      let apiProducts = await fetch("/api/products");
      setProducts(await apiProducts.json());
    } catch (e) {
      console.error(`Fetch failed: ${e}`);
    }
  }

  function flushData() {
    setProducts([]);
  }

  return (
    <div className="h-full bg-zinc-950 text-white md:container md:mx-auto">
      <div className="flex flex-1 justify-center">
        <nav className="pointer-events-auto md:block">
          <ul className="flex px-3 text-sm font-medium">
            <li>
              <a className="relative block px-3 py-2 transition hover:text-teal-500" href="/">
                <ActionButton callback={loadData} icon="cloud" text="Load data" />
              </a>
            </li>
            <li>
              <a className="relative block px-3 py-2 transition hover:text-teal-500" href="/">
                <ActionButton callback={flushData} icon="delete" text="Flush data" />
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <main className="flex min-h-screen flex-col items-center justify-start">
        <div className="max-auto container">
          <Products products={products} />
        </div>
      </main>
    </div>
  );
}
