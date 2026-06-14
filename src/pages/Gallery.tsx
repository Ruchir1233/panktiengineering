import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, X, ChevronLeft, ChevronRight, ImageOff, Loader2 } from "lucide-react";

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
  if (!res.ok) throw new Error(`Drive API ${res.status}: ${await res.text().then(t => t.slice(0,200))}`);
  return res.json();
}

async function getFolderMap(): Promise<FolderMap> {
  const data = await driveGet(
    `https://www.googleapis.com/drive/v3/files?q='${ROOT_FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'+and+trashed=false&fields=files(id,name)&pageSize=50&key=${API_KEY}`
  );
  const map: FolderMap = {};
  (data.files || []).forEach((f: { id: string; name: string }) => { map[f.name] = f.id; });
  return map;
}

async function getPhotos(folderId: string): Promise<Photo[]> {
  const data = await driveGet(
    `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image/'+and+trashed=false&fields=files(id,name,thumbnailLink)&pageSize=100&orderBy=createdTime+desc&key=${API_KEY}`
  );
  return (data.files || []).map((f: { id: string; name: string; thumbnailLink?: string }) => ({
    id: f.id, name: f.name,
    thumb: (f.thumbnailLink || "").replace("=s220", "=s600"),
    full: `https://drive.google.com/thumbnail?id=${f.id}&sz=w1600`,
  }));
}

const WaIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Gallery() {
  const [folderMap, setFolderMap]     = useState<FolderMap>({});
  const [folderError, setFolderError] = useState("");
  const [activeService, setActive]    = useState<string | null>(null);
  const [photos, setPhotos]           = useState<Photo[]>([]);
  const [photoError, setPhotoError]   = useState("");
  const [loading, setLoading]         = useState(false);
  const [lbIdx, setLbIdx]             = useState<number | null>(null);

  useEffect(() => {
    getFolderMap().then(setFolderMap).catch(e => setFolderError(e.message));
  }, []);

  const openService = useCallback(async (name: string) => {
    setActive(name); setPhotos([]); setPhotoError("");
    const fid = folderMap[name];
    if (!fid) { setPhotoError(`Folder "${name}" not found in Drive. Make sure the sub-folder name matches exactly and is shared publicly.`); return; }
    setLoading(true);
    try { setPhotos(await getPhotos(fid)); }
    catch (e: unknown) { setPhotoError(e instanceof Error ? e.message : "Failed to load photos"); }
    finally { setLoading(false); }
  }, [folderMap]);

  const goBack = () => { setActive(null); setPhotos([]); setPhotoError(""); };
  const prev = useCallback(() => setLbIdx(i => i !== null ? (i - 1 + photos.length) % photos.length : 0), [photos.length]);
  const next = useCallback(() => setLbIdx(i => i !== null ? (i + 1) % photos.length : 0), [photos.length]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (lbIdx === null) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLbIdx(null);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [lbIdx, prev, next]);

  const svc = SERVICES.find(s => s.name === activeService);

  return (
    <div className="g-root">

      {/* ── NAV ── */}
      <nav className="g-nav">
        <div className="g-nav-inner">
          {activeService && (
            <button className="g-back" onClick={goBack}>
              <ArrowLeft size={14}/> All Services
            </button>
          )}
          <div className="g-brand">
            {/* White logo via CSS filter */}
            <img
              src="/logo.png"
              alt="Pankti Engineering"
              className="g-logo"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <div>
              <div className="g-bname">Pankti Engineering</div>
              <div className="g-bsub" style={{ color: svc?.color ?? "#E65100" }}>
                {activeService ?? "Our Work Gallery"}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="g-bar"/>

      {/* ── BODY ── */}
      <div className="g-body">

        {folderError && (
          <div className="g-error">
            <strong>Drive API Error:</strong> {folderError}
            <br/><small>Make sure the folder is shared as "Anyone with link → Viewer" and the API key has no restrictions.</small>
          </div>
        )}

        {/* ═══ HOME ═══ */}
        {!activeService && (
          <div className="g-home">
            <p className="g-subtitle">Tap a service to browse our completed work photos</p>

            <div className="g-grid">
              {SERVICES.map(s => (
                <button
                  key={s.name}
                  className="g-card"
                  onClick={() => openService(s.name)}
                  style={{ "--acc": s.color } as React.CSSProperties}
                >
                  <span className="g-emoji">{s.emoji}</span>
                  <span className="g-clabel">{s.name}</span>
                </button>
              ))}
            </div>

            {/* Contact */}
            <div className="g-contact">
              <div className="g-contact-text">
                <div className="g-clabel2">CALL / WHATSAPP</div>
                <div className="g-cnum">98795-23937</div>
                <div className="g-caddr">Dhamdachi, Near Gundlav, Valsad, Gujarat</div>
              </div>
              <div className="g-cbtns">
                <a href="tel:+919879523937" className="g-cbtn g-cbtn-call" title="Call">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </a>
                <a href="https://wa.me/919879523937" target="_blank" rel="noreferrer" className="g-cbtn g-cbtn-wa" title="WhatsApp">
                  <WaIcon/>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ═══ PHOTOS ═══ */}
        {activeService && (
          <div className="g-photos">
            {loading && (
              <div className="g-state">
                <Loader2 size={38} className="g-spin"/>
                <p>Loading photos from Google Drive…</p>
              </div>
            )}
            {!loading && photoError && <div className="g-error">{photoError}</div>}
            {!loading && !photoError && photos.length === 0 && (
              <div className="g-state">
                <ImageOff size={44} style={{opacity:.2}}/>
                <p className="g-empty-t">No photos yet</p>
                <p className="g-empty-s">Upload photos to the <strong>{activeService}</strong> folder in Google Drive — they'll appear here automatically.</p>
              </div>
            )}
            {!loading && photos.length > 0 && (
              <>
                <p className="g-pcount">{photos.length} photo{photos.length !== 1 ? "s" : ""} · Click to enlarge</p>
                <div className="g-pgrid">
                  {photos.map((p, i) => (
                    <div key={p.id} className="g-pcell" onClick={() => setLbIdx(i)}>
                      <img src={p.thumb} alt={p.name} loading="lazy"/>
                    </div>
                  ))}
                </div>
              </>
            )}


          </div>
        )}
      </div>

      {/* ── LIGHTBOX ── */}
      {lbIdx !== null && photos[lbIdx] && (
        <div className="g-lb" onClick={() => setLbIdx(null)}>
          <button className="g-lb-x" onClick={() => setLbIdx(null)}><X size={20}/></button>
          <button className="g-lb-p" onClick={e=>{e.stopPropagation();prev();}}><ChevronLeft size={28}/></button>
          <img className="g-lb-img" src={photos[lbIdx].full} alt="" onClick={e=>e.stopPropagation()}/>
          <button className="g-lb-n" onClick={e=>{e.stopPropagation();next();}}><ChevronRight size={28}/></button>
          <div className="g-lb-c">{lbIdx+1} / {photos.length}</div>
        </div>
      )}

      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        .g-root{min-height:100vh;background:#F4F6F8;font-family:Inter,-apple-system,sans-serif;color:#1A1A1A;}

        /* NAV */
        .g-nav{background:#1A1A1A;}
        .g-nav-inner{max-width:1100px;margin:0 auto;padding:14px 24px;}
        .g-back{display:inline-flex;align-items:center;gap:6px;background:none;border:none;color:#aaa;font-size:13px;cursor:pointer;padding:0;margin-bottom:10px;}
        .g-back:hover{color:#fff;}
        .g-brand{display:flex;align-items:center;gap:14px;}
        .g-logo{width:44px;height:44px;object-fit:contain;}
        .g-bname{color:#fff;font-weight:700;font-size:18px;line-height:1.2;}
        .g-bsub{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-top:2px;}
        .g-bar{height:4px;background:#E65100;}

        /* BODY */
        .g-body{max-width:1100px;margin:0 auto;padding:0 24px 60px;}

        /* HOME */
        .g-home{padding-top:36px;}
        .g-subtitle{text-align:center;font-size:15px;color:#607D8B;margin-bottom:28px;}

        /* SERVICE GRID */
        .g-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px;}
        @media(max-width:768px){.g-grid{grid-template-columns:repeat(2,1fr);gap:12px;}}
        .g-card{background:#fff;border:2px solid #E0E0E0;border-radius:18px;padding:32px 16px 26px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:14px;transition:border-color .15s,transform .15s,box-shadow .15s;box-shadow:0 2px 8px rgba(0,0,0,.05);}
        .g-card:hover{border-color:var(--acc);transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.1);}
        .g-emoji{font-size:38px;line-height:1;}
        .g-clabel{font-size:14px;font-weight:700;color:#1A1A1A;text-align:center;line-height:1.3;}

        /* CONTACT */
        .g-contact{display:flex;align-items:center;justify-content:space-between;background:#1A1A1A;border-radius:16px;padding:22px 24px;}
        .g-clabel2{color:#777;font-size:11px;letter-spacing:.07em;margin-bottom:4px;}
        .g-cnum{color:#E65100;font-weight:800;font-size:26px;}
        .g-caddr{color:#666;font-size:12px;margin-top:4px;}
        .g-cbtns{display:flex;gap:10px;flex-shrink:0;}
        .g-cbtn{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;text-decoration:none;border:none;cursor:pointer;flex-shrink:0;}
        .g-cbtn-call{background:#E65100;color:#fff;}
        .g-cbtn-wa{background:#25D366;color:#fff;}

        /* PHOTOS */
        .g-photos{padding-top:28px;}
        .g-pcount{font-size:13px;color:#888;margin-bottom:14px;}
        .g-pgrid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;}
        @media(max-width:900px){.g-pgrid{grid-template-columns:repeat(4,1fr);}}
        @media(max-width:640px){.g-pgrid{grid-template-columns:repeat(3,1fr);gap:6px;}}
        @media(max-width:380px){.g-pgrid{grid-template-columns:repeat(2,1fr);}}
        .g-pcell{aspect-ratio:1;border-radius:12px;overflow:hidden;cursor:pointer;background:#ddd;}
        .g-pcell img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .2s;}
        .g-pcell:hover img{transform:scale(1.06);}

        /* STATES */
        .g-state{text-align:center;padding:80px 20px;color:#888;display:flex;flex-direction:column;align-items:center;gap:14px;}
        .g-empty-t{font-size:16px;font-weight:700;color:#555;}
        .g-empty-s{font-size:13px;color:#999;max-width:320px;line-height:1.6;}
        .g-error{background:#FFF3E0;border:1px solid #E65100;border-radius:12px;padding:16px 18px;font-size:13px;color:#BF360C;margin:20px 0;line-height:1.6;}

        /* CTA bottom */
        .g-cta{display:flex;align-items:center;justify-content:space-between;background:#1A1A1A;border-radius:16px;padding:20px 24px;margin-top:28px;}
        .g-cta-label{color:#777;font-size:11px;letter-spacing:.07em;margin-bottom:4px;}
        .g-cta-n{color:#E65100;font-weight:800;font-size:22px;}
        .g-cta-btns{display:flex;gap:10px;}

        /* LIGHTBOX */
        .g-lb{position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:1000;display:flex;align-items:center;justify-content:center;}
        .g-lb-img{max-width:90vw;max-height:88vh;object-fit:contain;border-radius:8px;}
        .g-lb-x{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.15);border:none;border-radius:50%;width:42px;height:42px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;}
        .g-lb-p,.g-lb-n{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.15);border:none;border-radius:50%;width:50px;height:50px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;}
        .g-lb-p{left:14px;}.g-lb-n{right:14px;}
        .g-lb-c{position:absolute;bottom:18px;color:rgba(255,255,255,.6);font-size:13px;}
        .g-spin{animation:spin 1s linear infinite;}
        @keyframes spin{to{transform:rotate(360deg);}}
      `}</style>
    </div>
  );
}
