'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const C = {
  bg:     '#0d1117',
  surface:'#161b22',
  border: '#30363d',
  text:   '#c9d1d9',
  dim:    '#8b949e',
  green:  '#3fb950',
  blue:   '#58a6ff',
  purple: '#d2a8ff',
  yellow: '#e3b341',
}

const PROJECTS = [
  { name: 'Fitness Tracker',   stack: 'Kotlin · TypeScript · React · PostgreSQL · JUnit5', href: 'https://github.com/AbishakeSrithar/fitness-tracker-backend' },
  { name: 'Linux Automation',  stack: 'Bash · Shell scripting · dotfiles',                  href: 'https://github.com/AbishakeSrithar' },
  { name: 'Portfolio Website', stack: 'TypeScript · Node.js · Three.js',                   href: 'https://github.com/AbishakeSrithar/personal-website' },
  { name: 'Mini Games',        stack: 'Java · Python · Assembly · JavaScript · Unity',      href: 'https://github.com/AbishakeSrithar/SpaceShooter' },
]

function Prompt() {
  return (
    <span>
      <span style={{ color: C.green }}>abishake@portfolio</span>
      <span style={{ color: C.dim }}>:</span>
      <span style={{ color: C.blue }}>~/portfolio</span>
      <span style={{ color: C.dim }}>$ </span>
    </span>
  )
}

function Cmd({ children }: { children: string }) {
  return <div style={{ marginBottom: 6 }}><Prompt />{children}</div>
}

function Out({ children }: { children: React.ReactNode }) {
  return <div style={{ paddingLeft: 0, marginBottom: 20, color: C.text }}>{children}</div>
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span style={{ color: C.dim, display: 'inline-block', minWidth: 120 }}>{label}</span>
      <span>{value}</span>
    </div>
  )
}

type HistoryEntry = { cmd: string; output: string; isError?: boolean }

const ROUTES: Record<string, string> = {
  home:    '/',
  serious: '/serious',
  snake:   '/snake',
  ascii:   '/ascii',
}

const HELP =
  'Commands: home · serious · snake · help · clear'

