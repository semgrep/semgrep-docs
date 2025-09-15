import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/Navbar/Search';
import SemanticSearchBar from '@site/src/components/SemanticSearchBar';

import styles from './styles.module.css';

export default function NavbarSearch({className}: Props): ReactNode {
  return (
    <div className={clsx(className, styles.navbarSearchContainer)}>
      <SemanticSearchBar 
        hostUrl="http://localhost:7700"
        apiKey=""
        indexUid="docs_semantic"
        placeholder="🔍 Search docs..."
        hybridSearch={true}
        semanticWeight={0.7}
      />
    </div>
  );
}
