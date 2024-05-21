import React from 'react';
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import type {WrapperProps} from '@docusaurus/types';
import MoreHelp from '@site/src/components/MoreHelp';
import Tags from '@site/src/components/Tags';
type Props = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props): JSX.Element {
  return (
    <>
      <Tags />
      <Content {...props} />
      <MoreHelp />
    </>
  );
}
