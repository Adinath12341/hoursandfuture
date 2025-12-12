import React from 'react';
import { Download, FileText, Calendar, List, ArrowRight } from 'lucide-react';

const resources = [
  { 
    icon: FileText,
    title: "Time Audit Worksheet", 
    desc: "Track every hour for 3 days to find where your time actually goes.",
    type: "PDF",
    id: "time-audit"
  },
  { 
    icon: Calendar,
    title: "Weekly Planning Template", 
    desc: "A clean, printable layout to block your time specifically for students.",
    type: "PDF",
    id: "weekly-plan"
  },
  { 
    icon: List,
    title: "Habit Tracker", 
    desc: "The 'Seinfeld Method' tracker to build streaks for reading and exercise.",
    type: "PDF",
    id: "habit-tracker"
  },
  { 
    icon: FileText,
    title: "Goal Setting Cheatsheet", 
    desc: "A quick companion guide to Chapter 3 for setting SMART goals.",
    type: "PDF",
    id: "goal-setting"
  }
];

const Resources: React.FC = () => {

  const handleDownload = (resourceId: string) => {
    // ... (Keep existing download logic exactly as is, just updating the UI part below)
    if (resourceId === 'time-audit') {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Time Audit Worksheet - Hours and Future</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background: #0a0a0a; color: #e0e0e0; line-height: 1.6; }
        .pdf-container { max-width: 8.5in; margin: 20px auto; background: #0f0f0f; padding: 40px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8); overflow: auto; }
        .header { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 30px; border-bottom: 2px solid #d4a574; padding-bottom: 20px; }
        .brand-section { display: flex; align-items: center; gap: 10px; padding-bottom: 12px; border-bottom: 1px solid #333333; margin-bottom: 15px; }
        .brand-icon { width: 45px; height: 45px; background: #1a1a1a; border: 2px solid #d4a574; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
        .brand-name { font-size: 14px; font-weight: 700; color: #d4a574; letter-spacing: 0.5px; }
        .header-text h1 { font-size: 28px; font-weight: 700; color: #ffffff; margin-bottom: 6px; }
        .header-text p { font-size: 13px; color: #a0a0a0; }
        .day-title { font-size: 16px; font-weight: 700; color: #d4a574; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
        th { background: #1a1a1a; color: #d4a574; font-size: 11px; font-weight: 600; text-align: left; padding: 8px; border: 1px solid #333; text-transform: uppercase; }
        td { background: #0f0f0f; color: #e0e0e0; font-size: 11px; padding: 10px 8px; border: 1px solid #333; }
        tr:nth-child(even) td { background: #141414; }
        .insights { background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 16px; margin-top: 20px; }
        .insights-title { font-size: 13px; font-weight: 700; color: #d4a574; margin-bottom: 12px; text-transform: uppercase; }
        .insight-label { color: #d4a574; font-weight: 600; margin-bottom: 3px; font-size: 11px; }
        .insight-space { background: #0f0f0f; border-bottom: 1px solid #333; height: 18px; margin-top: 3px; margin-bottom: 10px; }
        .button-section { display: flex; gap: 12px; margin: 30px 0; justify-content: center; }
        button { padding: 12px 24px; font-size: 14px; font-weight: 600; border: none; border-radius: 6px; cursor: pointer; text-transform: uppercase; }
        .btn-print { background: #d4a574; color: #0a0a0a; }
        @media print {
            body { background: white; -webkit-print-color-adjust: exact; }
            .pdf-container { margin: 0; padding: 0; box-shadow: none; background: white; width: 100%; max-width: 100%; }
            .button-section { display: none; }
            td, th, h1, p, .day-title, .insight-label { color: #000; }
            th { background: #eee; }
            td { background: #fff; border-color: #ccc; }
            tr:nth-child(even) td { background: #f9f9f9; }
            .insights { background: #fff; border-color: #ccc; }
            .header { border-bottom-color: #000; }
        }
    </style>
</head>
<body>
    <div class="button-section">
        <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
    </div>
    <div class="pdf-container">
        <div class="header">
            <div class="brand-section">
                <div class="brand-icon">⏳</div>
                <div class="brand-text"><span class="brand-name">Hours and Future</span></div>
            </div>
            <div class="header-text">
                <h1>Time Audit Worksheet</h1>
                <p>Track every hour for 3 days to find where your time actually goes.</p>
            </div>
        </div>
        ${[1, 2, 3].map(day => `
        <div class="day-section">
            <div class="day-title">Day ${day}</div>
            <table>
                <thead><tr><th width="20%">Time Block</th><th width="30%">Activity</th><th width="20%">Category</th><th width="30%">Notes</th></tr></thead>
                <tbody>
                    ${['6:00 AM','7:00 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM'].map(time => `
                    <tr><td>${time}</td><td></td><td></td><td></td></tr>
                    `).join('')}
                </tbody>
            </table>
        </div>`).join('')}
        <div class="insights">
            <div class="insights-title">🌟 Future-Focused Insights</div>
            <div class="insight-item"><div class="insight-label">1. Where did most of my time actually go?</div><div class="insight-space"></div></div>
            <div class="insight-item"><div class="insight-label">2. What time drains showed up repeatedly?</div><div class="insight-space"></div></div>
            <div class="insight-item"><div class="insight-label">3. When did I feel most focused?</div><div class="insight-space"></div></div>
            <div class="insight-item"><div class="insight-label">4. What will I change next week?</div><div class="insight-space"></div></div>
        </div>
    </div>
</body>
</html>
        `);
        printWindow.document.close();
      }
    } else if (resourceId === 'weekly-plan') {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weekly Planning Template - Hours and Future</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background: #0a0a0a; color: #e0e0e0; line-height: 1.6; }
        .pdf-container { max-width: 11in; margin: 20px auto; background: #0f0f0f; padding: 30px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8); overflow: auto; }
        .header { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 25px; border-bottom: 2px solid #d4a574; padding-bottom: 20px; }
        .brand-section { display: flex; align-items: center; gap: 10px; }
        .brand-icon { width: 45px; height: 45px; background: #1a1a1a; border: 2px solid #d4a574; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
        .brand-name { font-size: 12px; font-weight: 700; color: #d4a574; letter-spacing: 0.5px; }
        .header-text h1 { font-size: 24px; font-weight: 700; color: #ffffff; margin-bottom: 4px; }
        .header-text p { font-size: 12px; color: #a0a0a0; }
        .main-content { display: flex; gap: 20px; margin-bottom: 20px; }
        .weekly-grid { flex: 1; }
        .side-panel { width: 180px; display: flex; flex-direction: column; gap: 15px; }
        .week-table { width: 100%; border-collapse: collapse; background: #0f0f0f; border: 1px solid #d4a574; border-radius: 8px; overflow: hidden; }
        .week-table th { background: #1a1a1a; color: #d4a574; font-size: 11px; font-weight: 700; text-align: center; padding: 8px 6px; border: 1px solid #333333; text-transform: uppercase; letter-spacing: 0.3px; }
        .week-table td { background: #0f0f0f; color: #e0e0e0; font-size: 10px; padding: 6px 4px; border: 1px solid #333333; height: 50px; vertical-align: top; text-align: left; }
        .time-label { background: #1a1a1a; color: #d4a574; font-weight: 600; font-size: 10px; padding: 6px 8px; border-right: 1px solid #333333; min-width: 60px; text-align: center; }
        .week-table tr:nth-child(even) td { background: #141414; }
        .panel-section { background: #1a1a1a; border: 1px solid #333333; border-radius: 6px; padding: 12px; }
        .panel-title { font-size: 11px; font-weight: 700; color: #d4a574; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.3px; border-bottom: 1px solid #333333; padding-bottom: 6px; }
        .priority-item { background: #0f0f0f; border-bottom: 1px solid #333333; height: 18px; margin-bottom: 4px; }
        .habit-tracker { display: flex; gap: 3px; margin-bottom: 8px; }
        .habit-checkbox { width: 18px; height: 18px; background: #0f0f0f; border: 1px solid #333333; border-radius: 3px; cursor: pointer; }
        .habit-name { font-size: 9px; color: #a0a0a0; margin-bottom: 4px; }
        .deadline-item { background: #0f0f0f; border-bottom: 1px solid #333333; height: 16px; margin-bottom: 4px; }
        .review-section { background: #1a1a1a; border-top: 2px solid #d4a574; padding: 16px; margin-top: 20px; border-radius: 6px; }
        .review-title { font-size: 12px; font-weight: 700; color: #d4a574; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.3px; }
        .review-items { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .review-item { font-size: 10px; }
        .review-label { color: #d4a574; font-weight: 600; margin-bottom: 4px; }
        .review-space { background: #0f0f0f; border-bottom: 1px solid #333333; height: 20px; }
        .full-width { grid-column: 1 / -1; }
        .button-section { display: flex; gap: 12px; margin-top: 20px; justify-content: center; flex-wrap: wrap; }
        button { padding: 12px 24px; font-size: 14px; font-weight: 600; border: none; border-radius: 6px; cursor: pointer; transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 0.5px; }
        .btn-print { background: #d4a574; color: #0a0a0a; }
        @media print {
            body { background: white; -webkit-print-color-adjust: exact; }
            .pdf-container { max-width: 100%; margin: 0; padding: 15px; box-shadow: none; background: white; }
            .button-section { display: none; }
            .week-table td, .panel-section, .review-space, .priority-item, .deadline-item { background: white; color: #333; }
            .week-table th, .panel-title, .review-title, .review-label, .time-label { background: #e8e8e8; color: #333; }
            .week-table tr:nth-child(even) td { background: #f9f9f9; }
            h1, p, .brand-name { color: #333; }
            .header { border-bottom: 1px solid #999; }
            .week-table, .panel-section, .review-section { border-color: #999; }
        }
        @media screen and (max-width: 1024px) {
            .main-content { flex-direction: column; }
            .side-panel { width: 100%; flex-direction: row; gap: 15px; }
            .panel-section { flex: 1; }
        }
    </style>
</head>
<body>
    <div class="button-section">
        <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
    </div>
    <div class="pdf-container">
        <div class="header">
            <div class="brand-section"><div class="brand-icon">⏳</div><div class="brand-name">Hours and Future</div></div>
            <div class="header-text"><h1>Weekly Planning Template</h1><p>A clean, printable layout to block your time specifically for students.</p></div>
        </div>
        <div class="main-content">
            <div class="weekly-grid">
                <table class="week-table">
                    <thead><tr><th>Time</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr></thead>
                    <tbody>
                        ${['6-8 AM','8-10 AM','10 AM-12 PM','12-2 PM','2-4 PM','4-6 PM','6-8 PM','8-10 PM'].map(time => `
                        <tr><td class="time-label">${time}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div class="side-panel">
                <div class="panel-section">
                    <div class="panel-title">🎯 Top 3 Priorities</div>
                    <div class="priority-item"></div><div class="priority-item"></div><div class="priority-item"></div>
                </div>
                <div class="panel-section">
                    <div class="panel-title">✓ Habits to Track</div>
                    ${['Habit 1', 'Habit 2', 'Habit 3'].map(habit => `
                    <div class="habit-name">${habit}</div>
                    <div class="habit-tracker">${Array(7).fill('<div class="habit-checkbox"></div>').join('')}</div>
                    `).join('')}
                </div>
                <div class="panel-section">
                    <div class="panel-title">📝 Deadlines & Exams</div>
                    <div class="deadline-item"></div><div class="deadline-item"></div><div class="deadline-item"></div>
                </div>
            </div>
        </div>
        <div class="review-section">
            <div class="review-title">📊 Weekly Review</div>
            <div class="review-items">
                <div class="review-item"><div class="review-label">What worked well this week?</div><div class="review-space"></div></div>
                <div class="review-item"><div class="review-label">What didn't work?</div><div class="review-space"></div></div>
                <div class="review-item full-width"><div class="review-label">One change for next week:</div><div class="review-space"></div></div>
            </div>
        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf/0.10.1/html2pdf.bundle.min.js"></script>
    <script>
        function downloadPDF() {
            const element = document.getElementById('pdfContent');
            const opt = {
                margin: 0.4,
                filename: 'Weekly-Planning-Template-HoursAndFuture.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
            };
            html2pdf().set(opt).from(element).save();
        }
    </script>
</body>
</html>
            `);
            printWindow.document.close();
        }
    } else if (resourceId === 'habit-tracker') {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Habit Tracker - Hours and Future</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background: #0a0a0a; color: #e0e0e0; line-height: 1.6; }
        .pdf-container { max-width: 8.5in; margin: 20px auto; background: #0f0f0f; padding: 30px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8); overflow: auto; }
        .header { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 25px; border-bottom: 2px solid #d4a574; padding-bottom: 20px; }
        .brand-section { display: flex; align-items: center; gap: 10px; }
        .brand-icon { width: 45px; height: 45px; background: #1a1a1a; border: 2px solid #d4a574; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
        .brand-name { font-size: 12px; font-weight: 700; color: #d4a574; letter-spacing: 0.5px; }
        .header-text h1 { font-size: 24px; font-weight: 700; color: #ffffff; margin-bottom: 4px; }
        .header-text p { font-size: 12px; color: #a0a0a0; }
        .habit-row { margin-bottom: 20px; background: #1a1a1a; border: 1px solid #333333; border-radius: 6px; padding: 12px; }
        .habit-header { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
        .habit-label { font-size: 12px; font-weight: 700; color: #d4a574; text-transform: uppercase; letter-spacing: 0.3px; min-width: 80px; }
        .habit-input { background: #0f0f0f; border: 1px solid #333333; border-radius: 4px; padding: 6px 8px; color: #e0e0e0; font-size: 11px; flex: 1; max-width: 150px; }
        .day-labels { display: flex; gap: 4px; margin-bottom: 8px; font-size: 9px; color: #808080; font-weight: 600; }
        .day-label { width: 28px; text-align: center; }
        .checkbox-grid { display: flex; flex-wrap: wrap; gap: 4px; }
        .day-checkbox { width: 28px; height: 28px; background: #0f0f0f; border: 1px solid #333333; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #d4a574; transition: all 0.2s ease; user-select: none; }
        .day-checkbox:hover { background: #1a1a1a; border-color: #d4a574; }
        .day-checkbox.checked { background: #d4a574; color: #0a0a0a; border-color: #d4a574; }
        .progress-section { background: #1a1a1a; border-top: 2px solid #d4a574; padding: 16px; margin-top: 20px; border-radius: 6px; }
        .progress-title { font-size: 13px; font-weight: 700; color: #d4a574; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.3px; }
        .progress-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        .progress-item { font-size: 11px; }
        .progress-label { color: #d4a574; font-weight: 600; margin-bottom: 4px; }
        .progress-input { background: #0f0f0f; border: 1px solid #333333; border-radius: 4px; padding: 6px 8px; color: #e0e0e0; font-size: 11px; width: 100%; }
        .progress-full { grid-column: 1 / -1; }
        .reflection-space { background: #0f0f0f; border: 1px solid #333333; border-radius: 4px; padding: 8px; height: 60px; font-size: 11px; color: #e0e0e0; resize: vertical; font-family: inherit; }
        .button-section { display: flex; gap: 12px; margin-top: 20px; justify-content: center; flex-wrap: wrap; }
        button { padding: 12px 24px; font-size: 14px; font-weight: 600; border: none; border-radius: 6px; cursor: pointer; transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 0.5px; }
        .btn-print { background: #d4a574; color: #0a0a0a; }
        @media print {
            body { background: white; -webkit-print-color-adjust: exact; }
            .pdf-container { max-width: 100%; margin: 0; padding: 15px; box-shadow: none; background: white; }
            .button-section { display: none; }
            .habit-row, .progress-section { background: white; border-color: #999; }
            .day-checkbox, .progress-input, .reflection-space { background: white; border-color: #999; color: #333; }
            .day-checkbox.checked { background: #d4a574; color: white; }
            .habit-label, .progress-label, .progress-title { color: #333; }
            .header, h1, p, .brand-name { color: #333; }
            .brand-icon { border-color: #d4a574; }
        }
        @media screen and (max-width: 768px) {
            .pdf-container { max-width: 100%; padding: 15px; }
            .header-text h1 { font-size: 20px; }
            .day-checkbox { width: 24px; height: 24px; font-size: 12px; }
            .day-label { width: 24px; font-size: 8px; }
        }
    </style>
</head>
<body>
    <div class="button-section">
        <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
    </div>
    <div class="pdf-container" id="pdfContent">
        <div class="header">
            <div class="brand-section"><div class="brand-icon">⏳</div><div class="brand-name">Hours and Future</div></div>
            <div class="header-text"><h1>Habit Tracker</h1><p>The 'Seinfeld Method' tracker to build streaks for reading and exercise.</p></div>
        </div>
        <div class="habit-row">
            <div class="habit-header"><label class="habit-label">📖 Reading</label><input type="text" class="habit-input" placeholder="e.g., 30 min daily" value="Reading"></div>
            <div class="day-labels"><div class="day-label">M</div><div class="day-label">T</div><div class="day-label">W</div><div class="day-label">T</div><div class="day-label">F</div><div class="day-label">S</div><div class="day-label">S</div></div>
            <div class="checkbox-grid" id="habit1"></div>
        </div>
        <div class="habit-row">
            <div class="habit-header"><label class="habit-label">💪 Exercise</label><input type="text" class="habit-input" placeholder="e.g., 30 min daily" value="Exercise"></div>
            <div class="day-labels"><div class="day-label">M</div><div class="day-label">T</div><div class="day-label">W</div><div class="day-label">T</div><div class="day-label">F</div><div class="day-label">S</div><div class="day-label">S</div></div>
            <div class="checkbox-grid" id="habit2"></div>
        </div>
        <div class="habit-row">
            <div class="habit-header"><label class="habit-label">⭐ Custom</label><input type="text" class="habit-input" placeholder="Enter your habit here" value="Custom Habit"></div>
            <div class="day-labels"><div class="day-label">M</div><div class="day-label">T</div><div class="day-label">W</div><div class="day-label">T</div><div class="day-label">F</div><div class="day-label">S</div><div class="day-label">S</div></div>
            <div class="checkbox-grid" id="habit3"></div>
        </div>
        <div class="progress-section">
            <div class="progress-title">🎯 Motivation & Progress</div>
            <div class="progress-grid">
                <div class="progress-item"><div class="progress-label">Current Streak:</div><input type="text" class="progress-input" placeholder="___ days"></div>
                <div class="progress-item"><div class="progress-label">Goal Streak:</div><input type="text" class="progress-input" placeholder="___ days"></div>
                <div class="progress-item"><div class="progress-label">Best Streak This Month:</div><input type="text" class="progress-input" placeholder="___ days"></div>
                <div class="progress-item"><div class="progress-label">Monthly Average:</div><input type="text" class="progress-input" placeholder="___%"></div>
            </div>
            <div class="progress-item progress-full"><div class="progress-label">Notes & Reflections:</div><textarea class="reflection-space" placeholder="Write your thoughts, challenges, and wins..."></textarea></div>
        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf/0.10.1/html2pdf.bundle.min.js"></script>
    <script>
        function generateCheckboxes(habitId) {
            const grid = document.getElementById(habitId);
            for (let i = 1; i <= 35; i++) {
                const checkbox = document.createElement('div');
                checkbox.className = 'day-checkbox';
                checkbox.textContent = i;
                checkbox.onclick = function() { this.classList.toggle('checked'); };
                grid.appendChild(checkbox);
            }
        }
        generateCheckboxes('habit1');
        generateCheckboxes('habit2');
        generateCheckboxes('habit3');
        function downloadPDF() {
            const element = document.getElementById('pdfContent');
            const opt = { margin: 0.4, filename: 'Habit-Tracker-HoursAndFuture.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' } };
            html2pdf().set(opt).from(element).save();
        }
    </script>
</body>
</html>
            `);
            printWindow.document.close();
        }
    } else if (resourceId === 'goal-setting') {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Goal Setting Cheatsheet - Hours and Future</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background: #0a0a0a; color: #e0e0e0; line-height: 1.6; }
        .pdf-container { max-width: 8.5in; margin: 20px auto; background: #0f0f0f; padding: 25px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8); overflow: auto; }
        .header { display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px; border-bottom: 2px solid #d4a574; padding-bottom: 15px; }
        .brand-section { display: flex; align-items: center; gap: 8px; }
        .brand-icon { width: 40px; height: 40px; background: #1a1a1a; border: 2px solid #d4a574; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .brand-name { font-size: 11px; font-weight: 700; color: #d4a574; letter-spacing: 0.5px; }
        .header-text { flex: 1; }
        .header-text h1 { font-size: 20px; font-weight: 700; color: #ffffff; margin-bottom: 2px; }
        .header-text p { font-size: 11px; color: #a0a0a0; }
        .main-content { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px; }
        .smart-title { font-size: 12px; font-weight: 700; color: #d4a574; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.3px; }
        .smart-item { background: #1a1a1a; border-left: 3px solid #d4a574; padding: 8px; margin-bottom: 8px; border-radius: 4px; }
        .smart-letter { font-size: 13px; font-weight: 700; color: #d4a574; }
        .smart-text { font-size: 10px; color: #a0a0a0; margin-top: 2px; }
        .smart-space { background: #0f0f0f; border-bottom: 1px solid #333333; height: 18px; margin-top: 4px; border-radius: 2px; }
        .worksheet-title { font-size: 12px; font-weight: 700; color: #d4a574; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.3px; }
        .worksheet-item { margin-bottom: 8px; }
        .worksheet-label { font-size: 10px; font-weight: 600; color: #d4a574; margin-bottom: 3px; }
        .worksheet-input { background: #0f0f0f; border: 1px solid #333333; border-radius: 4px; padding: 6px 8px; color: #e0e0e0; font-size: 10px; width: 100%; height: 24px; resize: none; }
        .power-tips { background: #1a1a1a; border-top: 2px solid #d4a574; padding: 12px; margin-top: 15px; border-radius: 4px; }
        .tips-title { font-size: 11px; font-weight: 700; color: #d4a574; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.3px; }
        .tips-list { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .tip-item { font-size: 9px; color: #a0a0a0; display: flex; align-items: flex-start; gap: 4px; }
        .tip-bullet { color: #d4a574; font-weight: 700; flex-shrink: 0; }
        .button-section { display: flex; gap: 12px; margin-top: 20px; justify-content: center; flex-wrap: wrap; }
        button { padding: 10px 20px; font-size: 12px; font-weight: 600; border: none; border-radius: 6px; cursor: pointer; transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 0.4px; }
        .btn-print { background: #d4a574; color: #0a0a0a; }
        @media print {
            body { background: white; -webkit-print-color-adjust: exact; }
            .pdf-container { max-width: 100%; margin: 0; padding: 15px; box-shadow: none; background: white; height: auto; }
            .button-section { display: none; }
            .smart-item, .worksheet-input, .power-tips { background: white; border-color: #999; color: #333; }
            .smart-title, .worksheet-title, .tips-title, .worksheet-label, .smart-letter { color: #333; }
            .header, h1, p, .brand-name, .smart-text, .tip-item { color: #333; }
            .brand-icon { border-color: #d4a574; }
        }
        @media screen and (max-width: 768px) {
            .pdf-container { max-width: 100%; padding: 15px; }
            .main-content { grid-template-columns: 1fr; }
            .header-text h1 { font-size: 18px; }
            .tips-list { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="button-section">
        <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
    </div>
    <div class="pdf-container" id="pdfContent">
        <div class="header">
            <div class="brand-section"><div class="brand-icon">⏳</div><div class="brand-name">Hours and Future</div></div>
            <div class="header-text"><h1>Goal Setting Cheatsheet</h1><p>A quick companion guide to Chapter 3 for setting SMART goals.</p></div>
        </div>
        <div class="main-content">
            <div class="smart-section">
                <div class="smart-title">🎯 SMART Framework</div>
                <div class="smart-item"><div><span class="smart-letter">S</span> – Specific</div><div class="smart-text">What exactly do you want to achieve?</div><div class="smart-space"></div></div>
                <div class="smart-item"><div><span class="smart-letter">M</span> – Measurable</div><div class="smart-text">How will you measure progress?</div><div class="smart-space"></div></div>
                <div class="smart-item"><div><span class="smart-letter">A</span> – Achievable</div><div class="smart-text">Is it realistic and within reach?</div><div class="smart-space"></div></div>
                <div class="smart-item"><div><span class="smart-letter">R</span> – Relevant</div><div class="smart-text">Does it align with your vision?</div><div class="smart-space"></div></div>
                <div class="smart-item"><div><span class="smart-letter">T</span> – Time-bound</div><div class="smart-text">What's your deadline?</div><div class="smart-space"></div></div>
            </div>
            <div class="worksheet-section">
                <div class="worksheet-title">📝 Your Goal Worksheet</div>
                <div class="worksheet-item"><div class="worksheet-label">Goal Statement:</div><input type="text" class="worksheet-input" placeholder=""></div>
                <div class="worksheet-item"><div class="worksheet-label">Target Date:</div><input type="text" class="worksheet-input" placeholder=""></div>
                <div class="worksheet-item"><div class="worksheet-label">Measurable Milestone:</div><input type="text" class="worksheet-input" placeholder=""></div>
                <div class="worksheet-item"><div class="worksheet-label">Potential Obstacles:</div><input type="text" class="worksheet-input" placeholder=""></div>
                <div class="worksheet-item"><div class="worksheet-label">Support Resources:</div><input type="text" class="worksheet-input" placeholder=""></div>
            </div>
        </div>
        <div class="power-tips">
            <div class="tips-title">⚡ Power Tips for Success</div>
            <div class="tips-list">
                <div class="tip-item"><span class="tip-bullet">✓</span><span>Write your goals down—make them real</span></div>
                <div class="tip-item"><span class="tip-bullet">✓</span><span>Review your goals weekly</span></div>
                <div class="tip-item"><span class="tip-bullet">✓</span><span>Celebrate small wins along the way</span></div>
                <div class="tip-item"><span class="tip-bullet">✓</span><span>Adjust your goals when needed—stay flexible</span></div>
            </div>
        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf/0.10.1/html2pdf.bundle.min.js"></script>
    <script>
        function downloadPDF() {
            const element = document.getElementById('pdfContent');
            const opt = { margin: 0.4, filename: 'Goal-Setting-Cheatsheet-HoursAndFuture.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' } };
            html2pdf().set(opt).from(element).save();
        }
    </script>
</body>
</html>
            `);
            printWindow.document.close();
        }
    } else {
      alert("This resource is coming soon!");
    }
  };

  return (
    <div className="pt-32 min-h-screen bg-brand-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
           <div>
              <span className="text-brand-gold font-bold tracking-wide uppercase text-sm mb-2 block">Free Tools</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Resource Library</h1>
           </div>
           <p className="text-brand-muted max-w-md text-lg">
             Practical tools available for free to help you start owning your hours immediately.
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {resources.map((res, i) => (
            <div key={i} className="bg-[#0A0A0A] border border-white/5 rounded-[1.5rem] p-8 hover:border-brand-gold/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-brand-surfaceHighlight border border-white/5 flex items-center justify-center mb-6 text-white group-hover:bg-brand-gold group-hover:text-black transition-all">
                <res.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{res.title}</h3>
              <p className="text-sm text-brand-muted mb-8 leading-relaxed">{res.desc}</p>
              <button 
                onClick={() => handleDownload(res.id)}
                className="w-full flex items-center justify-center gap-2 border border-white/10 bg-white/5 text-white font-medium py-3 rounded-xl hover:bg-brand-gold hover:text-brand-black hover:border-transparent transition-all duration-300"
              >
                <Download size={18} /> Download {res.type}
              </button>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Resources;