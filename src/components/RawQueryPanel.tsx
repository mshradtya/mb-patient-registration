import { useState } from "react";
import { usePGlite } from "@electric-sql/pglite-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

const RawQueryPanel = () => {
  const db = usePGlite();

  const [query, setQuery] = useState("SELECT * FROM patients;");
  const [rows, setRows] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleQuery = async () => {
    setError(null);
    setMessage(null);
    setRows(null);

    try {
      const result = await db.query(query);

      if (result?.rows?.length) {
        setRows(result.rows);
      } else {
        setMessage("Query executed successfully, no rows returned.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <Card className="p-6 space-y-4 mt-6">
      <h2 className="text-lg font-semibold">Raw SQL Query</h2>

      <Textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="min-h-[100px] font-mono"
        placeholder="Enter your SQL query..."
      />

      <Button onClick={handleQuery}>Run Query</Button>

      {error && <p className="text-sm text-red-500">Error: {error}</p>}
      {message && <p className="text-sm text-green-600">{message}</p>}

      {rows && rows.length > 0 && (
        <div className="overflow-auto">
          <Table className="mt-4 text-sm">
            <TableHeader>
              <TableRow>
                {Object.keys(rows[0]).map((key) => (
                  <TableHead key={key}>{key}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  {Object.values(row).map((value, j) => (
                    <TableCell key={j}>
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : String(value)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
};

export default RawQueryPanel;
