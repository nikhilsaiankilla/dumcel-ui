"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

const resetPasswordSchema = z.object({
    emaiL: z.string().email("Invalid email address"),
    oldPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password too long"),
    newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password too long"),
});

type Inputs = z.infer<typeof resetPasswordSchema>;

interface ChangePassFormProps extends React.ComponentProps<"div"> {
    // email: string // email is passed from parent component
}

export function ChangePasswordForm({
    className,
    ...props
}: ChangePassFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            emaiL: "",
            oldPassword: "",
            newPassword: "",
        },
    });
    const [email, setEmail] = useState<string>("");
    const [resErrors, setResErrors] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

        const fetchData = async () => {
        setResErrors("");

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Authentication token not found");

            const res = await fetch(`/api/auth/get-user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Failed to fetch user data (${res.status}): ${text}`);
            }

            const json = await res.json();
            if (!json.success) {
                throw new Error(json.message || "Failed to fetch user data");
            }

            setEmail(json.data?.email);
        } catch (err: unknown) {
            console.error("Error fetching user:", err);
            setResErrors(err instanceof Error ? err.message : "Something went wrong");
        } 
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setResErrors("");
        setSuccess("");
        setLoading(true)

        try {
            // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
            // if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL is not defined");

            const res = await fetch(`/api/auth/change-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data),
            });

            const json = await res.json();

            if (!res.ok || !json.success) {
                setLoading(false)
                throw new Error(json.error || "Something went wrong while resetting password");
            }

            setSuccess("Password reset successful! Redirecting to login...");
            setLoading(false)
        } catch (err: unknown) {
            setLoading(false)
            setResErrors(err instanceof Error ? err.message : "Something went wrong");
        }
    };


    return (
        <div className={cn("flex flex-col gap-6 max-w-lg mx-auto w-full", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Change your password</CardTitle>
                    <CardDescription>
                        Enter your Old and New password below to Change your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    {...register("emaiL")}
                                    required
                                    value={email}
                                    readOnly
                                    disabled
                                />
                                {errors.oldPassword && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.oldPassword.message}
                                    </p>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="email">Old Password</FieldLabel>
                                <Input
                                    id="oldPassword"
                                    type="password"
                                    placeholder="Enter your old password"
                                    {...register("oldPassword")}
                                    required
                                />
                                {errors.oldPassword && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.oldPassword.message}
                                    </p>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    placeholder="Enter your new password"
                                    {...register("newPassword")}
                                    required
                                />
                                {errors.newPassword && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.newPassword.message}
                                    </p>
                                )}
                            </Field>

                            <Field>
                                <Button type="submit" className="cursor-pointer w-full">
                                    {loading ? <Loader className="animate-spin"/> : "Change Password"}
                                </Button>
                            </Field>
                        </FieldGroup>

                        {resErrors && (
                            <p className="text-red-500 text-sm mt-2 text-center">
                                {resErrors}
                            </p>
                        )}
                        {success && (
                            <p className="text-green-600 text-sm mt-2 text-center">
                                {success}
                            </p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
