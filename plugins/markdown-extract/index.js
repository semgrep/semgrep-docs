const fs = require('node:fs');
const path = require('node:path');

/**
 * Extract frontmatter from markdown content
 */
function extractFrontmatter(markdown) {
  const frontmatterMatch = markdown.match(/^---([\s\S]*?)---/);
  if (!frontmatterMatch) {
    return { title: null, description: null, content: markdown };
  }

  const fmContent = frontmatterMatch[1];
  const contentWithoutFM = markdown.slice(frontmatterMatch[0].length).trimStart();

  // Simple frontmatter parse for title and description (YAML-ish)
  const lines = fmContent.split(/\r?\n/);
  let title = null;
  let description = null;

  for (const line of lines) {
    const [key, ...rest] = line.split(':');
    if (!key) continue;
    const value = rest.join(':').trim().replace(/^["']|["']$/g, ''); // Remove quotes

    if (key.trim() === 'title') title = value;
    if (key.trim() === 'description') description = value;
  }

  return { title, description, content: contentWithoutFM };
}

/**
 * Recursively walk directory and find markdown files
 */
function walk(dir, extFilter = ['.md', '.mdx']) {
  const results = [];

  if (!fs.existsSync(dir)) {
    return results;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
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

/**
 * Process markdown file: remove frontmatter only (keep original content)
 */
function processMarkdownFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const frontmatterMatch = content.match(/^---([\s\S]*?)---/);
  
  // If there's frontmatter, remove it and return the rest
  if (frontmatterMatch) {
    return content.slice(frontmatterMatch[0].length).trimStart();
  }
  
  // No frontmatter, return as-is
  return content;
}

/**
 * Convert file path to URL path (handles index files)
 */
function rewritePath(relPath, baseUrl = '/docs/') {
  // Remove leading slash if present
  let path = relPath.replace(/^\//, '');
  
  // Handle index files - convert /path/index.md to /path.md
  if (path.endsWith('/index.md') || path.endsWith('/index.mdx')) {
    path = path.replace(/\/index\.(md|mdx)$/, '.md');
  }
  
  // Ensure .md extension
  if (!path.endsWith('.md')) {
    path = path.replace(/\.mdx$/, '.md');
  }
  
  return baseUrl + path;
}

/**
 * Get the relative path from docs directory
 */
function getRelativePath(filePath, docsDir) {
  return path.relative(docsDir, filePath);
}

/**
 * Copy original markdown files (just remove frontmatter) to output directory
 * Files are organized by their doc ID (file path without extension)
 */
function copyMarkdownFiles(context, outputDir) {
  console.log('Copying markdown files for copy-to-markdown feature...');
  
  const docsDir = path.resolve(context.siteDir, 'docs');
  const contentFiles = walk(docsDir);
  
  // Create markdown output directory
  fs.mkdirSync(outputDir, { recursive: true });

  let processedCount = 0;

  for (const file of contentFiles) {
    try {
      const relPath = getRelativePath(file, docsDir);
      // Remove frontmatter but keep original content
      const processedContent = processMarkdownFile(file);
      
      // Use the file path as the doc ID (remove extension)
      // This matches what metadata.id returns
      let docId = relPath.replace(/\.(md|mdx)$/, '');
      
      // Handle index files - they map to their parent directory
      // e.g., getting-started/index.md -> getting-started
      if (path.basename(docId) === 'index') {
        docId = path.dirname(docId);
        // If it's the root index, keep it as 'index'
        if (docId === '.' || docId === '') {
          docId = 'index';
        }
      }
      
      // Normalize path separators for cross-platform compatibility
      docId = docId.replace(/\\/g, '/');
      
      // Create output path: markdown/getting-started/introduction.md
      const outputPath = path.join(outputDir, docId + '.md');
      
      // Create directory structure
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      
      // Write processed markdown (frontmatter removed, but original content preserved)
      fs.writeFileSync(outputPath, processedContent, 'utf-8');
      processedCount++;
    } catch (error) {
      console.warn(`Error processing ${file}:`, error.message);
    }
  }

  console.log(`Copied ${processedCount} markdown files to ${outputDir}`);
}

module.exports = function markdownExtractPlugin(context, options) {
  return {
    name: 'markdown-extract',
    async postBuild({ outDir, routes }) {
      // Only copy to build directory for production (not to static to save space)
      // Files are only generated during build, not in static directory
      const markdownOutputDir = path.join(outDir, 'markdown');
      copyMarkdownFiles(context, markdownOutputDir);
    },
  };
};
