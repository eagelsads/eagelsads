function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var name = data.name;
    var email = data.email;
    var company = data.company;
    var phone = data.phone;
    var message = data.message;

    // 1️⃣ Save to Sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    sheet.appendRow([new Date(), name, email, company, message]);

    // 2️⃣ Send Email
    MailApp.sendEmail({
      to: "integration@eagelsads.com", // mail where you want to receive the inquiries
      subject: "New Contact Form Submission",
      body:
        "You got a new inquiry:\n\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Company: " + company + "\n" +
        "Message: " + message
    });

    return ContentService.createTextOutput("Success");
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err.message);
  }
}
