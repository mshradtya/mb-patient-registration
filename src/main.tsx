import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { PGliteWorker } from "@electric-sql/pglite/worker";
import { live } from "@electric-sql/pglite/live";
import { PGliteProvider } from "@electric-sql/pglite-react";

import App from "./App";
import "./index.css";

const db = await PGliteWorker.create(
  new Worker(new URL("./pglite-worker.ts", import.meta.url), {
    type: "module",
  }),
  {
    extensions: {
      live,
    },
  }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PGliteProvider db={db}>
      <App />
    </PGliteProvider>
  </StrictMode>
);
