import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import disposableEmailDomains from "disposable-email-domains"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function isDisposable(email: string): boolean {
    const domain = email.split("@")[1]?.toLowerCase()
    return disposableEmailDomains.includes(domain)
}

export async function POST(req: Request) {
    try {
        const { email } = await req.json()

        if (!email || typeof email !== "string" || isDisposable(email)) {
            return NextResponse.json(
                { error: "Invalid or temporary email address." },
                { status: 400 }
            )
        }

        const { error } = await supabase
            .from("waitlist")
            .insert([{ email }])

        if (error) {
            console.error("Insert error:", error)
            return NextResponse.json(
                { error: "Failed to add email to waitlist." },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (err) {
        console.error("Unexpected server error:", err)
        return NextResponse.json(
            { error: "Unexpected server error" },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        const { count, error } = await supabase
            .from("waitlist")
            .select("*", { count: "exact", head: true })

        if (error) {
            console.error("Count fetch error:", error)
            return NextResponse.json(
                { error: "Failed to fetch user count." },
                { status: 500 }
            )
        }

        return NextResponse.json({ count }, { status: 200 })
    } catch (err) {
        console.error("Unexpected count error:", err)
        return NextResponse.json(
            { error: "Unexpected server error" },
            { status: 500 }
        )
    }
}
