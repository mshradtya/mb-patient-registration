import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLiveQuery } from "@electric-sql/pglite-react";
import RegisterPatientForm from "./components/RegisterPatient";
import PatientTable from "./components/PatientTable";
import type { Patient } from "./types";

function App() {
  const [open, setOpen] = useState(false);

  const result = useLiveQuery(
    "SELECT * FROM patients ORDER BY created_at DESC;"
  );
  const patients = (result?.rows as Patient[]) || [];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Patient Records</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Register New Patient</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Register New Patient</DialogTitle>
              <DialogDescription>
                Enter the following details for registration.
              </DialogDescription>
            </DialogHeader>
            <RegisterPatientForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <PatientTable data={patients} />
    </div>
  );
}

export default App;
