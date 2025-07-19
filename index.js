const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 7860;
const DOCS_PATH = path.join(__dirname, 'docs');

const findMarkdownFiles = async (basePath, currentDir = '') => {
    const fullPath = path.join(basePath, currentDir);
    const entries = await fs.readdir(fullPath, { withFileTypes: true });
    let fileList = [];

    for (const entry of entries) {
        const entryPath = path.join(currentDir, entry.name);
        if (entry.isDirectory()) {
            const subFiles = await findMarkdownFiles(basePath, entryPath);
            fileList = fileList.concat(subFiles);
        } else if (entry.name.endsWith('.md')) {
            fileList.push(entryPath);
        }
    }
    return fileList;
};
app.use(express.static('public'));

app.use(express.static(DOCS_PATH));
app.get('/api/docs', async (req, res) => {
    try {
        const files = await findMarkdownFiles(DOCS_PATH);
        const structure = {};

        files.forEach(file => {
            const parts = file.split(path.sep);
            let currentLevel = structure;
            parts.forEach((part, index) => {
                if (index === parts.length - 1) {
                    currentLevel[part] = file;
                } else {
                    if (!currentLevel[part]) {
                        currentLevel[part] = {};
                    }
                    currentLevel = currentLevel[part];
                }
            });
        });

        res.json(structure);
    } catch (error) {
        res.status(500).json({ error: 'Failed to scan documentation directory.' });
    }
});

// API to get the content of a file
app.get('/api/content', async (req, res) => {
    const filePath = req.query.path;
    if (!filePath) {
        return res.status(400).json({ error: 'File path is required.' });
    }

    const absolutePath = path.join(DOCS_PATH, filePath);
    if (!absolutePath.startsWith(DOCS_PATH)) {
        return res.status(403).json({ error: 'Access denied.' });
    }

    try {
        const content = await fs.readFile(absolutePath, 'utf-8');
        res.send(content);
    } catch (error) {
        res.status(404).json({ error: 'File not found.' });
    }
});

// API for search
app.get('/api/search', async (req, res) => {
    const query = (req.query.q || '').toLowerCase();
    if (!query) return res.json([]);

    try {
        const files = await findMarkdownFiles(DOCS_PATH); // This only gets .md files
        const results = [];

        for (const file of files) {
            const content = await fs.readFile(path.join(DOCS_PATH, file), 'utf-8');
            const fileName = path.basename(file).toLowerCase();

            if (fileName.includes(query)) {
                results.push({
                    type: 'Title Match',
                    path: file,
                    title: path.basename(file, '.md'),
                    context: `Match in document title.`
                });
                continue; 
            }

            const lines = content.split('\n');
            for (const line of lines) {
                if (line.toLowerCase().includes(query)) {
                    if (!results.some(r => r.path === file)) {
                        results.push({
                            type: 'Content Match',
                            path: file,
                            title: path.basename(file, '.md'),
                            context: line.trim()
                        });
                        break;
                    }
                }
            }
        }

        res.json(results.slice(0, 10));
    } catch (error) {
        res.status(500).json({ error: 'Search failed.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
