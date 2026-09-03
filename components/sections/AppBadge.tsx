import { playStoreApps } from "@/lib/data";

type AppMark = (typeof playStoreApps)[number]["id"];

export function AppBadge({ mark }: { mark: AppMark }) {
  return (
    <svg viewBox="0 0 64 64" className="size-11 shrink-0 md:size-12" aria-hidden>
      {mark === "finote" && (
        <>
          <circle cx="32" cy="32" r="32" fill="#1f6b3a" />
          <text
            x="30"
            y="42"
            textAnchor="middle"
            fill="#f7f7f2"
            fontSize="28"
            fontWeight="700"
            fontFamily="Georgia, serif"
          >
            F
          </text>
          <path d="M40 44h8v6l-4-2-4 2z" fill="#f4c430" />
        </>
      )}
      {mark === "muslim" && (
        <>
          <circle cx="32" cy="32" r="32" fill="#0f4a4a" />
          <text
            x="32"
            y="38"
            textAnchor="middle"
            fill="#f7f7f2"
            fontSize="11"
            fontWeight="700"
            fontFamily="Georgia, serif"
          >
            Muslim+
          </text>
          <path
            d="M48 16c-4 1.2-7 5-7 9.4 0 5.2 4.2 9.4 9.4 9.4 1.6 0 3.1-.4 4.4-1.1-1.6 4.4-5.8 7.5-10.8 7.5-6.3 0-11.4-5.1-11.4-11.4 0-6.8 6-12.2 15.4-13.8z"
            fill="#f4c430"
          />
        </>
      )}
      {mark === "arisan" && (
        <>
          <circle cx="32" cy="32" r="32" fill="#d43a8a" />
          <text
            x="32"
            y="30"
            textAnchor="middle"
            fill="#fff"
            fontSize="11"
            fontStyle="italic"
            fontFamily="Georgia, serif"
          >
            Arisan
          </text>
          <text
            x="32"
            y="44"
            textAnchor="middle"
            fill="#fff"
            fontSize="11"
            fontStyle="italic"
            fontFamily="Georgia, serif"
          >
            Kuy
          </text>
        </>
      )}
      {mark === "libur" && (
        <>
          <circle cx="32" cy="32" r="32" fill="#1a7a7a" />
          <text
            x="32"
            y="30"
            textAnchor="middle"
            fill="#fff"
            fontSize="9"
            fontWeight="700"
            fontFamily="Georgia, serif"
          >
            Libur
          </text>
          <text
            x="32"
            y="42"
            textAnchor="middle"
            fill="#fff"
            fontSize="9"
            fontWeight="700"
            fontFamily="Georgia, serif"
          >
            Check
          </text>
          <path
            d="M44 18l10 3-6 4 2 6-5-3-4 2z"
            fill="#f7f7f2"
          />
        </>
      )}
      {mark === "pay" && (
        <>
          <circle cx="32" cy="32" r="32" fill="#0b0b0b" />
          <path d="M32 4c16 6 28 16 28 28 0 6-8 10-16 8-10-2-14-10-12-20C34 12 32 6 32 4z" fill="#8fd14f" />
          <path d="M8 40c6 14 18 20 28 18-8-8-14-18-10-28C18 28 10 34 8 40z" fill="#2f6b2f" />
          <circle cx="30" cy="30" r="7" fill="#1f8a8a" />
        </>
      )}
    </svg>
  );
}
