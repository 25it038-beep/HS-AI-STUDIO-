# ============================================================
#  HS AI SOLUTIONS  |  ENDLESS JOURNEY  v2
#  Run in Windows Terminal (or any VT / true-colour terminal):
#      powershell -ExecutionPolicy Bypass -File .\hs-cinematic-journey-v2.ps1
#
#  Intro -> the Eye opens -> you fall INTO THE PUPIL -> a new world
#  opens from inside it -> you dive into ITS centre -> another world...
#
#  v2: worlds are no longer a fixed list of scenes. Each world is built
#  from a random RECIPE:
#      13 patterns  x  8 space-warps  x  5 colour looks  x  overlays
#      + random palette / scale / speed / spin / seed
#  A recipe is never reused until all 520 combinations have been shown,
#  and the title of each world is built from what it really is.
#  Every 5th world is a "special" (planet, galaxy, storm, city, star,
#  sunset) from a shuffled bag.
#  Press any key to exit.
# ============================================================
try { $Host.UI.RawUI.WindowTitle = "HS AI SOLUTIONS | ENDLESS JOURNEY v2" } catch {}
try { [Console]::OutputEncoding = [System.Text.Encoding]::UTF8 } catch {}

$src = @'
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;

public static partial class HSCinema
{
    [DllImport("kernel32.dll")] static extern IntPtr GetStdHandle(int n);
    [DllImport("kernel32.dll")] static extern bool GetConsoleMode(IntPtr h, out uint m);
    [DllImport("kernel32.dll")] static extern bool SetConsoleMode(IntPtr h, uint m);

    const string ESC = "\u001b";
    const float PI = 3.14159265f;
    static int Cols, Rows, W, Hc, H, OX, OY;
    static float[] fr, fg, fb;
    static int[] pt, pb;
    static float Fade = 1f;
    static StringBuilder sb = new StringBuilder(1 << 18);
    static Stream so;
    static UTF8Encoding utf8 = new UTF8Encoding(false);
    struct Ov { public int row, col; public char ch; public float r, g, b; }
    static List<Ov> ovs = new List<Ov>();
    delegate void Scene(float t);

    // ---------- stars used by the intro / eye ----------
    static float[] stx, sty, stp, stb;
    static void InitRand(int seed)
    {
        Random rnd = new Random(seed);
        int n = 150;
        stx = new float[n]; sty = new float[n]; stp = new float[n]; stb = new float[n];
        for (int i = 0; i < n; i++)
        {
            stx[i] = (float)rnd.NextDouble(); sty[i] = (float)rnd.NextDouble();
            stp[i] = (float)rnd.NextDouble(); stb[i] = 0.15f + 0.55f * (float)rnd.NextDouble();
        }
    }

    // ---------- helpers ----------
    static float Clamp01(float x) { return x < 0f ? 0f : (x > 1f ? 1f : x); }
    static float Sm(float a, float b, float x) { float t = Clamp01((x - a) / (b - a)); return t * t * (3f - 2f * t); }
    static float Lerp(float a, float b, float t) { return a + (b - a) * t; }
    static float Sin(float x) { return (float)Math.Sin(x); }
    static float Cos(float x) { return (float)Math.Cos(x); }
    static float Exp(float x) { return (float)Math.Exp(x); }
    static float Sqrt(float x) { return (float)Math.Sqrt(x); }
    static float Pow(float a, float b) { return (float)Math.Pow(a, b); }
    static float Frac(float x) { return x - (float)Math.Floor(x); }
    static float Floor(float x) { return (float)Math.Floor(x); }
    static float Log(float x) { return (float)Math.Log(x); }
    static float Atan2(float y, float x) { return (float)Math.Atan2(y, x); }
    static float Tri(float w) { return Math.Abs(Frac(w * 0.5f + 0.5f) * 2f - 1f); }
    static float RF(Random r, float a, float b) { return a + (float)r.NextDouble() * (b - a); }

    static void Ad(int x, int y, float r, float g, float b)
    {
        if (x < 0 || y < 0 || x >= W || y >= H) return;
        int i = y * W + x;
        fr[i] += r; fg[i] += g; fb[i] += b;
    }
    static void Backdrop(float gr, float gg, float gb, float amt, float cyf)
    {
        float hy = H * cyf, ix = 1f / (W * 0.5f), iy = 1f / (H * 0.5f);
        for (int y = 0; y < H; y++)
        {
            float dy = (y - hy) * iy;
            for (int x = 0; x < W; x++)
            {
                float dx = (x - W * 0.5f) * ix;
                float d2 = dx * dx + dy * dy;
                float g = amt * Exp(-d2 * 2.4f);
                int i = y * W + x;
                fr[i] = 0.006f + gr * g; fg[i] = 0.007f + gg * g; fb[i] = 0.011f + gb * g;
            }
        }
    }
    static void Stars(float t, float alpha)
    {
        for (int k = 0; k < stx.Length; k++)
        {
            int x = (int)(stx[k] * W), y = (int)(sty[k] * H);
            float tw = 0.55f + 0.45f * Sin(t * (0.8f + stp[k] * 2f) + stp[k] * 20f);
            float v = stb[k] * tw * alpha;
            Ad(x, y, v * 0.8f, v * 0.9f, v);
        }
    }

    // ---------- text overlay ----------
    static string Sp(string s)
    {
        StringBuilder o = new StringBuilder();
        for (int i = 0; i < s.Length; i++)
        {
            if (s[i] == ' ') o.Append("  "); else o.Append(s[i]).Append(' ');
        }
        return o.ToString().TrimEnd();
    }
    static string Fit(string s) { return (Cols >= s.Length * 2 + 4) ? Sp(s) : s; }
    static void Put(int row, int col, char ch, float r, float g, float b, float a)
    {
        if (ch == ' ' || a <= 0.01f) return;
        Ov o = new Ov(); o.row = row; o.col = col; o.ch = ch; o.r = r * a; o.g = g * a; o.b = b * a;
        ovs.Add(o);
    }
    static void TextC(int row, string s, float r, float g, float b, float a)
    {
        int c0 = (Cols - s.Length) / 2;
        for (int i = 0; i < s.Length; i++) Put(row, c0 + i, s[i], r, g, b, a);
    }

