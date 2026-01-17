import React, { useState, useRef } from 'react';
import Layout from '@theme/Layout';
import { TEMPLATE_REGISTRY } from '@site/src/components/Certificate';
import styles from './certificate-generator.module.css';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';

interface CertificateData {
    id: number;
    achieverName: string;
    params: Record<string, string>;
}

interface GeneratedURL {
    id: number;
    achieverName: string;
    url: string;
}

export default function CertificateGeneratorPage() {
    const [selectedTemplate, setSelectedTemplate] = useState<string>('educate4pt0');
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [generatedUrls, setGeneratedUrls] = useState<GeneratedURL[]>([]);
    const [certificateData, setCertificateData] = useState<CertificateData[]>([]);
    const [csvError, setCsvError] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [generationProgress, setGenerationProgress] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const currentTemplate = TEMPLATE_REGISTRY[selectedTemplate];

    // Update form data when input changes
    const handleInputChange = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    // Generate single certificate URL from form
    const handleGenerateSingle = (e: React.FormEvent) => {
        e.preventDefault();

        const params = new URLSearchParams();
        params.set('template', selectedTemplate);

        currentTemplate.parameters.forEach((param) => {
            const value = formData[param.key] || param.defaultValue?.toString() || '';
            if (value) {
                params.set(param.key, value);
            }
        });

        const url = `${window.location.origin}/certificate?${params.toString()}`;
        window.open(url, '_blank');
    };

    // Download CSV template
    const handleDownloadTemplate = () => {
        const headers = currentTemplate.parameters
            .map((p) => p.key)
            .join(',');

        const exampleRow = currentTemplate.parameters
            .map((p) => p.placeholder || p.defaultValue || '')
            .join(',');

        const csv = `${headers}\n${exampleRow}`;
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `certificate-template-${selectedTemplate}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    // Parse and validate CSV file
    const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const text = event.target?.result as string;
                const lines = text.trim().split('\n');

                if (lines.length < 2) {
                    setCsvError('CSV file must contain a header row and at least one data row');
                    return;
                }

                const headers = lines[0].split(',').map((h) => h.trim());
                const requiredParams = currentTemplate.parameters
                    .filter((p) => p.required)
                    .map((p) => p.key);

                // Validate headers
                const missingHeaders = requiredParams.filter((req) => !headers.includes(req));
                if (missingHeaders.length > 0) {
                    setCsvError(`Missing required columns: ${missingHeaders.join(', ')}`);
                    return;
                }

                // Generate URLs for each row
                const urls: GeneratedURL[] = [];
                const certData: CertificateData[] = [];

                for (let i = 1; i < lines.length; i++) {
                    const values = lines[i].split(',').map((v) => v.trim());
                    if (values.every(v => !v)) continue; // Skip empty rows

                    const params = new URLSearchParams();
                    params.set('template', selectedTemplate);

                    const rowParams: Record<string, string> = { template: selectedTemplate };

                    headers.forEach((header, index) => {
                        if (values[index]) {
                            params.set(header, values[index]);
                            rowParams[header] = values[index];
                        }
                    });

                    const achieverName = values[headers.indexOf('achieverName')] || `Person ${i}`;
                    urls.push({
                        id: i,
                        achieverName,
                        url: `${window.location.origin}/certificate?${params.toString()}`,
                    });

                    certData.push({
                        id: i,
                        achieverName,
                        params: rowParams,
                    });
                }

                setGeneratedUrls(urls);
                setCertificateData(certData);
                setCsvError('');
            } catch (error) {
                setCsvError(`Error parsing CSV: ${error.message}`);
            }
        };

        reader.readAsText(file);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Copy URL to clipboard
    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
    };

    // Copy all URLs to clipboard
    const copyAllUrls = () => {
        const allUrls = generatedUrls.map((u) => `${u.achieverName}: ${u.url}`).join('\n');
        navigator.clipboard.writeText(allUrls);
    };

    // Render a certificate to canvas and return as blob
    const renderCertificateToBlob = async (params: Record<string, string>): Promise<Blob> => {
        // Open the certificate in a new window temporarily
        const certParams = new URLSearchParams();
        certParams.set('template', selectedTemplate);
        Object.entries(params).forEach(([key, value]) => {
            if (key !== 'template') {
                certParams.set(key, value);
            }
        });

        return new Promise((resolve, reject) => {
            // Create an iframe to render the certificate
            const iframe = document.createElement('iframe');
            iframe.style.position = 'absolute';
            iframe.style.left = '-9999px';
            iframe.style.width = '1200px';
            iframe.style.height = '900px';
            document.body.appendChild(iframe);

            const certUrl = `${window.location.origin}/certificate?${certParams.toString()}`;

            iframe.onload = async () => {
                try {
                    // Wait a bit for the certificate to fully render
                    await new Promise(r => setTimeout(r, 1000));

                    // Get the certificate container from the iframe
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                    if (!iframeDoc) {
                        throw new Error('Could not access iframe document');
                    }

                    const certificateElement = iframeDoc.body;
                    if (!certificateElement) {
                        throw new Error('Certificate element not found');
                    }

                    // Capture the certificate as canvas
                    const canvas = await html2canvas(certificateElement, {
                        scale: 2,
                        backgroundColor: '#ffffff',
                        logging: false,
                        useCORS: true,
                        allowTaint: true,
                    });

                    // Convert canvas to blob
                    canvas.toBlob((blob) => {
                        document.body.removeChild(iframe);
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Failed to create blob from canvas'));
                        }
                    }, 'image/png');
                } catch (error) {
                    document.body.removeChild(iframe);
                    reject(error);
                }
            };

            iframe.onerror = () => {
                document.body.removeChild(iframe);
                reject(new Error('Failed to load certificate'));
            };

            iframe.src = certUrl;
        });
    };

    // Generate all certificates and download as zip
    const handleGenerateAndDownloadZip = async () => {
        if (certificateData.length === 0) {
            setCsvError('No certificates to generate');
            return;
        }

        setIsGenerating(true);
        setGenerationProgress('Starting generation...');

        try {
            const zip = new JSZip();
            const certificatesFolder = zip.folder('certificates');

            if (!certificatesFolder) {
                throw new Error('Failed to create certificates folder');
            }

            // Generate each certificate
            for (let i = 0; i < certificateData.length; i++) {
                const cert = certificateData[i];
                setGenerationProgress(`Generating certificate ${i + 1} of ${certificateData.length} (${cert.achieverName})...`);

                try {
                    const blob = await renderCertificateToBlob(cert.params);
                    const filename = `${cert.achieverName.replace(/[^a-z0-9]/gi, '_')}_certificate.png`;
                    certificatesFolder.file(filename, blob);
                } catch (error) {
                    console.error(`Failed to generate certificate for ${cert.achieverName}:`, error);
                    setCsvError(`Failed to generate certificate for ${cert.achieverName}`);
                }
            }

            // Generate and download the zip file
            setGenerationProgress('Creating zip file...');
            const zipBlob = await zip.generateAsync({ type: 'blob' });

            const url = URL.createObjectURL(zipBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `certificates_${selectedTemplate}_${new Date().toISOString().split('T')[0]}.zip`;
            link.click();
            URL.revokeObjectURL(url);

            setGenerationProgress('Complete! Download started.');
            setTimeout(() => {
                setIsGenerating(false);
                setGenerationProgress('');
            }, 2000);

        } catch (error) {
            console.error('Error generating certificates:', error);
            setCsvError(`Error generating certificates: ${error.message}`);
            setIsGenerating(false);
            setGenerationProgress('');
        }
    };

    return (
        <Layout
            title="Certificate Generator"
            description="Generate certificate URLs for your students"
        >
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Certificate Generator</h1>
                    <p className={styles.subtitle}>
                        Create personalized certificates for your students. Generate single certificates or
                        upload a CSV file for bulk generation.
                    </p>
                </header>

                <div className={styles.content}>
                    {/* Template Selector */}
                    <div className={styles.section}>
                        <label htmlFor="template-select" className={styles.label}>
                            <strong>Select Template:</strong>
                        </label>
                        <select
                            id="template-select"
                            value={selectedTemplate}
                            onChange={(e) => setSelectedTemplate(e.target.value)}
                            className={styles.select}
                        >
                            {Object.entries(TEMPLATE_REGISTRY).map(([key, template]) => (
                                <option key={key} value={key}>
                                    {template.displayName}
                                </option>
                            ))}
                        </select>
                        <p className={styles.helpText}>{currentTemplate.description}</p>
                    </div>

                    {/* Manual Form Generation */}
                    <div className={styles.section}>
                        <h2>📝 Single Certificate</h2>
                        <form onSubmit={handleGenerateSingle} className={styles.form}>
                            {currentTemplate.parameters.map((param) => (
                                <div key={param.key} className={styles.formGroup}>
                                    <label htmlFor={param.key} className={styles.label}>
                                        {param.label}
                                        {param.required && <span className={styles.required}>*</span>}
                                    </label>
                                    <input
                                        type={param.type}
                                        id={param.key}
                                        value={formData[param.key] || ''}
                                        onChange={(e) => handleInputChange(param.key, e.target.value)}
                                        placeholder={param.placeholder}
                                        required={param.required}
                                        pattern={param.pattern}
                                        className={styles.input}
                                    />
                                    {param.helpText && (
                                        <p className={styles.helpText}>{param.helpText}</p>
                                    )}
                                </div>
                            ))}
                            <button type="submit" className={styles.primaryButton}>
                                🚀 Generate & Open Certificate
                            </button>
                        </form>
                    </div>

                    {/* CSV Bulk Generation */}
                    <div className={styles.section}>
                        <h2>📊 Bulk Generation (CSV)</h2>
                        <p className={styles.description}>
                            Upload a CSV file with student information to generate multiple certificate URLs at once.
                        </p>

                        <div className={styles.csvActions}>
                            <button
                                type="button"
                                onClick={handleDownloadTemplate}
                                className={styles.secondaryButton}
                            >
                                ⬇️ Download CSV Template
                            </button>

                            <div className={styles.fileUpload}>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".csv"
                                    onChange={handleCSVUpload}
                                    className={styles.fileInput}
                                    id="csv-upload"
                                />
                                <label htmlFor="csv-upload" className={styles.fileLabel}>
                                    📤 Upload Filled CSV
                                </label>
                            </div>
                        </div>

                        {csvError && (
                            <div className={styles.error}>
                                ⚠️ {csvError}
                            </div>
                        )}

                        {generatedUrls.length > 0 && (
                            <div className={styles.results}>
                                <div className={styles.resultsHeader}>
                                    <h3>Generated Certificates ({generatedUrls.length})</h3>
                                    <div className={styles.buttonGroup}>
                                        <button
                                            type="button"
                                            onClick={handleGenerateAndDownloadZip}
                                            disabled={isGenerating}
                                            className={styles.primaryButton}
                                        >
                                            {isGenerating ? '⏳ Generating...' : '📦 Download All as ZIP'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={copyAllUrls}
                                            className={styles.secondaryButton}
                                        >
                                            📋 Copy All URLs
                                        </button>
                                    </div>
                                </div>

                                {generationProgress && (
                                    <div className={styles.progress}>
                                        {generationProgress}
                                    </div>
                                )}

                                <ul className={styles.urlList}>
                                    {generatedUrls.map((item) => (
                                        <li key={item.id} className={styles.urlItem}>
                                            <span className={styles.urlName}>{item.achieverName}</span>
                                            <div className={styles.urlActions}>
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.linkButton}
                                                >
                                                    🔗 Open
                                                </a>
                                                <button
                                                    type="button"
                                                    onClick={() => copyToClipboard(item.url)}
                                                    className={styles.smallButton}
                                                >
                                                    📋 Copy
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
