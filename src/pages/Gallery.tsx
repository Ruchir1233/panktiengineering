import { useState, useEffect } from "react";
import { ArrowLeft, X, ChevronLeft, ChevronRight, Phone, Image as ImageIcon, Loader } from "lucide-react";

const API_KEY = "AIzaSyB9y6kFT35Jy4IPdgBVun9BvVhoQch7ugE";
const ROOT_FOLDER_ID = "1SmkcpvFQCqUACxPPEZs1xKd5Y2GTCbLx";

const SERVICES = [
  { name: "Gates",              emoji: "🚪" },
  { name: "Window Grills",      emoji: "🪟" },
  { name: "Staircase Railings", emoji: "🏗️" },
  { name: "Roofing Sheds",      emoji: "🏠" },
  { name: "Boundary Walls",     emoji: "🧱" },
  { name: "Rolling Shutters",   emoji: "🔒" },
  { name: "Industrial Sheds",   emoji: "🏭" },
  { name: "Custom Fabrication", emoji: "⚙️" },
];

async function listSubFolders(): Promise<Record<string, string>> {
  const url = `https://www.googleapis.com/drive/v3/files?q='${ROOT_FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'+and+trashed=false&fields=files(id,name)&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  const map: Record<string, string> = {};
  (data.files || []).forEach((f: { id: string; name: string }) => {
    map[f.name] = f.id;
  });
  return map;
}

async function listPhotos(folderId: string): Promise<{ id: string; name: string; thumbnailUrl: string; fullUrl: string }[]> {
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image/'+and+trashed=false&fields=files(id,name,thumbnailLink,mimeType)&pageSize=100&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return (data.files || []).map((f: { id: string; name: string; thumbnailLink: string }) => ({
    id: f.id,
    name: f.name,
    thumbnailUrl: f.thumbnailLink?.replace("=s220", "=s400") || "",
    fullUrl: `https://lh3.googleusercontent.com/d/${f.id}=s1200`,
  }));
}