    // ---------- renderer ----------
    static void Raw(string s)
    {
        byte[] bt = utf8.GetBytes(s); so.Write(bt, 0, bt.Length); so.Flush();
    }
    static void Alloc()
    {
        try { Cols = Math.Max(30, Console.WindowWidth); } catch { Cols = 120; }
        try { Rows = Math.Max(12, Console.WindowHeight); } catch { Rows = 36; }
        W = Math.Min(Cols, 150);
        Hc = Math.Min(Rows - 1, 42);
        H = Hc * 2;
        OX = (Cols - W) / 2; OY = (Rows - Hc) / 2;
        fr = new float[W * H]; fg = new float[W * H]; fb = new float[W * H];
        pt = new int[W * Hc]; pb = new int[W * Hc];
        for (int i = 0; i < pt.Length; i++) { pt[i] = -1; pb[i] = -1; }
        Raw(ESC + "[0m" + ESC + "[2J");
    }
    static int Q(float v)
    {
        int i = (int)(v * Fade * 255f + 0.5f);
        if (i < 0) i = 0; if (i > 255) i = 255;
        return i & 0xFC;
    }
    static void SetFg(int c) { sb.Append("\u001b[38;2;").Append((c >> 16) & 255).Append(';').Append((c >> 8) & 255).Append(';').Append(c & 255).Append('m'); }
    static void SetBg(int c) { sb.Append("\u001b[48;2;").Append((c >> 16) & 255).Append(';').Append((c >> 8) & 255).Append(';').Append(c & 255).Append('m'); }
    static void Render()
    {
        sb.Length = 0;
        int cF = -2, cB = -2;
        for (int cy = 0; cy < Hc; cy++)
        {
            bool move = true;
            for (int cx = 0; cx < W; cx++)
            {
                int i1 = (2 * cy) * W + cx, i2 = i1 + W, ci = cy * W + cx;
                int t = (Q(fr[i1]) << 16) | (Q(fg[i1]) << 8) | Q(fb[i1]);
                int b = (Q(fr[i2]) << 16) | (Q(fg[i2]) << 8) | Q(fb[i2]);
                if (t == pt[ci] && b == pb[ci]) { move = true; continue; }
                pt[ci] = t; pb[ci] = b;
                if (move) { sb.Append(ESC).Append('[').Append(OY + cy + 1).Append(';').Append(OX + cx + 1).Append('H'); move = false; }
                if (t == b) { if (cB != b) { SetBg(b); cB = b; } sb.Append(' '); }
                else
                {
                    if (cF != t) { SetFg(t); cF = t; }
                    if (cB != b) { SetBg(b); cB = b; }
                    sb.Append('\u2580');
                }
            }
        }
        for (int k = 0; k < ovs.Count; k++)
        {
            Ov o = ovs[k];
            int cx = o.col - OX, cy = o.row;
            int bg = 0;
            if (cx >= 0 && cx < W && cy >= 0 && cy < Hc)
            {
                int ci = cy * W + cx, t = pt[ci], b = pb[ci];
                if (t >= 0 && b >= 0)
                {
                    int rr = (((t >> 16) & 255) + ((b >> 16) & 255)) / 2;
                    int gg = (((t >> 8) & 255) + ((b >> 8) & 255)) / 2;
                    int bb = ((t & 255) + (b & 255)) / 2;
                    bg = (rr << 16) | (gg << 8) | bb;
                }
                pt[ci] = -1;
            }
            int fgc = (Q(o.r) << 16) | (Q(o.g) << 8) | Q(o.b);
            sb.Append(ESC).Append('[').Append(OY + cy + 1).Append(';').Append(o.col + 1).Append('H');
            SetFg(fgc); SetBg(bg); sb.Append(o.ch);
        }
        sb.Append(ESC).Append("[0m");
        Raw(sb.ToString());
    }
    static bool KeyHit()
    {
        try { if (Console.KeyAvailable) { Console.ReadKey(true); return true; } } catch (Exception) { }
        return false;
    }
    static bool Run(float dur, Scene draw)
    {
        Stopwatch sw = Stopwatch.StartNew();
        while (true)
        {
            float t = (float)sw.Elapsed.TotalSeconds;
            if (t >= dur) break;
            try { if (Console.WindowWidth != Cols || Console.WindowHeight != Rows) Alloc(); } catch { }
            Fade = 1f; ovs.Clear();
            draw(t);
            Render();
            if (KeyHit()) return false;
            int wait = 33 - (int)((sw.Elapsed.TotalSeconds - t) * 1000.0);
            if (wait > 1) Thread.Sleep(wait);
        }
        return true;
    }

    // =====================================================
    //  WORLD ENGINE
    // =====================================================
    static int WType, WSeed, WCount;
    static float WDur = 14f, WZ = 4.2f, WPh;
    static float[] P = new float[10];
    static double[] D = new double[4];
    static float[] pa = new float[3], pbb = new float[3], pcc = new float[3], pdd = new float[3];
    static float acR, acG, acB;
    static string WName = "";

    // recipe parameters
    static int RFd, RW, RC, ROv, RP, FK, RN;
    static float RS, RA, RSp, RK, RK2;
    const int NF = 13, NW = 8, NC = 5;
    static Dictionary<int, bool> usedSig = new Dictionary<int, bool>();
    static int lastField = -1;

    static double[][] JC = new double[][] {
        new double[] { -0.8, 0.156 }, new double[] { 0.285, 0.01 }, new double[] { -0.4, 0.6 },
        new double[] { 0.355, 0.355 }, new double[] { -0.70176, -0.3842 }, new double[] { -0.835, -0.2321 },
        new double[] { -0.123, 0.745 }, new double[] { 0.37, -0.1 }
    };
    static double[][] MC = new double[][] {
        new double[] { -0.743643887037151, 0.131825904205330 }, new double[] { -0.7453, 0.1127 },
        new double[] { -1.25066, 0.02012 }, new double[] { 0.2549870375144766, 0.0005679790528465 },
        new double[] { -0.16070135, 1.0375665 }, new double[] { 0.001643721971153, -0.822467633298876 },
        new double[] { -1.7685, 0.0 }, new double[] { -0.77568377, 0.13646737 }
    };
    static double[][] SC = new double[][] {
        new double[] { -1.7443359375, -0.017451171875 }, new double[] { -1.755, -0.025 },
        new double[] { -1.861, -0.003 }, new double[] { -1.62, -0.0 }
    };

    static string[] WarpAdj = new string[] { "DRIFTING", "KALEIDOSCOPIC", "ENDLESS", "SWIRLING", "MIRRORED", "RIPPLING", "CRYSTALLINE", "INVERTED" };
    static string[] FieldNoun = new string[] { "NEBULA", "MARBLE", "LIGHTNING", "CELLS", "WAVES", "PLASMA", "CIRCUITS", "LABYRINTH", "SPIRAL", "BLOOM", "LIQUID LIGHT", "FRACTAL", "MOIRE" };
    static string[] FractalNoun = new string[] { "MANDELBROT", "JULIA SET", "BURNING SHIP" };
    static string[] ColorSuffix = new string[] { "", " IN CONTOURS", " IN TWO TONES", " IN NEON", " IN EMBERS" };
    static string[][] SpecialNames = new string[][] {
        new string[] { "A GALAXY, TURNING SLOWLY", "TEN BILLION SUNS", "THE SPIRAL OF LIGHT" },
        new string[] { "A WORLD OF ITS OWN", "UNCHARTED PLANET", "ALIEN SKIES" },
        new string[] { "INSIDE THE STORM", "THE QUIET EYE", "A SPIRAL OF THUNDER" },
        new string[] { "CITY OF LIGHT", "NEON CIRCUITS", "THE SLEEPLESS GRID" },
        new string[] { "THE HEART OF A STAR", "A SUN BEING BORN", "FIRE AND GRAVITY" },
        new string[] { "THE LAST LIGHT", "AT THE EDGE OF THE SUN", "ENDLESS HORIZON" }
    };

