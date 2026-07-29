import { Building2, LineChart, Workflow, Cpu } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type ServiceCapability = {
  id: string
  icon: LucideIcon
  labelKey: string
}

export const SERVICE_CAPABILITIES: ServiceCapability[] = [
  {
    id: "enterprise-platform",
    icon: Building2,
    labelKey: "svc.arch.1",
  },
  {
    id: "commerce-intelligence",
    icon: LineChart,
    labelKey: "svc.arch.2",
  },
  {
    id: "workflow-orchestration",
    icon: Workflow,
    labelKey: "svc.arch.3",
  },
  {
    id: "ai-automation-core",
    icon: Cpu,
    labelKey: "svc.arch.4",
  },
]
