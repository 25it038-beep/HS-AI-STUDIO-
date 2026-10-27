import fs from "fs";
import path from "path";

export interface Announcement {
  id: string;
  title: string;
  message: string;
  category: "Product Release" | "AI Model" | "Feature Update" | "Announcement";
  imageUrl?: string;
  destinationUrl: string;
  channels: "in_app" | "push" | "both";
  status: "published" | "draft" | "archived";
  publishedAt: string;
  createdAt: string;
}

export interface PushSubscriptionItem {
  id: string;
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
  userAgent?: string;
  createdAt: string;
  isActive: boolean;
}

export interface DeliveryLog {
  id: string;
  announcementId: string;
  announcementTitle: string;
  totalSubscribers: number;
  successful: number;
  failed: number;
  expiredRemoved: number;
  timestamp: string;
}

// Initial seed announcements showcasing the studio's releases
const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-gravity-llm-launch",
    title: "Gravity LLM 1.0.0 Autonomous Suite Released!",
    message: "Enterprise-grade local AI workspace with 44 built-in agentic tools, dynamic RTX VRAM auto-tuning, visible live reasoning with active letter tracking, and zero cloud dependency.",
    category: "AI Model",
    imageUrl: "/images/galaxy-vision-preview.png",
    destinationUrl: "/products/gravity-llm",
    channels: "both",
    status: "published",
    publishedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "ann-galaxy-vision-launch",
    title: "Galaxy Vision 1.0.0 Launched!",
    message: "Locally-hosted multimodal vision-language AI by HS AI Solutions. Real-world document OCR, video frames, and pronoun memory on your RTX GPU.",
    category: "AI Model",
    imageUrl: "/images/galaxy-vision-preview.png",
    destinationUrl: "/products/galaxy-vision",
    channels: "both",
    status: "published",
    publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "ann-electron-standalone",
    title: "Electron AI Standalone Package Available",
    message: "100% offline edge execution for 4GB RAM laptops with universal real-time DuckDuckGo search integration.",
    category: "Product Release",
    imageUrl: "/images/electron-preview.png",
    destinationUrl: "/products/electron",
    channels: "both",
    status: "published",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "ann-open-contributors",
    title: "Open Collaboration: Become a Contributor",
    message: "We're inviting developers and researchers to collaborate on multimodal models, quantization, and UI tools.",
    category: "Announcement",
    destinationUrl: "/#about",
    channels: "in_app",
    status: "published",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

// In-memory runtime cache for serverless environments with disk persistence fallback
const DATA_DIR = path.join(process.cwd(), ".data");
const ANNOUNCEMENTS_FILE = path.join(DATA_DIR, "announcements.json");
const SUBSCRIPTIONS_FILE = path.join(DATA_DIR, "subscriptions.json");
const LOGS_FILE = path.join(DATA_DIR, "delivery_logs.json");

function ensureDirectory() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch {
    // In read-only serverless environments, file writing may fail gracefully
  }
}

export function getAnnouncements(): Announcement[] {
  try {
    ensureDirectory();
    if (fs.existsSync(ANNOUNCEMENTS_FILE)) {
      const raw = fs.readFileSync(ANNOUNCEMENTS_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch {
    // Fall back to seed data
  }
  return INITIAL_ANNOUNCEMENTS;
}

export function saveAnnouncements(list: Announcement[]) {
  try {
    ensureDirectory();
    fs.writeFileSync(ANNOUNCEMENTS_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.error("Could not write announcements file:", err);
  }
}

export function getSubscriptions(): PushSubscriptionItem[] {
  try {
    ensureDirectory();
    if (fs.existsSync(SUBSCRIPTIONS_FILE)) {
      const raw = fs.readFileSync(SUBSCRIPTIONS_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch {
    // Fall back to empty array
  }
  return [];
}

export function saveSubscriptions(list: PushSubscriptionItem[]) {
  try {
    ensureDirectory();
    fs.writeFileSync(SUBSCRIPTIONS_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.error("Could not write subscriptions file:", err);
  }
}

export function getDeliveryLogs(): DeliveryLog[] {
  try {
    ensureDirectory();
    if (fs.existsSync(LOGS_FILE)) {
      const raw = fs.readFileSync(LOGS_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch {
    // Return empty array
  }
  return [];
}

export function saveDeliveryLog(log: DeliveryLog) {
  try {
    ensureDirectory();
    const logs = getDeliveryLogs();
    logs.unshift(log);
    fs.writeFileSync(LOGS_FILE, JSON.stringify(logs.slice(0, 100), null, 2), "utf-8");
  } catch (err) {
    console.error("Could not write delivery logs file:", err);
  }
}