    // ---------- hash / noise ----------
    static float Hash(int x, int y, int s)
    {
        int n = x * 374761393 + y * 668265263 + s * 1442695041;
        n = (n ^ (n >> 13)) * 1274126177;
        n = n ^ (n >> 16);
        return (n & 0x7fffffff) / 2147483648f;
    }
    static float VNoise(float x, float y, int s)
    {
        int xi = (int)Math.Floor(x), yi = (int)Math.Floor(y);
        float fx = x - xi, fy = y - yi;
        fx = fx * fx * (3f - 2f * fx); fy = fy * fy * (3f - 2f * fy);
        float a = Hash(xi, yi, s), b = Hash(xi + 1, yi, s), c = Hash(xi, yi + 1, s), d = Hash(xi + 1, yi + 1, s);
        return Lerp(Lerp(a, b, fx), Lerp(c, d, fx), fy);
    }
    static float Fbm(float x, float y, int s, int oct)
    {
        float v = 0f, a = 0.5f;
        for (int i = 0; i < oct; i++)
        {
            v += a * VNoise(x, y, s + i * 7);
            x = x * 2.03f + 17.1f; y = y * 2.03f + 9.7f; a *= 0.5f;
        }
        return v;
    }
    static float StarField(float u, float v, float t, int s)
    {
        float gx = u * 38f, gy = v * 38f;
        int ix = (int)Math.Floor(gx), iy = (int)Math.Floor(gy);
        float h = Hash(ix, iy, s);
        if (h < 0.975f) return 0f;
        float fx = gx - ix - 0.5f, fy = gy - iy - 0.5f;
        float tw = 0.6f + 0.4f * Sin(t * (1.5f + h * 4f) + h * 50f);
        return (h - 0.975f) * 40f * tw * Exp(-(fx * fx + fy * fy) * 14f);
    }
    static void Pal(float t, out float r, out float g, out float b)
    {
        float tp = 2f * PI;
        r = pa[0] + pbb[0] * Cos(tp * (pcc[0] * t + pdd[0]));
        g = pa[1] + pbb[1] * Cos(tp * (pcc[1] * t + pdd[1]));
        b = pa[2] + pbb[2] * Cos(tp * (pcc[2] * t + pdd[2]));
        if (r < 0f) r = 0f; if (g < 0f) g = 0f; if (b < 0f) b = 0f;
    }

    // ---------- generators ----------
    static void GenCommon(Random rg)
    {
        WSeed = rg.Next(1, 90000);
        WPh = (float)rg.NextDouble() * 60f;
        for (int i = 0; i < 3; i++)
        {
            pa[i] = RF(rg, 0.30f, 0.56f); pbb[i] = RF(rg, 0.30f, 0.55f);
            pcc[i] = RF(rg, 0.6f, 1.4f); pdd[i] = RF(rg, 0f, 1f);
        }
        for (int i = 0; i < 10; i++) P[i] = (float)rg.NextDouble();
        float r, g, b;
        Pal(0.32f, out r, out g, out b);
        acR = Lerp(r, 1f, 0.35f); acG = Lerp(g, 1f, 0.35f); acB = Lerp(b, 1f, 0.35f);
        WZ = 4.0f;
    }

    static void GenSpecial(Random rg, int idx)
    {
        WType = idx;
        string[] nm = SpecialNames[idx];
        WName = nm[rg.Next(nm.Length)];
    }

    static void GenRecipe(Random rg)
    {
        WType = 100;
        if (usedSig.Count >= NF * NW * NC) usedSig.Clear();
        int fi, wi, ci, sig, guard = 0;
        do
        {
            fi = rg.Next(NF); wi = rg.Next(NW); ci = rg.Next(NC);
            sig = (fi * NW + wi) * NC + ci;
            guard++;
        } while ((usedSig.ContainsKey(sig) || fi == lastField) && guard < 300);
        usedSig[sig] = true; lastField = fi;
        RFd = fi; RW = wi; RC = ci;
        RS = RF(rg, 1.4f, 5.0f);
        RN = 3 + rg.Next(7);
        RA = RF(rg, 0f, 6.28f);
        RSp = RF(rg, -1.5f, 1.5f); if (Math.Abs(RSp) < 0.3f) RSp = 0.6f;
        RK = RF(rg, 0.3f, 1f);
        RK2 = RF(rg, 0.8f, 2.2f);
        RP = rg.Next(6);
        FK = rg.Next(3);
        ROv = rg.Next(4);
        string noun = FieldNoun[fi];
        if (fi == 11)
        {
            double[][] src2 = (FK == 0) ? MC : ((FK == 1) ? JC : SC);
            int j = rg.Next(src2.Length);
            D[0] = src2[j][0]; D[1] = src2[j][1]; D[2] = 1.5;
            WZ = 4.4f;
            noun = FractalNoun[FK];
        }
        WName = WarpAdj[wi] + " " + noun + ColorSuffix[ci];
    }

    static void Sample(float u, float v, float t, out float r, out float g, out float b)
    {
        r = 0f; g = 0f; b = 0f;
        switch (WType)
        {
            case 0: SGalaxy(u, v, t, out r, out g, out b); break;
            case 1: SPlanet(u, v, t, out r, out g, out b); break;
            case 2: SStorm(u, v, t, out r, out g, out b); break;
            case 3: SCity(u, v, t, out r, out g, out b); break;
            case 4: SSun(u, v, t, out r, out g, out b); break;
            case 5: SSunset(u, v, t, out r, out g, out b); break;
            default: SRecipe(u, v, t, out r, out g, out b); break;
        }
    }

