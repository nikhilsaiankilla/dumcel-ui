"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card"
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const CREDIT_RATE = 2

export function CreditCalculatorCard({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [credits, setCredits] = useState<number>(10)
    const [error, setError] = useState<string>("")

    const total = credits * CREDIT_RATE

    const handleChange = (value: string) => {
        const num = Number(value)
        if (isNaN(num)) return

        if (num < 10) {
            setError("Minimum 10 credits required")
        } else if (num > 50) {
            setError("Maximum 50 credits allowed")
        } else {
            setError("")
        }

        setCredits(num)
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="w-[380px] shadow-lg bg-black/40 border border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">Credit Calculator</CardTitle>
                    <CardDescription>
                        Estimate how much it’ll cost to buy credits
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="credits">Enter Credits</FieldLabel>
                            <Input
                                id="credits"
                                inputMode="numeric"
                                pattern="\d*"
                                min={10}
                                max={50}
                                placeholder="Enter between 10–50"
                                value={credits}
                                onChange={(e) => handleChange(e.target.value)}
                                className="bg-black/30 border-white/10 text-white text-center"
                            />
                        </Field>

                        <div className="flex justify-between text-sm text-gray-300">
                            <span>Rate: ₹{CREDIT_RATE}/credit</span>
                            <span>Total: ₹{total}</span>
                        </div>

                        <p className="text-gray-400 text-xs p-3 bg-amber-500/10 border border-amber-500/20 rounded-md">
                            Minimum 10 and maximum 50 credits can be entered.
                            <br />1 Credit = ₹{CREDIT_RATE}
                        </p>
                    </FieldGroup>
                </CardContent>
            </Card>
        </div>
    )
}
