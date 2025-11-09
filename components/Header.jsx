import { DOMAIN, MANGA_NAME } from "@/config";

export default function MyHeader() {
    return (
        <header className="header-section">
            <img src={`${DOMAIN}/3.webp`} alt="Background" className="header-bg" />
            <div className="overlay"></div>
            <div className="container">
                <h1><a href={`${DOMAIN}`}>{MANGA_NAME} Manga Online</a></h1>
                <div>Read {MANGA_NAME} Manga Online in HD Quality</div>
            </div>
        </header>
    );
}
