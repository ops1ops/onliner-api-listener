const { join } = require('path');

const {
  compilerOptions: { paths },
} = require('./tsconfig.json');

/**
 * Resolve tsconfig.json paths to Webpack aliases
 * @return {object} - Webpack alias config
 */
const resolveTsconfigPathsToAlias = () =>
  Object.keys(paths).reduce((accumulator, path) => {
    const alias = path.replace('/*', '');
    const realPath = paths[path][0].replace('/*', '/');

    return { ...accumulator, [alias]: join(__dirname, realPath) };
  }, {});

module.exports = resolveTsconfigPathsToAlias;
