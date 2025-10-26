
import { NextRequest, NextResponse } from "next/server";
import jwt, { TokenExpiredError } from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET!;

export function authenticate(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json(
            { success: false, message: "No token provided. Please log in." },
            { status: 401 }
        );
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as { userId: string; email: string };
        return decoded; // token valid → return payload
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return NextResponse.json(
                { success: false, message: "Session expired. Please log in again." },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Invalid token. Please log in again." },
            { status: 401 }
        );
    }
}