    // =====================================================
    //  RECIPE WORLDS : warp space -> pattern field -> colour look -> overlay
    // =====================================================
    static float Field(float x, float y, float ta, float t, out bool dark)
    {
        dark = false;
        float s = RS;
        switch (RFd)
        {
            case 0:
            {
                float f0 = Fbm(x * s + ta * 0.05f, y * s, WSeed, 5);
                return Clamp01((f0 - 0.25f) * 1.8f);
            }
            case 1:
            {
                float w1 = Fbm(x * s * 0.7f + ta * 0.05f, y * s * 0.7f, WSeed, 4);
                float f1 = Fbm(x * s + w1 * 3f, y * s - w1 * 3f + ta * 0.04f, WSeed + 3, 4);
                return Clamp01((f1 - 0.25f) * 1.8f);
            }
            case 2:
            {
                float n2 = Fbm(x * s, y * s + ta * 0.1f, WSeed, 5);
                return Pow(1f - Math.Abs(2f * n2 - 1f), 3f);
            }
            case 3:
            {
                float s3 = s * 1.2f;
                float px = x * s3 + ta * 0.02f, py = y * s3;
                int bx = (int)Math.Floor(px), by = (int)Math.Floor(py);
                float d1 = 9f, d2 = 9f;
                int ix1 = 0, iy1 = 0;
                for (int j = -1; j <= 1; j++)
                    for (int i = -1; i <= 1; i++)
                    {
                        int kx = bx + i, ky = by + j;
                        float fx = kx + Hash(kx, ky, WSeed) + 0.2f * Sin(ta * 0.8f + Hash(kx, ky, WSeed + 2) * 6.28f);
                        float fy = ky + Hash(kx, ky, WSeed + 1) + 0.2f * Cos(ta * 0.7f + Hash(kx, ky, WSeed + 3) * 6.28f);
                        float dx = px - fx, dy = py - fy;
                        float dd = Sqrt(dx * dx + dy * dy);
                        if (dd < d1) { d2 = d1; d1 = dd; ix1 = kx; iy1 = ky; }
                        else if (dd < d2) d2 = dd;
                    }
                return Clamp01(Hash(ix1, iy1, WSeed + 7) * 0.6f + 0.4f * Sm(0f, 0.15f, d2 - d1));
            }
            case 4:
            {
                float sum4 = 0f;
                for (int k = 0; k < 3; k++)
                {
                    float cxk = 0.6f * Cos(ta * 0.3f * (k + 1) + k * 2f);
                    float cyk = 0.6f * Sin(ta * 0.27f * (k + 1) + k * 1.3f);
                    float dx = x - cxk, dy = y - cyk;
                    sum4 += Sin(Sqrt(dx * dx + dy * dy) * s * 5f - ta * 2f);
                }
                return Clamp01(0.5f + sum4 / 6f);
            }
            case 5:
            {
                float s5 = s * 1.4f;
                float sum5 = Sin(x * s5 + ta) + Sin(y * s5 * 1.3f - ta * 0.8f) + Sin((x + y) * s5 * 0.7f + ta * 0.6f)
                           + Sin(Sqrt(x * x + y * y) * s5 * 1.6f - ta * 1.4f);
                return Clamp01(0.5f + 0.125f * sum5);
            }
            case 6:
            {
                float gx = x * s * 1.2f, gy = y * s * 1.2f;
                int ix = (int)Math.Floor(gx), iy = (int)Math.Floor(gy);
                float fx = gx - ix, fy = gy - iy;
                float hh = Hash(ix, iy, WSeed);
                float m = Math.Min(Math.Min(fx, 1f - fx), Math.Min(fy, 1f - fy));
                float res = 0.12f * hh;
                if (hh > 0.35f && m < 0.07f)
                {
                    float pulse = Pow(Frac((gx + gy) * 0.4f - ta * (0.4f + hh)), 8f);
                    res += 0.45f + 0.55f * pulse;
                }
                if (hh > 0.9f && m > 0.3f) res += 0.8f;
                return Clamp01(res);
            }
            case 7:
            {
                float gx = x * s * 1.1f, gy = y * s * 1.1f;
                int ix = (int)Math.Floor(gx), iy = (int)Math.Floor(gy);
                float fx = gx - ix, fy = gy - iy;
                float hh = Hash(ix, iy, WSeed);
                if (hh > 0.5f) fx = 1f - fx;
                float a1 = Sqrt(fx * fx + fy * fy) - 0.5f;
                float a2 = Sqrt((1f - fx) * (1f - fx) + (1f - fy) * (1f - fy)) - 0.5f;
                float dm = Math.Min(Math.Abs(a1), Math.Abs(a2));
                return Clamp01(Exp(-dm * dm * 220f) + 0.1f * hh);
            }
            case 8:
            {
                float r8 = Sqrt(x * x + y * y) + 0.0001f, a8 = Atan2(y, x);
                int n8 = 2 + (RN % 5);
                float sp8 = n8 * (a8 + RK * 3f * Log(r8 + 0.05f) - ta * 0.4f);
                float arm = 0.5f + 0.5f * Cos(sp8);
                return Clamp01(Pow(arm, 1.5f) * 0.7f + 0.3f * Fbm(x * s, y * s, WSeed, 3));
            }
            case 9:
            {
                float r9 = Sqrt(x * x + y * y) + 0.0001f, a9 = Atan2(y, x);
                float pet = Pow(Math.Abs(Cos(RN * 0.5f * a9)), 0.6f);
                float w9 = Sin(r9 * s * 6f * (0.6f + pet) - ta * 1.2f);
                return Clamp01(0.5f + 0.5f * w9 * pet);
            }
            case 10:
            {
                float sum10 = 0f;
                float sc10 = 0.5f + 0.15f * s;
                float xs = x * sc10, ys = y * sc10;
                for (int k = 0; k < 5; k++)
                {
                    float ph = Hash(k, 3, WSeed) * 6.28f;
                    float bx = 0.7f * Sin(ta * 0.35f * (0.6f + 0.2f * k) + ph);
                    float by = 0.7f * Cos(ta * 0.3f * (0.7f + 0.15f * k) + ph * 1.7f);
                    float dx = xs - bx, dy = ys - by;
                    sum10 += 0.04f / (dx * dx + dy * dy + 0.01f);
                }
                return Clamp01(sum10 * 0.35f);
            }
            case 11:
            {
                double sc = D[2] * Math.Exp(-0.17 * t);
                double px = x * sc, py = y * sc;
                double cr, ci, zr, zi;
                if (FK == 1) { zr = px; zi = py; cr = D[0]; ci = D[1]; }
                else { cr = D[0] + px; ci = D[1] + py; zr = 0.0; zi = 0.0; }
                int mx = 100, it = 0;
                double zz = 0.0;
                while (it < mx)
                {
                    double zr2 = zr * zr, zi2 = zi * zi;
                    zz = zr2 + zi2;
                    if (zz > 256.0) break;
                    if (FK == 2) zi = Math.Abs(2.0 * zr * zi) + ci; else zi = 2.0 * zr * zi + ci;
                    zr = zr2 - zi2 + cr;
                    it++;
                }
                if (it >= mx) { dark = true; return 0f; }
                double sm = it + 1.0 - Math.Log(Math.Log(zz) * 0.5) / 0.6931471805599453;
                return Frac((float)(sm * 0.04 + ta * 0.03));
            }
            case 12:
            {
                float c1x = 0.3f * Cos(ta * 0.17f), c1y = 0.3f * Sin(ta * 0.13f);
                float c2x = -0.3f * Cos(ta * 0.11f), c2y = -0.3f * Sin(ta * 0.19f);
                float e1 = Sqrt((x - c1x) * (x - c1x) + (y - c1y) * (y - c1y));
                float e2 = Sqrt((x - c2x) * (x - c2x) + (y - c2y) * (y - c2y));
                return Clamp01(0.5f + 0.5f * Sin(e1 * s * 14f) * Sin(e2 * s * 14f + ta));
            }
        }
        return 0f;
    }

