import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';
import { APP_NAME, DOMAIN, MANGA_NAME, NEXT_PREVIOUS_PREFIX, IMAGE_PREFIX, CHAPTER_PREFIX, AUTHOR_PAGE, LOGO_URL, chaptersData, IMAGES_SUBDOMAIN, DOMAIN_NAME, MANGA_GENRE, MANGA_TYPE, last5chapters, URL_PREFIX, HEADER_MANGA_DESC } from '@/config';
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
export const runtime = 'experimental-edge';

export default function Chapter({ chapterNumber, imageUrls, totalChapters, params, errorcode, summary, uploadDateTime, modifiedDate, readableDate, formattedSummary }) {

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


    const DESCRIPTION = `${summary}`;
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
        "description": `${summary}`
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
            <title>{`${MANGA_NAME} Chapter ${chapterNumber} Summary & Manga`}</title>
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
        <div className='bg-gradient-to-b from-gray-900 to-black'>
            {head()}
            <Navbar />
            <article className=''>
                <h1 className="text-3xl font-bold text-center text-[white] px-5 pt-5 md:my-5">{`${MANGA_NAME} Chapter ${chapterNumber}, Summary & Manga`}</h1>

                <section className='flex justify-center px-5 text-[#85e1e6] text-[13px] mb-5'>
                    <div><a href={DOMAIN}>Home</a></div>
                    <div className='px-2'>{` -> `}</div>
                    <div><a href={`${DOMAIN}/${URL_PREFIX}-${chapterNumber}`}>{`${MANGA_NAME} Chapter ${chapterNumber}`}</a></div>
                </section>




                <section className='flex justify-center gap-10 pb-5 flex-wrap text-[13px] text-white'>
                    <div className='flex gap-3 items-center'>
                        <div><CiCalendarDate /></div>
                        <time dateTime={uploadDateTime}>{readableDate}</time>
                    </div>
                </section>




                <section className="flex gap-4 flex-wrap px-5 text-white justify-center mb-3">


                    <a href={facebookUrl} className="flex gap-1 items-center bg-blue-600 rounded-md px-2 py-1">
                        <span><FaFacebook /></span>
                        <span className={` text-[12px]`}>FaceBook</span>
                    </a>

                    <a href={redditUrl} className="flex gap-1 items-center bg-orange-500 rounded-md px-2 py-1">
                        <span className="pb-[3px]"><FaRedditAlien /></span>
                        <span className={` text-[12px]`}>Reddit</span>
                    </a>

                    <a href={twitterUrl} className="flex gap-1 items-center bg-blue-500 rounded-md px-2 py-1">
                        <span><FaTwitter /></span>
                        <span className={`text-[12px]`}>Twitter</span>
                    </a>



                    <a href={telegramUrl} className="flex gap-1 items-center bg-blue-600 rounded-md px-2 py-1">
                        <span><FaTelegram /></span>
                        <span className={` text-[12px]`}>Telegram</span>
                    </a>

                    <a href={whatsappUrl} className="flex gap-1 items-center bg-green-500 rounded-md px-2 py-1">
                        <span><IoLogoWhatsapp /></span>
                        <span className={` text-[12px]`}>WhatsApp</span>
                    </a>

                </section>







                {/* <p className='text-center px-4 pt-2 font-bold text-[white]'>{`You are on ${MANGA_NAME} Chapter ${chapterNumber}.`}</p> */}

                <section className='mx-3 my-7'>
                    <div className="flex justify-between max-w-[800px] mx-auto md:mb-[50px] mt-5">
                        {previousChapter !== null ? (
                            <Link href={`${DOMAIN}/${NEXT_PREVIOUS_PREFIX}-${previousChapter}`}>
                                <button className="text-[black] text-[13px] hover:scale-105 active:scale-95 transition-transform rounded bg-[white] px-2 py-2 font-semibold">Previous</button>
                            </Link>
                        ) : (
                            <button className="text-[black] text-[13px] rounded bg-[gray] px-2 py-2 font-semibold cursor-not-allowed" disabled>Previous</button>
                        )}

                        {nextChapter !== null ? (
                            <Link href={`${DOMAIN}/${NEXT_PREVIOUS_PREFIX}-${nextChapter}`}>
                                <button className="text-[black] text-[13px] hover:scale-105 active:scale-95 transition-transform rounded bg-[white] px-2 py-2 font-semibold">Next</button>
                            </Link>
                        ) : (
                            <button className="text-[white] text-[13px] rounded bg-[gray] px-2 py-2 font-semibold cursor-not-allowed" disabled>Next</button>
                        )}

                    </div>
                </section>





                <section className='max-w-[1000px] mx-auto mb-5'>
                    {formattedSummary.map((para, index) => (
                        <p key={index} className="mb-4 leading-relaxed text-gray-200">
                            {para}
                        </p>
                    ))}
                </section>




                <section className='max-w-[1200px] mx-auto mb-5'>
                    {imageUrls.map((imageUrl, index) => (
                        <p className='allimages' key={index}>
                            <img loading="lazy" src={imageUrl} alt={`${APP_NAME} Chapter ${chapterNumber} Image ${index + 1}`} />
                        </p>
                    ))}
                </section>





                {/* <section className="text-white my-5">
                    <h2 className="text-3xl text-center my-5">{`${MANGA_NAME} Latest Chapters`}</h2>
                    {last5chapters?.map((chapter, index) => (
                        <li key={index} className="lastchapters"><a href={`${DOMAIN}/${URL_PREFIX}-${chapter.chapterNumber}/`}>{`${MANGA_NAME} Chapter ${chapter.chapterNumber}`}</a></li>
                    ))}
                </section> */}


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

    const formattedSummary = splitSummaryBySentences(summary);





    return { props: { chapterNumber, imageUrls, totalChapters, params, chapterIndex, summary, uploadDateTime, modifiedDate, readableDate, formattedSummary } };
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

