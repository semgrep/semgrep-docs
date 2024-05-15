import React from 'react';
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import type {WrapperProps} from '@docusaurus/types';
import MoreHelp from '@site/src/components/MoreHelp';
type Props = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props): JSX.Element {
  return (
    <>
      <Content {...props} />
      <MoreHelp />
    </>
  );
}