    static void SRecipe(float u, float v, float t, out float r, out float g, out float b)
    {
        float ta = t + WPh;
        float zl = Exp(-0.06f * t);
        float a0 = RA + ta * RSp * 0.05f;
        float c0 = Cos(a0), s0 = Sin(a0);
        float x = (u * c0 - v * s0) * zl, y = (u * s0 + v * c0) * zl;
        float rad = Sqrt(x * x + y * y) + 0.0001f;
        float ang = Atan2(y, x);
        switch (RW)
        {
            case 1:
            {
                float a1 = ang + ta * 0.1f;
                float seg = 2f * PI / RN;
                float aw = a1 - seg * Floor(a1 / seg);
                aw = Math.Abs(aw - seg * 0.5f);
                x = rad * Cos(aw); y = rad * Sin(aw);
                break;
            }
            case 2:
            {
                x = Math.Abs(ang) * (RN * 0.18f);
                y = Log(rad) * 0.9f - ta * 0.25f * RSp;
                break;
            }
            case 3:
            {
                float sw = ang + RK * 5f * Exp(-rad * 2.0f) + ta * 0.1f * RSp;
                x = rad * Cos(sw); y = rad * Sin(sw);
                break;
            }
            case 4:
            {
                float tl = 0.9f + RN * 0.12f;
                x = Tri(x * tl) * 1.4f; y = Tri(y * tl) * 1.4f;
                break;
            }
            case 5:
            {
                float ox = x, oy = y;
                x = ox + 0.12f * Sin(oy * (4f + RN) + ta * 1.2f);
                y = oy + 0.12f * Sin(ox * (4f + RN) + ta * 0.9f);
                break;
            }
            case 6:
            {
                float off = 0.25f + 0.2f * RK;
                float ca6 = Cos(RK2), sa6 = Sin(RK2);
                for (int k = 0; k < 4; k++)
                {
                    x = Math.Abs(x) - off; y = Math.Abs(y) - off;
                    float tx = x * ca6 - y * sa6;
                    y = x * sa6 + y * ca6; x = tx;
                }
                break;
            }
            case 7:
            {
                float d2 = x * x + y * y + 0.08f;
                x = x / d2 * 0.45f; y = y / d2 * 0.45f;
                break;
            }
            default: break;
        }
        bool dark;
        float f = Field(x, y, ta, t, out dark);
        f = Clamp01(f);
        float cr = 0.01f, cg = 0.01f, cb = 0.03f;
        if (!dark)
        {
            if (RC == 0)
            {
                Pal(f * RK2 + ta * 0.04f, out cr, out cg, out cb);
                float lm = 0.30f + 0.95f * f;
                cr *= lm; cg *= lm; cb *= lm;
            }
            else if (RC == 1)
            {
                float nb = 5f + RN;
                float qn = Floor(f * nb) / nb;
                Pal(qn * 1.2f + 0.1f, out cr, out cg, out cb);
                float eb = 0.35f + 0.65f * Sm(0f, 0.10f, Frac(f * nb));
                float lm = (0.4f + 0.8f * qn) * eb;
                cr *= lm; cg *= lm; cb *= lm;
            }
            else if (RC == 2)
            {
                float lr, lg, lb, hr, hg, hb;
                Pal(0.1f, out lr, out lg, out lb);
                Pal(0.55f, out hr, out hg, out hb);
                float pw = Pow(f, 1.6f);
                float gl6 = Pow(f, 6f) * 0.8f;
                cr = Lerp(lr * 0.12f, hr * 1.4f, pw) + acR * gl6;
                cg = Lerp(lg * 0.12f, hg * 1.4f, pw) + acG * gl6;
                cb = Lerp(lb * 0.12f, hb * 1.4f, pw) + acB * gl6;
            }
            else if (RC == 3)
            {
                float k3 = 6f + RN;
                float qd = (Frac(f * k3) - 0.5f) * 9f;
                float ln = Exp(-qd * qd);
                Pal(f * 1.4f + ta * 0.05f, out cr, out cg, out cb);
                cr = cr * ln * 1.5f + 0.01f; cg = cg * ln * 1.5f + 0.01f; cb = cb * ln * 1.5f + 0.015f;
            }
            else
            {
                float i1 = Clamp01(f * 3f), i2 = Clamp01(f * 3f - 1f), i3 = Clamp01(f * 3f - 2f);
                switch (RP)
                {
                    case 0: cr = i1; cg = i2; cb = i3; break;
                    case 1: cr = i3; cg = i2; cb = i1; break;
                    case 2: cr = i2; cg = i1; cb = i3; break;
                    case 3: cr = i2; cg = i3; cb = i1; break;
                    case 4: cr = i1; cg = i3; cb = i2; break;
                    default: cr = i3; cg = i1; cb = i2; break;
                }
            }
        }
        float sr2 = u * u + v * v;
        if ((ROv & 1) != 0)
        {
            float st = StarField(u, v, ta, WSeed + 13) * (dark ? 1f : (1f - f));
            cr += st; cg += st; cb += st;
        }
        if ((ROv & 2) != 0)
        {
            float gl = Exp(-sr2 * 5f) * (0.35f + 0.2f * Sin(ta * 2f));
            cr += acR * gl; cg += acG * gl; cb += acB * gl;
        }
        float vig = 1f - 0.16f * sr2;
        if (vig < 0.2f) vig = 0.2f;
        r = cr * vig; g = cg * vig; b = cb * vig;
    }

    // =====================================================
    //  SPECIAL WORLDS
    // =====================================================
    static void SGalaxy(float u, float v, float t, out float r, out float g, out float b)
    {
        float ta = t + WPh;
        float rad = Sqrt(u * u + v * v) + 0.0001f;
        float ang = Atan2(v, u);
        int N = 2 + (int)(P[0] * 3.99f);
        float tw = 2.2f + P[1] * 3f;
        float sp = ang + tw * Log(rad + 0.08f) - ta * 0.3f;
        float arm = 0.5f + 0.5f * Cos(N * sp);
        arm = Pow(arm, 2.4f);
        float dust = Fbm(u * 5f + 3f, v * 5f + 1f, WSeed, 4);
        float dens = arm * Exp(-rad * 1.15f) * (0.35f + 1.3f * dust);
        float core = Exp(-rad * rad * 34f);
        float pr, pg, pb;
        Pal(rad * 0.7f + 0.15f, out pr, out pg, out pb);
        float hz = Exp(-rad * 2.2f) * 0.12f;
        float st = StarField(u, v, ta, WSeed + 3);
        r = pr * dens * 1.7f + core * 1.3f + hz * pr + st;
        g = pg * dens * 1.7f + core * 1.0f + hz * pg + st;
        b = pb * dens * 1.7f + core * 0.8f + hz * pb + st;
    }

    static void SPlanet(float u, float v, float t, out float r, out float g, out float b)
    {
        float ta = t + WPh;
        float R = 0.62f;
        float d = Sqrt(u * u + v * v);
        float st = StarField(u, v, ta, WSeed + 4);
        float pr = 0f, pg = 0f, pb = 0f;
        if (d < R)
        {
            float nx = u / R, ny = v / R;
            float nz = Sqrt(Math.Max(0f, 1f - nx * nx - ny * ny));
            float cs = Cos(ta * 0.22f), sn = Sin(ta * 0.22f);
            float rx = nx * cs + nz * sn, rz = -nx * sn + nz * cs;
            float fq = 2.0f + P[1] * 1.5f;
            float h = (Fbm(rx * fq, ny * fq, WSeed, 5) + Fbm(rz * fq + 9f, ny * fq + 4f, WSeed, 5)
                     + Fbm(rx * fq + 21f, rz * fq + 13f, WSeed, 5)) * (1f / 3f);
            h = Clamp01((h - 0.5f) * 2.0f + 0.5f);
            float sea = 0.45f + 0.12f * P[0];
            if (h < sea)
            {
                float dp = h / sea;
                Pal(0.02f + dp * 0.12f, out pr, out pg, out pb);
                float k = 0.55f + 0.6f * dp;
                pr *= k; pg *= k; pb *= k;
            }
            else
            {
                float l2 = (h - sea) / (1f - sea);
                Pal(0.40f + l2 * 0.45f, out pr, out pg, out pb);
            }
            float ice = Sm(0.80f, 0.92f, Math.Abs(ny) + 0.08f * (h - 0.5f));
            pr = Lerp(pr, 0.92f, ice); pg = Lerp(pg, 0.96f, ice); pb = Lerp(pb, 1f, ice);
            float cl = Sm(0.56f, 0.78f, Fbm(rx * 3.2f + ta * 0.08f, ny * 3.2f, WSeed + 31, 4));
            pr = Lerp(pr, 1f, cl * 0.75f); pg = Lerp(pg, 1f, cl * 0.75f); pb = Lerp(pb, 1f, cl * 0.75f);
            float lam = 0.10f + 0.95f * Clamp01(nx * -0.5f + ny * -0.55f + nz * 0.67f);
            pr *= lam; pg *= lam; pb *= lam;
            float rim = Pow(1f - nz, 3f);
            r = pr + acR * rim * 0.7f * (0.3f + lam);
            g = pg + acG * rim * 0.7f * (0.3f + lam);
            b = pb + acB * rim * 0.7f * (0.3f + lam);
        }
        else
        {
            float halo = Exp(-(d - R) * 11f) * 0.45f;
            r = st + acR * halo; g = st + acG * halo; b = st + acB * halo;
        }
    }

