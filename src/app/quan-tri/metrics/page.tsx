import type { Metadata } from "next"
import Metrics from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Theo dõi",
  }
}

export default Metrics
