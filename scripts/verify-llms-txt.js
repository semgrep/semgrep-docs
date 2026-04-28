const fs = require('node:fs');
const path = require('node:path');

const siteDir = path.resolve(__dirname, '..');
const docsDir = path.join(siteDir, 'docs');
const buildDir = path.join(siteDir, 'build');
const llmsPath = path.join(buildDir, 'llms.txt');
const netlifyPath = path.join(siteDir, 'netlify.toml');

function walk(dir, extFilter = ['.md', '.mdx']) {
  const results = [];

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

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function read(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

function main() {
  assert(fs.existsSync(llmsPath), 'build/llms.txt was not generated');

  const llmsTxt = read(llmsPath);
  const netlifyToml = read(netlifyPath);
  const sourceDocIds = walk(docsDir)
    .map((file) => getDocId(path.relative(docsDir, file)))
    .sort();

  const markdownUrlRegex =
    /https:\/\/semgrep\.dev\/docs\/markdown\/([A-Za-z0-9./_-]+\.md)/g;
  const markdownPaths = new Set();
  let match;

  while ((match = markdownUrlRegex.exec(llmsTxt)) !== null) {
    markdownPaths.add(match[1]);
  }

  assert(
    llmsTxt.startsWith('# Semgrep Docs\n'),
    'llms.txt must start with the Semgrep Docs H1',
  );
  assert(
    (llmsTxt.match(/^# /gm) || []).length === 1,
    'llms.txt should contain one top-level H1',
  );
  assert(
    llmsTxt.includes('> Documentation for using Semgrep AppSec Platform'),
    'llms.txt is missing the summary blockquote',
  );
  assert(
    llmsTxt.includes('## Start Here'),
    'llms.txt is missing the curated Start Here section',
  );
  assert(
    llmsTxt.includes('## All Markdown Docs'),
    'llms.txt is missing the all-docs section',
  );
  assert(
    llmsTxt.includes(`Markdown mirror pages: ${sourceDocIds.length}`),
    'llms.txt markdown mirror count does not match docs source count',
  );
  assert(
    !llmsTxt.includes('# Absolute HTML routes:'),
    'llms.txt still contains the old raw HTML route list',
  );
  assert(
    !netlifyToml.includes('from = "/docs/llms.txt"'),
    'netlify.toml still redirects /docs/llms.txt away from the generated file',
  );

  for (const docId of sourceDocIds) {
    const markdownPath = `${docId}.md`;
    assert(
      markdownPaths.has(markdownPath),
      `llms.txt is missing https://semgrep.dev/docs/markdown/${markdownPath}`,
    );
    assert(
      fs.existsSync(path.join(buildDir, 'markdown', markdownPath)),
      `build/markdown/${markdownPath} was not generated`,
    );
  }

  const expectedExamples = [
    'index.md',
    'getting-started/introduction.md',
    'getting-started/quickstart.md',
    'semgrep-supply-chain/feature-support.md',
    'writing-rules/rule-syntax.md',
  ];

  for (const markdownPath of expectedExamples) {
    assert(
      markdownPaths.has(markdownPath),
      `representative Markdown URL missing from llms.txt: ${markdownPath}`,
    );
  }

  console.log(
    `Verified ${sourceDocIds.length} docs Markdown mirror entries in build/llms.txt`,
  );
}

main();
