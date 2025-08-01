// This code goes in your Google Apps Script (not in your website)
// To set this up:
// 1. Open your Google Sheet
// 2. Go to Extensions > Apps Script
// 3. Delete any existing code and paste this
// 4. Click Deploy > New Deployment
// 5. Choose "Web app" as the type
// 6. Set "Execute as" to "Me"
// 7. Set "Who has access" to "Anyone"
// 8. Deploy and copy the Web App URL
// 9. Replace YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL in script.js with this URL

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet by ID (from your URL)
    const sheet = SpreadsheetApp.openById('1hbpukAZfOqf5P_Ihg9MQ3ny5m9nTTeubDn3IjqwdQvo').getActiveSheet();
    
    // Add headers if this is the first entry
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Name', 'Email', 'Timestamp']);
    }
    
    // Append the new data
    sheet.appendRow([data.name, data.email, data.timestamp]);
    
    // Return success
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Also handle GET requests (for testing)
function doGet() {
  return ContentService
    .createTextOutput('Ludus Language Waitlist API is running!')
    .setMimeType(ContentService.MimeType.TEXT);
}