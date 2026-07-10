"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { format } from "date-fns"
import { Search } from "lucide-react"
import { type DateRange } from "react-day-picker"
// import { DateRangePicker } from "@/components/date-range-picker";
import { MAX_INFANTS } from "@/lib/booking-rules"
import { toValidDate } from "@/lib/date-utils"

type HomeSearchBarProps = {
  initialLocation?: string
  initialGuests?: string
  initialAdults?: string
  initialChildren?: string
  initialInfants?: string
  initialCheckIn?: string
  initialCheckOut?: string
}

function SearchSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-70 md:w-auto"
    >
      <Search className="h-4 w-4" />
      {pending ? "Searching..." : "Search"}
    </button>
  )
}

export function HomeSearchBar({
  initialLocation,
  initialGuests,
  initialAdults,
  initialChildren,
  initialInfants,
  initialCheckIn,
  initialCheckOut
}: HomeSearchBarProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activePanel, setActivePanel] = useState<
    "where" | "when" | "who" | null
  >(null)
  const [location, setLocation] = useState(initialLocation ?? "")
  const [adults, setAdults] = useState(
    Number(initialAdults || initialGuests || 1)
  )
  const [children, setChildren] = useState(Number(initialChildren || 0))
  const [infants, setInfants] = useState(Number(initialInfants || 0))
  const [range, setRange] = useState<DateRange | undefined>({
    from: toValidDate(initialCheckIn),
    to: toValidDate(initialCheckOut)
  })

  const [isDesktopViewport, setIsDesktopViewport] = useState(false)
  const totalGuests = adults + children + infants

  const whenLabel = useMemo(() => {
    if (!range?.from && !range?.to) return "Add dates"
    if (range?.from && !range?.to) return `${format(range.from, "MMM d")} - Add`
    if (range?.from && range?.to) {
      return `${format(range.from, "MMM d")} - ${format(range.to, "MMM d")}`
    }
    return "Add dates"
  }, [range])

  return (
    <div className="relative rounded-4xl bg-surface p-2.5 shadow-sm md:border md:border-ink-200 md:p-4">
      {/* activePanel */}
      {activePanel ? (
        <button
          type="button"
          aria-label="Close panel"
          className="fixed inset-0 z-10 bg-ink-900/20 backdrop-blur-[1px]"
          onClick={() => setActivePanel(null)}
        />
      ) : null}

      <form className="rounded-[28px] border border-ink-300 p-2.5 shadow-sm md:rounded-full md:p-1.5">
        {/* mobile */}
        <div className="space-y-2 md:hidden">
          <button
            type="button"
            onClick={() =>
              setActivePanel(activePanel === "where" ? null : "where")
            }
            className="w-full rounded-2xl border border-ink-200 bg-surface px-4 py-2.5 text-left shadow-sm shadow-ink-900/5 transition hover:bg-ink-100 md:border-transparent md:bg-transparent md:shadow-none"
          >
            <span className="block text-xs font-semibold text-ink-900">
              Where
            </span>
            <span className="block text-sm text-ink-600">
              {location || "Choose a destination"}
            </span>
          </button>
          <button
            type="button"
            onClick={() =>
              setActivePanel(activePanel === "when" ? null : "when")
            }
            className="w-full rounded-2xl border border-ink-200 bg-surface px-4 py-2.5 text-left shadow-sm shadow-ink-900/5 transition hover:bg-ink-100 md:border-transparent md:bg-transparent md:shadow-none"
          >
            <span className="block text-xs font-semibold text-ink-900">
              When
            </span>
            <span className="block text-sm text-ink-600">{whenLabel}</span>
          </button>
          <button
            type="button"
            onClick={() => setActivePanel(activePanel === "who" ? null : "who")}
            className="w-full rounded-2xl border border-ink-200 bg-surface px-4 py-2.5 text-left shadow-sm shadow-ink-900/5 transition hover:bg-ink-100 md:border-transparent md:bg-transparent md:shadow-none"
          >
            <span className="block text-xs font-semibold text-ink-900">
              Who
            </span>
            <span className="block text-sm text-ink-600">
              {totalGuests > 0
                ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
                : "Add travelers"}
            </span>
          </button>
          <div className="pt-2">
            <SearchSubmitButton />
          </div>
        </div>

        {/* desktop starts here */}
        <div className="hidden gap-1 md:grid md:grid-cols-[1.5fr_1.5fr_1fr_auto]">
          <button
            type="button"
            onClick={() =>
              setActivePanel(activePanel === "where" ? null : "where")
            }
            className="rounded-full border border-transparent px-4 py-2 text-left hover:bg-ink-100"
          >
            <span className="block text-xs font-semibold text-ink-900">
              Where
            </span>
            <span className="block text-sm text-ink-600">
              {location || "Choose a destination"}
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              setActivePanel(activePanel === "when" ? null : "when")
            }
            className="rounded-full border border-transparent px-4 py-2 text-left hover:bg-ink-100"
          >
            <span className="block text-xs font-semibold text-ink-900">
              When
            </span>
            <span className="block text-sm text-ink-600">{whenLabel}</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePanel(activePanel === "who" ? null : "who")}
            className="rounded-full border border-transparent px-4 py-2 text-left hover:bg-ink-100"
          >
            <span className="block text-xs font-semibold text-ink-900">
              Who
            </span>
            <span className="block text-sm text-ink-600">
              {totalGuests > 0
                ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
                : "Add travelers"}
            </span>
          </button>
          <SearchSubmitButton />
          {/* resume here @ 5:08 */}
        </div>
      </form>
    </div>
  )
}
