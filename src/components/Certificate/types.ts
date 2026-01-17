/**
 * Base interface that all certificate templates must implement
 * Templates can extend this with their own specific parameters
 */
export interface CertificateTemplate<TParams = Record<string, any>> {
    /** The React component that renders the certificate */
    component: React.ComponentType<TParams>;
    /** Human-readable name of the template */
    displayName: string;
    /** Description of what this template is for */
    description: string;
    /** 
     * Parameter schema - defines what fields this template accepts
     * Used for form generation and validation
     */
    parameters: ParameterDefinition[];
}

/**
 * Parameter definition for dynamic form generation and validation
 */
export interface ParameterDefinition {
    /** Parameter key (used in query params) */
    key: string;
    /** Human-readable label for forms */
    label: string;
    /** Input type for form rendering */
    type: 'text' | 'date' | 'email' | 'number' | 'select';
    /** Whether this parameter is required */
    required: boolean;
    /** Default value if not provided */
    defaultValue?: string | number;
    /** Placeholder text for input fields */
    placeholder?: string;
    /** Options for select inputs */
    options?: Array<{ value: string; label: string }>;
    /** Validation pattern (for text inputs) */
    pattern?: string;
    /** Help text shown below the input */
    helpText?: string;
}

/**
 * Props passed to the CertificateRenderer
 */
export interface CertificateRendererProps {
    /** Template identifier (e.g., 'Educate4pt0',) */
    template: string;
    /** Dynamic parameters specific to the selected template */
    params: Record<string, string>;
}
