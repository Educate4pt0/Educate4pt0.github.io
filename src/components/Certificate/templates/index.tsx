import { CertificateTemplate } from '../types';
import { Educate4pt0Template } from './Educate4pt0Template';


export const TEMPLATE_REGISTRY: Record<string, CertificateTemplate<any>> = {
    educate4pt0: Educate4pt0Template,
};