# Ludus Language Waitlist Setup

## Setting up Google Sheets Integration

To connect your waitlist form to Google Sheets:

1. **Open your Google Sheet**
   - Go to: https://docs.google.com/spreadsheets/d/1hbpukAZfOqf5P_Ihg9MQ3ny5m9nTTeubDn3IjqwdQvo/edit

2. **Create Google Apps Script**
   - In your Google Sheet, go to `Extensions > Apps Script`
   - Delete any existing code
   - Copy all the code from `google-apps-script.js` and paste it

3. **Deploy the Web App**
   - Click `Deploy > New Deployment`
   - Choose "Web app" as the type
   - Configure:
     - Description: "Ludus Waitlist API"
     - Execute as: "Me"
     - Who has access: "Anyone"
   - Click "Deploy"

4. **Copy the Web App URL**
   - After deployment, you'll get a URL like:
     `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`
   - Copy this URL

5. **Update script.js**
   - Open `script.js`
   - Find the line: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';`
   - Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL` with your actual Web App URL

## Testing

1. Open `index.html` in a web browser
2. Fill out the form with test data
3. Submit the form
4. Check your Google Sheet - the data should appear automatically

## Troubleshooting

- If data isn't appearing, check the browser console for errors
- Make sure the Google Apps Script is deployed as a Web App
- Ensure "Who has access" is set to "Anyone"
- The spreadsheet ID in the Apps Script must match your sheet