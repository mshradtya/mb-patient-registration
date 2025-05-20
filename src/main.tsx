import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { PGlite } from "@electric-sql/pglite";
import { live } from "@electric-sql/pglite/live";
import { PGliteProvider } from "@electric-sql/pglite-react";

import "./index.css";
import App from "./App.tsx";

const db = await PGlite.create({
  extensions: { live },
  // indexed db for persistence
  dataDir: "idb://patients-data",
});

const QUERY = `
   CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      gender TEXT NOT NULL,
      address TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

await db.exec(QUERY);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PGliteProvider db={db}>
      <App />
    </PGliteProvider>
  </StrictMode>
);
