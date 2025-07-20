import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import disposableEmailDomains from "disposable-email-domains"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Only used on the server
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

        const lowerEmail = email.toLowerCase()

        const { data: existing, error: checkError } = await supabase
            .from("waitlist")
            .select("email")
            .eq("email", lowerEmail)
            .maybeSingle()

        if (checkError) {
            console.error("Check error:", checkError)
            return NextResponse.json(
                { error: "Failed to verify email existence." },
                { status: 500 }
            )
        }

        if (existing) {
            return NextResponse.json(
                { error: "You've already join, maybe refer us to a friend?" },
                { status: 409 }
            )
        }

        const { error: insertError } = await supabase
            .from("waitlist")
            .insert([{ email: lowerEmail }])

        if (insertError) {
            console.error("Insert error:", insertError)
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
