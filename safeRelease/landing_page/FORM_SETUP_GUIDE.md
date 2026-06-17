# Google Apps Script Setup Guide
## Send Form Submissions to support@shichrurim.com

Follow these steps to set up the email integration:

### Step 1: Create Google Apps Script

1. Go to https://script.google.com
2. Click **"New Project"**
3. Delete any existing code
4. Paste this code:

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Email configuration
    const recipient = "support@shichrurim.com";
    const subject = "בקשת יצירת קשר חדשה מאתר ניהול שחרורים - " + data.schoolName;

    // Create email body in Hebrew
    const emailBody = `
קיבלת בקשת יצירת קשר חדשה מאתר ניהול השחרורים:

שם מלא: ${data.fullName}
אימייל: ${data.email}
טלפון: ${data.phone}
שם בית הספר: ${data.schoolName}

הודעה:
${data.message}

---
נשלח בתאריך: ${new Date().toLocaleString('he-IL')}
    `;

    // Send the email
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      body: emailBody
    });

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "Email sent successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 2: Deploy the Script

1. Click **"Deploy"** → **"New deployment"**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **"Web app"**
4. Configure:
   - **Description**: "Contact Form Handler"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
5. Click **"Deploy"**
6. **IMPORTANT**: Copy the **Web app URL** - it will look like:
   `https://script.google.com/macros/s/AKfycby.../exec`


'Deployment ID
AKfycbxkQjdhRnbNhaona4XSn4YK2DU8t2VAYGSY-PcL1C4Rd5ApXUAs-65K-gbCft18e5jJ'
### Step 3: Update Your Website

1. Open the file: `js/main.js`
2. Find the line that says: `const SCRIPT_URL = 'PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE';`
3. Replace `'PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE'` with your actual URL from Step 2
4. Save the file

### Step 4: Test

1. Open your website in a browser
2. Fill out the contact form
3. Click "שלח" (Send)
4. Check support@shichrurim.com for the email

### Troubleshooting

**If emails don't arrive:**
- Check spam folder
- Verify the script URL is correct
- Check Google Apps Script execution logs: https://script.google.com → Your Project → Executions
- Make sure you clicked "Deploy" (not just saved the script)

**If you get CORS errors:**
- Make sure you set "Who has access" to "Anyone" in deployment settings
- Try redeploying with a new version

### Need to Update the Script?

1. Make changes in the Apps Script editor
2. Click **"Deploy"** → **"Manage deployments"**
3. Click the pencil icon ✏️ to edit
4. Change version to **"New version"**
5. Click **"Deploy"**
6. The URL stays the same - no need to update your website

---

## Alternative: Manual Testing

Before deploying, you can test the script:
1. In Apps Script editor, add this test function:

```javascript
function testEmail() {
  const testData = {
    fullName: "ישראל ישראלי",
    email: "test@example.com",
    phone: "050-1234567",
    schoolName: "בית ספר לדוגמה",
    message: "זו הודעת בדיקה"
  };

  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(e);
  Logger.log(result.getContent());
}
```

2. Select `testEmail` from the function dropdown
3. Click Run ▶️
4. Check support@shichrurim.com for the test email
