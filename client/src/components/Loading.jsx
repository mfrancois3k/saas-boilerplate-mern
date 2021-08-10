import React from "react";
import { Spinner } from "@chakra-ui/react"

export default function Loading() {

    return (

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spinner size="xl" />
        </div>

    )



};