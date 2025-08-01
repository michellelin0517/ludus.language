function doPost(e) {
  var sheet = SpreadsheetApp.openById("1GUWAT03FrQiigVQ0VLztHDC3NhpjIc5AQxQvgMijWOU").getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([data.language, new Date()]);
  return ContentService.createTextOutput("Success");
}

function doGet(e) {
  if (e.parameter.action === "getLanguages") {
    var sheet = SpreadsheetApp.openById("1GUWAT03FrQiigVQ0VLztHDC3NhpjIc5AQxQvgMijWOU").getActiveSheet();
    var data = sheet.getDataRange().getValues();
    
    // Count occurrences of each language
    var languageCounts = {};
    for (var i = 0; i < data.length; i++) {
      var language = data[i][0];
      if (language && language !== "Language") { // Skip header
        languageCounts[language] = (languageCounts[language] || 0) + 1;
      }
    }
    
    // Convert to array and sort by count
    var languageArray = [];
    for (var lang in languageCounts) {
      languageArray.push({name: lang, count: languageCounts[lang]});
    }
    languageArray.sort(function(a, b) { return b.count - a.count; });
    
    return ContentService.createTextOutput(JSON.stringify(languageArray))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput("API is working");
}