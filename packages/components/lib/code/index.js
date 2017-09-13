'use strict';

const React = require('react');
const styled = require('styled-components').default;

let _require = require('lodash'),
    includes = _require.includes;

const low = require('lowlight/lib/core');
const toh = require('hast-to-hyperscript');

// Highlight.js modules
const css = require('highlight.js/lib/languages/css.js');
const less = require('highlight.js/lib/languages/less.js');
const scss = require('highlight.js/lib/languages/scss.js');
const stylus = require('highlight.js/lib/languages/stylus.js');

const js = require('highlight.js/lib/languages/javascript.js');
const ts = require('highlight.js/lib/languages/typescript.js');
const json = require('highlight.js/lib/languages/json.js');

const xml = require('highlight.js/lib/languages/xml.js');
const md = require('highlight.js/lib/languages/markdown.js');

const bash = require('highlight.js/lib/languages/bash.js');

module.exports = Code;
module.exports.highlight = highlight;
module.exports.toElements = toElements;

function Code(props) {
  const source = highlightCode(props.language, props.children);

  const code = React.createElement(
    StyledCode,
    { className: props.className },
    source
  );

  return props.block ? React.createElement(
    'pre',
    null,
    code
  ) : code;
}

const themes = {
  dark: {
    mono1: '#abb2bf',
    mono2: '#818896',
    mono3: '#5c6370',
    hue1: '#56b6c2',
    hue2: '#61aeee',
    hue3: '#c678dd',
    hue4: '#98c379',
    hue5: '#e06c75',
    hue52: '#be5046',
    hue6: '#d19a66',
    hue62: '#e6c07b'
  },
  light: {
    mono1: '#383a42',
    mono2: '#686b77',
    mono3: '#a0a1a7',
    hue1: '#0184bb',
    hue2: '#4078f2',
    hue3: '#a626a4',
    hue4: '#50a14f',
    hue5: '#e45649',
    hue52: '#c91243',
    hue6: '#986801',
    hue62: '#c18401'
  }
};

const themed = function themed(key) {
  return function (props) {
    return themes[props.theme.name][key];
  };
};

var StyledCode = styled.code`
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: ${themed('mono1')};
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier,
    monospace;

  .hljs-comment,
  .hljs-quote {
    color: ${themed('mono3')};
    font-style: italic;
  }

  .hljs-doctag,
  .hljs-keyword,
  .hljs-formula {
    color: ${themed('hue3')};
  }

  .hljs-section,
  .hljs-name,
  .hljs-selector-tag,
  .hljs-deletion,
  .hljs-subst {
    color: ${themed('hue5')};
  }

  .hljs-literal {
    color: ${themed('hue1')};
  }

  .hljs-string,
  .hljs-regexp,
  .hljs-addition,
  .hljs-attribute,
  .hljs-meta-string {
    color: ${themed('hue4')};
  }

  .hljs-built_in,
  .hljs-class .hljs-title {
    color: ${themed('hue62')};
  }

  .hljs-attr,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-type,
  .hljs-selector-class,
  .hljs-selector-attr,
  .hljs-selector-pseudo,
  .hljs-number {
    color: ${themed('hue6')};
  }

  .hljs-symbol,
  .hljs-bullet,
  .hljs-link,
  .hljs-meta,
  .hljs-selector-id,
  .hljs-title {
    color: ${themed('hue2')};
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }

  .hljs-link {
    text-decoration: underline;
  }
`;

function highlightCode(language) {
  const source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (!language) {
    return source;
  }
  if (!source) {
    return source;
  }
  const hast = highlight(language, source);
  return toElements(hast);
}

// Highlight configuration

// CSS and friends
low.registerLanguage('css', css);
low.registerLanguage('less', less);
low.registerLanguage('scss', scss);
low.registerLanguage('stylus', stylus);

// JS and friends
low.registerLanguage('js', js);
low.registerLanguage('javascript', js);
low.registerLanguage('jsx', js);
low.registerLanguage('ts', ts);
low.registerLanguage('tsx', ts);
low.registerLanguage('typescript', ts);
low.registerLanguage('json', json);

// HTML and friends
low.registerLanguage('html', xml);
low.registerLanguage('xml', xml);
low.registerLanguage('md', md);
low.registerLanguage('markdown', md);

// (s)hell(ish)s
low.registerLanguage('bash', bash);
// Low.registerLanguage('shell', bash);

const languages = ['css', 'less', 'scss', 'stylus', 'js', 'javascript', 'jsx', 'ts', 'tsx', 'typescript', 'json', 'html', 'xml', 'md', 'markdown', 'bash'];

function highlight(language, source) {
  if (!includes(languages, language)) {
    return source;
  }

  let _low$highlight = low.highlight(language, source),
      children = _low$highlight.value;

  return children;
}

function toElements(children) {
  if (!Array.isArray(children)) {
    return children;
  }

  const root = toh(React.createElement, {
    type: 'element',
    tagName: 'div',
    children
  });

  return root.props.children;
}
// # sourceMappingURL=index.js.map