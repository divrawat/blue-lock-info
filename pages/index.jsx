import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { DOMAIN, MANGA_NAME, MANGA_DESCRIPTION, MANGA_AUTHOR, MANGA_RELEASE, MANGA_GENRE, APP_DESCRIPTION, APP_NAME, MANGA_SUMMARY, COVER_IMG, AUTHOR_PAGE, LOGO_URL, URL_PREFIX, chaptersData, BEHIND_COVER_IMG, DOMAIN_NAME, MANGA_TYPE, HEADER_MANGA_DESC, last5chapters, CHAPTER_PREFIX } from "@/config";
import Head from "next/head";

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
      <meta property="og:title" content={`${MANGA_NAME} Manga Online`} />
      <meta property="og:description" content={HEADER_MANGA_DESC} />
      <meta property="og:type" content="webiste" />
      <meta name="robots" content="follow, index, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
      <meta property="og:url" content={`${DOMAIN}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta property="og:updated_time" content="2025-01-08T14:16:03+00:00" />
      <meta property="article:published_time" content="2024-05-24T22:29:53+00:00" />
      <meta property="article:modified_time" content="2025-25-08T14:16:03+00:00" />
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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {head()}
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <section className="rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/30 via-gray-900/70 to-black border border-gray-800 shadow-2xl mb-16">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-80 flex-shrink-0 p-6 flex items-center justify-center">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-blue-600/50 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <img
                    className="relative w-full h-auto object-cover rounded-xl shadow-2xl transform group-hover:scale-105 transition duration-300"
                    src={`${DOMAIN}/cover.webp`}
                    alt={`${MANGA_NAME} Cover`}
                  />
                </div>
              </div>

              <div className="flex-1 p-6 md:py-8">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent text-center md:text-left mb-4">
                      {MANGA_NAME}
                    </h1>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                      <span className="px-4 py-1.5 bg-blue-900/60 text-blue-200 rounded-full text-sm font-medium border border-blue-700/30">
                        {MANGA_TYPE}
                      </span>
                      <span className="px-4 py-1.5 bg-purple-900/60 text-purple-200 rounded-full text-sm font-medium border border-purple-700/30">
                        Action
                      </span>
                      <span className="px-4 py-1.5 bg-cyan-900/60 text-cyan-200 rounded-full text-sm font-medium border border-cyan-700/30">
                        Shounen
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                    {MANGA_DESCRIPTION}
                  </p>

                  <div className="pb-4">
                    <a
                      href="https://www.amazon.com/blue-lock-manga/s?k=blue+lock+manga"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-blue-500/30 hover:shadow-blue-500/30"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Buy {MANGA_NAME} Manga
                    </a>
                  </div>

                  <div className="mt-auto grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-800/60">
                    <div className="text-center md:text-left">
                      <p className="text-sm font-semibold text-gray-400 mb-1">Author</p>
                      <p className="text-base font-medium text-white">{MANGA_AUTHOR}</p>
                    </div>

                    <div className="text-center md:text-left">
                      <p className="text-sm font-semibold text-gray-400 mb-1">Status</p>
                      <p className="text-base font-medium text-green-400">Ongoing</p>
                    </div>

                    <div className="text-center md:text-left">
                      <p className="text-sm font-semibold text-gray-400 mb-1">Chapters</p>
                      <p className="text-base font-medium text-white">314 +</p>
                    </div>

                    <div className="text-center md:text-left">
                      <p className="text-sm font-semibold text-gray-400 mb-1">Rating</p>
                      <div className="flex items-center justify-center md:justify-start">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-base font-medium text-white">4.8/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Chapters Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {MANGA_NAME} Chapters
              </span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {chapters.map((chapter, index) => (
                <Link key={index} href={chapter.url}>
                  <div className="bg-gray-800/40 hover:bg-blue-900/30 rounded-xl p-4 text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border border-gray-700/50 hover:border-blue-500/30 cursor-pointer">
                    <div className="text-lg font-semibold mb-1">Chapter {chapter.number}</div>
                    <div className="text-xs text-gray-400">2 days ago</div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-300 border border-gray-700/50">
                Load More Chapters
              </button>
            </div>
          </section>

          {/* About Section */}
          <section className="bg-gray-900/40 rounded-2xl p-8 mb-16 border border-gray-800/50">
            <h2 className="text-3xl font-bold text-center mb-10">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                About {MANGA_NAME}
              </span>
            </h2>

            <div className="max-w-3xl mx-auto">
              {MANGA_SUMMARY.map(paragraph => (
                <p key={paragraph.id} className="text-gray-300 leading-relaxed mb-6 text-lg">
                  {paragraph.content}
                </p>
              ))}
            </div>
          </section>

          {/* Latest Chapters */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Latest Chapters
              </span>
            </h2>

            <div className="bg-gray-900/40 rounded-2xl p-6 border border-gray-800/50">
              {last5chapters?.map((chapter, index) => (
                <div key={index} className="py-4 border-b border-gray-800/50 last:border-b-0">
                  <Link href={`${DOMAIN}/${URL_PREFIX}/${chapter.chapterNumber}`}>
                    <div className="flex items-center justify-between hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-blue-900/30 flex items-center justify-center mr-4 border border-blue-700/30">
                          <span className="text-blue-400 font-semibold">{chapter.chapterNumber}</span>
                        </div>
                        <span className="text-lg">{MANGA_NAME} Chapter {chapter.chapterNumber}</span>
                      </div>
                      <span className="text-sm text-gray-400">2 days ago</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Manga Panels */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {MANGA_NAME} Artwork
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500">
                  <img
                    src={`${DOMAIN}/${num}.webp`}
                    alt={`${MANGA_NAME} Panel ${num}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}