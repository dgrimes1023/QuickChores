"use client";
import React from "react";
import { GlobalContextProvider } from "@/context/globalContext";
import { ChoresContextProvider } from "@/context/choresContext";

interface Props {
    children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
    return (
    <GlobalContextProvider><ChoresContextProvider>
        {children}
    </ChoresContextProvider></GlobalContextProvider>
    );
}

export default ContextProvider;