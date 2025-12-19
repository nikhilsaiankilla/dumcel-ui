"use client"

import { useState } from "react";
import { X, Captions } from "lucide-react";

export default function NoticeCard() {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div className="w-full max-w-md mx-auto rounded-sm border border-amber-300/50 bg-amber-300/10 py-2 px-3 fixed right-5 bottom-5">
            <button
                onClick={() => setVisible(false)}
                aria-label="Close notice"
                className="absolute top-2 right-2 text-amber-700/70 hover:text-amber-900"
            >
                <X size={14} />
            </button>

            <strong className="text-sm font-bold flex items-center gap-2 text-amber-900">
                <Captions size={14} />
                Notice
            </strong>

            <p className="text-xs font-normal mt-3 text-amber-900/90">
                Due to server cost constraints, analytics are temporarily disabled.
                Kafka and ClickHouse processing has been paused.
            </p>
        </div>
    );
}