    static void SStorm(float u, float v, float t, out float r, out float g, out float b)
    {
        float ta = t + WPh;
        float rad = Sqrt(u * u + v * v) + 0.0001f;
        float ang = Atan2(v, u);
        int N = 2 + (int)(P[0] * 2.99f);
        float tw = 2.0f + P[1] * 2.5f;
        float sp = ang + tw * Log(rad + 0.06f) - ta * 0.45f;
        float band = 0.5f + 0.5f * Cos(N * sp);
        float wx = u + 0.22f * (Fbm(u * 3f + ta * 0.1f, v * 3f, WSeed, 3) - 0.5f);
        float wy = v + 0.22f * (Fbm(u * 3f + 7f, v * 3f - ta * 0.1f, WSeed + 2, 3) - 0.5f);
        float cloud = Fbm(wx * 6f, wy * 6f, WSeed + 5, 5);
        float dens = Clamp01(band * 0.95f + cloud * 0.9f - 0.45f);
        dens *= Sm(0.08f, 0.22f, rad);
        float pr, pg, pb, qr, qg, qb;
        Pal(0.05f + 0.1f * cloud, out pr, out pg, out pb);
        Pal(0.5f, out qr, out qg, out qb);
        float sr = pr * 0.35f, sg = pg * 0.35f, sbl = pb * 0.35f;
        float ccr = Lerp(0.85f, qr, 0.25f), ccg = Lerp(0.88f, qg, 0.25f), ccb = Lerp(0.95f, qb, 0.25f);
        float lit = 0.45f + 0.7f * cloud;
        r = Lerp(sr, ccr * lit, dens); g = Lerp(sg, ccg * lit, dens); b = Lerp(sbl, ccb * lit, dens);
        float ew = Exp(-Pow((rad - 0.13f) * 22f, 2f)) * 0.5f * (0.5f + 0.5f * Sin(ang * 5f + ta));
        r += ew * 0.9f; g += ew * 0.9f; b += ew;
        float lf = Hash((int)Math.Floor(ta * 6f), (int)Math.Floor(u * 2.5f) * 31 + (int)Math.Floor(v * 2.5f), WSeed + 9);
        float fl = lf > 0.975f ? (lf - 0.975f) * 40f * dens : 0f;
        r += fl * 0.7f; g += fl * 0.8f; b += fl;
    }

    static void SCity(float u, float v, float t, out float r, out float g, out float b)
    {
        float ta = t + WPh;
        float a = ta * 0.04f + P[3] * 6.28f;
        float ca = Cos(a), sa = Sin(a);
        float ru = u * ca - v * sa, rv = u * sa + v * ca;
        float S = 4f + 5f * P[0];
        float qx = ru * S, qy = rv * S;
        int bx = (int)Math.Floor(qx), by = (int)Math.Floor(qy);
        float fx = qx - bx, fy = qy - by;
        float rdw = 0.14f;
        float pr, pg, pb;
        float haze = Fbm(u * 1.5f + 3f, v * 1.5f, WSeed, 3);
        float hr, hg, hb;
        Pal(haze * 0.2f, out hr, out hg, out hb);
        r = hr * 0.10f; g = hg * 0.10f; b = hb * 0.14f;
        if (fx < rdw || fy < rdw)
        {
            float hq = Hash(bx, by, WSeed + 2);
            float along = (fx < rdw && fy >= rdw) ? qy : qx;
            float head = Frac(along * 0.35f * (1f + hq) - ta * (0.25f + 0.5f * hq) + hq * 9f);
            float car = Pow(head, 14f);
            Pal(0.55f + hq * 0.3f, out pr, out pg, out pb);
            r += pr * (0.18f + 1.4f * car); g += pg * (0.18f + 1.4f * car); b += pb * (0.18f + 1.4f * car);
        }
        else
        {
            float bh = Hash(bx, by, WSeed);
            float wx = (fx - rdw) / (1f - rdw) * 4f, wy = (fy - rdw) / (1f - rdw) * 5f;
            int iwx = (int)Math.Floor(wx), iwy = (int)Math.Floor(wy);
            float ww = Hash(iwx + bx * 11, iwy + by * 17, WSeed + 5 + (int)Math.Floor(ta * 0.7f * bh));
            float inx = wx - iwx, iny = wy - iwy;
            float mask = Sm(0.1f, 0.2f, inx) * Sm(0.9f, 0.8f, inx) * Sm(0.1f, 0.2f, iny) * Sm(0.9f, 0.8f, iny);
            float on = ww > 0.5f ? 1f : 0.06f;
            Pal(0.1f + bh * 0.35f, out pr, out pg, out pb);
            float roof = 0.04f + 0.08f * bh;
            float lt = on * mask * (0.5f + bh);
            r += pr * (roof + lt); g += pg * (roof + lt); b += pb * (roof + lt);
        }
    }

    static void SSun(float u, float v, float t, out float r, out float g, out float b)
    {
        float ta = t + WPh;
        float R = 0.52f;
        float d = Sqrt(u * u + v * v);
        float ang = Atan2(v, u);
        float st = StarField(u, v, ta, WSeed + 6) * 0.6f;
        if (d < R)
        {
            float q = d / R;
            float mu = Sqrt(Math.Max(0f, 1f - q * q));
            float gran = Fbm(u * 8f + ta * 0.12f, v * 8f - ta * 0.09f, WSeed, 4);
            float gran2 = Fbm(u * 20f - ta * 0.2f, v * 20f + 5f, WSeed + 4, 3);
            float spot = Sm(0.60f, 0.70f, Fbm(u * 3f + 9f, v * 3f + 2f, WSeed + 9, 3));
            float pr, pg, pb;
            Pal(0.05f + gran * 0.35f + mu * 0.35f, out pr, out pg, out pb);
            float lum = (0.45f + 0.95f * mu) * (0.8f + 0.4f * gran2) * (1f - 0.7f * spot);
            r = pr * lum * 1.3f; g = pg * lum * 1.3f; b = pb * lum * 1.3f;
        }
        else
        {
            float x = d - R;
            float cor = Exp(-x * 4.5f);
            float streak = 0.55f + 0.45f * Sin(ang * 13f + ta * 0.4f + 6f * Fbm(ang * 2f + 9f, ta * 0.2f, WSeed + 6, 3));
            r = acR * cor * streak * 0.9f + st; g = acG * cor * streak * 0.9f + st; b = acB * cor * streak * 0.9f + st;
        }
    }

