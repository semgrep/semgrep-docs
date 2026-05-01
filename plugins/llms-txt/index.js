const fs = require('node:fs');
const path = require('node:path');

const FEATURED_DOCS = [
  {
    docId: 'index',
    title: 'Docs home',
    description: 'Start page for Semgrep documentation.',
  },
  {
    docId: 'getting-started/introduction',
    title: 'Introduction to Semgrep',
    description: 'Overview of Semgrep products and scan workflows.',
  },
  {
    docId: 'getting-started/quickstart',
    title: 'Quickstart',
    description: 'Set up Semgrep and scan a project.',
  },
  {
    docId: 'cli-reference',
    title: 'CLI reference',
    description: 'Command-line options and exit code behavior.',
  },
  {
    docId: 'writing-rules/overview',
    title: 'Write Semgrep rules',
    description: 'Starting point for Semgrep rule writing.',
  },
  {
    docId: 'writing-rules/rule-syntax',
    title: 'Rule syntax',
    description: 'YAML rule syntax reference.',
  },
  {
    docId: 'semgrep-ci/sample-ci-configs',
    title: 'Sample CI configurations',
    description: 'Example CI/CD configurations for Semgrep scans.',
  },
  {
    docId: 'semgrep-appsec-platform/semgrep-api',
    title: 'Semgrep API',
    description: 'Semgrep API overview and usage guidance.',
  },
  {
    docId: 'mcp',
    title: 'Semgrep Plugin',
    description: 'MCP server setup for AI coding tools.',
  },
];

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

function toAbsoluteUrl(siteUrl, pathUrl) {
  if (!siteUrl) {
    return pathUrl;
  }
  return new URL(pathUrl, siteUrl).toString();
}

function getMarkdownUrl({siteUrl, basePath, docId}) {
  return toAbsoluteUrl(siteUrl, `${basePath}markdown/${docId}.md`);
}

function getDocIds(docsDir) {
  return walk(docsDir)
    .map((file) => getDocId(path.relative(docsDir, file)))
    .filter(Boolean)
    .sort();
}

function renderFeaturedDocs({docIds, siteUrl, basePath}) {
  const availableDocIds = new Set(docIds);

  return FEATURED_DOCS.filter(({docId}) => availableDocIds.has(docId)).map(
    ({docId, title, description}) =>
      `- [${title}](${getMarkdownUrl({siteUrl, basePath, docId})}): ${description}`,
  );
}

function renderAllDocs({docIds, siteUrl, basePath}) {
  return docIds.map(
    (docId) =>
      `- [${docId}](${getMarkdownUrl({siteUrl, basePath, docId})})`,
  );
}

function buildLlmsTxt({siteUrl, basePath, docIds}) {
  const baseUrl = toAbsoluteUrl(siteUrl, basePath);

  return [
    '# Semgrep Docs',
    '',
    '> Documentation for using Semgrep AppSec Platform, Semgrep Code, Semgrep Supply Chain, Semgrep Secrets, CI, rule writing, and related references.',
    '',
    `Base URL: ${baseUrl}`,
    `Markdown mirror pages: ${docIds.length}`,
    '',
    'Use the Markdown mirror links below when possible. They are generated from the docs source and avoid the navigation, script, and layout noise in rendered HTML pages.',
    '',
    '## Start Here',
    ...renderFeaturedDocs({docIds, siteUrl, basePath}),
    '',
    '## All Markdown Docs',
    ...renderAllDocs({docIds, siteUrl, basePath}),
    '',
  ].join('\n');
}

module.exports = function llmsTxtPlugin(context, options) {
  return {
    name: 'llms-txt',
    async postBuild({outDir}) {
      const docsDir = path.resolve(context.siteDir, 'docs');
      const basePath = normalizeBasePath(context.siteConfig.baseUrl);
      const siteUrl = context.siteConfig.url;
      const docIds = getDocIds(docsDir);

      fs.mkdirSync(outDir, {recursive: true});
      fs.writeFileSync(
        path.join(outDir, 'llms.txt'),
        buildLlmsTxt({siteUrl, basePath, docIds}),
        'utf-8',
      );
    },
  };
};
