import { useState, useEffect, useCallback, useRef } from "react";
import {
  ArrowLeft, X, ChevronLeft, ChevronRight, ImageOff, Share2, Star,
  DoorClosed, DoorOpen, Grid3x3, Layers, Warehouse, Rows3, Factory, ShieldCheck, Fence, ArrowRight, Check,
} from "lucide-react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const API_KEY = "AIzaSyB9y6kFT35Jy4IPdgBVun9BvVhoQch7ugE";
const ROOT_FOLDER_ID = "1SmkcpvFQCqUACxPPEZs1xKd5Y2GTCbLx";

type Service = {
  name: string;          // shown on the card
  slug: string;          // URL: /gallery/<slug>
  folders: string[];     // Google Drive sub-folder names that feed this card (first match wins)
  Icon: typeof DoorClosed;
  desc: string;
};

const SERVICES: Service[] = [
  { name: "Gates",              slug: "gates",              folders: ["Gates"],                                              Icon: DoorClosed, desc: "Sliding, swing & compound gates" },
  { name: "Window Grills",      slug: "window-grills",      folders: ["Window Grills"],                                      Icon: Grid3x3, desc: "Plain & decorative MS grills" },
  { name: "SS Grills",         slug: "ss-grills",          folders: ["SS Grills", "SS Grill"],                              Icon: ShieldCheck, desc: "Rust-free stainless steel grills" },
  { name: "Doors",             slug: "doors",              folders: ["Doors", "Door"],                                Icon: DoorOpen, desc: "Main, safety & industrial doors" },
  { name: "Staircase Railings", slug: "staircase-railings", folders: ["Staircase Railings"],                                 Icon: Layers, desc: "Staircase, balcony & terrace" },
  { name: "Railing & Fencing",  slug: "railing-and-fencing",folders: ["Railing and Fencing", "Railing & Fencing", "Railings and Fencing", "Custom Fabrication"], Icon: Fence, desc: "Railings & compound fencing" },
  { name: "Roofing Sheds",      slug: "roofing-sheds",      folders: ["Roofing Sheds"],                                      Icon: Warehouse, desc: "Home, parking & factory sheds" },
  { name: "Rolling Shutters",   slug: "rolling-shutters",   folders: ["Rolling Shutters"],                                   Icon: Rows3, desc: "Shops, garages & factories" },
  { name: "Industrial Sheds",   slug: "industrial-sheds",   folders: ["Industrial Sheds"],                                   Icon: Factory, desc: "PEB & conventional factory sheds" },
];

// Old links that may still be shared / indexed
const LEGACY: Record<string, string> = { "custom-fabrication": "railing-and-fencing", "boundary-walls": "", "ss-grill-and-door": "ss-grills", "ss-doors": "doors" };

type Photo = { id: string; name: string; thumb: string; full: string };
type FolderMap = Record<string, string>;

const norm = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]/g, "");

async function driveGet(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Drive API ${res.status}: ${await res.text().then(t => t.slice(0, 200))}`);
  return res.json();
}

function cached<T>(key: string): T | null {
  try { const v = sessionStorage.getItem(key); return v ? JSON.parse(v) as T : null; } catch { return null; }
}
function store(key: string, val: unknown) { try { sessionStorage.setItem(key, JSON.stringify(val)); } catch { /* ignore */ } }

async function getFolderMap(): Promise<FolderMap> {
  const data = await driveGet(
    `https://www.googleapis.com/drive/v3/files?q='${ROOT_FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'+and+trashed=false&fields=files(id,name)&pageSize=50&key=${API_KEY}`
  );
  const map: FolderMap = {};
  (data.files || []).forEach((f: { id: string; name: string }) => { map[norm(f.name)] = f.id; });
  store("g_folders", map);
  return map;
}

const folderFor = (svc: Service, map: FolderMap) => {
  for (const n of svc.folders) { const id = map[norm(n)]; if (id) return id; }
  return null;
};