export default function Gallery() {
  const [folderMap, setFolderMap] = useState<Record<string, string>>({});
  const [activeService, setActiveService] = useState<string | null>(null);
  const [photos, setPhotos] = useState<{ id: string; name: string; thumbnailUrl: string; fullUrl: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [mapError, setMapError] = useState(false);

  // Load folder map on mount
  useEffect(() => {
    listSubFolders()
      .then(setFolderMap)
      .catch(() => setMapError(true));
  }, []);

  // Load photos when service selected
  useEffect(() => {
    if (!activeService) return;
    const folderId = folderMap[activeService];
    if (!folderId) { setPhotos([]); return; }
    setLoading(true);
    setPhotos([]);
    listPhotos(folderId)
      .then(setPhotos)
      .catch(() => setPhotos([]))
      .finally(() => setLoading(false));
  }, [activeService, folderMap]);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox(i => i !== null ? (i - 1 + photos.length) % photos.length : 0);
  const next = () => setLightbox(i => i !== null ? (i + 1) % photos.length : 0);

  // Handle keyboard for lightbox
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, photos.length]);

  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f9", fontFamily: "Inter, sans-serif" }}>

      {/* ── Header ── */}
      <div style={{ background: "#1a1a1a", padding: "0 16px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", paddingTop: 16, paddingBottom: 16 }}>
          {activeService ? (
            <button
              onClick={() => { setActiveService(null); setPhotos([]); }}
              style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#fff", fontSize: 14, cursor: "pointer", padding: 0, marginBottom: 10 }}
            >
              <ArrowLeft size={16} /> Back to services
            </button>
          ) : null}

          {/* Logo row */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/logo.png" alt="Pankti Engineering" style={{ width: 40, height: 40, objectFit: "contain" }} />
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, lineHeight: 1.2 }}>Pankti Engineering</div>
              <div style={{ color: "#E65100", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {activeService ? activeService : "Our Work Gallery"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Orange accent bar ── */}
      <div style={{ height: 4, background: "#E65100" }} />

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 16px" }}>

        {/* ── SERVICE PICKER ── */}
        {!activeService && (
          <div>
            <p style={{ fontSize: 13, color: "#607D8B", margin: "20px 0 14px", textAlign: "center" }}>
              Tap a service to see our completed work photos
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
              {SERVICES.map(svc => (
                <button
                  key={svc.name}
                  onClick={() => setActiveService(svc.name)}
                  style={{
                    background: "#fff",
                    border: "1px solid #E0E0E0",
                    borderRadius: 14,
                    padding: "18px 12px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    transition: "all 0.15s",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  }}
                  onMouseOver={e => (e.currentTarget.style.borderColor = "#E65100")}
                  onMouseOut={e => (e.currentTarget.style.borderColor = "#E0E0E0")}
                >
                  <span style={{ fontSize: 28 }}>{svc.emoji}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", textAlign: "center", lineHeight: 1.3 }}>
                    {svc.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Contact bar */}
            <div style={{ background: "#1a1a1a", borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <div style={{ color: "#888", fontSize: 11, marginBottom: 3 }}>CALL / WHATSAPP</div>
                <div style={{ color: "#E65100", fontWeight: 700, fontSize: 18 }}>+91 98795-23937</div>
                <div style={{ color: "#666", fontSize: 11, marginTop: 2 }}>Dhamdachi, Valsad · Mon–Sat 9AM–6PM</div>
              </div>
              <a
                href="tel:+919879523937"
                style={{
                  background: "#E65100",
                  color: "#fff",
                  borderRadius: 10,
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  flexShrink: 0,
                }}
              >
                <Phone size={20} />
              </a>
            </div>

            {/* Google rating */}
            <div style={{ background: "#fff", borderRadius: 14, padding: "12px 16px", border: "1px solid #E0E0E0", display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, flexShrink: 0 }} xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a" }}>⭐ 5.0 / 5 on Google</div>
                <div style={{ fontSize: 12, color: "#888" }}>72 reviews · Pankti Engineering, Valsad</div>
              </div>
            </div>
          </div>
        )}

        {/* ── PHOTO GRID ── */}
        {activeService && (
          <div style={{ paddingTop: 20, paddingBottom: 32 }}>
            {loading && (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
                <Loader size={32} style={{ animation: "spin 1s linear infinite", margin: "0 auto 12px" }} />
                <p style={{ fontSize: 14 }}>Loading photos...</p>
              </div>
            )}

            {!loading && photos.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
                <ImageIcon size={40} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
                <p style={{ fontSize: 14, fontWeight: 600, color: "#555", marginBottom: 6 }}>No photos yet</p>
                <p style={{ fontSize: 13, color: "#999" }}>Upload photos to the <strong>{activeService}</strong> folder in Google Drive and they'll appear here.</p>
              </div>
            )}

            {!loading && photos.length > 0 && (
              <>
                <p style={{ fontSize: 13, color: "#888", marginBottom: 14 }}>
                  {photos.length} photo{photos.length !== 1 ? "s" : ""} · Tap to view full size
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                  {photos.map((photo, i) => (
                    <div
                      key={photo.id}
                      onClick={() => openLightbox(i)}
                      style={{
                        aspectRatio: "1",
                        borderRadius: 10,
                        overflow: "hidden",
                        cursor: "pointer",
                        background: "#eee",
                        position: "relative",
                      }}
                    >
                      <img
                        src={photo.thumbnailUrl}
                        alt={photo.name}
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* CTA at bottom of photos */}
            {!loading && (
              <div style={{ marginTop: 28, background: "#1a1a1a", borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ color: "#fff", fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Like what you see?</div>
                  <div style={{ color: "#E65100", fontWeight: 700, fontSize: 16 }}>+91 98795-23937</div>
                </div>
                <a
                  href="tel:+919879523937"
                  style={{ background: "#E65100", color: "#fff", borderRadius: 10, padding: "10px 18px", textDecoration: "none", fontSize: 13, fontWeight: 600 }}
                >
                  Call Now
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && photos[lightbox] && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)",
            zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            onClick={e => { e.stopPropagation(); prev(); }}
            style={{ position: "absolute", left: 12, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
          <img
            src={photos[lightbox].fullUrl}
            alt={photos[lightbox].name}
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: "90vw", maxHeight: "88vh", objectFit: "contain", borderRadius: 8 }}
          />

          {/* Next */}
          <button
            onClick={e => { e.stopPropagation(); next(); }}
            style={{ position: "absolute", right: 12, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Counter */}
          <div style={{ position: "absolute", bottom: 16, color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
            {lightbox + 1} / {photos.length}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
