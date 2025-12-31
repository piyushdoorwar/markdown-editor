const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const lineNumbers = document.getElementById('line-numbers');
const resizer = document.getElementById('resizer');

let history = [];
let historyIndex = -1;
let isResizing = false;
let isUndoRedoAction = false;

const initialMarkdown = `# Welcome to your markdown editor

Write markdown on the left, and the preview updates instantly on the right.

## Features

- Inspired by the json-diff aesthetic
- Two-panel focus layout
- Seamless live rendering

> Paste or import markdown to see it instantly rendered.`;

editor.value = initialMarkdown;

const saveToHistory = () => {
  if (isUndoRedoAction) {
    isUndoRedoAction = false;
    return;
  }
  
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

const updateLineNumbers = () => {
  const lines = editor.value.split('\n').length;
  lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
};

const render = () => {
  const markdown = editor.value;
  preview.innerHTML = marked.parse(markdown);
};

const updateButtonStates = () => {
  const hasSelection = editor.selectionStart !== editor.selectionEnd;
  
  // Update buttons
  document.querySelectorAll('.toolbar-btn[data-requires-selection]').forEach(btn => {
    btn.disabled = !hasSelection;
    if (!hasSelection) {
      btn.dataset.tooltip = btn.dataset.tooltip.split(' (')[0] + ' (Select text first)';
    } else {
      btn.dataset.tooltip = btn.dataset.tooltip.split(' (')[0];
    }
  });
  
  // Update selects
  document.querySelectorAll('.toolbar-select[data-requires-selection]').forEach(select => {
    select.disabled = !hasSelection;
    const baseTooltip = select.dataset.tooltip.split(' (')[0];
    if (!hasSelection) {
      select.dataset.tooltip = baseTooltip + ' (Select text first)';
    } else {
      select.dataset.tooltip = baseTooltip;
    }
  });
  
  // Update color pickers
  document.querySelectorAll('.toolbar-color[data-requires-selection]').forEach(colorPicker => {
    colorPicker.disabled = !hasSelection;
    const baseTooltip = colorPicker.dataset.tooltip.split(' (')[0];
    if (!hasSelection) {
      colorPicker.dataset.tooltip = baseTooltip + ' (Select text first)';
    } else {
      colorPicker.dataset.tooltip = baseTooltip;
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
  saveToHistory();
  updateLineNumbers();
  render();
};

const insertAtLine = (text) => {
  const start = editor.selectionStart;
  const beforeCursor = editor.value.substring(0, start);
  const lineStart = beforeCursor.lastIndexOf('\n') + 1;
  
  editor.value = editor.value.substring(0, lineStart) + text + editor.value.substring(lineStart);
  editor.selectionStart = editor.selectionEnd = lineStart + text.length;
  editor.focus();
  saveToHistory();
  updateLineNumbers();
  render();
};

const actions = {
  undo: () => {
    if (historyIndex > 0) {
      isUndoRedoAction = true;
      historyIndex--;
      editor.value = history[historyIndex];
      updateLineNumbers();
      render();
      updateButtonStates();
    }
  },
  redo: () => {
    if (historyIndex < history.length - 1) {
      isUndoRedoAction = true;
      historyIndex++;
      editor.value = history[historyIndex];
      updateLineNumbers();
      render();
      updateButtonStates();
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
      updateLineNumbers();
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
  fontcolor: (color) => {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selectedText = editor.value.substring(start, end);
    if (selectedText && color) {
      insertAtCursor(`<span style="color: ${color};">`, '</span>');
    }
  },
  bold: () => insertAtCursor('**', '**', 'bold text'),
  italic: () => insertAtCursor('*', '*', 'italic text'),
  underline: () => insertAtCursor('<u>', '</u>', 'underlined text'),
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
  table: () => {
    const rows = prompt('Number of rows:', '3');
    const cols = prompt('Number of columns:', '3');
    const align = prompt('Text alignment (left/center/right):', 'left').toLowerCase();
    
    if (!rows || !cols || isNaN(rows) || isNaN(cols)) return;
    
    const numRows = parseInt(rows);
    const numCols = parseInt(cols);
    
    // Alignment characters
    let alignChar = '---';
    if (align === 'center') alignChar = ':---:';
    else if (align === 'right') alignChar = '---:';
    else if (align === 'left') alignChar = ':---';
    
    // Build table
    let table = '\n';
    
    // Header row
    table += '|';
    for (let i = 1; i <= numCols; i++) {
      table += ` Header ${i} |`;
    }
    table += '\n';
    
    // Separator row
    table += '|';
    for (let i = 0; i < numCols; i++) {
      table += ` ${alignChar} |`;
    }
    table += '\n';
    
    // Data rows
    for (let r = 1; r <= numRows; r++) {
      table += '|';
      for (let c = 1; c <= numCols; c++) {
        table += ` Cell ${r},${c} |`;
      }
      table += '\n';
    }
    
    insertAtCursor(table, '', '');
  },
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

// Attach select listeners
document.querySelectorAll('.toolbar-select').forEach(select => {
  select.addEventListener('change', (e) => {
    const action = select.dataset.action;
    const value = select.value;
    if (actions[action] && value) {
      // Save selection before action
      const savedStart = editor.selectionStart;
      const savedEnd = editor.selectionEnd;
      
      actions[action](value);
      
      // Restore selection after action
      setTimeout(() => {
        editor.focus();
        editor.setSelectionRange(savedStart, savedEnd);
      }, 0);
      
      select.value = ''; // Reset to default
    }
  });
});

// Attach color picker listeners
document.querySelectorAll('.toolbar-color').forEach(colorPicker => {
  colorPicker.addEventListener('change', (e) => {
    const action = colorPicker.dataset.action;
    const value = colorPicker.value;
    if (actions[action]) {
      // Save selection before action
      const savedStart = editor.selectionStart;
      const savedEnd = editor.selectionEnd;
      
      actions[action](value);
      
      // Restore selection after action
      setTimeout(() => {
        editor.focus();
        editor.setSelectionRange(savedStart, savedEnd);
      }, 0);
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
        if (e.shiftKey) {
          actions.redo();
        } else {
          actions.undo();
        }
        break;
      case 'y':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          actions.redo();
        }
        break;
    }
  }
});

editor.addEventListener('input', () => {
  saveToHistory();
  updateLineNumbers();
  render();
});

editor.addEventListener('scroll', () => {
  lineNumbers.scrollTop = editor.scrollTop;
});

editor.addEventListener('select', updateButtonStates);
editor.addEventListener('click', updateButtonStates);
editor.addEventListener('keyup', updateButtonStates);

// Resizer functionality
resizer.addEventListener('mousedown', (e) => {
  isResizing = true;
  resizer.classList.add('resizing');
  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', (e) => {
  if (!isResizing) return;
  
  const container = document.querySelector('.workspace');
  const containerRect = container.getBoundingClientRect();
  const leftPanel = container.querySelector('.panel:first-child');
  const rightPanel = container.querySelector('.right-panel');
  
  const offsetX = e.clientX - containerRect.left;
  const totalWidth = containerRect.width;
  const leftWidth = (offsetX / totalWidth) * 100;
  
  if (leftWidth > 20 && leftWidth < 80) {
    leftPanel.style.flex = `0 0 ${leftWidth}%`;
    rightPanel.style.flex = `0 0 ${100 - leftWidth}%`;
  }
});

document.addEventListener('mouseup', () => {
  if (isResizing) {
    isResizing = false;
    resizer.classList.remove('resizing');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }
});

updateButtonStates();
updateLineNumbers();
render();
