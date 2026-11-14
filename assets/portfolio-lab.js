/* Small, inspectable demonstrations. No remote requests or stored visitor input. */
(function (root) {
  'use strict';
  const lexicon = root.VERITY_LEXICON || (typeof require === 'function' ? require('./verity-lexicon.json') : null);
  function sentiment(text, words = lexicon) {
    const tokens = text.toLowerCase().match(/\b[a-zA-Z']+\b/g) || [];
    let positive = 0, negative = 0;
    const matches = [];
    tokens.forEach((word, i) => {
      const flipped = i > 0 && words.negation.includes(tokens[i - 1]);
      let direction = words.positive.includes(word) ? 1 : words.negative.includes(word) ? -1 : 0;
      if (!direction) return;
      if (flipped) direction *= -1;
      direction > 0 ? positive++ : negative++;
      matches.push({word, flipped, direction});
    });
    const total = positive + negative, score = total ? positive / total : 0.5;
    return {positive, negative, score, matches, label: !total ? 'Neutral' : score >= .65 ? 'Positive' : score <= .35 ? 'Negative' : 'Mixed'};
  }
  function random(seed) {
    return () => { seed = (Math.imul(1664525, seed) + 1013904223) >>> 0; return seed / 4294967296; };
  }
  function transactions(count, seed, anomalyRate) {
    const rng = random(seed), data = [];
    for (let i = 0; i < count; i++) {
      const anomaly = rng() < anomalyRate;
      // Synthetic feature ranges overlap deliberately: some anomalies look ordinary.
      const amount = Math.round(200 + Math.pow(rng(), 2) * 14000 + (anomaly ? rng() * 40000 : 0));
      const velocity = 1 + Math.floor(rng() * 5 + (anomaly ? rng() * 11 : 0));
      data.push({id: `SYN-${seed}-${String(i + 1).padStart(3, '0')}`, amount, velocity, anomaly});
    }
    return data;
  }
  const training = transactions(400, 104729, 0);
  const evaluation = transactions(200, 130363, .12);
  const features = ['amount', 'velocity'];
  const fit = Object.fromEntries(features.map(key => {
    const values = training.map(row => key === 'amount' ? Math.log1p(row[key]) : row[key]);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const sd = Math.sqrt(values.reduce((sum, x) => sum + (x - mean) ** 2, 0) / values.length);
    return [key, {mean, sd}];
  }));
  function transactionScore(row) {
    const components = features.map(key => Math.max(0, ((key === 'amount' ? Math.log1p(row[key]) : row[key]) - fit[key].mean) / fit[key].sd));
    return {score: Math.max(...components), amountZ: components[0], velocityZ: components[1]};
  }
  function evaluate(threshold) {
    const rows = evaluation.map(row => ({...row, ...transactionScore(row)})).map(row => ({...row, flagged: row.score >= threshold}));
    let tp = 0, fp = 0, fn = 0, tn = 0;
    rows.forEach(row => { if (row.flagged) row.anomaly ? tp++ : fp++; else row.anomaly ? fn++ : tn++; });
    return {rows, tp, fp, fn, tn, precision: tp + fp ? tp / (tp + fp) : null, recall: tp + fn ? tp / (tp + fn) : null};
  }
  const api = {sentiment, transactions, training, evaluation, fit, transactionScore, evaluate};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.PortfolioLab = api;
  if (typeof document === 'undefined') return;
  const reviewForm = document.getElementById('review-demo');
  if (reviewForm) {
    reviewForm.addEventListener('submit', event => {
      event.preventDefault();
      const text = document.getElementById('review-input').value.trim();
      const output = document.getElementById('review-output');
      output.replaceChildren();
      if (!text) { output.textContent = 'Add a review or load the sample first.'; return; }
      const reviews = text.split('\n').map(x => x.trim()).filter(Boolean).slice(0, 12);
      const summary = document.createElement('p');
      summary.className = 'lab-result-heading';
      summary.textContent = `${reviews.length} review${reviews.length === 1 ? '' : 's'} analyzed in your browser`;
      output.append(summary);
      reviews.forEach(text => {
        const result = sentiment(text), article = document.createElement('article');
        const label = document.createElement('strong'), quote = document.createElement('p'), why = document.createElement('p');
        label.textContent = result.label;
        quote.textContent = text;
        why.className = 'lab-note';
        why.textContent = `${result.positive} positive / ${result.negative} negative signals. ` + (result.matches.length ? 'Matched: ' + result.matches.map(m => `${m.word}${m.flipped ? ' (negated)' : ''}`).join(', ') : 'No lexicon matches; this does not establish neutral meaning.');
        article.append(label, quote, why); output.append(article);
      });
    });
    document.getElementById('review-sample').addEventListener('click', () => {
      document.getElementById('review-input').value = 'Friendly staff and delicious food.\nThe service was slow and the food was cold.\nNot good, but not terrible.\nGreat, another hour waiting.';
      reviewForm.requestSubmit();
    });
  }
  const slider = document.getElementById('risk-threshold');
  if (slider) {
    const percent = x => x === null ? 'N/A' : `${(x * 100).toFixed(1)}%`;
    function render() {
      const result = evaluate(Number(slider.value));
      document.getElementById('threshold-value').textContent = Number(slider.value).toFixed(1);
      for (const [id, value] of Object.entries({precision:percent(result.precision), recall:percent(result.recall), alerts:result.tp + result.fp, missed:result.fn})) document.getElementById(`risk-${id}`).textContent = value;
      document.getElementById('risk-summary').textContent = `${result.tp} synthetic anomalies flagged; ${result.fp} ordinary transactions flagged; ${result.fn} synthetic anomalies missed; ${result.tn} ordinary transactions cleared.`;
      const body = document.getElementById('risk-rows'); body.replaceChildren();
      result.rows.slice().sort((a,b) => b.score - a.score).slice(0,8).forEach(row => {
        const tr = document.createElement('tr');
        [row.id, row.amount.toLocaleString('en-US'), row.velocity, row.score.toFixed(2), row.flagged ? 'Review' : 'Below threshold', row.anomaly ? 'Synthetic anomaly' : 'Synthetic ordinary'].forEach(value => { const td = document.createElement('td'); td.textContent = value; tr.append(td); });
        body.append(tr);
      });
    }
    slider.addEventListener('input', render); render();
    document.getElementById('risk-export').addEventListener('click', () => {
      const result = evaluate(Number(slider.value));
      const csv = ['id,amount_lkr,transactions_last_hour,synthetic_anomaly,score,flagged', ...result.rows.map(r => [r.id,r.amount,r.velocity,r.anomaly,r.score.toFixed(5),r.flagged].join(','))].join('\n');
      const url = URL.createObjectURL(new Blob([csv], {type:'text/csv;charset=utf-8'}));
      const a = document.createElement('a'); a.href = url; a.download = 'synthetic-transaction-evaluation.csv'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
  }
})(typeof window !== 'undefined' ? window : globalThis);
