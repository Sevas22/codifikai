import Script from "next/script"

const PUSHLEADS_AGENT_ID =
  process.env.NEXT_PUBLIC_PUSHLEADS_AGENT_ID ?? "agent_1779394064785_jhfqv7k"

/**
 * Pushleads AI agent widget — loaded on every page via root layout.
 */
export function PushleadsAgentWidget() {
  if (!PUSHLEADS_AGENT_ID) return null

  return (
    <Script
      src="https://pushleads.co/api/widget"
      data-agent-id={PUSHLEADS_AGENT_ID}
      strategy="afterInteractive"
    />
  )
}
