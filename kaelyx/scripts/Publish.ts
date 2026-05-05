import ghpages from 'gh-pages';
import { execSync } from 'child_process';

const PNPM = 'pnpm';
const NPM = 'npm';

const base = PNPM;
const dryRun = process.argv.includes('--dry-run');

const buildCommands = [
    `${base} run k:build:all`,
    `${base} run build`
];

for (const cmd of buildCommands) {
    console.log(`Running: ${cmd}`);
    execSync(cmd, { stdio: 'inherit' });
}

if (dryRun) {
    console.log('Dry run complete. Skipping gh-pages publish.');
    process.exit(0);
}

ghpages.publish('dist', {
    branch: 'published',
    cname: 'kaelyx.dev',
    repo: 'https://github.com/kaelyx-dev/kaelyx.git'
}, (err) => {
    if (!err) return console.log('Published to GitHub Pages successfully!');
    console.error('Failed to publish to GitHub Pages:', err);
});