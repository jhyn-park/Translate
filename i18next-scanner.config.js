const path = require('path');
const typescriptTransform = require('i18next-scanner-typescript');
const typescript = require('typescript');
const COMMON_EXTENSIONS = '/**/*.{js,jsx,ts,tsx,html}';

module.exports = {
  input: [`src/${COMMON_EXTENSIONS}`],
  options: {
    defaultLng: 'ko-KR',
    debug: false,
    lngs: ['ko-KR', 'en-US', 'ja-JP', 'my-MM', 'vi-VN', 'zh-CN'],
    func: {
      list: ['i18next.t', 'i18n.t', '$i18n.t', 'i18nextScanKey'],
      extensions: ['.ts', '.tsx', '.html'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      fallbackKey: function (ns, value) {
        return value;
      },
    },
    resource: {
      loadPath: path.join(__dirname, 'src/locales/{{lng}}/{{ns}}.json'),
      savePath: path.join(__dirname, 'src/locales/{{lng}}/{{ns}}.json'),
    },
    defaultValue(lng, ns, key) {
      const keyAsDefaultValue = ['ko-KR'];
      if (keyAsDefaultValue.includes(lng)) {
        const separator = 'html';
        const value = key.includes(separator) ? '' : key;
        return value;
      }
      return '';
    },
    keySeparator: false,
    nsSeparator: false,
    // prefix: "%{",
    // suffix: "}",
  },
  transform: typescriptTransform({
    tsOptions: {
      target: 'es2018',
    },
    extensions: ['.tsx', '.ts'],
  }),
};
