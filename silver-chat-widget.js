// Silver Agent Chat Widget
(function() {
  // Create styles
  const styles = `
    .sac-bubble{position:fixed;bottom:24px;right:24px;width:56px;height:56px;background:#2D1BE8;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 24px rgba(45,27,232,.45);z-index:9999;font-size:24px;border:none;transition:transform .2s}
    .sac-bubble:hover{transform:scale(1.1)}
    .sac-badge{position:absolute;top:-2px;right:-2px;background:#ef4444;color:#fff;border-radius:50%;width:18px;height:18px;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid #fff}
    .sac-window{position:fixed;bottom:90px;right:24px;width:340px;background:#fff;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.15);z-index:9999;font-family:-apple-system,sans-serif;display:none;flex-direction:column;max-height:500px}
    .sac-window.open{display:flex}
    .sac-header{background:#2D1BE8;padding:16px;border-radius:16px 16px 0 0;display:flex;align-items:center;gap:10px}
    .sac-av{width:36px;height:36px;background:rgba(255,255,255,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px}
    .sac-hinfo strong{color:#fff;display:block;font-size:14px}
    .sac-hinfo span{color:rgba(255,255,255,.7);font-size:12px}
    .sac-close{margin-left:auto;background:none;border:none;color:rgba(255,255,255,.7);font-size:18px;cursor:pointer}
    .sac-messages{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;min-height:200px}
    .sac-msg{max-width:85%;padding:10px 13px;border-radius:14px;font-size:13px;line-height:1.5}
    .sac-msg.bot{background:#f5f5f5;align-self:flex-start;border-bottom-left-radius:3px;color:#333}
    .sac-msg.user{background:#2D1BE8;color:#fff;align-self:flex-end;border-bottom-right-radius:3px}
    .sac-typing{display:none;align-items:center;gap:4px;padding:10px 14px;background:#f5f5f5;border-radius:14px;width:60px;align-self:flex-start}
    .sac-typing span{width:6px;height:6px;background:#999;border-radius:50%;animation:sacBounce .8s infinite}
    .sac-typing span:nth-child(2){animation-delay:.15s}
    .sac-typing span:nth-child(3){animation-delay:.3s}
    @keyframes sacBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
    .sac-footer{padding:10px;border-top:1px solid #eee;display:flex;gap:8px}
    .sac-input{flex:1;padding:9px 14px;border:1.5px solid #eee;border-radius:20px;font-size:13px;outline:none;font-family:inherit}
    .sac-input:focus{border-color:#2D1BE8}
    .sac-send{width:36px;height:36px;background:#2D1BE8;color:#fff;border:none;border-radius:50%;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center}
  `;

  // Create HTML
  const html = `
    <div id="sacBubble" class="sac-bubble" onclick="sacToggle()">
      💬
      <div class="sac-badge">1</div>
    </div>

    <div id="sacWindow" class="sac-window">
      <div class="sac-header">
        <div class="sac-av">Ag</div>
        <div class="sac-hinfo">
          <strong>Silver Price Assistant</strong>
          <span>🟢 Online · Instant replies</span>
        </div>
        <button class="sac-close" onclick="sacToggle()">✕</button>
      </div>
      <div class="sac-messages" id="sacMessages">
        <div class="sac-msg bot">👋 Hi! I can calculate the value of your silver in real time. Do you have jewelry, coins, or silverware you'd like to value?</div>
      </div>
      <div class="sac-typing" id="sacTyping">
        <span></span><span></span><span></span>
      </div>
      <div class="sac-footer">
        <input type="text" class="sac-input" id="sacInput" placeholder="Type a message..." onkeydown="if(event.key==='Enter')sacSend()"/>
        <button class="sac-send" onclick="sacSend()">→</button>
      </div>
    </div>
  `;

  // Initialize when DOM is ready
  function init() {
    // Add styles
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    // Add HTML
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);

    // Setup variables
    window.sacSessionId = 'session_' + Math.random().toString(36).substr(2,9);
    window.sacOpen = false;
  }

  // Functions
  window.sacToggle = function() {
    window.sacOpen = !window.sacOpen;
    const sacWindow = document.getElementById('sacWindow');
    if (window.sacOpen) {
      sacWindow.classList.add('open');
    } else {
      sacWindow.classList.remove('open');
    }
    const badge = document.querySelector('.sac-badge');
    if (badge) badge.style.display = 'none';
  };

  window.sacAddMessage = function(text, type) {
    const msgs = document.getElementById('sacMessages');
    const div = document.createElement('div');
    div.className = 'sac-msg ' + type;
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  };

  window.sacSend = async function() {
    const input = document.getElementById('sacInput');
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    window.sacAddMessage(msg, 'user');
    document.getElementById('sacTyping').style.display = 'flex';
    document.getElementById('sacMessages').scrollTop = 999999;

    try {
      const response = await fetch('https://scrapsilvercalculator.app.n8n.cloud/webhook/silver-agent', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          message: msg,
          sessionId: window.sacSessionId
        })
      });
      const data = await response.json();
      document.getElementById('sacTyping').style.display = 'none';
      window.sacAddMessage(data.reply, 'bot');
      
      if (data.leadCaptured) {
        setTimeout(() => {
          window.sacAddMessage('📧 Check your inbox — your report is on its way!', 'bot');
        }, 1000);
      }
    } catch (err) {
      document.getElementById('sacTyping').style.display = 'none';
      window.sacAddMessage('Sorry, I had a connection issue. Please try again!', 'bot');
    }
  };

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
