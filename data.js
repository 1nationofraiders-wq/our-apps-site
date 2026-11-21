/*
 * Our Apps store — single source of truth.
 * Edit this ONE file to change the store name, the app list, or any listing.
 * All three pages (index / app / bridges) read from window.STORE + window.APPS.
 * Plain script, not fetch — so the site also works from file:// with no server.
 */
window.STORE = Object.freeze({
  name: "Our Apps",
  eyebrow: "A small family app store",
  tagline: "Useful things we made for the people we know.",
  intro:
    "A handful of independent, on-device-first apps, collected in one place. " +
    "We keep the listings honest: where a download or price isn't final, we say so.",
  note:
    "No account or tracking on this site. Payments are handled by our checkout " +
    "provider — we never see card details. Apps save their data on your device " +
    "unless a listing says otherwise.",
  url: "https://1nationofraiders-wq.github.io/our-apps-site/",
  owner: "1nationofraiders-wq"
});

window.APPS = Object.freeze([
  {
    slug: "agate-lens",
    name: "Agate Lens",
    tagline: "Score backlit agates and keep a field journal.",
    category: "Field & outdoors",
    platform: "Android",
    status: "Available",
    "version": "0.2.1+3",
    "accent": "#8a4b22",
    source: "~/agate-app",
    description:
      "A field tool for comparing backlit stones. Line a stone up in the live " +
      "lens, capture it against a light source, and get a repeatable translucency " +
      "score plus banding and colour readings. Every find is saved to an on-device " +
      "journal with a photo, GPS coordinates and notes.",
    features: [
      "Live camera lens with alignment guides and white, flash, sun and UV modes",
      "Translucency percentage, band count and transmitted-colour readings",
      "Boost tab that dims candidates without agate-like patterns and glows the ones that have them",
      "On-device journal with CSV export and system share sheet",
      "Find of the Week board with featuring and votes",
      "Kit tab with a buildable gear checklist and UV / laser safety notes"
    ],
    honesty:
      "A visual aid, not a mineral identification tool. Scores and filters are " +
      "heuristics over camera pixels — a green highlight is not a lab result.",
    link: "Download link to be confirmed",
    linkNote:
      "Signed APK is built locally; Play Store listing copy is prepared. " +
      "No price or purchase link is live on this site.",
    bridge: false
  },
  {
    slug: "earnstack",
    name: "EarnStack",
    tagline: "Plan and track rewards-app tasks without automating them.",
    category: "Tools & research",
    platform: "Android",
    status: "Available",
    "version": "0.3.0+1",
    "accent": "#2f6b4f",
    source: "~/earnstack-app",
    description:
      "A local planner and tracker for people who already use money-earning or " +
      "rewards apps. It helps you decide what to do next and organise your time " +
      "across six tabs: apps, surveys, multi-task timers, daily logins, an " +
      "auto-arranged plan and referrals.",
    features: [
      "Per-app cards with earned-versus-cashout progress and signed-in state",
      "Surveys ranked by effort-adjusted pay per hour with a DO THIS NEXT prompt",
      "Concurrent task timers that keep running across tabs and app restarts",
      "Daily login streaks and a 1–7 day auto-arranged plan",
      "Referral codes and messages shared through the device's own share sheet"
    ],
    honesty:
      "EarnStack does not earn money by itself. No login, scraping, browser " +
      "automation, auto-clicking, bulk invites or fake accounts.",
    link: "Download link to be confirmed",
    linkNote: "Signed APK is built locally. No account or payment is involved.",
    bridge: false
  },
  {
    slug: "fungi-field",
    name: "Fungi Field",
    tagline: "Map fungal observations and learn species in the field.",
    category: "Field & outdoors",
    platform: "Android",
    status: "In development",
    version: "1.1.0+2",
    accent: "#8a3d2c",
    source: "~/fungi_field_app",
    description:
      "An assisted mushroom observation and learning app backed by " +
      "research-grade iNaturalist data. It opens on a hub of cards for nearby " +
      "species, an area map, a US state map, a camera lens, a local community " +
      "service and a field journal.",
    features: [
      "Nearby species from research-grade observations within 50 km",
      "OpenStreetMap with observations, known-species centroids and hotspot cells",
      "State map with Census-derived outlines and documented species counts",
      "Camera lens that ranks nearby candidate species by colour similarity",
      "Local community feed, votes and Find of the Week",
      "XP, ranks, badges and a weekly challenge derived from your own log"
    ],
    honesty:
      "Not an edibility app. A red banner says so on every screen. Lens results " +
      "are a shortlist, not an identification, and badges are never an edibility signal.",
    link: "Details to be confirmed",
    linkNote:
      "The community service runs on infrastructure we control; there is no public cloud upload.",
    bridge: false
  },
  {
    slug: "kidcode-studio",
    name: "Kid Code Studio",
    tagline: "Build real games, one explained scene at a time.",
    category: "Learning & kids",
    platform: "Android",
    status: "In development",
    "version": "1.1.0+23",
    "accent": "#b06a1c",
    source: "~/kidcode-app",
    description:
      "A step-by-step game builder for kids. Each scene adds one real thing to a " +
      "live preview — enemies with health, a shield, a starry sky, coins, screen " +
      "shake, a boss with phases, a talking buddy — until a complete playable " +
      "game emerges. Scenes can be skipped or swapped, so two kids following the " +
      "same course can end up with genuinely different games.",
    features: [
      "70-scene Sky Saver build in 10 chapters, plus courses for six other games",
      "Free Build mode: pick any of the 100 scenes directly and skip anything",
      "Back, Skip and Next controls with chapter jumps and plain-English narration",
      "Buddy customisation: name, hat, colour and power level carried into every game",
      "NES-style on-screen pad with D-pad, A, B, Select and Start",
      "Saved game box, published gallery builds and a bonus 3D course",
      "Share links that carry the steps, code, settings and a child's own note"
    ],
    honesty:
      "Made from scratch: no third-party characters, no violence and no accounts. " +
      "Share links are URL fragments restored locally — no profile, name or server is involved.",
    link: "Details to be confirmed",
    linkNote: "Progress and builds stay on the device.",
    bridge: false
  },
  {
    slug: "passcache",
    name: "Deception Pass",
    tagline: "Log geocaches and bridge crossings for a local prize pool.",
    category: "Bridge apps",
    platform: "Android",
    status: "In development",
    version: "1.0.1+2",
    accent: "#2b6b7a",
    source: "~/passcache-app",
    description:
      "The Deception Pass edition of our bridge-crossing logger: geocache " +
      "logging, crossing counts and a community prize pool. Built on the same " +
      "pattern as the other three crossing apps.",
    features: [
      "Ten starter spots around the pass, from both bridge approaches to the shore",
      "Log a crossing over the span or a passage under it, with separate counters",
      "Four tabs: Log, Counts, Prizes and Salute",
      "Original bridge artwork made for this app",
      "Community prize pool with weekly and grand targets (rules draft)"
    ],
    honesty:
      "Starter positions are approximate public landmarks, not verified geocache " +
      "coordinates. Every one is marked as a sample. Prize-pool terms and eligibility " +
      "are not yet published on this site.",
    link: "Details to be confirmed",
    linkNote: "No signup or payment flow is live on this site.",
    bridge: true,
    bridgeInfo: {
      crossing: "Deception Pass Bridge",
      water: "Deception Pass — Whidbey to Fidalgo",
      coordinates: "48.404, -122.648",
      differentiator: "The biggest starter set of the four, inside a state park",
      spots: [
        { name: "West span approach", kind: "bridge" },
        { name: "East span approach", kind: "bridge" },
        { name: "Beneath the span", kind: "under" },
        { name: "Deception Pass park", kind: "shore" },
        { name: "North Beach", kind: "shore" },
        { name: "Goose Rock", kind: "shore" },
        { name: "Bowman Bay", kind: "shore" },
        { name: "Rosario Beach", kind: "shore" },
        { name: "Cornet Bay", kind: "shore" },
        { name: "Pass Island view", kind: "shore" }
      ]
    }
  },
  {
    slug: "tacoma-narrows",
    name: "Tacoma Narrows",
    tagline: "Log geocaches and bridge crossings for a local prize pool.",
    category: "Bridge apps",
    platform: "Android",
    status: "In development",
    version: "1.0.0+1",
    accent: "#4a6572",
    source: "~/tacoma-narrows-app",
    description:
      "The Tacoma Narrows edition of our bridge-crossing logger: geocache " +
      "logging, crossing counts and a community prize pool.",
    features: [
      "Seven starter spots from the two approaches and under the span",
      "Log a crossing over the span or a passage under it, with separate counters",
      "Four tabs: Log, Counts, Prizes and Salute",
      "Original bridge artwork made for this app",
      "Community prize pool with weekly and grand targets (rules draft)"
    ],
    honesty:
      "Starter positions are approximate public landmarks, not verified geocache " +
      "coordinates. Every one is marked as a sample. Prize-pool terms and eligibility " +
      "are not yet published on this site.",
    link: "Details to be confirmed",
    linkNote: "No signup or payment flow is live on this site.",
    bridge: true,
    bridgeInfo: {
      crossing: "Tacoma Narrows Bridge",
      water: "Puget Sound — Gig Harbor to Tacoma",
      coordinates: "47.274, -122.552",
      differentiator: "Twin spans, with shore spots on both sides of the sound",
      spots: [
        { name: "West side approach", kind: "bridge" },
        { name: "East side approach", kind: "bridge" },
        { name: "Under the Narrows", kind: "under" },
        { name: "Point Defiance", kind: "shore" },
        { name: "Ruston Way", kind: "shore" },
        { name: "Gig Harbor waterfront", kind: "shore" },
        { name: "Tacoma waterfront", kind: "shore" }
      ]
    }
  },
  {
    slug: "evergreen-point",
    name: "Evergreen Point",
    tagline: "Log geocaches and bridge crossings for a local prize pool.",
    category: "Bridge apps",
    platform: "Android",
    status: "In development",
    version: "1.0.0+1",
    accent: "#275d6b",
    source: "~/evergreen-point-app",
    description:
      "The Evergreen Point edition of our bridge-crossing logger: geocache " +
      "logging, crossing counts and a community prize pool. Part of a family of " +
      "bridge-crossing apps built on the same pattern.",
    features: [
      "Seven starter spots from Seattle, Bellevue and the lake shore",
      "Log a crossing over the floating span or a passage under it",
      "Four tabs: Log, Counts, Prizes and Salute",
      "Original bridge artwork made for this app",
      "Community prize pool with weekly and grand targets (rules draft)"
    ],
    honesty:
      "Starter positions are approximate public landmarks, not verified geocache " +
      "coordinates. Every one is marked as a sample. Prize-pool terms and eligibility " +
      "are not yet published on this site.",
    link: "Details to be confirmed",
    linkNote: "No signup or payment flow is live on this site.",
    bridge: true,
    bridgeInfo: {
      crossing: "SR 520 Evergreen Point Floating Bridge",
      water: "Lake Washington — Seattle to Bellevue",
      coordinates: "47.640, -122.234",
      differentiator: "The long floating span, with marinas at both ends",
      spots: [
        { name: "West approach (Seattle)", kind: "bridge" },
        { name: "East approach (Bellevue)", kind: "bridge" },
        { name: "Under the 520 span", kind: "under" },
        { name: "Medina shore", kind: "shore" },
        { name: "Bellevue waterfront", kind: "shore" },
        { name: "Kirkland waterfront", kind: "shore" },
        { name: "Mercer Island shore", kind: "shore" }
      ]
    }
  },
  {
    slug: "ship-canal",
    name: "Ship Canal",
    tagline: "Log geocaches and bridge crossings for a local prize pool.",
    category: "Bridge apps",
    platform: "Android",
    status: "In development",
    version: "1.0.0+1",
    accent: "#3a6070",
    source: "~/ship-canal-app",
    description:
      "The Ship Canal edition of our bridge-crossing logger: geocache logging, " +
      "crossing counts and a community prize pool.",
    features: [
      "Seven starter spots along the I-5 span and the canal",
      "Log a crossing over the bridge or a vessel passage beneath it",
      "Four tabs: Log, Counts, Prizes and Salute",
      "Original bridge artwork made for this app",
      "Community prize pool with weekly and grand targets (rules draft)"
    ],
    honesty:
      "Starter positions are approximate public landmarks, not verified geocache " +
      "coordinates. Every one is marked as a sample. Prize-pool terms and eligibility " +
      "are not yet published on this site.",
    link: "Details to be confirmed",
    linkNote: "No signup or payment flow is live on this site.",
    bridge: true,
    bridgeInfo: {
      crossing: "I-5 Ship Canal Bridge",
      water: "Lake Washington Ship Canal — Fremont to South Lake Union",
      coordinates: "47.661, -122.320",
      differentiator: "Working ships and the Ballard Locks, not just small boats",
      spots: [
        { name: "North approach", kind: "bridge" },
        { name: "South approach", kind: "bridge" },
        { name: "Under the Ship Canal Bridge", kind: "under" },
        { name: "Fremont", kind: "shore" },
        { name: "Ballard Locks", kind: "shore" },
        { name: "University Bridge", kind: "shore" },
        { name: "Gas Works Park", kind: "shore" }
      ]
    }
  },
  {
    slug: "story-mixer",
    name: "Story Mixer",
    tagline: "A small storytelling experiment in progress.",
    category: "Learning & kids",
    platform: "Android",
    status: "In development",
    version: "1.0.0+1",
    accent: "#6b4b7a",
    source: "~/story-mixer-app",
    description:
      "A storytelling app being built in the open. The full feature description " +
      "is still to be written; this page exists so the app has a stable home in the catalog.",
    features: ["Full feature list to be added once the build is settled"],
    honesty: "This listing is intentionally incomplete rather than filled with guessed features.",
    link: "Details to be confirmed",
    linkNote: "No download or purchase link yet.",
    bridge: false
  },
  {
    slug: "tell-lab",
    name: "Tell Lab",
    tagline: "A voice-reading self-experiment with honest statistics.",
    category: "Tools & research",
    platform: "Android + browser",
    status: "In development",
    version: "1.0.0+1",
    accent: "#46568a",
    source: "~/tell_lab_app",
    description:
      "A willing participant knows the ground truth for each statement, reads " +
      "some honestly and some deliberately falsely, and the tool measures whether " +
      "acoustic and timing features actually separate the two conditions. Reports " +
      "effect sizes, confidence intervals, FDR correction and a permutation-tested classifier.",
    features: [
      "Matched true/false sentence pairs so length and syllable count are controlled",
      "Local transcription with no upload",
      "Acoustic, timing and verbal-content feature extraction",
      "Effect sizes, confidence intervals and FDR correction",
      "A null result is reported as a null result"
    ],
    honesty:
      "Not a lie detector. Reading a statement you know is false is a low-stakes " +
      "task and may not generalise to deceiving another person.",
    link: "Details to be confirmed",
    linkNote: "The browser version runs on the local Wi-Fi at http://192.168.12.243:8765/.",
    bridge: false
  },
  {
    slug: "voice-tell-lab",
    name: "Voice Tell Lab",
    tagline: "Local acoustic and timing analysis for the Tell Lab experiment.",
    category: "Tools & research",
    platform: "Python CLI",
    status: "Local / research",
    version: "local",
    accent: "#4b5566",
    source: "~/voice-tell-lab",
    description:
      "The command-line research tool behind Tell Lab. It runs the read-aloud and " +
      "true/false protocols, extracts pitch, timing and verbal-content features, " +
      "transcribes locally with Whisper, and writes reports and CSVs. Nothing is uploaded.",
    features: [
      "read, record, interview, meters, analyze, features and demo commands",
      "Matched true/false sentence pairs for controlled comparisons",
      "Optional local Whisper transcription at tiny, base or small",
      "Effect sizes, FDR correction and permutation testing",
      "Demo and selftest modes that need no microphone"
    ],
    honesty:
      "Not a lie detector. It measures whether features separate two known conditions " +
      "in a willing participant's own recordings.",
    link: "Runs locally — no download link",
    linkNote: "A research tool, not a store app. Source lives in ~/voice-tell-lab.",
    bridge: false
  },
  {
    slug: "browser-apps",
    name: "Browser Apps",
    tagline: "Six browser apps for the local Wi-Fi, no install needed.",
    category: "Browser apps",
    platform: "Browser",
    status: "Available",
    version: "local",
    accent: "#8a5a2b",
    source: "~/web-apps",
    description:
      "A bundle of pages served on the local network. Open the hub on a phone or " +
      "computer on the same Wi-Fi; on iPhone, Safari → Share → Add to Home Screen gives " +
      "a home-screen shortcut. Everything saves to that device's local storage.",
    features: [
      "EarnStack planner with signed-in apps, timers and daily plans",
      "Tell Lab voice-reading sorter with file pick for Safari",
      "Fungi Field journal, badges, learn and species list",
      "Agate Lens photo upload, simple readings and field log",
      "Build gallery with anonymous posts and a 4-digit removal code",
      "Kid Code Studio workflow sharing through a URL fragment"
    ],
    honesty:
      "Browser pages, not App Store apps. No push notifications, no background work, " +
      "and camera/GPS features from the native apps are simplified or absent. The " +
      "Wi-Fi URL only works while this machine is on.",
    link: "Open on the local Wi-Fi",
    linkNote: "Hub: http://192.168.12.243:8765/ — no install, no account, nothing uploaded.",
    bridge: false
  }
]);
