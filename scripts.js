const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

let history = [];
let historyIndex = -1;

const initialMarkdown = `# Welcome to your markdown editor

Write markdown on the left, and the preview updates instantly on the right.

## Features

- Inspired by the json-diff aesthetic
- Two-panel focus layout
- Seamless live rendering

> Paste or import markdown to see it instantly rendered.`;

editor.value = initialMarkdown;

const saveToHistory = () => {
  const current = editor.value;
  if (historyIndex === -1 || history[historyIndex] !== current) {
    history = history.slice(0, historyIndex + 1);
    history.push(current);
    historyIndex++;
    if (history.length > 100) {
      history.shift();
      historyIndex--;
    }
  }
};

saveToHistory();

const render = () => {
  const markdown = editor.value;
  preview.innerHTML = marked.parse(markdown);
};

const updateButtonStates = () => {
  const hasSelection = editor.selectionStart !== editor.selectionEnd;
  document.querySelectorAll('.toolbar-btn[data-requires-selection]').forEach(btn => {
    btn.disabled = !hasSelection;
    if (!hasSelection) {
      btn.dataset.tooltip = btn.dataset.tooltip.split(' (')[0] + ' (Select text first)';
    } else {
      btn.dataset.tooltip = btn.dataset.tooltip.split(' (')[0];
    }
  });
};

// Toolbar actions
const insertAtCursor = (before, after = '', placeholder = '') => {
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const selectedText = editor.value.substring(start, end);
  const text = selectedText || placeholder;
  
  const replacement = before + text + after;
  editor.value = editor.value.substring(0, start) + replacement + editor.value.substring(end);
  
  // Set cursor position
  if (selectedText) {
    editor.selectionStart = start;
    editor.selectionEnd = start + replacement.length;
  } else {
    const cursorPos = start + before.length + text.length;
    editor.selectionStart = cursorPos;
    editor.selectionEnd = cursorPos - after.length;
  }
  
  editor.focus();
  render();
};

const insertAtLine = (text) => {
  const start = editor.selectionStart;
  const beforeCursor = editor.value.substring(0, start);
  const lineStart = beforeCursor.lastIndexOf('\n') + 1;
  
  editor.value = editor.value.substring(0, lineStart) + text + editor.value.substring(lineStart);
  editor.selectionStart = editor.selectionEnd = lineStart + text.length;
  editor.focus();
  render();
};

const actions = {
  undo: () => {
    if (historyIndex > 0) {
      historyIndex--;
      editor.value = history[historyIndex];
      render();
    }
  },
  copy: async () => {
    try {
      await navigator.clipboard.writeText(editor.value);
    } catch (err) {
      editor.select();
      document.execCommand('copy');
    }
  },
  paste: async () => {
    try {
      const text = await navigator.clipboard.readText();
      const start = editor.selectionStart;
      editor.value = editor.value.substring(0, start) + text + editor.value.substring(editor.selectionEnd);
      editor.selectionStart = editor.selectionEnd = start + text.length;
      saveToHistory();
      render();
    } catch (err) {
      console.log('Paste from clipboard not available, use Ctrl+V');
    }
  },
  download: () => {
    const blob = new Blob([editor.value], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown.md';
    a.click();
    URL.revokeObjectURL(url);
  },
  heading: () => insertAtLine('## '),
  bold: () => insertAtCursor('**', '**', 'bold text'),
  italic: () => insertAtCursor('*', '*', 'italic text'),
  strikethrough: () => {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selectedText = editor.value.substring(start, end);
    if (selectedText) {
      insertAtCursor('~~', '~~');
    }
  },
  code: () => insertAtCursor('`', '`', 'code'),
  codeblock: () => insertAtCursor('\n```\n', '\n```\n', 'code block'),
  quote: () => insertAtLine('> '),
  ul: () => insertAtLine('- '),
  ol: () => insertAtLine('1. '),
  task: () => insertAtLine('- [ ] '),
  link: () => {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selectedText = editor.value.substring(start, end);
    if (selectedText) {
      insertAtCursor('[', '](url)');
    }
  },
  image: () => insertAtCursor('![', '](image-url)', 'alt text'),
  table: () => insertAtCursor('\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n', '', ''),
  hr: () => insertAtCursor('\n---\n', '', ''),
  comment: () => {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selectedText = editor.value.substring(start, end);
    if (selectedText) {
      insertAtCursor('<!-- ', ' -->');
    }
  }
};

// Attach toolbar button listeners
document.querySelectorAll('.toolbar-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const action = btn.dataset.action;
    if (actions[action]) {
      actions[action]();
    }
  });
});

// Keyboard shortcuts
editor.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) {
    switch(e.key) {
      case 'b':
        e.preventDefault();
        actions.bold();
        break;
      case 'i':
        e.preventDefault();
        actions.italic();
        break;
      case 'z':
        e.preventDefault();
        actions.undo();
        break;
    }
  }
});

editor.addEventListener('input', () => {
  saveToHistory();
  render();
});

editor.addEventListener('select', updateButtonStates);
editor.addEventListener('click', updateButtonStates);
editor.addEventListener('keyup', updateButtonStates);

updateButtonStates();
render();
