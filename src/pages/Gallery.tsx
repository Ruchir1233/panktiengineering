import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, X, ChevronLeft, ChevronRight, Phone, ImageOff, Loader2, Star } from "lucide-react";

const API_KEY = "AIzaSyB9y6kFT35Jy4IPdgBVun9BvVhoQch7ugE";
const ROOT_FOLDER_ID = "1SmkcpvFQCqUACxPPEZs1xKd5Y2GTCbLx";

const SERVICES = [
  { name: "Gates",              emoji: "🚪", color: "#1565C0" },
  { name: "Window Grills",      emoji: "🪟", color: "#2E7D32" },
  { name: "Staircase Railings", emoji: "🏗️", color: "#6A1B9A" },
  { name: "Roofing Sheds",      emoji: "🏠", color: "#E65100" },
  { name: "Boundary Walls",     emoji: "🧱", color: "#4E342E" },
  { name: "Rolling Shutters",   emoji: "🔒", color: "#37474F" },
  { name: "Industrial Sheds",   emoji: "🏭", color: "#1B5E20" },
  { name: "Custom Fabrication", emoji: "⚙️", color: "#880E4F" },
];

type Photo = { id: string; name: string; thumb: string; full: string };
type FolderMap = Record<string, string>;

async function driveGet(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Drive API ${res.status}: ${txt.slice(0, 200)}`);
  }
  return res.json();
}

async function getFolderMap(): Promise<FolderMap> {
  const data = await driveGet(
    `https://www.googleapis.com/drive/v3/files` +
    `?q='${ROOT_FOLDER_ID}'+in+parents` +
    `+and+mimeType='application/vnd.google-apps.folder'` +
    `+and+trashed=false` +
    `&fields=files(id,name)` +
    `&pageSize=50` +
    `&key=${API_KEY}`
  );
  const map: FolderMap = {};
  (data.files || []).forEach((f: { id: string; name: string }) => { map[f.name] = f.id; });
  return map;
}

async function getPhotos(folderId: string): Promise<Photo[]> {
  const data = await driveGet(
    `https://www.googleapis.com/drive/v3/files` +
    `?q='${folderId}'+in+parents` +
    `+and+mimeType+contains+'image/'` +
    `+and+trashed=false` +
    `&fields=files(id,name,thumbnailLink)` +
    `&pageSize=100` +
    `&orderBy=createdTime+desc` +
    `&key=${API_KEY}`
  );
  return (data.files || []).map((f: { id: string; name: string; thumbnailLink?: string }) => ({
    id: f.id,
    name: f.name,
    thumb: (f.thumbnailLink || "").replace("=s220", "=s600"),
    full: `https://drive.google.com/thumbnail?id=${f.id}&sz=w1600`,
  }));
}

