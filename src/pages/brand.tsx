import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Head from '@docusaurus/Head';

interface ColorShade {
    name: string;
    variable: string;
    shade: string;
}

interface ColorPalette {
    name: string;
    description: string;
    shades: ColorShade[];
}

const colorPalettes: ColorPalette[] = [
    {
        name: 'Tiger Orange',
        description: 'Primary brand color - energetic and warm',
        shades: [
            { name: 'Tiger Orange 50', variable: '--tiger-orange-50', shade: '50' },
            { name: 'Tiger Orange 100', variable: '--tiger-orange-100', shade: '100' },
            { name: 'Tiger Orange 200', variable: '--tiger-orange-200', shade: '200' },
            { name: 'Tiger Orange 300', variable: '--tiger-orange-300', shade: '300' },
            { name: 'Tiger Orange 400', variable: '--tiger-orange-400', shade: '400' },
            { name: 'Tiger Orange 500', variable: '--tiger-orange-500', shade: '500' },
            { name: 'Tiger Orange 600', variable: '--tiger-orange-600', shade: '600' },
            { name: 'Tiger Orange 700', variable: '--tiger-orange-700', shade: '700' },
            { name: 'Tiger Orange 800', variable: '--tiger-orange-800', shade: '800' },
            { name: 'Tiger Orange 900', variable: '--tiger-orange-900', shade: '900' },
            { name: 'Tiger Orange 950', variable: '--tiger-orange-950', shade: '950' },
        ],
    },
    {
        name: 'Steel Azure',
        description: 'Primary accent color - professional and trustworthy',
        shades: [
            { name: 'Steel Azure 50', variable: '--steel-azure-50', shade: '50' },
            { name: 'Steel Azure 100', variable: '--steel-azure-100', shade: '100' },
            { name: 'Steel Azure 200', variable: '--steel-azure-200', shade: '200' },
            { name: 'Steel Azure 300', variable: '--steel-azure-300', shade: '300' },
            { name: 'Steel Azure 400', variable: '--steel-azure-400', shade: '400' },
            { name: 'Steel Azure 500', variable: '--steel-azure-500', shade: '500' },
            { name: 'Steel Azure 600', variable: '--steel-azure-600', shade: '600' },
            { name: 'Steel Azure 700', variable: '--steel-azure-700', shade: '700' },
            { name: 'Steel Azure 800', variable: '--steel-azure-800', shade: '800' },
            { name: 'Steel Azure 900', variable: '--steel-azure-900', shade: '900' },
            { name: 'Steel Azure 950', variable: '--steel-azure-950', shade: '950' },
        ],
    },
    {
        name: 'Sandy Brown',
        description: 'Secondary warm accent - friendly and approachable',
        shades: [
            { name: 'Sandy Brown 50', variable: '--sandy-brown-50', shade: '50' },
            { name: 'Sandy Brown 100', variable: '--sandy-brown-100', shade: '100' },
            { name: 'Sandy Brown 200', variable: '--sandy-brown-200', shade: '200' },
            { name: 'Sandy Brown 300', variable: '--sandy-brown-300', shade: '300' },
            { name: 'Sandy Brown 400', variable: '--sandy-brown-400', shade: '400' },
            { name: 'Sandy Brown 500', variable: '--sandy-brown-500', shade: '500' },
            { name: 'Sandy Brown 600', variable: '--sandy-brown-600', shade: '600' },
            { name: 'Sandy Brown 700', variable: '--sandy-brown-700', shade: '700' },
            { name: 'Sandy Brown 800', variable: '--sandy-brown-800', shade: '800' },
            { name: 'Sandy Brown 900', variable: '--sandy-brown-900', shade: '900' },
            { name: 'Sandy Brown 950', variable: '--sandy-brown-950', shade: '950' },
        ],
    },
    {
        name: 'Lavender Grey',
        description: 'Secondary cool neutral - sophisticated and balanced',
        shades: [
            { name: 'Lavender Grey 50', variable: '--lavender-grey-50', shade: '50' },
            { name: 'Lavender Grey 100', variable: '--lavender-grey-100', shade: '100' },
            { name: 'Lavender Grey 200', variable: '--lavender-grey-200', shade: '200' },
            { name: 'Lavender Grey 300', variable: '--lavender-grey-300', shade: '300' },
            { name: 'Lavender Grey 400', variable: '--lavender-grey-400', shade: '400' },
            { name: 'Lavender Grey 500', variable: '--lavender-grey-500', shade: '500' },
            { name: 'Lavender Grey 600', variable: '--lavender-grey-600', shade: '600' },
            { name: 'Lavender Grey 700', variable: '--lavender-grey-700', shade: '700' },
            { name: 'Lavender Grey 800', variable: '--lavender-grey-800', shade: '800' },
            { name: 'Lavender Grey 900', variable: '--lavender-grey-900', shade: '900' },
            { name: 'Lavender Grey 950', variable: '--lavender-grey-950', shade: '950' },
        ],
    },
    {
        name: 'Ghost White',
        description: 'Neutral greys - clean and modern',
        shades: [
            { name: 'Ghost White 50', variable: '--ghost-white-50', shade: '50' },
            { name: 'Ghost White 100', variable: '--ghost-white-100', shade: '100' },
            { name: 'Ghost White 200', variable: '--ghost-white-200', shade: '200' },
            { name: 'Ghost White 300', variable: '--ghost-white-300', shade: '300' },
            { name: 'Ghost White 400', variable: '--ghost-white-400', shade: '400' },
            { name: 'Ghost White 500', variable: '--ghost-white-500', shade: '500' },
            { name: 'Ghost White 600', variable: '--ghost-white-600', shade: '600' },
            { name: 'Ghost White 700', variable: '--ghost-white-700', shade: '700' },
            { name: 'Ghost White 800', variable: '--ghost-white-800', shade: '800' },
            { name: 'Ghost White 900', variable: '--ghost-white-900', shade: '900' },
            { name: 'Ghost White 950', variable: '--ghost-white-950', shade: '950' },
        ],
    },
];

