import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';
import { APP_NAME, DOMAIN, MANGA_NAME, NEXT_PREVIOUS_PREFIX, IMAGE_PREFIX, CHAPTER_PREFIX, AUTHOR_PAGE, LOGO_URL, chaptersData, IMAGES_SUBDOMAIN, DOMAIN_NAME, MANGA_GENRE, MANGA_TYPE, last5chapters, URL_PREFIX, HEADER_MANGA_DESC, ABOUT } from '@/config';
import DisqusComments from '@/components/DisQus';
import { AiFillChrome } from "react-icons/ai";
import { FaTelegram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaRedditAlien } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { DiscussionEmbed } from 'disqus-react';
import MyHeader from '@/components/Header';
export const runtime = 'experimental-edge';

export default function Chapter({ chapterNumber, imageUrls, totalChapters, params, errorcode, uploadDateTime, modifiedDate, readableDate }) {

    if (errorcode) {
        return (
            <>
                <Navbar />
                <div className="text-center py-10 text-white">
                    <h1 className="text-3xl font-bold mt-10">404 Page Not Found</h1>
                    <p className="text-lg mt-4">The page you are looking for does not exist.</p>
                </div>
                <Footer />
            </>
        );
    }


    const chapterIndex = chaptersData.findIndex(chapter => chapter.chapterNumber === chapterNumber);
    const previousChapter = chapterIndex > 0 ? chaptersData[chapterIndex - 1].chapterNumber : null;
    const nextChapter = chapterIndex < totalChapters - 1 ? chaptersData[chapterIndex + 1].chapterNumber : null;


    const DESCRIPTION = `Read ${MANGA_NAME} Chapter ${chapterNumber} online.`;
    const URL = params.chapter;

    const schema =
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${DOMAIN}/manga/${URL}`
        },
        "headline": `${APP_NAME} Manga Chapter ${chapterNumber}`,
        "datePublished": uploadDateTime,
        "dateModified": modifiedDate,
        "author": {
            "@type": "Person",
            "name": `${APP_NAME} Team`
        },
        "publisher": {
            "@type": "Organization",
            "name": `${APP_NAME}`,
            "logo": {
                "@type": "ImageObject",
                "url": `${DOMAIN}/logo.webp`
            }
        },
        "description": `${DESCRIPTION}`,
    }



    const postUrl = `${DOMAIN}/${URL_PREFIX}-${chapterNumber}`;
    const encodedTitle = `${MANGA_NAME} Chapter ${chapterNumber}`;
    const encodedUrl = postUrl;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
    const telegramUrl = `https://telegram.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
    const redditUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;


    const head = () => (
        <Head>
            <title>{`${MANGA_NAME} Chapter ${chapterNumber}`}</title>
            <meta name="description" content={DESCRIPTION} />
            <link rel="canonical" href={`${DOMAIN}/manga/${URL}`} />
            <meta name="robots" content="follow, index, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <meta property="og:title" content={`${MANGA_NAME} Chapter ${chapterNumber}`} />
            <meta property="og:description" content={DESCRIPTION} />
            <meta property="og:updated_time" content={modifiedDate} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/manga/${URL}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${IMAGES_SUBDOMAIN}/chapter-${chapterNumber}/1.webp`} />
            <meta property="og:image:secure_url" content={`${IMAGES_SUBDOMAIN}/chapter-${chapterNumber}/1.webp`} />
            <meta property="og:image:type" content="image/webp" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        </Head >
    );


    return (
        <div >
            {head()}
            <MyHeader />
            <Navbar />
            <article >


                <h1 className="chapter-title">
                    {`${MANGA_NAME} Chapter ${chapterNumber}`}
                </h1>

                <section className="breadcrumb">
                    <div><a href={DOMAIN}>Home</a></div>
                    <div className="separator">{`->`}</div>
                    <div><a href={`${DOMAIN}/${URL_PREFIX}-${chapterNumber}`}>{`${MANGA_NAME} Chapter ${chapterNumber}`}</a></div>
                </section>

                <section className="chapter-meta">
                    <div className="meta-item">
                        {/* <CiCalendarDate /> */}
                        <time dateTime={uploadDateTime}>{readableDate}</time>
                    </div>
                </section>


                <section className="social-share">
                    <a href={facebookUrl} className="social-facebook">
                        {/* <FaFacebook /> */}
                        <span>Facebook</span>
                    </a>
                    <a href={redditUrl} className="social-reddit">
                        {/* <FaRedditAlien /> */}
                        <span>Reddit</span>
                    </a>
                    <a href={twitterUrl} className="social-twitter">
                        {/* <FaTwitter /> */}
                        <span>Twitter</span>
                    </a>
                    <a href={telegramUrl} className="social-telegram">
                        {/* <FaTelegram /> */}
                        <span>Telegram</span>
                    </a>
                    <a href={whatsappUrl} className="social-whatsapp">
                        {/* <IoLogoWhatsapp /> */}
                        <span>WhatsApp</span>
                    </a>
                </section>

                <section className="chapter-nav">
                    {previousChapter !== null ? (
                        <Link href={`${DOMAIN}/${NEXT_PREVIOUS_PREFIX}-${previousChapter}`}>
                            <button className="btn-previous">Previous</button>
                        </Link>
                    ) : (
                        <button className="btn-previous" disabled>Previous</button>
                    )}

                    {nextChapter !== null ? (
                        <Link href={`${DOMAIN}/${NEXT_PREVIOUS_PREFIX}-${nextChapter}`}>
                            <button className="btn-next">Next</button>
                        </Link>
                    ) : (
                        <button className="btn-next" disabled>Next</button>
                    )}
                </section>




                <section className='max-w-[1200px] mx-auto mb-5'>
                    {imageUrls.map((imageUrl, index) => (
                        <p className='allimages' key={index}>
                            <img loading="lazy" src={imageUrl} alt={`${APP_NAME} Chapter ${chapterNumber} Image ${index + 1}`} />
                        </p>
                    ))}
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

            </article>
            <Footer />
        </div>
    );
}

// export async function getStaticPaths() {
//     const paths = chaptersData.map(chapter => ({
//         params: { chapter: `chapter-${chapter.chapterNumber}` },
//     }));
//     return { paths, fallback: 'blocking' };
// }

export async function getServerSideProps({ req, res, params }) {
    const chapterParam = params.chapter;

    if (!chapterParam.startsWith(CHAPTER_PREFIX)) {
        return { props: { errorcode: true } };
    }

    const chapterNumber = chapterParam.split(`chapter-`)[1];

    // if (chapterNumber === undefined) { return { props: { errorcode: true } }; }

    const chapterData = chaptersData.find(ch => ch.chapterNumber === chapterNumber);
    if (!chapterData) { return { props: { errorcode: true } }; }

    const chapterIndex = chaptersData.findIndex(ch => ch.chapterNumber === chapterNumber);

    const totalChapters = chaptersData.length;
    const numImages = chapterData.numImages;
    const mysummary = chapterData.summary;
    const summary = mysummary.replace(/\s+/g, ' ').trim();

    const imageUrls = getImageUrls(chapterNumber, numImages);


    const baseDate = new Date("2025-09-07T00:00:00Z");

    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + (parseInt(chapterNumber) - 1));

    const uploadDateTime = date.toISOString();
    const modifiedDate = new Date(date.getTime() + 2 * 60 * 60 * 1000).toISOString(); // +2 hours
    const readableDate = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    function splitSummaryBySentences(text, sentencesPerParagraph = 3) {
        // Split by '.', '!', or '?' keeping the punctuation
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
        const paragraphs = [];

        for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
            const para = sentences.slice(i, i + sentencesPerParagraph).join(" ").trim();
            if (para) paragraphs.push(para);
        }

        return paragraphs;
    }

    // const formattedSummary = splitSummaryBySentences(summary);





    return { props: { chapterNumber, imageUrls, totalChapters, params, chapterIndex, uploadDateTime, modifiedDate, readableDate } };
}


const getImageUrls = (chapterNumber, numImages) => {
    const imageUrls = [];
    const chapterImagesFolder = `${IMAGES_SUBDOMAIN}/chapter-${chapterNumber}`;
    for (let i = 1; i <= numImages; i++) {
        const imageUrl = `${chapterImagesFolder}/${i}.webp`;
        imageUrls.push(imageUrl);
    }
    return imageUrls;
};

