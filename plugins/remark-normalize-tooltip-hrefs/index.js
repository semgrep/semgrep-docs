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

const escapeRegExp = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

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

const buildGlossaryHrefMap = (glossaryFilePath) => {
  if (!glossaryFilePath) {
    return {};
  }

  const fileContent = yaml.load(
    fs.readFileSync(glossaryFilePath, 'utf8'),
    { json: true }
  );

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

module.exports = function remarkNormalizeTooltipHrefs(options = {}) {
  const glossaryHrefMap = buildGlossaryHrefMap(options.yamlFile);

  return (tree) => {
    visit(tree, 'mdxJsxFlowElement', (node) => {
      if (!node.attributes) {
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

      if (tooltipIdAttr && typeof tooltipIdAttr.value === 'string') {
        const termId = extractTermIdFromTooltipId(tooltipIdAttr.value);
        const entry = termId ? glossaryHrefMap[termId] : null;

        if (entry) {
          const slug = slugifyTerm(entry.term);
          const hrefPattern = new RegExp(
            `href=${escapeRegExp(entry.hrefBase)}(?:#[^\\s>]+)?`,
            'g'
          );
          updatedValue = updatedValue.replace(
            hrefPattern,
            `href=${entry.hrefBase}#${slug}`
          );
        }
      }

      tooltipHtmlAttr.value = updatedValue;
    });
  };
};
