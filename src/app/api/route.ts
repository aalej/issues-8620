import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Do whatever you want
  return NextResponse.json(
    { message: "Hello World", storageBucket: process.env.STORAGE_BUCKET },
    { status: 200 }
  );
}

// To handle a POST request to /api
export async function POST(request: Request) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
