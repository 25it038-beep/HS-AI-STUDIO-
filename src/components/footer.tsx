import Link from "next/link";
import { products } from "@/data/products";
import { ArrowUpRight } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-ink">
      <div className="container-x py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-paper text-[10px] font-bold text-ink">
                HS
              </span>
              <span className="font-display text-[14px] font-semibold tracking-[0.14em]">
                HS AI Solutions
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-dark">
              Four systems. Four problems. One AI-driven ecosystem of real, deployed
              applications.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="eyebrow text-muted-dark">Products</p>
              <ul className="mt-4 space-y-2.5">
                {products.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/products/${p.id}`}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-muted-dark">Studio</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/70">
                <li>
                  <a className="transition-colors hover:text-white" href="#about">
                    About
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-white" href="#technology">
                    Technology
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-white" href="#building">
                    Building in public
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow text-muted-dark">Connect</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/70">
                <li>
                  <a
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                    href="https://www.linkedin.com/in/harshan-seliyan-b-s-5339b4282"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                    href="mailto:harshanseliyan28@gmail.com"
                  >
                    harshanseliyan28@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <a
            href="#projects"
            className="inline-flex h-12 items-center justify-center gap-2 self-start rounded-full border border-white/15 px-6 text-sm font-medium text-white/85 transition-colors hover:border-white/40 hover:bg-white/5 md:self-auto"
          >
            Explore <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/8 pt-6 text-xs text-white/35 sm:flex-row">
          <p>© {new Date().getFullYear()} HS AI Solutions — Independent AI product studio.</p>
          <p className="font-mono">built with intention · shipped publicly</p>
        </div>
      </div>
    </footer>
  );
}