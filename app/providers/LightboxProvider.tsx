"use client";

import { useEffect } from "react";
import { Lightbox } from "lightbox3";
import "lightbox3/style.css";

export default function LightboxProvider() {
    useEffect(() => {
        Lightbox.init();
    }, []);

    return null;
}
