# Certificate System

The certificate generation system allows educators to create personalized course completion certificates for their students.

## Features

- 🎨 **Flexible Templates**: Each template defines its own parameters
- 📝 **Manual Generation**: Fill out a form to generate single certificates
- 📊 **Bulk Generation**: Upload CSV files to generate multiple certificates at once
- 🖨️ **Print-Optimized**: Certificates are optimized for printing or saving as PDF
- 🔒 **Secure**: All inputs are sanitized to prevent XSS attacks

## Usage

### For Educators

1. **Navigate to the Generator**: Visit `/certificate-generator` on the site
2. **Choose a Template**: Select from available certificate templates
3. **Single Certificate**:
   - Fill out the form with student information
   - Click "Generate & Open Certificate"
   - Print or save the certificate as PDF
4. **Bulk Certificates**:
   - Download the CSV template
   - Fill in student information (one row per student)
   - Upload the filled CSV
   - Copy or open individual certificate URLs

### Direct Certificate Links

Certificates can be accessed directly via URL with query parameters:

```
/certificate?template=educate4&achieverName=John%20Doe&courseName=Scratch%20Basics&completionDate=2026-01-17&certifierName=Ms.%20Smith
```

## For Developers

### Adding a New Template

1. **Create the template component** in `src/components/Certificate/templates/`:

```typescript
// MyTemplate.tsx
import React from 'react';
import type { CertificateTemplate, ParameterDefinition } from '../types';
import styles from './MyTemplate.module.css';

export interface MyTemplateParams {
  studentName: string;
  courseName: string;
  // ... your custom fields
}

export const myTemplateParameters: ParameterDefinition[] = [
  {
    key: 'studentName',
    label: 'Student Name',
    type: 'text',
    required: true,
    placeholder: 'e.g., Jane Smith',
  },
  // ... define all parameters
];

const MyTemplateComponent: React.FC<MyTemplateParams> = ({
  studentName,
  courseName,
}) => {
  return (
    <div className={styles.certificate}>
      {/* Your certificate design */}
    </div>
  );
};

export const MyTemplate: CertificateTemplate<MyTemplateParams> = {
  component: MyTemplateComponent,
  displayName: 'My Custom Template',
  description: 'Description of when to use this template',
  parameters: myTemplateParameters,
};
```

2. **Register the template** in `src/components/Certificate/CertificateRenderer.tsx`:

```typescript
import { MyTemplate } from './templates/MyTemplate';

const TEMPLATE_REGISTRY: Record<string, CertificateTemplate<any>> = {
  educate4: Educate4Template,
  mytemplate: MyTemplate, // Add your template here
};
```

3. **Export from index** in `src/components/Certificate/index.ts`:

```typescript
export { MyTemplate } from './templates/MyTemplate';
export type { MyTemplateParams } from './templates/MyTemplate';
```

4. **Update the type** in `src/components/Certificate/types.ts`:

```typescript
export type TemplateKey = 'educate4' | 'scratch' | 'mytemplate';
```

### Template Best Practices

- ✅ Use A4 landscape dimensions (297mm × 210mm)
- ✅ Include print-specific CSS using `@media print`
- ✅ Sanitize all user inputs (handled automatically by CertificateRenderer)
- ✅ Provide sensible default values for optional parameters
- ✅ Use the project's color variables from `site-theme.css`
- ✅ Test printing on different browsers

## Architecture

```
src/components/Certificate/
├── types.ts                    # Shared TypeScript interfaces
├── CertificateRenderer.tsx     # Main renderer with template loading
├── certificate.module.css      # Container and print control styles
├── index.ts                    # Barrel exports
└── templates/
    ├── Educate4Template.tsx    # Default Educate 4.0 template
    └── Educate4Template.module.css

src/pages/
├── certificate.tsx             # Certificate display page (/certificate)
└── certificate-generator.tsx   # Generator UI (/certificate-generator)
```

## Security

All user inputs are automatically sanitized by the `CertificateRenderer` component to prevent XSS attacks. The sanitization:
- Escapes HTML entities (`<`, `>`, `"`, `'`, `/`)
- Trims whitespace
- Preserves safe characters and formatting

## Print Optimization

The certificate pages are optimized for printing:
- Navigation and footer are hidden when printing
- Certificate content takes up the full page (A4 landscape)
- Colors are print-safe (converted to grayscale if needed)
- Page breaks are controlled to prevent awkward splitting
