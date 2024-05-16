/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Tag from '@theme/Tag';
import {useDoc} from '@docusaurus/theme-common/internal';

export default function Tags({tag}) {

const {metadata} = useDoc();
  const {editUrl, lastUpdatedAt, lastUpdatedBy, tags} = metadata;
  return (
    <>
      <ul className={clsx('padding--none', 'margin-left--sm')}>
        {tags.map(({label, permalink: tagPermalink}) => (
          <li key={tagPermalink}>
            <Tag label={label} permalink={tagPermalink} />
          </li>
        ))}
      </ul>
    </>
  );
}





/*
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
*/
