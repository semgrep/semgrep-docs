import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/Navbar/Search';
import CustomMeilisearchBar from '@site/src/components/CustomMeilisearchBar';

import styles from './styles.module.css';

export default function NavbarSearch({className}: Props): ReactNode {
  return (
    <div className={clsx(className, styles.navbarSearchContainer)}>
      <CustomMeilisearchBar 
        hostUrl="http://localhost:7700"
        apiKey=""
        indexUid="docs"
        placeholder="Search docs..."
      />
    </div>
  );
}
