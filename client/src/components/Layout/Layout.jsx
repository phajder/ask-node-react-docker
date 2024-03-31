import { useState } from "react";

import M from "materialize-css";
import { ActionButton, Products } from "../";
import logo from "./logo.svg";

export default function Layout() {
  const [products, setProducts] = useState(null);

  document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".sidenav");
    var instances = M.Sidenav.init(elems);
  });

  async function loadData() {
    try {
      let apiProducts = await fetch("/api/products");
      setProducts(await apiProducts.json());
    } catch (e) {
      console.error(`Fetch failed: ${e}`);
    }
  }

  function flushData() {
    setProducts(null);
  }

  return (
    <>
      <header>
        <nav className="top-nav indigo accent-2">
          <div className="container">
            <div className="nav-wrapper">
              <div className="row">
                <a href="#" data-target="slide-out" className="top-nav sidenav-trigger brand-logo">
                  <img src={logo} className="logo-image" alt="logo" width={80} />
                </a>
                <ul className="right hide-on-med-and-down">
                  <li>
                    <ActionButton callback={loadData} icon="cloud" text="Load data" />
                  </li>
                  <li>
                    <ActionButton callback={flushData} icon="delete" text="Flush data" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <ul id="slide-out" className="sidenav sidenav-close">
          <li>
            <ActionButton callback={loadData} icon="cloud" text="Load data" />
          </li>
          <li>
            <ActionButton callback={flushData} icon="delete" text="Flush data" />
          </li>
        </ul>
      </header>

      <main>
        <div className="container">
          <div className="row">
            <Products products={products} />
          </div>
        </div>
      </main>
    </>
  );
}