export default function AsciiPage() {
  const [step,    setStep]    = useState(0)
  const [input,   setInput]   = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const inputRef  = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const router    = useRouter()

  useEffect(() => {
    const delays = [200, 900, 1900, 3300, 5200, 6400, 7200]
    const timers = delays.map((d, i) => setTimeout(() => setStep(i + 1), d))
    return () => timers.forEach(clearTimeout)
  }, [])

  // Auto-focus and scroll when interactive prompt appears
  useEffect(() => {
    if (step >= 6) {
      inputRef.current?.focus()
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [step, history])

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    if (cmd === 'clear') {
      setHistory([])
      setInput('')
      return
    }

    if (cmd === 'help') {
      setHistory(h => [...h, { cmd: raw, output: HELP }])
      setInput('')
      return
    }

    const route = ROUTES[cmd]
    if (route) {
      setHistory(h => [...h, { cmd: raw, output: `navigating to ${route} ...` }])
      setInput('')
      setTimeout(() => router.push(route), 500)
      return
    }

    setHistory(h => [...h, { cmd: raw, output: `bash: ${cmd}: command not found  (try 'help')`, isError: true }])
    setInput('')
  }

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', fontFamily: 'monospace' }}
         className="p-4 sm:p-10">

      <div style={{ maxWidth: 820, margin: '0 auto' }}>

        {/* ── Linux-style terminal window ── */}
        <div style={{ border: `1px solid ${C.border}`, borderRadius: 6 }}>

          {/* Title bar — no macOS dots, just text like a real WM */}
          <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`,
                        borderRadius: '6px 6px 0 0', padding: '7px 16px',
                        display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: C.dim, fontSize: 12 }}>bash</span>
            <span style={{ color: C.dim, fontSize: 12 }}>abishake@portfolio: ~/portfolio</span>
            <span style={{ color: C.dim, fontSize: 12 }}>80×24</span>
          </div>

          {/* ── Terminal body ── */}
          <div style={{ padding: '22px 24px', lineHeight: 1.85, fontSize: 13 }}>

            {/* Last login — always visible */}
            <div style={{ color: C.dim, marginBottom: 20 }}>
              Last login: Mon May  5 09:41:22 2026 on pts/0
            </div>

            {/* Step 1 — whoami */}
            {step >= 1 && <>
              <Cmd>whoami</Cmd>
              <Out>
                <Row label="Name"       value="Abishake Srithar" />
                <Row label="Role"       value="Backend Software Engineer" />
                <Row label="Experience" value="5 years" />
                <Row label="Focus"      value="Large-scale systems · TDD · Production reliability · Debugging" />
              </Out>
            </>}

            {/* Step 2 — skills */}
            {step >= 2 && <>
              <Cmd>cat skills.txt</Cmd>
              <Out>
                <Row label="Languages"  value="Java · Kotlin · TypeScript · Bash · SQL · C# · Python" />
                <Row label="Frameworks" value="Spring Boot · Node.js · React" />
                <Row label="Infra"      value="AWS · Docker · Linux · Git · RabbitMQ · Redis" />
                <Row label="Testing"    value="JUnit · Spock (Groovy) · Jest · WireMock · Testcontainers · Playwright" />
                <Row label="Tooling"    value="Prometheus · Grafana · Bitbucket Pipelines · Bamboo" />
              </Out>
            </>}

            {/* Step 3 — experience */}
            {step >= 3 && <>
              <Cmd>cat experience.txt</Cmd>
              <Out>
                <div style={{ marginBottom: 14 }}>
                  <span style={{ color: C.yellow }}>▸ [Sep 2025 → present]</span>
                  <span style={{ color: C.purple }}> Software Engineer</span>
                  <span style={{ color: C.dim }}> · Payments Infrastructure</span>
                  <div style={{ paddingLeft: 14, marginTop: 6, color: C.text }}>
                    {[
                      'Java engineer on a global Payments Framework deployed by major banks — Barclays, NatWest, Bank of Ireland',
                      'Super high-throughput, low-latency transaction processing at financial-industry scale',
                      'Built new features across the payments stack and contributed to NFT (Non-Functional Testing) efforts',
                      'Stack: Java · JUnit · Docker · Kubernetes (K8s)',
                    ].map(l => <div key={l} style={{ marginBottom: 2 }}>· {l}</div>)}
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <span style={{ color: C.yellow }}>▸ [Aug 2021 → Jul 2025]</span>
                  <span style={{ color: C.purple }}> Software Engineer</span>
                  <span style={{ color: C.dim }}> · Large-Scale Scraping &amp; Data Processing</span>
                  <div style={{ paddingLeft: 14, marginTop: 6, color: C.text }}>
                    {[
                      'Built and maintained large-scale scraping systems processing high volumes of real-time data — Java · Kotlin · Spring Boot · TypeScript',
                      'Scraped, processed and delivered data points from major providers via event-driven async pipelines (RabbitMQ)',
                      'Platform migrations: Java 11→21, Spring Boot 2→3, MySQL→PostgreSQL (Flyway→Liquibase)',
                      'Real-time alerting integrations — SMTP · Slack · Mattermost',
                      'Debug logging workflow: dynamic page snapshots → cloud object storage → halved P1 resolution time',
                      'On-call rota: 50+ P1 & P2 incidents across data, infra, and application layers',
                      'TDD throughout: JUnit · Spock · Jest · WireMock · Playwright · Testcontainers',
                      'CI/CD: Bitbucket Pipelines · Bamboo  |  Monitoring: Prometheus · Grafana · AWS',
                    ].map(l => <div key={l} style={{ marginBottom: 2 }}>· {l}</div>)}
                  </div>
                </div>

                <div>
                  <span style={{ color: C.yellow }}>▸ [Feb 2021 → Jul 2021]</span>
                  <span style={{ color: C.purple }}> Technical Specialist</span>
                  <span style={{ color: C.dim }}> · Benefits &amp; Portals</span>
                  <div style={{ paddingLeft: 14, marginTop: 6, color: C.text }}>
                    {[
                      'Benefit portal development — C# · SQL · HTML',
                      'Business logic for flexible benefits, pension auto-enrolment, and TRS schemes',
                      'Automation scripts for data imports/exports and payroll processing',
                    ].map(l => <div key={l} style={{ marginBottom: 2 }}>· {l}</div>)}
                  </div>
                </div>
              </Out>
            </>}

            {/* Step 4 — projects */}
            {step >= 4 && <>
              <Cmd>ls -la projects/</Cmd>
              <Out>
                <div style={{ color: C.dim, marginBottom: 6, fontSize: 12 }}>
                  {'drwxr-xr-x  NAME                 STACK'}
                </div>
                <div style={{ color: C.dim, marginBottom: 8, fontSize: 12 }}>
                  {'─'.repeat(60)}
                </div>
                {PROJECTS.map(p => (
                  <div key={p.name} style={{ display: 'flex', gap: 0, marginBottom: 3 }}>
                    <span style={{ color: C.dim, marginRight: 10 }}>drwxr-xr-x</span>
                    <a href={p.href} target="_blank" style={{ color: C.blue, textDecoration: 'none', display: 'flex', gap: 0 }}>
                      <span style={{ display: 'inline-block', minWidth: 200 }}>{p.name}</span>
                      <span style={{ color: C.dim }}>{p.stack}</span>
                    </a>
                  </div>
                ))}
              </Out>
            </>}

            {/* Step 5 — github */}
            {step >= 5 && <>
              <Cmd>echo $GITHUB</Cmd>
              <Out>
                <a href="https://github.com/AbishakeSrithar" target="_blank"
                   style={{ color: C.blue }}>
                  https://github.com/AbishakeSrithar
                </a>
              </Out>
            </>}

            {/* Step 6 — interactive prompt */}
            {step >= 6 && (
              // Clicking anywhere in the terminal body refocuses the input
              <div onClick={() => inputRef.current?.focus()}>

                {/* Command history */}
                {history.map((h, i) => (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <div><Prompt />{h.cmd}</div>
                    <div style={{ paddingLeft: 0, color: h.isError ? '#f85149' : C.dim, marginTop: 2 }}>
                      {h.output}
                    </div>
                  </div>
                ))}

                {/* Live input line */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Prompt />
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') runCommand(input) }}
                    spellCheck={false}
                    autoComplete="off"
                    autoFocus
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: C.text,
                      fontFamily: 'monospace',
                      fontSize: 13,
                      caretColor: C.green,
                    }}
                  />
                </div>
                <div ref={bottomRef} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: C.dim }}>
        <Link href="/" style={{ color: C.dim }}>[ exit session ]</Link>
      </div>

      <style>{`@keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }`}</style>
    </div>
  )
}
