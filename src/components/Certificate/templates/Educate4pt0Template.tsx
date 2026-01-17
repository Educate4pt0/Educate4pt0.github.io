import React from 'react';
import type { CertificateTemplate, ParameterDefinition } from '../types';
import styles from './Educate4pt0Template.module.css';

/**
 * Parameters specific to the Educate 4.0 certificate template
 */
export interface Educate4pt0TemplateParams {
    achieverName: string;
    courseName: string;
    completionDate: string;
    certifierName: string;
    certifierTitle?: string;
    organizationName?: string;
}

/**
 * Parameter definitions for form generation and validation
 */
export const educate4pt0Parameters: ParameterDefinition[] = [
    {
        key: 'achieverName',
        label: 'Student/Achiever Name',
        type: 'text',
        required: true,
        placeholder: 'e.g., John Doe',
        helpText: 'Full name of the person receiving the certificate',
    },
    {
        key: 'courseName',
        label: 'Course/Workshop Name',
        type: 'text',
        required: true,
        placeholder: 'e.g., Introduction to Scratch Programming',
        helpText: 'Name of the completed course or workshop',
    },
    {
        key: 'completionDate',
        label: 'Completion Date',
        type: 'date',
        required: true,
        defaultValue: new Date().toISOString().split('T')[0],
        helpText: 'Date when the course was completed',
    },
    {
        key: 'certifierName',
        label: 'Instructor/Certifier Name',
        type: 'text',
        required: true,
        placeholder: 'e.g., Ms. Smith',
        helpText: 'Name of the person certifying completion',
    },
    {
        key: 'certifierTitle',
        label: 'Certifier Title',
        type: 'text',
        required: false,
        defaultValue: 'Instructor',
        placeholder: 'e.g., STEAM Coordinator',
        helpText: 'Title or role of the certifier (optional)',
    },
    {
        key: 'organizationName',
        label: 'Organization Name',
        type: 'text',
        required: false,
        defaultValue: 'Educate 4.0',
        placeholder: 'e.g., Springfield Middle School',
        helpText: 'Name of the certifying organization (optional)',
    },
];

/**
 * Educate 4.0 certificate component
 */
const Educate4pt0TemplateComponent: React.FC<Educate4pt0TemplateParams> = ({
    achieverName,
    courseName,
    completionDate,
    certifierName,
    certifierTitle = 'Instructor',
    organizationName = 'Educate 4.0',
}) => {
    return (
        <div className={styles.certificatePage}>
            {/* Decorative border */}
            <div className={styles.borderOuter}>
                <div className={styles.borderInner}>

                    {/* Header Section */}
                    <div className={styles.header}>
                        <div className={styles.logoSection}>
                            <img
                                src="/img/logo.svg"
                                alt="Educate 4.0 Logo"
                                className={styles.logo}
                            />
                        </div>
                        <h1 className={styles.title}>Certificate of Completion</h1>
                        <div className={styles.decorativeLine}></div>
                    </div>

                    {/* Content Section */}
                    <div className={styles.content}>
                        <p className={styles.presentedTo}>This certificate is proudly presented to</p>

                        <h2 className={styles.achieverName}>{achieverName}</h2>

                        <p className={styles.recognition}>
                            For successfully completing the course
                        </p>

                        <h3 className={styles.courseName}>{courseName}</h3>

                        <p className={styles.description}>
                            Demonstrating dedication to STEAM education and commitment to continuous learning.
                        </p>
                    </div>

                    {/* Footer Section */}
                    <div className={styles.footer}>
                        <div className={styles.dateSection}>
                            <p className={styles.date}>{completionDate}</p>
                            <div className={styles.labelLine}></div>
                            <p className={styles.label}>Date of Completion</p>
                        </div>

                        <div className={styles.signatureSection}>
                            <p className={styles.certifierName}>{certifierName}</p>
                            <div className={styles.signatureLine}></div>
                            <p className={styles.certifierTitle}>{certifierTitle}</p>
                            <p className={styles.organization}>{organizationName}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

/**
 * Complete template definition for the Educate 4.0 certificate
 * Exports the component, metadata, and parameter schema
 */
export const Educate4pt0Template: CertificateTemplate<Educate4pt0TemplateParams> = {
    component: Educate4pt0TemplateComponent,
    displayName: 'Educate 4.0 Certificate',
    description: 'Generic course completion certificate with Educate 4.0 branding',
    parameters: educate4pt0Parameters,
};
