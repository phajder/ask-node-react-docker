import "../../styles/globals.css";

import { useContext, useState } from "react";

import { ActionButton, Products } from "@/components";
import { AlertsContext } from "../Alert/AlertContext";
import { AlertContextType } from "@/@types/ask-client";

export default function Layout() {
  const [products, setProducts] = useState([]);
  const { addAlert } = useContext(AlertsContext) as AlertContextType;

  async function loadData() {
    try {
      let apiProducts = await fetch("/api/products");
      if (!apiProducts?.ok) {
        const message = await apiProducts.text();
        throw Error(message?.length > 0 ? message : apiProducts.statusText);
      }
      setProducts(await apiProducts.json());
    } catch (e) {
      addAlert({ title: "ERROR", message: (e as Error).message, timeout: 5 });
      console.error((e as Error).message);
    }
  }

  function flushData() {
    setProducts([]);
  }

  return (
    <div className="h-full md:container dark:bg-zinc-950 dark:text-white md:mx-auto">
      <div className="flex flex-1 justify-center">
        <nav className="pointer-events-auto md:block">
          <ul className="flex px-3 text-sm font-medium">
            <li>
              <ActionButton callback={loadData} icon="cloud" text="Load data" />
            </li>
            <li>
              <ActionButton callback={flushData} icon="delete" text="Flush data" />
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