    static void SSunset(float u, float v, float t, out float r, out float g, out float b)
    {
        float ta = t + WPh;
        float hz = 0.2f;
        float R = 0.20f + 0.16f * P[0];
        float d = Sqrt(u * u + v * v);
        float pr = 0f, pg = 0f, pb = 0f;
        float st = StarField(u, v, ta, WSeed + 8);
        r = 0f; g = 0f; b = 0f;
        if (v < hz)
        {
            float sk = Clamp01((v + 1f) / (hz + 1f));
            Pal(sk * 0.45f, out pr, out pg, out pb);
            float k = 0.25f + 0.85f * sk * sk;
            r = pr * k + st * (1f - sk); g = pg * k + st * (1f - sk); b = pb * k + st * (1f - sk);
            if (d > R)
            {
                float glow = Exp(-(d - R) * 4.2f) * 0.55f;
                r += acR * glow; g += acG * glow; b += acB * glow;
            }
            else
            {
                bool cut = v > 0.02f && Frac(v * 20f) < 0.15f + v * 1.6f;
                if (!cut)
                {
                    Pal(0.22f + (d / R) * 0.18f, out pr, out pg, out pb);
                    r = pr * 1.5f + 0.2f; g = pg * 1.5f + 0.2f; b = pb * 1.5f + 0.2f;
                }
            }
            float mh = hz - 0.03f - 0.16f * Fbm(u * 2.2f + 3f, 0.7f, WSeed + 3, 4);
            if (v > mh) { r = 0.01f; g = 0.01f; b = 0.02f; }
        }
        else
        {
            float dep = v - hz + 0.015f;
            float persp = 1f / dep;
            float wv = Sin(persp * 2.6f - ta * 1.3f + Sin(u * persp * 1.2f) * 1.5f) * 0.5f + 0.5f;
            Pal(0.6f, out pr, out pg, out pb);
            float glit = Exp(-u * u * (1.4f + 7f * dep)) * (0.35f + 0.9f * wv) * Exp(-dep * 1.6f);
            r = pr * 0.10f + acR * glit * 1.1f; g = pg * 0.10f + acG * glit * 1.1f; b = pb * 0.12f + acB * glit * 1.1f;
        }
    }

    // ---------- one world's life: open from centre -> live -> dive into centre ----------
    static void WorldFrame(float t)
    {
        const float Tin = 2.2f, Tout = 3.4f;
        float hh = H * 0.5f, cx = W * 0.5f, cy = H * 0.5f;
        float rd = 3.2f * Sm(0.05f, Tin, t);
        float so2 = Clamp01((t - (WDur - Tout)) / Tout);
        float zo = Exp(WZ * Pow(so2, 1.4f));
        float hole = 3.2f * Sm(0.30f, 0.98f, so2);
        float zi = Math.Min(1f, Math.Max(0.02f, rd / 1.9f));
        float zz = zi * zo;
        float rimIn = 1f - Sm(1.4f, Tin + 0.4f, t);
        float rimOut = Sm(0.30f, 0.55f, so2) * (1f - Sm(0.93f, 1.0f, so2));
        for (int y = 0; y < H; y++)
        {
            float v0 = (y - cy) / hh;
            for (int x = 0; x < W; x++)
            {
                float u0 = (x - cx) / hh;
                float d = Sqrt(u0 * u0 + v0 * v0);
                int i = y * W + x;
                float m = Clamp01((rd - d) * hh * 0.7f);
                if (hole > 0f) m *= Clamp01((d - hole) * hh * 0.7f);
                if (m > 0.003f)
                {
                    float sr, sg, sbl;
                    Sample(u0 / zz, v0 / zz, t, out sr, out sg, out sbl);
                    fr[i] = sr * m; fg[i] = sg * m; fb[i] = sbl * m;
                }
                else { fr[i] = 0f; fg[i] = 0f; fb[i] = 0f; }
                if (rimIn > 0.01f)
                {
                    float q = (d - rd) * hh * 0.25f;
                    float k = Exp(-q * q) * rimIn;
                    fr[i] += acR * k; fg[i] += acG * k; fb[i] += acB * k;
                }
                if (rimOut > 0.01f)
                {
                    float q2 = (d - hole) * hh * 0.25f;
                    float k2 = Exp(-q2 * q2) * rimOut;
                    fr[i] += acR * k2; fg[i] += acG * k2; fb[i] += acB * k2;
                }
            }
        }
        float ta1 = Sm(Tin * 0.7f, Tin + 0.9f, t) * (1f - Sm(WDur - Tout - 0.4f, WDur - Tout + 0.6f, t));
        TextC(Hc - 4, Fit(WName), 1f, 1f, 1f, ta1);
        TextC(Hc - 2, Fit("WORLD " + WCount.ToString("0000")), 0.75f, 0.80f, 0.90f, ta1 * 0.8f);
    }

    public static void Play()
    {
        try
        {
            try { IntPtr h = GetStdHandle(-11); uint m; if (GetConsoleMode(h, out m)) SetConsoleMode(h, m | 0x0004); } catch (Exception) { }
            so = Console.OpenStandardOutput();
            try { Console.TreatControlCAsInput = true; } catch (Exception) { }
            Random rg = new Random();
            InitRand(rg.Next());
            Raw(ESC + "[?1049h" + ESC + "[?25l" + ESC + "[2J");
            Alloc();

            // 1) intro, 2) the eye opens and we fall into the pupil
            if (!Run(7.0f, Intro)) return;
            if (!Run(8.4f, EyeScene)) return;

            // 3) endless journey
            List<int> sbag = new List<int>();
            while (true)
            {
                WCount++;
                GenCommon(rg);
                if (WCount % 5 == 0)
                {
                    if (sbag.Count == 0)
                    {
                        for (int i = 0; i < 6; i++) sbag.Add(i);
                        for (int i = sbag.Count - 1; i > 0; i--)
                        {
                            int j = rg.Next(i + 1);
                            int tmp = sbag[i]; sbag[i] = sbag[j]; sbag[j] = tmp;
                        }
                    }
                    int sidx = sbag[0]; sbag.RemoveAt(0);
                    GenSpecial(rg, sidx);
                }
                else
                {
                    GenRecipe(rg);
                }
                WDur = 12f + (float)rg.NextDouble() * 4f;
                if (!Run(WDur, WorldFrame)) return;
            }
        }
        finally
        {
            try { Raw(ESC + "[0m" + ESC + "[?25h" + ESC + "[?1049l"); } catch (Exception) { }
            try { Console.TreatControlCAsInput = false; } catch (Exception) { }
        }
    }

    // =====================================================
    //  INTRO
    // =====================================================
    static void Intro(float t)
    {
        Backdrop(0.03f, 0.05f, 0.08f, 0.6f * Sm(0f, 2f, t), 0.45f);
        Stars(t, Sm(0f, 1.5f, t));
        int tr = Hc / 2 - 3;
        int py = tr * 2 + 1;
        float len = W * 0.5f * Sm(0.4f, 2.4f, t);
        float inten = 0.9f * Sm(0.4f, 1.4f, t) * (1f - 0.8f * Sm(2.4f, 3.6f, t));
        for (int x = 0; x < W; x++)
        {
            float dx = Math.Abs(x - W / 2f);
            if (dx > len) continue;
            float fall = Pow(1f - dx / len, 1.6f);
            for (int dy = -4; dy <= 4; dy++)
            {
                float v = inten * fall * Exp(-dy * dy * 0.5f);
                Ad(x, py + dy, v * 0.55f, v * 0.78f, v);
            }
        }
        string title = Sp("HS AI SOLUTIONS");
        int c0 = (Cols - title.Length) / 2;
        float rev = (t - 1.5f) / 0.09f;
        float sw = (t - 3.0f) / 1.4f * title.Length * 1.3f - 6f;
        for (int i = 0; i < title.Length; i++)
        {
            float la = Clamp01(rev - i);
            float sh = Exp(-((i - sw) * (i - sw)) / 18f);
            Put(tr, c0 + i, title[i], Lerp(0.70f, 1f, sh), Lerp(0.74f, 1f, sh), Lerp(0.80f, 1f, sh), la);
        }
        TextC(tr + 2, Sp("PRESENTS"), 0.50f, 0.55f, 0.62f, Sm(3.4f, 4.4f, t));
        TextC(tr + 5, Sp("AN ENDLESS JOURNEY  v2"), 0.25f, 0.80f, 0.95f, Sm(4.5f, 5.5f, t));
        Fade = 1f - Sm(6.3f, 7.0f, t);
    }

