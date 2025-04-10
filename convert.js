import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the JSON file
const jsonData = JSON.parse(readFileSync(join(__dirname, 'src', 'app', 'dev', 'dev.json'), 'utf8'));

// Create SQL insert statements
const sqlStatements = [];
sqlStatements.push('-- Insert statements for posts table\n');

jsonData.forEach(item => {
    // Create slug from title
    const slug = item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    // Format the date
    const date = item.date ? new Date(item.date).toISOString() : new Date().toISOString();

    // Prepare content with keywords as tags at the top
    const keywords = item.keywords && item.keywords.length > 0 
        ? '**Tags**: ' + item.keywords.join(', ') + '\n\n'
        : '';
    const content = keywords + (item.content || '');

    // Escape single quotes in text fields
    const escapedTitle = item.title.replace(/'/g, "''");
    const escapedContent = content.replace(/'/g, "''");

    // Create the SQL insert statement
    const sql = `INSERT INTO posts (
        author_id,
        title,
        slug,
        content,
        cover_image_url,
        published,
        created_at,
        updated_at
    ) VALUES (
        1,
        '${escapedTitle}',
        '${slug}',
        '${escapedContent}',
        '/opengraph-image.webp',
        TRUE,
        '${date}',
        '${date}'
    );`;

    sqlStatements.push(sql + '\n');
});

// Write to SQL file
writeFileSync(join(__dirname, 'src', 'app', 'dev', 'insert_posts.sql'), sqlStatements.join('\n'));

console.log('SQL file generated! Check insert_posts.sql in the src/app/dev directory.'); 