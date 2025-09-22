import React, {type ReactNode} from 'react';
import type {Props} from '@theme/Navbar/Search';
import MeilisearchDefaultSearch from './MeilisearchDefault';

export default function NavbarSearch({className}: Props): ReactNode {
  return <MeilisearchDefaultSearch className={className} />;
}