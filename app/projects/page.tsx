import Loader from "@/components/Loader"
import { Suspense } from "react"

export default function Projects(){
    return (
        <Suspense fallback={<Loader/>}>
            <h1>These are the projects...</h1>
        </Suspense>
    )
}