async function getPhotos(folderId: string, pageSize = 100): Promise<Photo[]> {
  const data = await driveGet(
    `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image/'+and+trashed=false&fields=files(id,name,thumbnailLink)&pageSize=${pageSize}&orderBy=createdTime+desc&key=${API_KEY}`
  );
  return (data.files || []).map((f: { id: string; name: string; thumbnailLink?: string }) => ({
    id: f.id, name: f.name,
    thumb: (f.thumbnailLink || "").replace(/=s\d+$/, "=s500"),
    full: `https://drive.google.com/thumbnail?id=${f.id}&sz=w1600`,
  }));
}

// ── SEO metadata per service ─────────────────────────────
const SEO: Record<string, { title: string; description: string; keywords: string }> = {
  default: {
    title: "Our Work Gallery | Pankti Engineering – Iron Fabrication Valsad",
    description: "Browse completed iron and MS fabrication work by Pankti Engineering, Valsad. See real photos of gates, window grills, staircase railings, roofing sheds, rolling shutters and more. 4.9★ rated workshop in Valsad, Gujarat.",
    keywords: "iron fabrication photos valsad, pankti engineering work photos, iron gate photos valsad, MS fabrication gallery, fabrication workshop valsad gujarat",
  },
  gates: {
    title: "Iron Gate Photos Valsad | Pankti Engineering Work Gallery",
    description: "See photos of custom iron gates fabricated by Pankti Engineering in Valsad, Gujarat. Sliding gates, swing gates, compound gates for homes and factories. Call +91 98795-23937 for a free quote.",
    keywords: "iron gate valsad, iron gate photos valsad, custom iron gate gujarat, compound gate valsad, sliding gate valsad, iron gate fabrication valsad, gate manufacturer valsad",
  },
  "window-grills": {
    title: "Window Grill Photos Valsad | Pankti Engineering Work Gallery",
    description: "Browse iron window grill designs fabricated by Pankti Engineering, Valsad. Plain, fancy and decorative patterns. Powder coated finish. Call +91 98795-23937.",
    keywords: "window grill valsad, iron grill valsad, window grill design valsad, iron window grill gujarat, home grill valsad, MS window grill valsad",
  },
  "staircase-railings": {
    title: "Staircase Railing Photos Valsad | Pankti Engineering Work Gallery",
    description: "Iron staircase railings, balcony railings and terrace railings by Pankti Engineering, Valsad. See our completed work photos. Powder coated, rust-proof. Call +91 98795-23937.",
    keywords: "staircase railing valsad, iron railing valsad, balcony railing valsad, MS railing valsad, staircase grill valsad gujarat, iron railing fabrication",
  },
  "roofing-sheds": {
    title: "Roofing Shed Photos Valsad | Pankti Engineering Work Gallery",
    description: "MS frame roofing sheds for homes, car parking and factories by Pankti Engineering, Valsad, Gujarat. See completed shed photos. Colour-coated roofing sheet. Call +91 98795-23937.",
    keywords: "roofing shed valsad, MS shed valsad, car parking shed valsad, factory shed valsad, shed fabrication valsad, iron shed gujarat, shed contractor valsad",
  },
  "rolling-shutters": {
    title: "Rolling Shutter Photos Valsad | Pankti Engineering Work Gallery",
    description: "Iron rolling shutters for shops, garages and factories by Pankti Engineering, Valsad, Gujarat. See installed shutter photos. Manual and spring balanced. Call +91 98795-23937.",
    keywords: "rolling shutter valsad, iron shutter valsad, shop shutter valsad, rolling shutter fabrication valsad, garage shutter valsad, MS shutter gujarat",
  },
  "industrial-sheds": {
    title: "Industrial Shed Photos Valsad | Pankti Engineering Work Gallery",
    description: "Large-span MS industrial sheds for factories and warehouses by Pankti Engineering, Valsad, Gujarat. PEB and conventional sheds. See work photos. Call +91 98795-23937.",
    keywords: "industrial shed valsad, factory shed valsad, warehouse shed valsad, PEB shed valsad, MS industrial shed gujarat, godown shed valsad, shed contractor valsad gujarat",
  },
  "ss-grills": {
    title: "SS Grill Photos Valsad | Pankti Engineering Work Gallery",
    description: "Stainless steel (SS) window and balcony grills fabricated by Pankti Engineering, Valsad, Gujarat. Rust-free, long-lasting SS grill designs. See work photos. Call +91 98795-23937.",
    keywords: "SS grill valsad, stainless steel grill valsad, SS window grill gujarat, SS balcony grill valsad, stainless steel fabrication valsad",
  },
  doors: {
    title: "Door Photos Valsad | Pankti Engineering Work Gallery",
    description: "Iron and MS doors fabricated by Pankti Engineering, Valsad, Gujarat. Main doors, safety doors and industrial doors. See work photos. Call +91 98795-23937.",
    keywords: "iron door valsad, MS door valsad, safety door valsad, main door fabrication gujarat, steel door valsad",
  },
  "railing-and-fencing": {
    title: "Railing & Fencing Photos Valsad | Pankti Engineering Work Gallery",
    description: "Iron and MS railings and fencing by Pankti Engineering, Valsad, Gujarat. Balcony, terrace and compound fencing for homes and factories. See work photos. Call +91 98795-23937.",
    keywords: "railing valsad, fencing valsad, iron fencing valsad, balcony railing valsad, compound fencing gujarat, MS railing fabrication valsad",
  },
};


