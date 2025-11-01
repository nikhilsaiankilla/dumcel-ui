"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProjectPreview({ subDomain }: { subDomain: string }) {
    const baseUrl = `https://api.microlink.io/?url=`;
    const mainUrl = `${baseUrl}${encodeURIComponent(
        `https://${subDomain}.d.nikhilsaiankilla.blog/`
    )}&screenshot=true&meta=false&embed=screenshot.url`;

    const fallbackUrl = `${baseUrl}${encodeURIComponent(
        "https://dumcel.nikhilsaiankilla.blog/"
    )}&screenshot=true&meta=false&embed=screenshot.url`;

    const [imgSrc, setImgSrc] = useState(mainUrl);

    useEffect(() => {
        // proactively verify if the main preview is actually working
        const checkPreview = async () => {
            try {
                const res = await fetch(mainUrl, { method: "HEAD" });
                if (!res.ok) throw new Error("Microlink image not ready");
            } catch {
                setImgSrc(fallbackUrl);
            }
        };

        checkPreview();
    }, [mainUrl, fallbackUrl]);

    return (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <Image
                alt="Project Preview"
                fill
                unoptimized
                src={imgSrc}
                onError={() => {
                    if (imgSrc !== fallbackUrl) setImgSrc(fallbackUrl);
                }}
                className="object-cover w-full aspect-video"
            />
        </div>
    );
}
