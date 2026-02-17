const fs = require('node:fs');
const path = require('node:path');

function walk(dir, extFilter = ['.md', '.mdx']) {
  const results = [];

  if (!fs.existsSync(dir)) {
    return results;
  }

  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...walk(fullPath, extFilter));
    } else if (
      !entry.name.startsWith('_') &&
      extFilter.includes(path.extname(entry.name))
    ) {
      results.push(fullPath);
    }
  }

  return results;
}

function getDocId(relPath) {
  let docId = relPath.replace(/\.(md|mdx)$/, '');

  if (path.basename(docId) === 'index') {
    docId = path.dirname(docId);
    if (docId === '.' || docId === '') {
      docId = 'index';
    }
  }

  return docId.replace(/\\/g, '/');
}

function normalizeBasePath(baseUrl) {
  const basePath = baseUrl || '/';
  if (basePath === '/') {
    return '/';
  }
  return basePath.startsWith('/') && basePath.endsWith('/')
    ? basePath
    : `/${basePath.replace(/^\/|\/$/g, '')}/`;
}

function getOutputDirs(outDir) {
  const dirs = [outDir];
  const parentDir = path.dirname(outDir);
  if (parentDir && parentDir !== outDir) {
    dirs.push(parentDir);
  }
  return Array.from(new Set(dirs));
}

function toAbsoluteUrl(siteUrl, pathUrl) {
  if (!siteUrl) {
    return pathUrl;
  }
  return new URL(pathUrl, siteUrl).toString();
}

function buildLlmsTxt({
  siteUrl,
  basePath,
  htmlRelativeUrls,
  markdownRelativeUrls,
}) {
  const baseUrl = toAbsoluteUrl(siteUrl, basePath);
  const htmlAbsoluteUrls = htmlRelativeUrls.map((url) =>
    toAbsoluteUrl(siteUrl, url),
  );
  const markdownAbsoluteUrls = markdownRelativeUrls.map((url) =>
    toAbsoluteUrl(siteUrl, url),
  );

  return [
    '# Semgrep Docs',
    '# This file lists documentation pages for AI tooling.',
    `# Base URL: ${baseUrl}`,
    '# Absolute HTML routes:',
    ...htmlAbsoluteUrls.map((url) => `- ${url}`),
    '# Absolute Markdown mirror:',
    ...markdownAbsoluteUrls.map((url) => `- ${url}`),
    '# Relative HTML routes:',
    ...htmlRelativeUrls.map((url) => `- ${url}`),
    '# Relative Markdown mirror:',
    ...markdownRelativeUrls.map((url) => `- ${url}`),
    '',
  ].join('\n');
}

module.exports = function llmsTxtPlugin(context, options) {
  return {
    name: 'llms-txt',
    async postBuild({outDir}) {
      const docsDir = path.resolve(context.siteDir, 'docs');
      const markdownFiles = walk(docsDir);
      const basePath = normalizeBasePath(context.siteConfig.baseUrl);
      const docIds = markdownFiles
        .map((file) => getDocId(path.relative(docsDir, file)))
        .filter(Boolean)
        .sort();

      const htmlRelativeUrls = docIds.map((docId) =>
        docId === 'index' ? basePath : `${basePath}${docId}`,
      );
      const markdownRelativeUrls = docIds.map(
        (docId) => `${basePath}markdown/${docId}.md`,
      );

      const llmsTxt = buildLlmsTxt({
        siteUrl: context.siteConfig.url,
        basePath,
        htmlRelativeUrls,
        markdownRelativeUrls,
      });
      const outputDirs = getOutputDirs(outDir);

      for (const outputDir of outputDirs) {
        fs.mkdirSync(outputDir, {recursive: true});
        fs.writeFileSync(path.join(outputDir, 'llms.txt'), llmsTxt, 'utf-8');
      }
    },
  };
};
