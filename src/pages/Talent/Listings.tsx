import { Header } from "@/components/Header";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { assertIsNotNullish } from "@/lib/assertIsNotNullish";
import { Listing } from "@/supabase/types";
import { useClient } from "@/supabase/useClient";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const TalentListings = () => {
  const client = useClient();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      assertIsNotNullish(client);
      const { data } = await client
        .from("listings")
        .select("*")
        .order("id", { ascending: false });

      return data as Listing[];
    },
    enabled: !!client,
  });

  if (!data) {
    return (
      <div>
        <Header className="max-w-[1200px]" />
        <div
          className="w-full flex items-center justify-center"
          style={{
            height: "calc(100vh - 64px)",
          }}
        >
          <LoaderCircle className="animate-spin w-14 h-14" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header className="max-w-[1200px]" />
      <div className="max-w-[1200px] mx-auto mt-4">
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>Play Title</TableHead>
                <TableHead>Play Description</TableHead>
                <TableHead className="text-right">Salary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((d) => (
                <TableRow
                  key={d.id}
                  onClick={() => navigate(`/talent/listings/${d.id}`)}
                  className="cursor-pointer"
                >
                  <TableCell>{d.title}</TableCell>
                  <TableCell>{d.context_setting}</TableCell>
                  <TableCell className="text-right">
                    {(d.pay / 100).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