function ColorSwatch({ shade }: { shade: ColorShade }): ReactNode {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '4px',
            }}>
            <div
                style={{
                    height: '48px',
                    backgroundColor: `var(${shade.variable})`,
                    border: '1px solid var(--ifm-color-emphasis-300)',
                    borderRadius: '4px 4px 0 0',
                }}
                title={shade.name}
            />
            <div
                style={{
                    fontSize: '0.75rem',
                    padding: '4px 8px',
                    backgroundColor: 'var(--ifm-background-surface-color)',
                    border: '1px solid var(--ifm-color-emphasis-300)',
                    borderTop: 'none',
                    borderRadius: '0 0 4px 4px',
                    textAlign: 'center',
                    color: 'var(--ifm-font-color-base)',
                }}>
                {shade.shade}
            </div>
        </div>
    );
}

function ColorPaletteSection({ palette }: { palette: ColorPalette }): ReactNode {
    return (
        <div style={{ marginBottom: '3rem' }}>
            <Heading as="h3">{palette.name}</Heading>
            <p style={{ marginBottom: '1rem', color: 'var(--ifm-font-color-secondary)' }}>
                {palette.description}
            </p>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))',
                    gap: '8px',
                    maxWidth: '800px',
                }}>
                {palette.shades.map((shade) => (
                    <ColorSwatch key={shade.variable} shade={shade} />
                ))}
            </div>
        </div>
    );
}

