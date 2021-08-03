import React from 'react';

export default function LinkToRegistryRule({ruleId}) {
  const registryURL = new URL('https://semgrep.dev/r');
  registryURL.searchParams.set('q', ruleId);
  return (<a href={registryURL} target="_blank">{ruleId}</a>);
}