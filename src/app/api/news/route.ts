import { NextRequest, NextResponse } from "next/server";
import { startGatheringFromNouvelles, testDate } from "../../../utils/fetcher";
import { Article } from "@/types/article";

export async function GET(Request: NextRequest) {
    const result = await fetch("https://newsmada.com/category/les-nouvelles/");
    if (result.status === 200) {
        const body = await result.text();
        return new NextResponse(body)
    }
    return new NextResponse("An error occured")
}

export async function POST(req: NextRequest) {
    const { date, tags } = await req.json();
    const results = await startGatheringFromNouvelles(tags.split(','), date)
    return NextResponse.json(results)
}