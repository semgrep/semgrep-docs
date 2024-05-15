import React from 'react';
import TagsListInline from '@theme/TagsListInline';
import {useDoc} from '@docusaurus/theme-common/internal';

export default function Tags({tag}) {

const {metadata} = useDoc();
  const {editUrl, lastUpdatedAt, lastUpdatedBy, tags} = metadata;

  return (
           <TagsListInline tags={tags} />
  );
}
