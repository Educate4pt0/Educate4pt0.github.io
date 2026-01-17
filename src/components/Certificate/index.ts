/**
 * Certificate System - Barrel Export
 * Clean imports for the certificate generation system
 */

// Main renderer component and template registry
export { CertificateRenderer } from './CertificateRenderer';
export { TEMPLATE_REGISTRY } from './templates';

// Type definitions
export type {
    CertificateTemplate,
    ParameterDefinition,
    CertificateRendererProps,
} from './types';
