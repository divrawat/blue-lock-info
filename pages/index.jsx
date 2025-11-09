import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { DOMAIN, MANGA_NAME, MANGA_DESCRIPTION, MANGA_AUTHOR, MANGA_RELEASE, MANGA_GENRE, APP_DESCRIPTION, APP_NAME, MANGA_SUMMARY, COVER_IMG, AUTHOR_PAGE, LOGO_URL, URL_PREFIX, chaptersData, BEHIND_COVER_IMG, DOMAIN_NAME, MANGA_TYPE, HEADER_MANGA_DESC, last5chapters, CHAPTER_PREFIX, ABOUT } from "@/config";
import Head from "next/head";
import MyHeader from "@/components/Header";

export default function Home() {


  const sortedChapters = chaptersData.sort((a, b) => {
    const aParts = a.chapterNumber.match(/(\d+)([a-z]*)/);
    const bParts = b.chapterNumber.match(/(\d+)([a-z]*)/);
    const aNumber = parseInt(aParts[1], 10);
    const bNumber = parseInt(bParts[1], 10);

    if (aNumber === bNumber) {
      return aParts[2].localeCompare(bParts[2]);
    }
    return aNumber - bNumber;
  }).reverse();


  const chapters = sortedChapters.map((chapter) => ({
    number: chapter.chapterNumber,
    url: `${DOMAIN}/${URL_PREFIX}-${chapter.chapterNumber}`
  }));


  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${DOMAIN}/#website`,
        "url": `${DOMAIN}`,
        "name": `${APP_NAME}`,
        "description": `${HEADER_MANGA_DESC}`,
        "publisher": {
          "@id": `${DOMAIN}/#organization`
        },
      },
      {
        "@type": "CollectionPage",
        "@id": `${DOMAIN}/#webpage`,
        "url": `${DOMAIN}`,
        "name": `${APP_NAME}`,
        "description": `${HEADER_MANGA_DESC}`,
        "inLanguage": "en-US",
        "isPartOf": {
          "@id": `${DOMAIN}/#website`,
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "@id": `${DOMAIN}/#primaryimage`,
          "url": `${DOMAIN}/cover.webp`,
          "width": 1200,
          "height": 630,
          "caption": "A person playing soccor in blue shirt"
        },
        "image": {
          "@id": `${DOMAIN}/#primaryimage`,
        }
      },
      {
        "@type": "Organization",
        "@id": `${DOMAIN}/#organization`,
        "name": `${APP_NAME}`,
        "url": `${DOMAIN}`,
        "logo": {
          "@type": "ImageObject",
          "@id": `${DOMAIN}/#logo`,
          "url": `${DOMAIN}/logo.webp`,
          "width": 80,
          "height": 100
        },
      }
    ]
  }


  const head = () => (
    <Head>
      <title>{`${MANGA_NAME} Manga Online`}</title>
      <meta name="description" content={HEADER_MANGA_DESC} />
      <link rel="canonical" href={`${DOMAIN}`} />
      <meta property="og:title" content={`${MANGA_NAME} Manga & Summary Online`} />
      <meta property="og:description" content={HEADER_MANGA_DESC} />
      <meta property="og:type" content="webiste" />
      <meta name="robots" content="follow, index, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
      <meta property="og:url" content={`${DOMAIN}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta property="og:updated_time" content="2025-10-25T14:16:03+00:00" />
      <meta property="article:published_time" content="2024-09-01T22:29:53+00:00" />
      <meta property="article:modified_time" content="2025-10-25T14:16:03+00:00" />
      <meta property="og:image" content={`${COVER_IMG}`} />
      <meta property="og:image:secure_url" content={`${COVER_IMG}`} />
      <meta property="og:image:type" content="image/jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${MANGA_NAME} ${MANGA_TYPE} Online`} />
      <meta name="twitter:description" content={HEADER_MANGA_DESC} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </Head >
  );


  return (
    <>
      {head()}

      <MyHeader />
      <Navbar />

      <main className="container">
        <article>

          <header className="manga-header">
            <h1 className="manga-heading">{MANGA_NAME}</h1>
          </header>

          <div className="entry">
            <div className="artwork-grid">
              {[4, 5].map((num) => (
                <div key={num} className="artwork-item">
                  <img
                    src={`${DOMAIN}/${num}.webp`}
                    alt={`${MANGA_NAME} Panel ${num}`}
                    className="artwork-image"
                  />
                </div>
              ))}
            </div>


            <p className="description"> {MANGA_DESCRIPTION} </p>

            <div className="video-section">
              <h2 className="manga-heading">{MANGA_NAME}</h2>
              <div className="video-container">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/1NlWOdTuBLk?si=Jqcq1PQz3THAkFUM&amp;start=2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>

            <section className="chapters-section">
              <h2 className="section-title">All Chapters</h2>

              <ul className="chapters-list">
                {chapters.map((chapter, index) => (
                  <li key={index} className="chapter-item">
                    <Link href={chapter.url} className="chapter-link">
                      {`${MANGA_NAME}, Chapter ${chapter.number}`}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>



            <div className="info-row">
              <div className="about-section">
                <h2>About {MANGA_NAME}</h2>
                <p>{ABOUT}</p>
              </div>

              <div className="latest-chapters">
                <h2>Last 5 Chapters</h2>
                <div className="chapters-list">
                  {last5chapters.slice(-5).map((chapter, index) => (
                    <a key={index} href={`${DOMAIN}/manga/${CHAPTER_PREFIX}-${chapter.chapterNumber}`} className="chapter-link" >
                      {`${MANGA_NAME} Chapter ${chapter.chapterNumber}`}
                    </a>
                  ))}
                </div>
              </div>
            </div>


          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}