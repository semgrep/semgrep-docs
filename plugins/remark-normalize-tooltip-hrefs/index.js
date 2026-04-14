const { visit } = require('unist-util-visit');
const fs = require('fs');
const yaml = require('js-yaml');

const normalizeHrefQuotes = (value) =>
  value.replace(/href=(["'])([^"']+)\1/g, 'href=$2');

const prefixDocsForGlossaries = (value) =>
  value.replace(
    /href=\/(semgrep-supply-chain\/glossary|semgrep-secrets\/glossary|writing-rules\/glossary|semgrep-code\/glossary)/g,
    'href=/docs/$1'
  );

const slugifyTerm = (term) =>
  term
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const extractTermIdFromTooltipId = (tooltipId) => {
  const parts = tooltipId.split('_');
  if (parts.length < 4) {
    return null;
  }

  return parts.slice(0, -3).join('_');
};

const resolveGlossaryPath = (glossaryFilePath) => {
  if (!glossaryFilePath) {
    return null;
  }

  if (glossaryFilePath.endsWith('.md')) {
    const yamlCandidate = glossaryFilePath.replace(/\.md$/, '.yaml');
    if (fs.existsSync(yamlCandidate)) {
      return yamlCandidate;
    }
  }

  return glossaryFilePath;
};

const loadGlossaryContent = (glossaryFilePath) => {
  const resolvedPath = resolveGlossaryPath(glossaryFilePath);
  if (!resolvedPath || !fs.existsSync(resolvedPath)) {
    return {};
  }

  return yaml.load(fs.readFileSync(resolvedPath, 'utf8'), { json: true }) || {};
};

const buildGlossaryHrefMap = (glossaryFilePath) => {
  const fileContent = loadGlossaryContent(glossaryFilePath);

  const hrefMap = {};
  Object.keys(fileContent || {}).forEach((termId) => {
    const entry = fileContent[termId];
    if (!entry || !entry.term || !entry.link) {
      return;
    }

    const match = entry.link.match(/href=['"]([^'"]*glossary)['"]/);
    if (match) {
      hrefMap[termId] = {
        hrefBase: match[1],
        term: entry.term,
      };
    }
  });

  return hrefMap;
};

const buildGlossaryTermMap = (glossaryFilePath) => {
  const fileContent = loadGlossaryContent(glossaryFilePath);
  const termMap = {};

  Object.keys(fileContent || {}).forEach((termId) => {
    const entry = fileContent[termId];
    if (!entry || !entry.term || !entry.link) {
      return;
    }

    const match = entry.link.match(/href=['"]([^'"]*glossary)['"]/);
    if (match) {
      termMap[entry.term] = {
        hrefBase: match[1],
        term: entry.term,
      };
    }
  });

  return termMap;
};

const replaceHrefWithAnchor = (value, hrefBase, slug) => {
  const hrefToken = `href=${hrefBase}`;
  let result = '';
  let cursor = 0;

  const isDelimiter = (char) =>
    char === ' ' || char === '\n' || char === '\t' || char === '\r' || char === '>';

  while (true) {
    const matchIndex = value.indexOf(hrefToken, cursor);
    if (matchIndex === -1) {
      result += value.slice(cursor);
      break;
    }

    result += value.slice(cursor, matchIndex);
    let nextIndex = matchIndex + hrefToken.length;

    if (value[nextIndex] === '#') {
      nextIndex += 1;
      while (nextIndex < value.length && !isDelimiter(value[nextIndex])) {
        nextIndex += 1;
      }
    }

    result += `${hrefToken}#${slug}`;
    cursor = nextIndex;
  }

  return result;
};

const replaceGlossaryLinkLabel = (value, labelText) => {
  let result = '';
  let cursor = 0;

  while (true) {
    const anchorStart = value.indexOf('<a href=', cursor);
    if (anchorStart === -1) {
      result += value.slice(cursor);
      break;
    }

    result += value.slice(cursor, anchorStart);
    const tagEnd = value.indexOf('>', anchorStart);
    if (tagEnd === -1) {
      result += value.slice(anchorStart);
      break;
    }

    const anchorClose = value.indexOf('</a>', tagEnd);
    if (anchorClose === -1) {
      result += value.slice(anchorStart);
      break;
    }

    const anchorTag = value.slice(anchorStart, tagEnd + 1);
    const anchorHref = anchorTag.slice('<a href='.length);
    const isGlossaryLink = anchorHref.includes('/glossary');

    if (isGlossaryLink) {
      result += `${anchorTag}${labelText}</a>`;
    } else {
      result += value.slice(anchorStart, anchorClose + '</a>'.length);
    }

    cursor = anchorClose + '</a>'.length;
  }

  return result;
};

module.exports = function remarkNormalizeTooltipHrefs(options = {}) {
  const glossaryHrefMap = buildGlossaryHrefMap(options.yamlFile);
  const glossaryTermMap = buildGlossaryTermMap(options.yamlFile);

  return (tree) => {
    visit(tree, 'mdxJsxTextElement', (node) => {
      if (!node.attributes) {
        return;
      }

      const classAttr = node.attributes.find((attr) => attr.name === 'className');
      if (!classAttr || classAttr.value !== 'remark-auto-glossary-term-details') {
        return;
      }

      const findTermLabel = (current) => {
        if (!current || !current.children) {
          return null;
        }
        for (const child of current.children) {
          if (child.type === 'mdxJsxTextElement') {
            const hasNameProp = child.attributes?.some(
              (attr) => attr.name === 'itemProp' && attr.value === 'name'
            );
            if (hasNameProp) {
              const strongNode = child.children?.find(
                (grandchild) =>
                  grandchild.type === 'mdxJsxTextElement' &&
                  grandchild.name === 'strong'
              );
              const textNode = strongNode?.children?.find(
                (grandchild) => grandchild.type === 'text'
              );
              if (textNode?.value) {
                return textNode.value;
              }
            }
          }
          const nested = findTermLabel(child);
          if (nested) {
            return nested;
          }
        }
        return null;
      };

      const termLabel = findTermLabel(node);
      if (!termLabel || !glossaryTermMap[termLabel]) {
        return;
      }

      const entry = glossaryTermMap[termLabel];
      const slug = slugifyTerm(entry.term);
      const href = `${entry.hrefBase}#${slug}`;

      const detailsNode = node.children?.find(
        (child) =>
          child.type === 'mdxJsxTextElement' &&
          child.attributes?.some(
            (attr) => attr.name === 'className' && attr.value === 'more-details'
          )
      );

      if (detailsNode) {
        detailsNode.children = [
          { type: 'text', value: 'See ' },
          {
            type: 'mdxJsxTextElement',
            name: 'a',
            attributes: [{ type: 'mdxJsxAttribute', name: 'href', value: href }],
            children: [{ type: 'text', value: 'full definition' }],
          },
          { type: 'text', value: '.' },
        ];
      }
    });

    visit(tree, 'mdxJsxFlowElement', (node) => {
      if (!node.attributes) {
        return;
      }

      if (node.name === 'Tooltip') {
        const idAttr = node.attributes.find((attr) => attr.name === 'id');
        if (idAttr) {
          idAttr.value = 'glossary-tooltip';
        } else {
          node.attributes.push({
            type: 'mdxJsxAttribute',
            name: 'id',
            value: 'glossary-tooltip',
          });
        }
        return;
      }

      const tooltipHtmlAttr = node.attributes.find(
        (attr) => attr.name === 'data-tooltip-html'
      );
      const tooltipIdAttr = node.attributes.find(
        (attr) => attr.name === 'data-tooltip-id'
      );

      if (!tooltipHtmlAttr || typeof tooltipHtmlAttr.value !== 'string') {
        return;
      }

      let updatedValue = prefixDocsForGlossaries(
        normalizeHrefQuotes(tooltipHtmlAttr.value)
      );

      let termId = null;
      if (tooltipIdAttr && typeof tooltipIdAttr.value === 'string') {
        termId = extractTermIdFromTooltipId(tooltipIdAttr.value);
        tooltipIdAttr.value = 'glossary-tooltip';
      }

      if (termId) {
        const entry = termId ? glossaryHrefMap[termId] : null;

        if (entry) {
          const slug = slugifyTerm(entry.term);
          updatedValue = replaceHrefWithAnchor(
            updatedValue,
            entry.hrefBase,
            slug
          );
        }
      }

      tooltipHtmlAttr.value = replaceGlossaryLinkLabel(
        updatedValue,
        'full definition'
      );
    });
  };
};
