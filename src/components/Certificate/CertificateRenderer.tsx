import React from 'react';
import type { CertificateRendererProps, CertificateTemplate } from './types';
import { TEMPLATE_REGISTRY } from './templates';
import styles from './certificate.module.css';

/**
 * Sanitizes user input to prevent XSS attacks
 */
function sanitizeInput(input: string): string {
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .trim();
}

/**
 * Main certificate renderer component
 * Loads the appropriate template and sanitizes inputs
 */
export const CertificateRenderer: React.FC<CertificateRendererProps> = ({
    template,
    params,
}) => {
    // Get template definition, fallback to educate4pt0 if not found
    const templateDef = TEMPLATE_REGISTRY[template] || TEMPLATE_REGISTRY.educate4pt0;
    const TemplateComponent = templateDef.component;

    // Sanitize all input parameters
    const sanitizedParams = Object.entries(params).reduce((acc, [key, value]) => {
        acc[key] = typeof value === 'string' ? sanitizeInput(value) : value;
        return acc;
    }, {} as Record<string, any>);

    // Apply default values from parameter definitions
    const paramsWithDefaults = templateDef.parameters.reduce((acc, paramDef) => {
        if (!(paramDef.key in acc) && paramDef.defaultValue !== undefined) {
            acc[paramDef.key] = paramDef.defaultValue;
        }
        return acc;
    }, { ...sanitizedParams });

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className={styles.certificateContainer}>
            {/* Print controls - hidden when printing */}
            <div className={styles.printControls}>
                <button onClick={handlePrint} className={styles.printButton}>
                    🖨️ Print Certificate
                </button>
                <p className={styles.printTip}>
                    💡 <strong>Tip:</strong> Use "Save as PDF" in your print dialog to create a digital copy
                </p>
            </div>

            {/* Certificate content */}
            <div className={styles.certificateContent}>
                <TemplateComponent {...paramsWithDefaults} />
            </div>
        </div>
    );
};
