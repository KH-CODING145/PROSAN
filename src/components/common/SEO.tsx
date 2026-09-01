import React from 'react';
import { useRouteSEO } from '../../hooks/useRouteSEO';
import { SEOOptions } from '../../hooks/useSEO';

export interface SEOProps extends Partial<SEOOptions> {}

export const SEO: React.FC<SEOProps> = (props) => {
  useRouteSEO(props);
  return null;
};

