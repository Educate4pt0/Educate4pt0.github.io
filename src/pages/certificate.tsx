import React, { useMemo } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { CertificateRenderer } from '@site/src/components/Certificate/CertificateRenderer';

/**
 * Certificate display page
 * Reads template and parameters from URL query params
 * 
 * Example URLs:
 * /certificate?template=educate4&achieverName=John%20Doe&courseName=Scratch%20Basics&completionDate=2026-01-17&certifierName=Ms.%20Smith
 */
export default function CertificatePage() {
    return (
        <BrowserOnly fallback={<div>Loading certificate...</div>}>
            {() => <CertificatePageContent />}
        </BrowserOnly>
    );
}

function CertificatePageContent() {
    const { template, params } = useMemo(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const template = searchParams.get('template') || 'educate4';

        // Extract all other params except 'template'
        const params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            if (key !== 'template') {
                params[key] = value;
            }
        });

        return { template, params };
    }, []);

    return (
        <Layout
            title="Certificate"
            description="Generated certificate for course completion"
            noFooter={true}
            wrapperClassName="certificate-page-layout"
        >
            <CertificateRenderer template={template} params={params} />
        </Layout>
    );
}