export default function Gallery() {
  const [folderMap, setFolderMap] = useState<FolderMap>({});
  const [folderError, setFolderError] = useState("");
  const [activeService, setActiveService] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoError, setPhotoError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    getFolderMap()
      .then(setFolderMap)
      .catch(e => setFolderError(e.message));
  }, []);

  const openService = useCallback(async (name: string) => {
    setActiveService(name);
    setPhotos([]);
    setPhotoError("");
    const fid = folderMap[name];
    if (!fid) {
      setPhotoError(`Folder "${name}" not found in Drive. Make sure the folder name matches exactly.`);
      return;
    }
    setLoading(true);
    try {
      const p = await getPhotos(fid);
      setPhotos(p);
    } catch (e: unknown) {
      setPhotoError(e instanceof Error ? e.message : "Failed to load photos");
    } finally {
      setLoading(false);
    }
  }, [folderMap]);

  const goBack = () => { setActiveService(null); setPhotos([]); setPhotoError(""); };

  const prev = useCallback(() => setLightboxIdx(i => i !== null ? (i - 1 + photos.length) % photos.length : 0), [photos.length]);
  const next = useCallback(() => setLightboxIdx(i => i !== null ? (i + 1) % photos.length : 0), [photos.length]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightboxIdx(null);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [lightboxIdx, prev, next]);

  const svc = SERVICES.find(s => s.name === activeService);

  return (
    <div className="gallery-root">
      {/* ── TOP NAV ── */}
      <nav className="gallery-nav">
        <div className="gallery-nav-inner">
          {activeService && (
            <button className="back-btn" onClick={goBack}>
              <ArrowLeft size={16} /> All Services
            </button>
          )}
          <div className="brand-row">
            <img src="/logo.png" alt="logo" className="brand-logo" />
            <div>
              <div className="brand-name">Pankti Engineering</div>
              <div className="brand-sub" style={{ color: svc ? svc.color : "#E65100" }}>
                {activeService || "Our Work Gallery"}
              </div>
            </div>
            {activeService && (
              <a href="tel:+919879523937" className="nav-call-btn">
                <Phone size={16} /> Call
              </a>
            )}
          </div>
        </div>
      </nav>
      <div className="orange-bar" />

      <div className="gallery-body">

        {/* ── FOLDER API ERROR ── */}
        {folderError && (
          <div className="error-box">
            <strong>Drive API Error:</strong> {folderError}
            <br /><small>Make sure the main folder is shared as "Anyone with link → Viewer" and the API key has Drive API enabled.</small>
          </div>
        )}

        {/* ════════════════════════════════
            SERVICE GRID (home screen)
        ════════════════════════════════ */}
        {!activeService && (
          <>
            <p className="home-subtitle">Tap a service to see our completed work</p>

            <div className="service-grid">
              {SERVICES.map(s => (
                <button
                  key={s.name}
                  className="service-card"
                  onClick={() => openService(s.name)}
                  style={{ "--accent": s.color } as React.CSSProperties}
                >
                  <span className="svc-emoji">{s.emoji}</span>
                  <span className="svc-label">{s.name}</span>
                </button>
              ))}
            </div>

            {/* Google rating */}
            <div className="rating-bar">
              <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg" style={{flexShrink:0}}>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div>
                <div className="rating-main">
                  {[1,2,3,4,5].map(i=><Star key={i} size={13} fill="#F9A825" color="#F9A825"/>)}
                  <span className="rating-score">5.0</span>
                </div>
                <div className="rating-sub">72 Google Reviews · Pankti Engineering, Valsad</div>
              </div>
            </div>

            {/* Contact card */}
            <div className="contact-card">
              <div>
                <div className="contact-label">CALL / WHATSAPP</div>
                <div className="contact-number">+91 98795-23937</div>
                <div className="contact-detail">Dhamdachi, Valsad · Mon–Sat 9AM–6PM</div>
              </div>
              <a href="tel:+919879523937" className="contact-call-btn">
                <Phone size={20} />
              </a>
            </div>
          </>
        )}

        {/* ════════════════════════════════
            PHOTO GRID (service screen)
        ════════════════════════════════ */}
        {activeService && (
          <div className="photo-section">

            {/* Loading */}
            {loading && (
              <div className="state-box">
                <Loader2 size={36} className="spin" />
                <p>Loading photos from Google Drive…</p>
              </div>
            )}

            {/* Photo API Error */}
            {!loading && photoError && (
              <div className="error-box">
                <strong>Could not load photos:</strong><br />{photoError}
              </div>
            )}

            {/* Empty */}
            {!loading && !photoError && photos.length === 0 && (
              <div className="state-box">
                <ImageOff size={40} style={{opacity:0.25}} />
                <p className="empty-title">No photos yet</p>
                <p className="empty-sub">
                  Upload photos to the <strong>{activeService}</strong> folder in Google Drive — they'll appear here automatically.
                </p>
              </div>
            )}

            {/* Photos */}
            {!loading && photos.length > 0 && (
              <>
                <p className="photo-count">{photos.length} photo{photos.length !== 1 ? "s" : ""} · Tap to view full size</p>
                <div className="photo-grid">
                  {photos.map((p, i) => (
                    <div key={p.id} className="photo-cell" onClick={() => setLightboxIdx(i)}>
                      <img src={p.thumb} alt={p.name} loading="lazy" />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Bottom CTA */}
            {!loading && (
              <div className="bottom-cta">
                <div>
                  <div className="cta-heading">Like what you see?</div>
                  <div className="cta-number">+91 98795-23937</div>
                </div>
                <a href="tel:+919879523937" className="cta-btn">Call Now</a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── LIGHTBOX ── */}
      {lightboxIdx !== null && photos[lightboxIdx] && (
        <div className="lightbox" onClick={() => setLightboxIdx(null)}>
          <button className="lb-close" onClick={() => setLightboxIdx(null)}><X size={20}/></button>
          <button className="lb-prev" onClick={e=>{e.stopPropagation();prev();}}><ChevronLeft size={26}/></button>
          <img
            className="lb-img"
            src={photos[lightboxIdx].full}
            alt={photos[lightboxIdx].name}
            onClick={e=>e.stopPropagation()}
          />
          <button className="lb-next" onClick={e=>{e.stopPropagation();next();}}><ChevronRight size={26}/></button>
          <div className="lb-counter">{lightboxIdx+1} / {photos.length}</div>
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .gallery-root {
          min-height: 100vh;
          background: #F8F9FA;
          font-family: Inter, -apple-system, sans-serif;
        }

        /* NAV */
        .gallery-nav { background: #1A1A1A; }
        .gallery-nav-inner {
          max-width: 900px; margin: 0 auto;
          padding: 14px 20px;
        }
        .back-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: none; border: none; color: #aaa;
          font-size: 13px; cursor: pointer; margin-bottom: 10px;
          padding: 0;
        }
        .back-btn:hover { color: #fff; }
        .brand-row { display: flex; align-items: center; gap: 12px; }
        .brand-logo { width: 40px; height: 40px; object-fit: contain; }
        .brand-name { color: #fff; font-weight: 700; font-size: 17px; line-height: 1.2; }
        .brand-sub { font-size: 11px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; }
        .nav-call-btn {
          margin-left: auto; display: flex; align-items: center; gap: 6px;
          background: #E65100; color: #fff; border: none; border-radius: 8px;
          padding: 8px 14px; font-size: 13px; font-weight: 600;
          text-decoration: none; cursor: pointer;
        }
        .orange-bar { height: 4px; background: #E65100; }

        /* BODY */
        .gallery-body {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 16px 40px;
        }

        /* HOME */
        .home-subtitle {
          text-align: center; font-size: 14px; color: #607D8B;
          margin: 22px 0 16px;
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        @media (max-width: 640px) {
          .service-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }

        .service-card {
          background: #fff;
          border: 1.5px solid #E0E0E0;
          border-radius: 16px;
          padding: 22px 12px 18px;
          cursor: pointer;
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          transition: border-color .15s, transform .15s, box-shadow .15s;
          box-shadow: 0 1px 4px rgba(0,0,0,.05);
        }
        .service-card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,.1);
        }
        .svc-emoji { font-size: 32px; line-height: 1; }
        .svc-label {
          font-size: 13px; font-weight: 600; color: #1A1A1A;
          text-align: center; line-height: 1.3;
        }

        /* RATING */
        .rating-bar {
          display: flex; align-items: center; gap: 12px;
          background: #fff; border: 1px solid #E0E0E0;
          border-radius: 14px; padding: 14px 18px;
          margin-bottom: 12px;
        }
        .rating-main { display: flex; align-items: center; gap: 3px; }
        .rating-score { font-weight: 700; font-size: 14px; color: #1A1A1A; margin-left: 4px; }
        .rating-sub { font-size: 12px; color: #888; margin-top: 2px; }

        /* CONTACT */
        .contact-card {
          display: flex; align-items: center; justify-content: space-between;
          background: #1A1A1A; border-radius: 14px; padding: 18px 20px;
          margin-bottom: 12px;
        }
        .contact-label { color: #888; font-size: 11px; letter-spacing: .06em; margin-bottom: 3px; }
        .contact-number { color: #E65100; font-weight: 700; font-size: 20px; }
        .contact-detail { color: #666; font-size: 11px; margin-top: 3px; }
        .contact-call-btn {
          background: #E65100; color: #fff; border-radius: 12px;
          width: 48px; height: 48px; display: flex; align-items: center;
          justify-content: center; text-decoration: none; flex-shrink: 0;
        }

        /* PHOTOS */
        .photo-section { padding-top: 20px; }
        .photo-count { font-size: 13px; color: #888; margin-bottom: 12px; }

        .photo-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        @media (max-width: 640px) {
          .photo-grid { grid-template-columns: repeat(3, 1fr); gap: 5px; }
        }
        @media (max-width: 380px) {
          .photo-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .photo-cell {
          aspect-ratio: 1;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          background: #eee;
        }
        .photo-cell img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform .2s;
        }
        .photo-cell:hover img { transform: scale(1.05); }

        /* STATES */
        .state-box {
          text-align: center; padding: 70px 20px; color: #888;
          display: flex; flex-direction: column; align-items: center; gap: 12px;
        }
        .empty-title { font-size: 15px; font-weight: 600; color: #555; }
        .empty-sub { font-size: 13px; color: #999; max-width: 300px; line-height: 1.5; }

        /* ERROR */
        .error-box {
          background: #FFF3E0; border: 1px solid #E65100;
          border-radius: 12px; padding: 14px 16px;
          font-size: 13px; color: #BF360C; margin: 16px 0;
          line-height: 1.6;
        }

        /* BOTTOM CTA */
        .bottom-cta {
          display: flex; align-items: center; justify-content: space-between;
          background: #1A1A1A; border-radius: 14px; padding: 18px 20px;
          margin-top: 24px;
        }
        .cta-heading { color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 3px; }
        .cta-number { color: #E65100; font-weight: 700; font-size: 17px; }
        .cta-btn {
          background: #E65100; color: #fff; border-radius: 10px;
          padding: 11px 20px; text-decoration: none; font-size: 14px; font-weight: 600;
        }

        /* LIGHTBOX */
        .lightbox {
          position: fixed; inset: 0; background: rgba(0,0,0,.95);
          z-index: 1000; display: flex; align-items: center; justify-content: center;
        }
        .lb-img {
          max-width: 92vw; max-height: 88vh;
          object-fit: contain; border-radius: 8px;
        }
        .lb-close {
          position: absolute; top: 14px; right: 14px;
          background: rgba(255,255,255,.15); border: none; border-radius: 50%;
          width: 40px; height: 40px; display: flex; align-items: center;
          justify-content: center; cursor: pointer; color: #fff;
        }
        .lb-prev, .lb-next {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(255,255,255,.15); border: none; border-radius: 50%;
          width: 46px; height: 46px; display: flex; align-items: center;
          justify-content: center; cursor: pointer; color: #fff;
        }
        .lb-prev { left: 12px; }
        .lb-next { right: 12px; }
        .lb-counter {
          position: absolute; bottom: 16px;
          color: rgba(255,255,255,.6); font-size: 13px;
        }

        /* SPIN */
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
