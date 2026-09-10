import { AppPageLayout } from "@/components/app-page-layout"
import { SectionDashboard } from "@/components/section-dashboard"

export default function Page() {
  return (
    <AppPageLayout>
      <SectionDashboard section="turmas" />
    </AppPageLayout>
  )
}
