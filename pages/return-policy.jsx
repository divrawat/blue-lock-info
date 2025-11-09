import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { DOMAIN } from "@/config";
import MyHeader from "@/components/Header";

const PrivacyPolicy = () => {

    const head = () => (
        <Head>
            <title>Return Policy</title>
            <meta name="robots" content="index, follow, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <meta property="og:url" content={`${DOMAIN}/return-policy`} />
        </Head >
    );


    return (
        <>
            {head()}
            <MyHeader />
            <Navbar />
            <div className="max-w-[1000px] mx-auto p-5">
                <h1 className="text-center font-bold text-3xl my-8">Return Policy</h1>

                <p className="my-8 leading-[2]">Thanks you for visiting our website. This Return Policy is designed to help you understand how we collect, use, disclose, and safeguard your manga</p>

                <h2 className="text-2xl font-bold my-5">Return & Claims Policy</h2>
                <p className="my-8 leading-[2]">We want you to be happy with your order. If something isn’t right, here’s how we handle it:</p>
                <p className="my-8 leading-[2]">If your item arrives misprinted, damaged, or defective, please reach out to us within 4 weeks of receiving it. We’ll review your claim, and if the issue is on our side, we’ll cover the costs of fixing it.</p>
                <p className="my-8 leading-[2]">If your package never arrives, claims must be submitted no later than 4 weeks after the estimated delivery date.</p>
                <p className="my-8 leading-[2]">By default, all returns are sent back to our facility. When a return is received, you’ll get an automated email notification. If a return goes unclaimed for more than 4 weeks, it will be donated to Charity.</p>
                <p className="my-8 leading-[2]">If you decide not to use our facility as the return address, you’ll be responsible for handling and covering any returns shipped to you directly.</p>
                <p className="my-8 leading-[2]">If an order can’t be delivered because of an incorrect or incomplete address, it will be returned to our facility. Once we have a corrected address, you’ll need to cover the reshipment cost.</p>
                <p className="my-8 leading-[2]">If a package isn’t claimed and gets sent back to us, you will also be responsible for the cost of reshipping.</p>
                <p className="my-8 leading-[2]">Under Article 16(c) of Directive 2011/83/EU (Consumer Rights Directive), the right of withdrawal does not apply to goods that are custom‑made or clearly personalized. Because of this, we reserve the right to refuse returns at our discretion when it comes to personalized products.</p>
                <p className="my-8 leading-[2]">This policy is written and governed in English. In case of any translation discrepancies, the English version always takes priority.</p>
                <p className="my-8 leading-[2]">If you need assistance, please contact us at: support@bluelockkmanga.online</p>
            </div>
            <Footer />
        </>
    );
}

export default PrivacyPolicy;