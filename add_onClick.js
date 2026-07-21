const fs = require('fs');
const path = require('path');

const files = [
  'src/components/dashboard/B2BDashboardClient.tsx',
  'src/components/dashboard/transactions/RfqDashboardClient.tsx',
  'src/components/dashboard/transactions/RfqFormClient.tsx',
  'src/components/dashboard/invoices/B2BInvoicesClient.tsx',
  'src/components/dashboard/production/ProductionDashboardClient.tsx',
  'src/components/dashboard/quality/QualityDashboardClient.tsx'
];

files.forEach(file => {
  const filepath = path.join(__dirname, file);
  if (!fs.existsSync(filepath)) return;
  
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Replace <button ...> with <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} ...>
  content = content.replace(/<button([^>]*?)>/g, (match, p1) => {
    if (p1.includes('onClick') || p1.includes('type="submit"') || p1.includes('disabled')) {
      return match;
    }
    return `<button onClick={() => alert('Fitur ini sedang dalam pengembangan')}${p1}>`;
  });
  
  fs.writeFileSync(filepath, content, 'utf8');
});

console.log('Done!');
