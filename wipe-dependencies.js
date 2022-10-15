/* Import fs for work with filesystem */
const fs = require('fs')

/**
 * Functionf of update dependencies for npm
 */
const wipeDependencies = () => {
    // Read all text from package.json
    const file = fs.readFileSync('package.json')

    // Parse data
    const content = JSON.parse(file)
    for (var devDep in content.devDependencies) {
        if (content.devDependencies[devDep].match(/\W+\d+.\d+.\d+-?((alpha|beta|rc)?.\d+)?/g)) {
            content.devDependencies[devDep] = '*';
        }
    }
    for (var dep in content.dependencies) {
        if (content.dependencies[dep].match(/\W+\d+.\d+.\d+-?((alpha|beta|rc)?.\d+)?/g)) {
            content.dependencies[dep] = '*';
        }
    }

    // Rewrite file package.json
    fs.writeFileSync('package.json', JSON.stringify(content))
}
if (require.main === module) {
    wipeDependencies()
} else {
    module.exports = wipeDependencies
}