// ── Line-art illustrations for the category cards ─────────
const K = "#1A1A1A", O = "#E65100";
const ART: Record<string, JSX.Element> = {
  gates: <g><path d="M22 20v62M98 20v62" stroke={K} strokeWidth="5"/><path d="M30 28h60" stroke={K} strokeWidth="3.5"/><path d="M38 28v42M46 28v42M54 28v42M62 28v42M70 28v42M78 28v42M86 28v42" stroke={K} strokeWidth="3"/><path d="M30 70h60" stroke={K} strokeWidth="3.5"/><circle cx="40" cy="76" r="3.5" stroke={O} strokeWidth="3"/><circle cx="82" cy="76" r="3.5" stroke={O} strokeWidth="3"/><path d="M14 86h92" stroke={K} strokeWidth="4"/></g>,
  "window-grills": <g><rect x="26" y="14" width="68" height="68" rx="5" stroke={K} strokeWidth="5"/><path d="M48 14v68M72 14v68M26 37h68M26 59h68" stroke={K} strokeWidth="3.5"/><path d="M60 29l11 11-11 11-11-11z" fill="#FBF8F1" stroke={O} strokeWidth="3.5"/><path d="M60 34v12M54 40h12" stroke={K} strokeWidth="3"/></g>,
  "ss-grills": <g><rect x="22" y="26" width="64" height="58" rx="5" stroke={K} strokeWidth="5"/><path d="M43 26v58M64 26v58M22 45h64M22 65h64" stroke={K} strokeWidth="3.5"/><path d="M96 10v14M89 17h14" stroke={O} strokeWidth="4"/><path d="M100 30v8M96 34h8" stroke={O} strokeWidth="3.5"/></g>,
  doors: <g><rect x="38" y="12" width="44" height="72" rx="3" stroke={K} strokeWidth="5"/><rect x="46" y="21" width="28" height="22" rx="2" stroke={K} strokeWidth="3.5"/><rect x="46" y="50" width="28" height="26" rx="2" stroke={K} strokeWidth="3.5"/><path d="M76 46v10" stroke={O} strokeWidth="5"/><path d="M26 86h68" stroke={K} strokeWidth="4"/></g>,
  "staircase-railings": <g><path d="M18 86h20v-14h18v-14h18v-14h18v-14h10" stroke={K} strokeWidth="5" strokeLinejoin="round"/><path d="M28 46l60-30" stroke={O} strokeWidth="5"/><path d="M38 72V44M56 58V35M74 44V26" stroke={K} strokeWidth="3.5"/><path d="M88 16h14" stroke={K} strokeWidth="4"/></g>,
  "railing-and-fencing": <g><path d="M30 86V32M42 86V32M54 86V32M66 86V32M78 86V32M90 86V32" stroke={K} strokeWidth="3.5"/><path d="M30 32l-4-9 4-9 4 9zM54 32l-4-9 4-9 4 9zM78 32l-4-9 4-9 4 9zM42 32l-4-9 4-9 4 9zM66 32l-4-9 4-9 4 9zM90 32l-4-9 4-9 4 9z" stroke={K} strokeWidth="3" strokeLinejoin="round"/><path d="M22 44h76M22 66h76" stroke={O} strokeWidth="5"/><path d="M16 86h88" stroke={K} strokeWidth="4"/></g>,
  "roofing-sheds": <g><path d="M24 26v58M96 22v62" stroke={K} strokeWidth="5"/><path d="M14 30L106 18" stroke={O} strokeWidth="6"/><path d="M34 28v-4M50 26v-4M66 24v-4M82 22v-4" stroke={K} strokeWidth="3"/><rect x="40" y="56" width="32" height="28" rx="2" stroke={K} strokeWidth="4"/><path d="M40 66h32" stroke={K} strokeWidth="3"/><path d="M14 86h92" stroke={K} strokeWidth="4"/></g>,
  "rolling-shutters": <g><rect x="30" y="12" width="60" height="14" rx="4" stroke={O} strokeWidth="5"/><path d="M36 26v58M84 26v58" stroke={K} strokeWidth="5"/><path d="M36 38h48M36 50h48M36 62h48" stroke={K} strokeWidth="3.5"/><path d="M54 76h12" stroke={K} strokeWidth="4"/><path d="M24 86h72" stroke={K} strokeWidth="4"/></g>,
  "industrial-sheds": <g><path d="M24 84V44M96 84V44" stroke={K} strokeWidth="5"/><path d="M16 44L60 18l44 26z" stroke={O} strokeWidth="5" strokeLinejoin="round"/><path d="M60 18v26M38 31l22 13 22-13" stroke={O} strokeWidth="3.5"/><rect x="46" y="58" width="28" height="26" rx="2" stroke={K} strokeWidth="4"/><path d="M46 66h28M46 74h28" stroke={K} strokeWidth="3"/><path d="M14 86h92" stroke={K} strokeWidth="4"/></g>,
};
const Art = ({ slug }: { slug: string }) => (
  <svg className="g-art" viewBox="0 0 120 100" fill="none" strokeLinecap="round" aria-hidden="true">{ART[slug]}</svg>
);

