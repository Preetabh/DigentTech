const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Generate hrmitra-mobile-app.png (Mobile Workforce App)
  {
    const page = await browser.newPage({ viewport: { width: 440, height: 950 }, deviceScaleFactor: 2 });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;700;800&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'DM Sans', sans-serif;
            background: #090c13;
            color: #edf0f6;
            padding: 24px 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            height: 100vh;
            overflow: hidden;
          }
          .status-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 13px;
            color: #929cae;
            padding-bottom: 12px;
          }
          .app-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px;
          }
          .app-header h1 {
            font-family: 'Manrope', sans-serif;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.5px;
          }
          .avatar {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: linear-gradient(135deg, #2563eb, #38bdf8);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
          }
          .stat-card {
            background: #121622;
            border: 1px solid #252c3d;
            border-radius: 16px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          }
          .stat-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 11px;
            color: #929cae;
            letter-spacing: 0.5px;
          }
          .stat-val {
            font-family: 'Manrope', sans-serif;
            font-size: 34px;
            font-weight: 800;
            color: #38bdf8;
            letter-spacing: -1px;
          }
          .progress-bar {
            height: 8px;
            background: #1e2638;
            border-radius: 4px;
            overflow: hidden;
          }
          .progress-fill {
            height: 100%;
            width: 84%;
            background: linear-gradient(90deg, #2563eb, #38bdf8);
            border-radius: 4px;
          }
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: 600;
            background: rgba(16, 185, 129, 0.15);
            color: #10b981;
            border: 1px solid rgba(16, 185, 129, 0.3);
            width: fit-content;
          }
          .task-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .task-card {
            background: #10141e;
            border: 1px solid #1f2535;
            border-radius: 12px;
            padding: 14px 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .task-title {
            font-weight: 600;
            font-size: 13px;
          }
          .task-sub {
            font-size: 10px;
            color: #929cae;
            margin-top: 2px;
          }
          .bottom-bar {
            margin-top: auto;
            background: #141824;
            border: 1px solid #232b3e;
            border-radius: 24px;
            padding: 12px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 11px;
            color: #929cae;
          }
          .active-nav {
            color: #38bdf8;
            font-weight: 700;
          }
        </style>
      </head>
      <body>
        <div class="status-bar">
          <span>9:41</span>
          <span>5G · 100%</span>
        </div>
        <div class="app-header">
          <div>
            <div style="font-size: 10px; color: #929cae; letter-spacing: 1px;">WORKFORCE PORTAL</div>
            <h1>Good morning, Alex</h1>
          </div>
          <div class="avatar">AM</div>
        </div>
        <div class="stat-card">
          <div class="stat-top">
            <span>TODAY'S SHIFT SUMMARY</span>
            <span class="badge">● VERIFIED IN</span>
          </div>
          <div class="stat-val">7h 42m</div>
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; color: #929cae;">
            <span>Check-in: 08:30 AM</span>
            <span>Target: 8h 00m</span>
          </div>
        </div>
        <div style="font-size: 11px; color: #929cae; letter-spacing: 1px; margin-top: 4px;">ACTIVE WORKFLOWS</div>
        <div class="task-list">
          <div class="task-card">
            <div>
              <div class="task-title">Biometric Attendance Punch</div>
              <div class="task-sub">Face ID Verified · Geofenced Office</div>
            </div>
            <span style="color: #10b981; font-size: 14px; font-weight: bold;">✓</span>
          </div>
          <div class="task-card">
            <div>
              <div class="task-title">Leave Request #LR-892</div>
              <div class="task-sub">Annual Leave · 3 Days · Approved</div>
            </div>
            <span style="color: #38bdf8; font-size: 11px; font-weight: 600;">APPROVED</span>
          </div>
          <div class="task-card">
            <div>
              <div class="task-title">Monthly Payroll Ledger</div>
              <div class="task-sub">Generated & Synced · 18ms</div>
            </div>
            <span style="color: #929cae; font-size: 11px;">SYNCED</span>
          </div>
        </div>
        <div class="bottom-bar">
          <span class="active-nav">● Attendance</span>
          <span>Tasks</span>
          <span>Schedule</span>
          <span>Profile</span>
        </div>
      </body>
      </html>
    `);
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'public/assets/projects/hrmitra-mobile-app.png' });
    console.log('Created: public/assets/projects/hrmitra-mobile-app.png');
    await page.close();
  }

  // 2. Generate infrapilot-mobile-app.png (Site Inspector Mobile App)
  {
    const page = await browser.newPage({ viewport: { width: 440, height: 950 }, deviceScaleFactor: 2 });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;700;800&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'DM Sans', sans-serif;
            background: #080b11;
            color: #edf0f6;
            padding: 24px 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            height: 100vh;
            overflow: hidden;
          }
          .status-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 13px;
            color: #929cae;
            padding-bottom: 12px;
          }
          .site-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .site-header h1 {
            font-family: 'Manrope', sans-serif;
            font-size: 22px;
            font-weight: 800;
          }
          .blueprint-card {
            background: #0f1420;
            border: 1px solid #232c40;
            border-radius: 16px;
            height: 230px;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 16px;
            background-image: radial-gradient(#2563eb 1px, transparent 1px);
            background-size: 16px 16px;
          }
          .blueprint-badge {
            background: rgba(8, 11, 17, 0.85);
            backdrop-filter: blur(8px);
            border: 1px solid #374151;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: 700;
            color: #38bdf8;
            width: fit-content;
          }
          .pin {
            position: absolute;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #ef4444;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 11px;
            box-shadow: 0 0 16px rgba(239, 68, 68, 0.6);
          }
          .pin-1 { top: 75px; left: 110px; }
          .pin-2 { top: 130px; right: 90px; background: #f59e0b; box-shadow: 0 0 16px rgba(245, 158, 11, 0.6); }
          .metrics-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          .metric-box {
            background: #111624;
            border: 1px solid #222b3d;
            border-radius: 12px;
            padding: 14px;
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .metric-title { font-size: 10px; color: #929cae; letter-spacing: 0.5px; }
          .metric-val { font-family: 'Manrope', sans-serif; font-size: 22px; font-weight: 800; color: #edf0f6; }
          .punch-item {
            background: #10141e;
            border: 1px solid #1f2535;
            border-radius: 12px;
            padding: 13px 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .bottom-bar {
            margin-top: auto;
            background: #141824;
            border: 1px solid #232b3e;
            border-radius: 24px;
            padding: 12px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 11px;
            color: #929cae;
          }
        </style>
      </head>
      <body>
        <div class="status-bar">
          <span>9:41</span>
          <span>GPS Active · 100%</span>
        </div>
        <div class="site-header">
          <div>
            <div style="font-size: 10px; color: #929cae; letter-spacing: 1px;">SITE INSPECTOR</div>
            <h1>Tower 4 · Level 18</h1>
          </div>
          <span style="font-size: 11px; color: #10b981; font-weight: 700;">● LIVE SYNC</span>
        </div>
        <div class="blueprint-card">
          <div class="blueprint-badge">CAD BLUEPRINT / OVERLAY</div>
          <div class="pin pin-1">1</div>
          <div class="pin pin-2">2</div>
          <div style="font-size: 10px; color: #929cae; background: rgba(8,11,17,0.8); padding: 4px 10px; border-radius: 6px; width: fit-content;">
            2 Open Punch Items in Sector B
          </div>
        </div>
        <div class="metrics-grid">
          <div class="metric-box">
            <span class="metric-title">COMPLETED DEFECTS</span>
            <span class="metric-val" style="color: #10b981;">94.2%</span>
          </div>
          <div class="metric-box">
            <span class="metric-title">OPEN PUNCH LIST</span>
            <span class="metric-val" style="color: #f59e0b;">6 items</span>
          </div>
        </div>
        <div style="font-size: 11px; color: #929cae; letter-spacing: 1px; margin-top: 4px;">ACTIVE DEFECT TICKETS</div>
        <div class="punch-item">
          <div>
            <div style="font-weight: 600; font-size: 12px;">HVAC Conduit Clearance #412</div>
            <div style="font-size: 10px; color: #929cae;">Photo Annotated · Contractor Notified</div>
          </div>
          <span style="color: #ef4444; font-size: 10px; font-weight: bold; background: rgba(239,68,68,0.1); padding: 3px 8px; border-radius: 4px;">CRITICAL</span>
        </div>
        <div class="bottom-bar">
          <span style="color: #38bdf8; font-weight: bold;">● Blueprint</span>
          <span>Camera</span>
          <span>Punch List</span>
          <span>Reports</span>
        </div>
      </body>
      </html>
    `);
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'public/assets/projects/infrapilot-mobile-app.png' });
    console.log('Created: public/assets/projects/infrapilot-mobile-app.png');
    await page.close();
  }

  // 3. Generate novacommerce-web-portal.png (High-End E-Commerce Platform)
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 760 }, deviceScaleFactor: 2 });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;700;800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'DM Sans', sans-serif;
            background: #090c13;
            color: #edf0f6;
            padding: 30px 40px;
            display: flex;
            flex-direction: column;
            gap: 28px;
            height: 100vh;
            overflow: hidden;
          }
          .browser-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #222b3e;
            padding-bottom: 18px;
          }
          .brand {
            font-family: 'Manrope', sans-serif;
            font-size: 20px;
            font-weight: 800;
            letter-spacing: 1px;
          }
          .nav-links {
            display: flex;
            gap: 28px;
            font-size: 13px;
            color: #929cae;
          }
          .bag-pill {
            background: #2563eb;
            color: white;
            padding: 7px 18px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
          }
          .hero-split {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: 40px;
            align-items: center;
            margin-top: 10px;
          }
          .hero-split h1 {
            font-family: 'Manrope', sans-serif;
            font-size: 46px;
            line-height: 1.1;
            letter-spacing: -1.5px;
            font-weight: 700;
          }
          .hero-split h1 em {
            font-family: 'Instrument Serif', serif;
            color: #60a5fa;
            font-style: italic;
          }
          .hero-split p {
            font-size: 14px;
            color: #929cae;
            margin-top: 14px;
            line-height: 1.7;
            max-width: 480px;
          }
          .product-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
          .product-card {
            background: #111624;
            border: 1px solid #222b3d;
            border-radius: 12px;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .product-img {
            height: 140px;
            border-radius: 8px;
            background: linear-gradient(135deg, #1e2638, #2a3650);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
          }
          .product-title {
            font-weight: 600;
            font-size: 14px;
          }
          .product-price {
            color: #38bdf8;
            font-weight: 700;
            font-size: 14px;
          }
          .metrics-tag {
            background: rgba(37, 99, 235, 0.15);
            border: 1px solid rgba(37, 99, 235, 0.3);
            color: #60a5fa;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: 700;
            width: fit-content;
          }
        </style>
      </head>
      <body>
        <div class="browser-nav">
          <div class="brand">NOVA / COMMERCE</div>
          <div class="nav-links">
            <span style="color: #fff;">Featured</span>
            <span>Collections</span>
            <span>Speed Engine</span>
            <span>Global Edge</span>
          </div>
          <div class="bag-pill">Checkout (2 items) →</div>
        </div>
        <div class="hero-split">
          <div>
            <div class="metrics-tag">SUB-SECOND CHECKOUT ENGINE</div>
            <h1>Bespoke retail, engineered for <em>conversion.</em></h1>
            <p>Next-gen headless storefront running on Cloudflare Workers edge nodes. 0.4s page switches, global multi-currency checkout, and 99.99% holiday uptime.</p>
          </div>
          <div class="product-grid">
            <div class="product-card">
              <div class="product-img">👟</div>
              <div class="product-title">Carbon Pulse 01</div>
              <div class="product-price">$285 USD</div>
            </div>
            <div class="product-card">
              <div class="product-img">⌚</div>
              <div class="product-title">Chrono Horizon</div>
              <div class="product-price">$540 USD</div>
            </div>
            <div class="product-card">
              <div class="product-img">🎧</div>
              <div class="product-title">Spatial Studio II</div>
              <div class="product-price">$399 USD</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'public/assets/projects/novacommerce-web-portal.png' });
    console.log('Created: public/assets/projects/novacommerce-web-portal.png');
    await page.close();
  }

  await browser.close();
  console.log('ALL HIGH-RES ASSETS CREATED SUCCESSFULLY');
})();
