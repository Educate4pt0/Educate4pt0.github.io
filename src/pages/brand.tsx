// # Brand Guidelines

// Welcome to the brand guidelines page. Here you'll find all the necessary information about our brand identity, including logo usage, color palette, typography, and more.

// ## Colour Palette

// Our brand colors are carefully selected to represent our identity. Below are the primary and secondary colors used in our branding.

// {/* We can pull these directly from the css variables defined in our stylesheets. Like --ifm-color-primary etc. */}
// - Primary Color: ![#007bff](https://via.placeholder.com/15/007bff/000000?text=+) `#007bff`

import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Head from '@docusaurus/Head';


function ColourSwatch({ color, colorName }: { color: string; colorName: string }) {
    return (
        <span
            className={clsx('padding--sm', 'margin-right--sm')}
            style={{
                display: 'inline-block',
                width: '240px',
                height: '40px',
                backgroundColor: `${color}`,
                border: '1px solid #000',
                verticalAlign: 'middle',
                alignItems: 'center',
                alignContent: 'center',
                marginBottom: '10px',
            }}>
            <span
                style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    lineHeight: '30px',
                    color: '#fff',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                    paddingLeft: '5px',
                    alignItems: 'center',
                    alignContent: 'center',
                }}>
                {colorName} ({color})
            </span>
        </span >
    );
}

export default function Brand(): ReactNode {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title="Brand Guidelines"
            description="Learn about our brand identity, including logo usage, color palette, typography, and more." >
            <main>
                <Heading as="h1" className="text--center margin-vert--lg">Brand Guidelines</Heading>
                <section className='container margin-vert--lg'>
                    <Head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    </Head>
                    <div>
                        <p>Welcome to the brand guidelines page. Here you'll find all the necessary information about our brand identity, including logo usage, color palette, typography, and more.</p>

                        <h2>Colour Palette</h2>
                        <p>Our brand colors are carefully selected to represent our identity. Below are the primary and secondary colors used in our branding.</p>
                        <span>
                            <ColourSwatch color="#F58A07" colorName="Tiger Orange" />
                            <ColourSwatch color="#F9AB55" colorName="Sandy Brown" />
                            <ColourSwatch color="#084887" colorName="Steel Azure" />
                            <ColourSwatch color="#909CC2" colorName="Lavender Grey" />
                            <ColourSwatch color="#F7F5FB" colorName="Ghost White" />
                        </span>


                        <h2>Logo Usage</h2>
                        <p>Our logo is a crucial part of our brand identity. Please ensure that you use it correctly and consistently across all platforms.</p>
                        <ul>
                            <li>Do not alter the logo's colors.</li>
                            <li>Maintain clear space around the logo.</li>
                            <li>Use high-resolution versions for print materials.</li>
                        </ul>
                    </div>
                </section>
            </main>
        </Layout >
    );
}