    // =====================================================
    //  THE EYE  (+ zoom into the pupil)
    // =====================================================
    static void EyeScene(float t)
    {
        Backdrop(0.0f, 0.22f, 0.30f, 0.55f * Sm(0.2f, 1.6f, t) * (1f - Sm(5f, 6.5f, t)), 0.5f);
        Stars(t, 0.5f * (1f - Sm(4.5f, 5.5f, t)));
        float cx = W * 0.5f, cy = H * 0.5f;
        float a = Math.Min(W * 0.40f, H * 1.15f);
        float b = a * 0.36f;
        float open = Sm(0.25f, 1.7f, t);
        if (t > 3.6f && t < 3.98f) open *= 1f - 0.96f * Sin((t - 3.6f) / 0.38f * PI);
        float look = Sm(1.6f, 2.6f, t) * (1f - Sm(4.2f, 5.0f, t));
        float lx = a * 0.16f * Sin(t * 1.25f) * look;
        float ly = b * 0.10f * Sin(t * 0.9f + 1f) * look;
        float ri = b * 0.92f;
        float rp = ri * (0.36f + 0.05f * Sin(t * 2.1f) + 0.30f * Sm(5.0f, 7.0f, t));
        float z = 1f;
        if (t > 5.0f) { float p = Math.Min(1f, (t - 5.0f) / 3.2f); z = Exp(4.4f * Pow(p, 1.5f)); }
        float pcx = cx + lx, pcy = cy + ly;
        float glintK = 1f - Sm(5.0f, 5.7f, t);
        float aa = 1f / z;
        float glowK = Clamp01(open * 1.5f) * (1f - Sm(5.0f, 6.0f, t));
        for (int y = 0; y < H; y++)
        {
            for (int x = 0; x < W; x++)
            {
                float ex = pcx + (x - cx) / z, ey = pcy + (y - cy) / z;
                float u = (ex - cx) / a, dy = ey - cy, au = Math.Abs(u);
                float lidK = au < 1f ? Pow(1f - u * u, 0.85f) : 0f;
                float lh = b * open * lidK * (dy < 0f ? 1.0f : 0.72f);
                float edge = lh - Math.Abs(dy);
                int i = y * W + x;
                float dist = au < 1f ? -edge : Sqrt(((au - 1f) * a) * ((au - 1f) * a) + dy * dy);
                if (edge <= 0f && glowK > 0f)
                {
                    float gl = 0.42f * glowK * Exp(-dist * z * 0.20f);
                    fr[i] += 0.05f * gl; fg[i] += 0.62f * gl; fb[i] += 0.85f * gl;
                }
                if (edge > 0f)
                {
                    float ia0 = Clamp01(edge / aa);
                    float depth = Math.Abs(dy) / Math.Max(lh, 0.001f);
                    float shade = 1f - 0.62f * Pow(depth, 2.2f) - 0.40f * Pow(au, 3f);
                    if (dy < 0f) shade -= 0.18f * Sm(0.3f, 1f, depth);
                    if (shade < 0.05f) shade = 0.05f;
                    float sr = 0.80f * shade, sg = 0.85f * shade, sb2 = 0.93f * shade;
                    float ddx = ex - pcx, ddy = ey - pcy;
                    float d = Sqrt(ddx * ddx + ddy * ddy);
                    float ia = Clamp01((ri - d) / aa);
                    if (ia > 0f)
                    {
                        float nd = d / ri;
                        float ang = (float)Math.Atan2(ddy, ddx);
                        float fib = 0.5f + 0.5f * Sin(ang * 26f + 2.2f * Sin(ang * 5f + nd * 3f));
                        float fib2 = 0.5f + 0.5f * Sin(ang * 71f + nd * 9f);
                        float f = 0.55f * fib + 0.45f * fib2;
                        float q = (nd - 0.52f) * 7f;
                        float ring = Exp(-q * q);
                        float rr = Lerp(0.02f, 0.22f, f * (1f - 0.5f * nd)) + 0.25f * ring;
                        float rg = Lerp(0.16f, 0.78f, f * (1f - 0.35f * nd)) + 0.35f * ring;
                        float rb = Lerp(0.30f, 0.95f, f * (1f - 0.2f * nd)) + 0.30f * ring;
                        float limb = 1f - 0.78f * Sm(0.78f, 1.0f, nd);
                        float ish = Clamp01(shade * 1.15f + 0.2f);
                        rr *= limb * ish; rg *= limb * ish; rb *= limb * ish;
                        float qq = (d - rp) / (ri * 0.12f);
                        float pg = 0.55f * Exp(-qq * qq);
                        rg += pg * 0.7f; rb += pg; rr += pg * 0.1f;
                        float pa2 = Clamp01((rp - d) / aa);
                        rr = Lerp(rr, 0f, pa2); rg = Lerp(rg, 0f, pa2); rb = Lerp(rb, 0f, pa2);
                        float gx = ex - (pcx - ri * 0.36f), gy = ey - (pcy - ri * 0.40f);
                        float g1 = Clamp01((ri * 0.15f - Sqrt(gx * gx + gy * gy)) / aa) * glintK;
                        float hx = ex - (pcx + ri * 0.30f), hy = ey - (pcy + ri * 0.30f);
                        float g2 = Clamp01((ri * 0.07f - Sqrt(hx * hx + hy * hy)) / aa) * 0.6f * glintK;
                        float gm = Math.Max(g1, g2);
                        rr = Lerp(rr, 1f, gm); rg = Lerp(rg, 1f, gm); rb = Lerp(rb, 1f, gm);
                        sr = Lerp(sr, rr, ia); sg = Lerp(sg, rg, ia); sb2 = Lerp(sb2, rb, ia);
                    }
                    fr[i] = Lerp(fr[i], sr, ia0); fg[i] = Lerp(fg[i], sg, ia0); fb[i] = Lerp(fb[i], sb2, ia0);
                }
                if (au < 1f)
                {
                    float rq = edge * z;
                    float rim = Exp(-rq * rq / 1.4f) * Clamp01((1f - au) * 6f) * Clamp01(open * 3f) * (1f - Sm(5f, 5.8f, t));
                    fr[i] += 0.35f * rim; fg[i] += 0.85f * rim; fb[i] += 1.0f * rim;
                }
            }
        }
        float ca = Sm(2.0f, 3.0f, t) * (1f - Sm(4.6f, 5.2f, t));
        TextC(Hc - 4, Sp("LOOK CLOSER"), 0.35f, 0.85f, 1f, ca);
    }
}

'@

# unique class name every run, so an older version already loaded in this
# PowerShell window can never be re-used by mistake
$cls = "HSJourney" + (Get-Random -Maximum 99999999)
$src = $src.Replace("HSCinema", $cls)
Add-Type -TypeDefinition $src -Language CSharp
$hsType = $cls -as [type]

try {
    $hsType::Play()
}
finally {
    [Console]::ResetColor()
    try { [Console]::CursorVisible = $true } catch {}
    Write-Host ""
    Write-Host "          H S   A I   S O L U T I O N S   |   END OF JOURNEY" -ForegroundColor DarkRed
    Write-Host ""
}
