import ExcelJS from "exceljs";
import { api } from "@/convex/_generated/api";
import { getConvexClient } from "@/lib/convex-server";

export async function GET() {
  const convex = getConvexClient();
  const guests = await convex.query(api.guests.list, {});

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Καλεσμένοι");

  sheet.columns = [
    { header: "Ονοματεπώνυμο", key: "fullName", width: 30 },
    { header: "Θα παρευρεθεί", key: "attending", width: 16 },
    { header: "Ενήλικες", key: "adults", width: 12 },
    { header: "Παιδιά", key: "children", width: 12 },
    { header: "Email", key: "email", width: 32 },
  ];
  sheet.getRow(1).font = { bold: true };

  for (const guest of guests) {
    sheet.addRow({
      fullName: guest.fullName,
      attending: guest.attending ? "Ναι" : "Όχι",
      adults: guest.adults,
      children: guest.children,
      email: guest.email,
    });
  }

  const buffer = await workbook.xlsx.writeBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="guests.xlsx"',
    },
  });
}
