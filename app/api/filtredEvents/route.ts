import { NextResponse } from "next/server";
import { getFiltredEvents } from "@/helpers/api-util";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = Number(searchParams.get("year"));
  const month = Number(searchParams.get("month"));

  // Validate query parameters
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    year < 2020 ||
    year > 2030 ||
    month < 1 ||
    month > 12
  ) {
    return NextResponse.json({ message: "Invalid year or month" }, { status: 400 });
  }

  try {
    const events = await getFiltredEvents({ year, month });
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching filtered events:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
