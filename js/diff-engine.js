/**
 * ConvertsText - Fast Longest Common Subsequence (LCS) Diff Engine
 */
const DiffEngine = (() => {
  function computeLCS(arr1, arr2) {
    const n = arr1.length;
    const m = arr2.length;
    const matrix = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        if (arr1[i - 1] === arr2[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1] + 1;
        } else {
          matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
        }
      }
    }
    return matrix;
  }

  function backtrackDiff(arr1, arr2, matrix) {
    let i = arr1.length;
    let j = arr2.length;
    const diff = [];

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && arr1[i - 1] === arr2[j - 1]) {
        diff.unshift({ type: 'unchanged', value: arr1[i - 1], leftIndex: i, rightIndex: j });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || matrix[i][j - 1] >= matrix[i - 1][j])) {
        diff.unshift({ type: 'added', value: arr2[j - 1], rightIndex: j });
        j--;
      } else if (i > 0 && (j === 0 || matrix[i][j - 1] < matrix[i - 1][j])) {
        diff.unshift({ type: 'removed', value: arr1[i - 1], leftIndex: i });
        i--;
      }
    }
    return diff;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  return {
    diffLines(text1, text2) {
      const lines1 = (text1 || '').split('\n');
      const lines2 = (text2 || '').split('\n');
      const matrix = computeLCS(lines1, lines2);
      const rawDiff = backtrackDiff(lines1, lines2, matrix);

      let additions = 0;
      let deletions = 0;
      let unchanged = 0;

      rawDiff.forEach(item => {
        if (item.type === 'added') additions++;
        else if (item.type === 'removed') deletions++;
        else unchanged++;
      });

      return {
        diff: rawDiff,
        stats: { additions, deletions, unchanged, totalLeft: lines1.length, totalRight: lines2.length }
      };
    },

    renderUnifiedHtml(diffResult) {
      if (!diffResult || !diffResult.diff) return '<div class="diff-empty">No difference found</div>';
      
      let html = '<div class="diff-unified-view">';
      diffResult.diff.forEach(item => {
        const cls = item.type === 'added' ? 'diff-line-added' : item.type === 'removed' ? 'diff-line-removed' : 'diff-line-unchanged';
        const sign = item.type === 'added' ? '+' : item.type === 'removed' ? '-' : ' ';
        const leftNum = item.leftIndex !== undefined ? item.leftIndex : '';
        const rightNum = item.rightIndex !== undefined ? item.rightIndex : '';

        html += `<div class="diff-line ${cls}">
          <span class="diff-num-left">${leftNum}</span>
          <span class="diff-num-right">${rightNum}</span>
          <span class="diff-sign">${sign}</span>
          <span class="diff-text">${escapeHtml(item.value) || '&nbsp;'}</span>
        </div>`;
      });
      html += '</div>';
      return html;
    },

    renderSplitHtml(diffResult) {
      if (!diffResult || !diffResult.diff) return '<div class="diff-empty">No difference found</div>';
      
      const leftRows = [];
      const rightRows = [];

      let leftLineNum = 1;
      let rightLineNum = 1;

      // Group contiguous additions and deletions
      const items = diffResult.diff;
      let i = 0;
      while (i < items.length) {
        const item = items[i];
        if (item.type === 'unchanged') {
          leftRows.push({ num: leftLineNum++, val: item.value, type: 'unchanged' });
          rightRows.push({ num: rightLineNum++, val: item.value, type: 'unchanged' });
          i++;
        } else if (item.type === 'removed') {
          leftRows.push({ num: leftLineNum++, val: item.value, type: 'removed' });
          // Check if followed by added (modified)
          if (i + 1 < items.length && items[i + 1].type === 'added') {
            rightRows.push({ num: rightLineNum++, val: items[i + 1].value, type: 'added' });
            i += 2;
          } else {
            rightRows.push({ num: '', val: '', type: 'empty' });
            i++;
          }
        } else if (item.type === 'added') {
          leftRows.push({ num: '', val: '', type: 'empty' });
          rightRows.push({ num: rightLineNum++, val: item.value, type: 'added' });
          i++;
        }
      }

      let html = '<div class="diff-split-view">';
      html += '<div class="diff-split-side diff-left-side">';
      html += '<div class="diff-side-header">Original Text</div>';
      leftRows.forEach(r => {
        const cls = r.type === 'removed' ? 'diff-line-removed' : r.type === 'empty' ? 'diff-line-empty' : 'diff-line-unchanged';
        html += `<div class="diff-line ${cls}">
          <span class="diff-num">${r.num}</span>
          <span class="diff-text">${escapeHtml(r.val) || '&nbsp;'}</span>
        </div>`;
      });
      html += '</div>';

      html += '<div class="diff-split-side diff-right-side">';
      html += '<div class="diff-side-header">Modified Text</div>';
      rightRows.forEach(r => {
        const cls = r.type === 'added' ? 'diff-line-added' : r.type === 'empty' ? 'diff-line-empty' : 'diff-line-unchanged';
        html += `<div class="diff-line ${cls}">
          <span class="diff-num">${r.num}</span>
          <span class="diff-text">${escapeHtml(r.val) || '&nbsp;'}</span>
        </div>`;
      });
      html += '</div>';
      html += '</div>';

      return html;
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DiffEngine;
} else {
  window.DiffEngine = DiffEngine;
}