export default function Brand(): ReactNode {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title="Brand Guidelines"
            description="Learn about our brand identity, including logo usage, color palette, typography, and design principles.">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <main>
                <div className="container margin-vert--lg">
                    <Heading as="h1" className="text--center margin-bottom--lg">
                        Brand Guidelines
                    </Heading>

                    {/* Introduction */}
                    <section className="margin-bottom--xl">
                        <p className="text--center" style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
                            Welcome to our brand guidelines. These resources help maintain consistency across all our materials
                            and communications. When in doubt, keep things consistent with existing styling, well-spaced, and professional.
                        </p>
                    </section>

                    {/* Logo Section */}
                    <section className="margin-bottom--xl">
                        <Heading as="h2" className="margin-bottom--md">Logo</Heading>
                        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                            <div style={{ flex: '1', minWidth: '300px' }}>
                                <div
                                    style={{
                                        padding: '2rem',
                                        backgroundColor: 'var(--ifm-background-surface-color)',
                                        border: '1px solid var(--ifm-color-emphasis-300)',
                                        borderRadius: '8px',
                                        textAlign: 'center',
                                        marginBottom: '1rem',
                                    }}>
                                    <img
                                        src="/img/logo.svg"
                                        alt="Educate 4.0 Logo"
                                        style={{ maxWidth: '200px', height: 'auto' }}
                                    />
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--ifm-font-color-secondary)' }}>
                                    <a href="/img/logo.svg" download="educate4pt0-logo.svg">Download Logo (SVG)</a>
                                </p>
                            </div>
                            <div style={{ flex: '1', minWidth: '300px' }}>
                                <Heading as="h3" style={{ fontSize: '1.1rem' }}>Logo Usage Guidelines</Heading>
                                <ul style={{ fontSize: '0.95rem' }}>
                                    <li>Maintain clear space around the logo of no less than 20% of the logo's height</li>
                                    <li>Do not alter the logo's colors, proportions, or arrangement</li>
                                    <li>Use the SVG format for digital applications for best quality</li>
                                    <li>Ensure sufficient contrast with the background</li>
                                    <li>Do not add effects like shadows, outlines, or distortions</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Social Card */}
                    <section className="margin-bottom--xl">
                        <Heading as="h2" className="margin-bottom--md">Social Media Card</Heading>
                        <div style={{ maxWidth: '600px' }}>
                            <div
                                style={{
                                    padding: '1rem',
                                    backgroundColor: 'var(--ifm-background-surface-color)',
                                    border: '1px solid var(--ifm-color-emphasis-300)',
                                    borderRadius: '8px',
                                    marginBottom: '1rem',
                                }}>
                                <img
                                    src="/img/social-card.png"
                                    alt="Social Media Card"
                                    style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                                />
                            </div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--ifm-font-color-secondary)' }}>
                                <a href="/img/social-card.png" download="educate4pt0-social-card.png">Download Social Card</a>
                            </p>
                        </div>
                    </section>

                    {/* Color Palette */}
                    <section className="margin-bottom--xl">
                        <Heading as="h2" className="margin-bottom--md">Color Palette</Heading>
                        <p style={{ marginBottom: '2rem', maxWidth: '800px' }}>
                            Our color system uses five carefully crafted palettes, each with 11 shades (50-950) to provide
                            flexibility while maintaining brand consistency. All colors are defined in OKLCH color space for
                            perceptually uniform brightness and better accessibility.
                        </p>

                        {colorPalettes.map((palette) => (
                            <ColorPaletteSection key={palette.name} palette={palette} />
                        ))}
                    </section>

                    {/* Usage Guidelines */}
                    <section className="margin-bottom--xl">
                        <Heading as="h2" className="margin-bottom--md">Color Usage Guidelines</Heading>
                        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                            <div
                                style={{
                                    padding: '1.5rem',
                                    backgroundColor: 'var(--ifm-background-surface-color)',
                                    border: '1px solid var(--ifm-color-emphasis-300)',
                                    borderRadius: '8px',
                                }}>
                                <Heading as="h3" style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                                    Primary Actions
                                </Heading>
                                <p style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                                    Use <strong>Tiger Orange (500-700)</strong> for primary buttons, key CTAs, and important highlights.
                                </p>
                                <div
                                    style={{
                                        height: '40px',
                                        backgroundColor: 'var(--tiger-orange-600)',
                                        borderRadius: '4px',
                                        marginTop: '0.75rem',
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    padding: '1.5rem',
                                    backgroundColor: 'var(--ifm-background-surface-color)',
                                    border: '1px solid var(--ifm-color-emphasis-300)',
                                    borderRadius: '8px',
                                }}>
                                <Heading as="h3" style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                                    Links & Info
                                </Heading>
                                <p style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                                    Use <strong>Steel Azure (500-700)</strong> for links, informational elements, and secondary actions.
                                </p>
                                <div
                                    style={{
                                        height: '40px',
                                        backgroundColor: 'var(--steel-azure-600)',
                                        borderRadius: '4px',
                                        marginTop: '0.75rem',
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    padding: '1.5rem',
                                    backgroundColor: 'var(--ifm-background-surface-color)',
                                    border: '1px solid var(--ifm-color-emphasis-300)',
                                    borderRadius: '8px',
                                }}>
                                <Heading as="h3" style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                                    Backgrounds
                                </Heading>
                                <p style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                                    Use <strong>Ghost White (50-200)</strong> for light backgrounds and <strong>Ghost White (800-950)</strong> for dark mode.
                                </p>
                                <div style={{ display: 'flex', gap: '4px', marginTop: '0.75rem' }}>
                                    <div style={{ flex: 1, height: '40px', backgroundColor: 'var(--ghost-white-50)', borderRadius: '4px', border: '1px solid var(--ifm-color-emphasis-300)' }} />
                                    <div style={{ flex: 1, height: '40px', backgroundColor: 'var(--ghost-white-900)', borderRadius: '4px' }} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Accessibility */}
                    <section className="margin-bottom--xl">
                        <Heading as="h2" className="margin-bottom--md">Accessibility & Contrast</Heading>
                        <div
                            style={{
                                padding: '1.5rem',
                                backgroundColor: 'var(--ifm-background-surface-color)',
                                border: '1px solid var(--ifm-color-emphasis-300)',
                                borderRadius: '8px',
                                maxWidth: '800px',
                            }}>
                            <ul style={{ fontSize: '0.95rem', marginBottom: 0 }}>
                                <li className="margin-bottom--sm">
                                    <strong>Text contrast:</strong> Ensure a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text
                                </li>
                                <li className="margin-bottom--sm">
                                    <strong>Interactive elements:</strong> Use darker shades (600-800) on light backgrounds and lighter shades (200-400) on dark backgrounds
                                </li>
                                <li className="margin-bottom--sm">
                                    <strong>Testing:</strong> Always test color combinations with accessibility tools before deployment
                                </li>
                                <li className="margin-bottom--sm">
                                    <strong>Focus states:</strong> Ensure keyboard focus indicators have sufficient contrast and are clearly visible
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* General Design Principles */}
                    <section className="margin-bottom--xl">
                        <Heading as="h2" className="margin-bottom--md">Design Principles</Heading>
                        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                            <div
                                style={{
                                    padding: '1.25rem',
                                    backgroundColor: 'var(--ifm-background-surface-color)',
                                    border: '1px solid var(--ifm-color-emphasis-300)',
                                    borderRadius: '8px',
                                }}>
                                <Heading as="h3" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                                    ✨ Consistency
                                </Heading>
                                <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>
                                    When unsure, follow existing patterns and styles throughout the site.
                                </p>
                            </div>

                            <div
                                style={{
                                    padding: '1.25rem',
                                    backgroundColor: 'var(--ifm-background-surface-color)',
                                    border: '1px solid var(--ifm-color-emphasis-300)',
                                    borderRadius: '8px',
                                }}>
                                <Heading as="h3" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                                    📏 Spacing
                                </Heading>
                                <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>
                                    Use generous whitespace. Elements should breathe and have clear visual hierarchy.
                                </p>
                            </div>

                            <div
                                style={{
                                    padding: '1.25rem',
                                    backgroundColor: 'var(--ifm-background-surface-color)',
                                    border: '1px solid var(--ifm-color-emphasis-300)',
                                    borderRadius: '8px',
                                }}>
                                <Heading as="h3" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                                    💼 Professionalism
                                </Heading>
                                <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>
                                    Maintain a clean, modern, and professional appearance in all materials.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CSS Variables Reference */}
                    <section className="margin-bottom--xl">
                        <Heading as="h2" className="margin-bottom--md">Developer Reference</Heading>
                        <div
                            style={{
                                padding: '1.5rem',
                                backgroundColor: 'var(--ifm-background-surface-color)',
                                border: '1px solid var(--ifm-color-emphasis-300)',
                                borderRadius: '8px',
                                maxWidth: '800px',
                            }}>
                            <p style={{ marginBottom: '1rem' }}>
                                All colors are available as CSS custom properties (variables) in the format:
                            </p>
                            <code
                                style={{
                                    display: 'block',
                                    padding: '1rem',
                                    backgroundColor: 'var(--ifm-code-background)',
                                    borderRadius: '4px',
                                    fontSize: '0.9rem',
                                    marginBottom: '1rem',
                                }}>
                                var(--palette-name-shade)
                            </code>
                            <p style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                                <strong>Examples:</strong>
                            </p>
                            <ul style={{ fontSize: '0.9rem', fontFamily: 'monospace' }}>
                                <li>var(--tiger-orange-500)</li>
                                <li>var(--steel-azure-600)</li>
                                <li>var(--ghost-white-50)</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </main>
        </Layout>
    );
}

