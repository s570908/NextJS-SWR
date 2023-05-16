import Link from "next/link";
import "../styles/global.css";

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <header
        style={{
          position: "fixed",
          background: "rgba(255,255,255,0.7)",
          width: "100%",
          left: 0,
          top: 0
        }}
      >
        <nav>
          <ul>
            <li>
              <Link href="/">Scroll Animation</Link>
            </li>
            <li>
              <Link href="/infinite">Infinite Scroll</Link>
            </li>
            <li>
              <Link href="/search">Autocomplete Search</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container" style={{ marginTop: 100 }}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
