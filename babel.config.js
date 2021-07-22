module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-env',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    ['module-resolver', {
      'alias': {
        '~test': './test',
        '~src': './src',
        '~common': './src/common',
        '~entities': './src/entities',
        '~controllers': './src/entities',
        '~modules': './src/modules',
        '~components': './src/components',
        '~blocks': './src/blocks',
        '~static': './static',
      },
    }],
  ],
};
