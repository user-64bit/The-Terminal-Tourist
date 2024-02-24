import Loader from "@/components/Loader"
import { Suspense } from "react"

export default function About() {
    return (
        <Suspense fallback={<Loader/>}>
            <>
                This is About
            </>
        </Suspense>
    )
}