export default function Gallery() {
  const { service: serviceSlug } = useParams<{ service?: string }>();
  const navigate = useNavigate();

  const activeSvc = SERVICES.find(s => s.slug === serviceSlug) ?? null;

  const [folderMap, setFolderMap] = useState<FolderMap>({});
  const [folderError, setFolderError] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoError, setPhotoError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const [toast, setToast] = useState("");
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const c = cached<FolderMap>("g_folders");
    if (c && Object.keys(c).length) setFolderMap(c);   // instant paint from cache...
    getFolderMap().then(setFolderMap).catch(e => { if (!c) setFolderError(e.message); }); // ...then always refresh from Drive
  }, []);

  useEffect(() => {
    if (!activeSvc || Object.keys(folderMap).length === 0) return;
    const fid = folderFor(activeSvc, folderMap);
    setPhotos([]); setPhotoError("");
    if (!fid) { setPhotoError(`Folder for "${activeSvc.name}" not found in Drive. Create a sub-folder named "${activeSvc.folders[0]}" inside the main gallery folder and share it publicly.`); return; }
    setLoading(true);
    getPhotos(fid)
      .then(setPhotos)
      .catch(e => setPhotoError(e instanceof Error ? e.message : "Failed to load photos"))
      .finally(() => setLoading(false));
  }, [activeSvc, folderMap]);

  useEffect(() => { window.scrollTo(0, 0); }, [serviceSlug]);

  const openService = (slug: string) => { setLbIdx(null); navigate(`/gallery/${slug}`); };
  const goBack = () => navigate("/gallery");
  const prev = useCallback(() => setLbIdx(i => i !== null ? (i - 1 + photos.length) % photos.length : 0), [photos.length]);
  const next = useCallback(() => setLbIdx(i => i !== null ? (i + 1) % photos.length : 0), [photos.length]);

  // Lightbox: keyboard, body-scroll lock, Back button closes it
  useEffect(() => {
    if (lbIdx === null) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLbIdx(null);
    };
    const pop = () => setLbIdx(null);
    window.addEventListener("keydown", h);
    window.addEventListener("popstate", pop);
    history.pushState({ lb: true }, "");
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      window.removeEventListener("popstate", pop);
      document.body.style.overflow = old;
    };
  }, [lbIdx === null, prev, next]); // eslint-disable-line react-hooks/exhaustive-deps

  const closeLb = () => { setLbIdx(null); if (history.state?.lb) history.back(); };

  async function share() {
    const url = window.location.href;
    const title = activeSvc ? `${activeSvc.name} work · Pankti Engineering` : "Our Work · Pankti Engineering";
    try {
      if (navigator.share) { await navigator.share({ title, text: "Photos of our fabrication work – Pankti Engineering, Valsad", url }); return; }
      await navigator.clipboard.writeText(url);
      setToast("Link copied"); setTimeout(() => setToast(""), 2000);
    } catch { /* cancelled */ }
  }

  if (serviceSlug && !activeSvc) {
    if (serviceSlug in LEGACY) return <Navigate to={LEGACY[serviceSlug] ? `/gallery/${LEGACY[serviceSlug]}` : "/gallery"} replace />;
    return <Navigate to="/gallery" replace />;
  }

  const seoKey = serviceSlug ?? "default";
  const seo = SEO[seoKey] ?? SEO["default"];
  const canonicalUrl = `https://www.panktiengineering.com/gallery${serviceSlug ? `/${serviceSlug}` : ""}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": seo.title,
    "description": seo.description,
    "url": canonicalUrl,
    "author": {
      "@type": "LocalBusiness",
      "name": "Pankti Engineering",
      "telephone": "+91-9879523937",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Dhamdachi, Near Gundlav",
        "addressLocality": "Valsad",
        "addressRegion": "Gujarat",
        "postalCode": "396035",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <div className="g-root">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="preconnect" href="https://www.googleapis.com" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.panktiengineering.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ── HEADER ── */}
      <header className="g-nav">
        <div className="g-nav-inner">
          {activeSvc ? (
            <button className="g-iconbtn" onClick={goBack} aria-label="Back to all services"><ArrowLeft size={20}/></button>
          ) : (
            <a href="/" className="g-logo-wrap" aria-label="Pankti Engineering home"><img src="/logo-mark.png" alt="" className="g-logo"/></a>
          )}
          <div className="g-brand">
            <div className="g-bname">{activeSvc ? activeSvc.name : "Pankti Engineering"}</div>
            <div className="g-bsub">
              {activeSvc ? "Pankti Engineering · Valsad" : (<><Star size={11} fill="currentColor"/> 4.9 on Google · Valsad</>)}
            </div>
          </div>
          <button className="g-iconbtn" onClick={share} aria-label="Share this page"><Share2 size={19}/></button>
        </div>
      </header>

      <main className="g-body">
        {folderError && activeSvc && (
          <div className="g-error"><strong>Could not load photos.</strong> Please check your connection and try again.</div>
        )}

        {/* ═══ HOME ═══ */}
        {!activeSvc && (
          <div className="g-home">
            <div className="g-hero">
              <h1>Our Work</h1>
              <p>Tap a category to see photos</p>
            </div>
            <div className="g-grid">
              {SERVICES.map(s => (
                <button key={s.slug} className="g-card" onClick={() => openService(s.slug)} aria-label={`${s.name} photos`}>
                  <span className="g-card-art"><Art slug={s.slug}/></span>
                  <span className="g-card-foot">
                    <span className="g-clabel">{s.name}</span>
                    <span className="g-cgo"><ArrowRight size={16}/></span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ═══ PHOTOS ═══ */}
        {activeSvc && (
          <div className="g-photos">
            {loading && (
              <div className="g-pgrid">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="g-pcell g-skel"/>)}</div>
            )}
            {!loading && photoError && <div className="g-error">{photoError}</div>}
            {!loading && !photoError && photos.length === 0 && Object.keys(folderMap).length > 0 && (
              <div className="g-state">
                <ImageOff size={44} style={{ opacity: .25 }}/>
                <p className="g-empty-t">Photos coming soon</p>
                <p className="g-empty-s">We're adding our latest {activeSvc.name} work. Call us to see more.</p>
              </div>
            )}
            {!loading && photos.length > 0 && (
              <>
                <p className="g-pcount">{photos.length} photo{photos.length !== 1 ? "s" : ""}</p>
                <div className="g-pgrid">
                  {photos.map((p, i) => (
                    <button key={p.id} className="g-pcell" onClick={() => setLbIdx(i)} aria-label={`Open photo ${i + 1}`}>
                      <img src={p.thumb} alt={`${activeSvc.name} by Pankti Engineering Valsad`} loading="lazy" decoding="async" referrerPolicy="no-referrer"/>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {toast && <div className="g-toast"><Check size={15}/> {toast}</div>}

      {/* ── LIGHTBOX ── */}
      {lbIdx !== null && photos[lbIdx] && (
        <div
          className="g-lb"
          onClick={closeLb}
          onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
          }}
        >
          <button className="g-lb-x" onClick={closeLb} aria-label="Close"><X size={22}/></button>
          <button className="g-lb-p" onClick={e => { e.stopPropagation(); prev(); }} aria-label="Previous"><ChevronLeft size={28}/></button>
          <img className="g-lb-img" src={photos[lbIdx].full} alt="" onClick={e => e.stopPropagation()} referrerPolicy="no-referrer"/>
          <button className="g-lb-n" onClick={e => { e.stopPropagation(); next(); }} aria-label="Next"><ChevronRight size={28}/></button>
          <div className="g-lb-c">{lbIdx + 1} / {photos.length}</div>
          {/* preload neighbours */}
          <img src={photos[(lbIdx + 1) % photos.length].full} alt="" style={{ display: "none" }} referrerPolicy="no-referrer"/>
        </div>
      )}

      <style>{`
        .g-root *{box-sizing:border-box;}
        .g-root{min-height:100vh;min-height:100dvh;background:#F3F0E9;font-family:Inter,-apple-system,"Segoe UI",sans-serif;color:#1A1A1A;padding-bottom:84px;-webkit-tap-highlight-color:transparent;}
        .g-root button{font-family:inherit;}

        /* HEADER */
        .g-nav{position:sticky;top:0;z-index:50;background:#14171C;border-bottom:3px solid #E65100;}
        .g-nav-inner{max-width:1100px;margin:0 auto;padding:10px 14px;display:flex;align-items:center;gap:12px;}
        .g-logo-wrap{width:42px;height:42px;border-radius:12px;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .g-logo{height:32px;width:auto;object-fit:contain;}
        .g-iconbtn{width:42px;height:42px;border-radius:12px;background:rgba(255,255,255,.1);border:none;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;}
        .g-iconbtn:active{background:rgba(255,255,255,.2);}
        .g-brand{flex:1;min-width:0;}
        .g-bname{color:#fff;font-weight:800;font-size:17px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .g-bsub{color:#FFB074;font-size:11.5px;font-weight:600;margin-top:2px;display:flex;align-items:center;gap:4px;}

        .g-body{max-width:1100px;margin:0 auto;padding:0 14px;}

        /* HOME */
        .g-hero{padding:26px 4px 18px;text-align:center;}
        .g-hero h1{font-size:30px;font-weight:800;letter-spacing:-.02em;}
        .g-hero p{margin:6px auto 0;font-size:14px;color:#555;}
        .g-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}
        @media(min-width:640px){.g-grid{grid-template-columns:repeat(3,1fr);gap:16px;}}
        @media(min-width:960px){.g-grid{grid-template-columns:repeat(3,1fr);}}
        .g-card{display:block;width:100%;padding:0;border:1px solid #E7E2D6;border-radius:16px;overflow:hidden;cursor:pointer;background:#fff;text-align:left;box-shadow:0 1px 3px rgba(60,50,30,.06);transition:transform .2s,box-shadow .2s;}
        .g-card:hover{transform:translateY(-3px);box-shadow:0 10px 24px rgba(60,50,30,.14);}
        .g-card:active{transform:scale(.98);}
        .g-card-art{display:flex;align-items:center;justify-content:center;aspect-ratio:16/10;background:#FBF8F1;border-bottom:3px solid #E65100;}
        .g-art{width:62%;max-width:210px;height:auto;transition:transform .3s;}
        .g-card:hover .g-art{transform:scale(1.07);}
        @media(max-width:639px){.g-card-foot{min-height:66px;padding:10px 10px 10px 14px;}.g-clabel{font-size:15px;}.g-card-art{aspect-ratio:4/3;}}
        .g-card-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:12px 12px 12px 16px;}
        .g-clabel{color:#1A1A1A;font-weight:800;font-size:16px;line-height:1.2;}
        .g-cgo{width:34px;height:34px;border-radius:50%;background:#E65100;color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform .2s;}
        .g-card:hover .g-cgo{transform:translateX(3px);}

        /* PHOTOS */
        .g-photos{padding-top:18px;}
        .g-pcount{font-size:13px;color:#78909C;margin:0 2px 12px;font-weight:600;}
        .g-pgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;}
        @media(min-width:640px){.g-pgrid{grid-template-columns:repeat(3,1fr);gap:12px;}}
        @media(min-width:960px){.g-pgrid{grid-template-columns:repeat(4,1fr);}}
        .g-pcell{aspect-ratio:4/3;border-radius:14px;overflow:hidden;cursor:pointer;background:#DDE2E6;border:none;padding:0;display:block;}
        .g-pcell img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .25s;}
        .g-pcell:hover img{transform:scale(1.05);}
        .g-skel{animation:gpulse 1.2s ease-in-out infinite;}
        @keyframes gpulse{0%,100%{opacity:1}50%{opacity:.45}}

        .g-state{text-align:center;padding:70px 20px;color:#888;display:flex;flex-direction:column;align-items:center;gap:12px;}
        .g-empty-t{font-size:17px;font-weight:700;color:#555;}
        .g-empty-s{font-size:13.5px;color:#90A4AE;max-width:300px;line-height:1.6;}
        .g-error{background:#FFF3E0;border:1px solid #E65100;border-radius:12px;padding:14px 16px;font-size:13px;color:#BF360C;margin:20px 0;line-height:1.6;}

        .g-toast{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#14171C;color:#fff;padding:10px 16px;border-radius:999px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:6px;z-index:70;}

        /* LIGHTBOX */
        .g-lb{position:fixed;inset:0;background:#000;z-index:1000;display:flex;align-items:center;justify-content:center;touch-action:pan-y;}
        .g-lb-img{max-width:100vw;max-height:86vh;max-height:86dvh;object-fit:contain;}
        @media(min-width:700px){.g-lb-img{max-width:90vw;border-radius:8px;}}
        .g-lb-x{position:absolute;top:calc(14px + env(safe-area-inset-top));right:14px;background:rgba(255,255,255,.16);border:none;border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;}
        .g-lb-p,.g-lb-n{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.16);border:none;border-radius:50%;width:48px;height:48px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;}
        .g-lb-p{left:12px;}.g-lb-n{right:12px;}
        @media(max-width:700px){.g-lb-p,.g-lb-n{display:none;}}
        .g-lb-c{position:absolute;bottom:calc(18px + env(safe-area-inset-bottom));color:rgba(255,255,255,.7);font-size:13px;font-weight:600;}
      `}</style>
    </div>
  );
}
