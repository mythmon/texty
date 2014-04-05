function creator() {
  var textEl = viewer({text: '...'});
  textEl.contentEditable = true;
  textEl.style.border = '1px solid black';
  textEl.addEventListener('input', function() {
    resizeText();
    var query = getQueryObj();
    query.text = prepareText(textEl.innerHTML);
    setQueryObj(query);
  });
}

function prepareText(text) {
  text = text.replace(/&lt;(.*?)&gt;/g, '<$1>');
  text = encodeURIComponent(text);
  return text;
}

function viewer(opts) {
  var text = decodeURIComponent(opts.text);
  text = text.replace('\n', '<br>');
  var textEl = document.createElement('div');
  textEl.classList.add('text');
  textEl.innerHTML = text;
  document.body.appendChild(textEl);
  window.addEventListener('resize', resizeText);
  resizeText();
  return textEl;
}

function resizeText() {
  var text = document.querySelector('.text');
  var convergenceSpeed = 0.9;
  // This will certainly be too big;
  text.style.fontSize = '100vmax';

  var targetHeight = window.innerHeight;
  var targetWidth = window.innerWidth;
  var fontSize = 100;
  text.style.fontSize = fontSize + 'vmax';

  // Make text incrementally smaller until it fits.
  while (text.offsetWidth > targetWidth || text.offsetHeight > targetHeight) {
    fontSize *= convergenceSpeed;
    text.style.fontSize = fontSize + 'vmax';
  }

  text.style.left = ((window.innerWidth - text.offsetWidth) / 2) + 'px';
}


function main() {
  var query = getQueryObj();
  if (query.text) {
    viewer(query);
  } else {
    creator();
  }
}

function getQueryObj() {
  var ret = {};
  var qs = window.location.search;
  if (qs[0] === '?') {
    qs = qs.slice(1);
  }
  var parts = qs.split('&');
  parts.forEach(function (part) {
    var split = part.split('=');
    var key = split[0];
    var val = split.slice(1).join('=');
    ret[key] = val;
  });
  return ret;
}

function setQueryObj(obj) {
  var qs = '?';
  for (var key in obj) {
    if (key) {
      qs += key + '=' + obj[key] + '&';
    }
  }
  var url = window.location.origin + window.location.pathname + qs.slice(0, -1) + window.location.hash;
  history.replaceState({}, "", url);
}

main();
