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
      {head()}
      <Navbar />

      {/* <section className='max-w-[1200px] mx-auto md:flex rounded-md md:gap-[80px] bg-[black] mt-8 border border-[#373737] text-[white]'>

          <div className='md:w-[400px] md:pt-0 pt-6'>
            <img className='   md:mx-0 mx-auto' src={`${DOMAIN}/cover.webp`} alt="jujutsu kaisen Cover" />
          </div>

          <div className='md:w-[700px] md:pr-5 md:p-0 p-4'>
            <h1 className=" tracking-wider text-center font-bold text-2xl pt-6 pb-5">{`${MANGA_NAME} manga`}</h1>
            <p className=" my-4 leading-[2] text-[15px] px-2 text-center" dangerouslySetInnerHTML={{ __html: MANGA_DESCRIPTION }}></p>

            <div className="flex justify-center items-center  pb-8 md:gap-16 gap-6 flex-wrap mt-14">
              <div className="text-center">
                <p className="font-bold sm:text-[18px] text-[14px] mb-2">Released</p>
                <p className="sm:text-[16px] text-[13px]">{MANGA_RELEASE}</p>
              </div>

              <div className="text-center">
                <p className=" font-bold sm:text-[18px] text-[14px] mb-2">Type</p>
                <p className="sm:text-[16px] text-[13px]">{MANGA_TYPE}</p>
              </div>

              <div className="text-center">
                <p className="font-bold sm:text-[18px] text-[14px] mb-2">Author</p>
                <p className="sm:text-[16px] text-[13px]">{MANGA_AUTHOR}</p>
              </div>

            </div>


          </div>

        </section> */}


      <section className='max-w-6xl mx-auto md:flex rounded-xl overflow-hidden bg-gradient-to-br from-[#05060f] to-black mt-12 border border-gray-800 text-white shadow-lg'>

        <div className='md:w-[300px] flex-shrink-0 relative'>
          <img
            className='w-full h-auto object-cover object-center md:rounded-l-xl p-4'
            src={`${DOMAIN}/cover.webp`}
            alt={`${MANGA_NAME} Cover`}
          />
        </div>

        <div className='md:flex-1 p-6 md:py-8'>
          <div className='flex flex-col h-full'>
            <div className='mb-6'>
              <h1 className="text-3xl font-bold text-white text-center md:text-left mb-3">
                {`${MANGA_NAME}`}
              </h1>
              <div className='flex justify-center md:justify-start gap-2 mb-6'>
                <span className='px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm font-medium'>
                  {MANGA_TYPE}
                </span>
                <span className='px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm font-medium'>
                  {/* {MANGA_RELEASE} */}
                </span>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-8 text-base">
              {MANGA_DESCRIPTION}
            </p>

            <div className="pb-4">
              <a href="https://www.amazon.com/blue-lock-manga/s?k=blue+lock+manga" target="_blank" rel="noopener noreferrer"
                className="text-[14px]  inline-flex items-center justify-center px-4 py-3 sm:px-5 sm:py-4 bg-blue-600 hover:bg-blue-700  text-white font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105  border-2 border-blue-500  hover:shadow-blue-500/50 " >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Buy Blue Lock Manga Online
              </a>
            </div>

            <div className="mt-auto grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-gray-800">
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold text-gray-400 mb-1">Author</p>
                <p className="text-base font-medium text-white">{MANGA_AUTHOR}</p>
              </div>

              <div className="text-center md:text-left">
                <p className="text-sm font-semibold text-gray-400 mb-1">Status</p>
                <p className="text-base font-medium text-white">Ongoing</p>
              </div>

              <div className="text-center md:text-left col-span-2 md:col-span-1">
                <p className="text-sm font-semibold text-gray-400 mb-1">Chapters</p>
                <p className="text-base font-medium text-white">314 +</p>
              </div>
            </div>
          </div>
        </div>


      </section>











      <h2 id="readmanga" className="font-extrabold text-3xl my-10 px-4 text-center">
        <Link href={DOMAIN} className="hover:underline text-[white]">{`${MANGA_NAME} Manga Chapters`}</Link>
      </h2>


      <section className="chapter-container">
        <div className="chapter-box">
          <ul className="chapter-list">
            {chapters?.map((chapter, index) => (
              <li className="chapter-item" key={index}>
                <a href={chapter.url} className="chapter-link">
                  {`Chapter ${chapter?.number}`}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>





      <section className="bg-[black] relative">
        <div className="absolute inset-0 bg-black opacity-80"></div> {/* Dark overlay */}
        <div className="pt-10 pb-10 max-w-[1100px] mx-auto px-5 text-[white] relative z-10">
          <h2 className="text-center font-extrabold text-3xl">{`More About This Manga`}</h2>
          {MANGA_SUMMARY.map(paragraph => (
            <p className="py-7 leading-[2]" key={paragraph.id}>{paragraph.content}</p>
          ))}
        </div>
      </section>


      <section className="text-white my-5">
        <h2 className="text-3xl text-center my-5">{`Latest Chapters`}</h2>
        {last5chapters?.map((chapter, index) => (
          <div key={index} className="text-center p-1.5 hover:underline"><a href={`${DOMAIN}/${URL_PREFIX}-${chapter.chapterNumber}`}>{`${MANGA_NAME} Chapter ${chapter.chapterNumber}`}</a></div>
        ))}
      </section>



      <div className="flex justify-center"><img src={`${DOMAIN}/1.webp`} alt={`${MANGA_NAME} Images`} /></div>
      <div className="flex justify-center"><img src={`${DOMAIN}/2.webp`} alt={`${MANGA_NAME} Images`} /></div>
      <div className="flex justify-center"><img src={`${DOMAIN}/3.webp`} alt={`${MANGA_NAME} Images`} /></div>
      <div className="flex justify-center"><img src={`${DOMAIN}/4.webp`} alt={`${MANGA_NAME} Images`} /></div>
      <div className="flex justify-center"><img src={`${DOMAIN}/5.webp`} alt={`${MANGA_NAME} Images`} /></div>



      <Footer />
    </>
  );
}