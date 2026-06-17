const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());

const SIGNWELL_API_KEY = process.env.SIGNWELL_API_KEY;
const SIGNWELL_TEMPLATE_ID = process.env.SIGNWELL_TEMPLATE_ID;

app.post('/send-contract', async (req, res) => {
  try {
    const {
      customerName, customerEmail, customerPhone,
      customerAddress, customerCity, customerState, customerZip,
      price, coSigner, cosignerName, cosignerPhone, cosignerEmail,
      financedOrCash, downPayment, finalPayment,
      bank, monthlyPayment, term, apr,
      rep, repEmail,
      roofingBrand, roofingColor,
      roofingSQ, roofingOSB, fasciaLinearFt, soffitLinearFt, sidingLinearFt
    } = req.body;

    const recipients = [
      { id: '1', name: customerName, email: customerEmail, placeholder_name: 'Customer' },
      { id: '2', name: rep, email: repEmail, placeholder_name: 'SalesRep' }
    ];

    if (coSigner === 'Yes' && cosignerEmail) {
      recipients.push({ id: '3', name: cosignerName || 'Co-Signer', email: cosignerEmail, placeholder_name: 'CoSigner' });
    }

    const fieldValues = [
      { api_id: 'CustomerName', value: customerName || '' },
      { api_id: 'CustomerEmail', value: customerEmail || '' },
      { api_id: 'CustomerPhone', value: customerPhone || '' },
      { api_id: 'CustomerAddress', value: customerAddress || '' },
      { api_id: 'CustomerCity', value: customerCity || '' },
      { api_id: 'CustomerState', value: customerState || '' },
      { api_id: 'CustomerZip', value: customerZip || '' },
      { api_id: 'Price', value: price || '' },
      { api_id: 'CoSigner', value: coSigner || 'No' },
      { api_id: 'CosignerName', value: cosignerName || '' },
      { api_id: 'CosignerPhone', value: cosignerPhone || '' },
      { api_id: 'CosignerEmail', value: cosignerEmail || '' },
      { api_id: 'FinancedOrCash', value: financedOrCash || '' },
      { api_id: 'DownPayment', value: downPayment || '' },
      { api_id: 'FinalPayment', value: finalPayment || '' },
      { api_id: 'Bank', value: bank || '' },
      { api_id: 'MonthlyPayment', value: monthlyPayment || '' },
      { api_id: 'Term', value: term || '' },
      { api_id: 'APR', value: apr || '' },
      { api_id: 'Rep', value: rep || '' },
      { api_id: 'RepName', value: rep || '' },
      { api_id: 'RepEmail', value: repEmail || '' },
      { api_id: 'RoofingBrand', value: roofingBrand || '' },
      { api_id: 'RoofingColor', value: roofingColor || '' },
      { api_id: 'RoofingSQ', value: roofingSQ || '' },
      { api_id: 'RoofingOSB', value: roofingOSB || '' },
      { api_id: 'FasciaLinearFt', value: fasciaLinearFt || '' },
      { api_id: 'SoffitLinearFt', value: soffitLinearFt || '' },
      { api_id: 'SidingLinearFt', value: sidingLinearFt || '' },
    ];

    const payload = {
      template_id: SIGNWELL_TEMPLATE_ID,
      recipients,
      field_values: fieldValues,
      name: `Roofing Contract — ${customerName}`,
      draft: false,
      send_email: true,
    };

    console.log('Sending to SignWell:', JSON.stringify(payload, null, 2));

    const response = await fetch('https://www.signwell.com/api/v1/document_templates/documents/', {
      method: 'POST',
      headers: { 'X-Api-Key': SIGNWELL_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log('SignWell response:', JSON.stringify(data, null, 2));

    if (!response.ok) return res.status(response.status).json({ error: data });
    return res.json({ success: true, documentId: data.id, status: data.status });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error: ' + err.message });
  }
});

app.get('/', (req, res) => res.json({ status: 'Hermun Enterprises Contract API running ✅' }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
