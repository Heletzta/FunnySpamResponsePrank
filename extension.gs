//thread2 = GmailApp.getMessagesForThread()
//messages = Gmail.Users.Messages.get('me');

function spamResponseMaker() {
  //go to the spam folder
  try {
    //-------------------------------------------------------------------------------------------------------
    const person = Gmail.Users.Labels.list('me');
    console.log(person.labels[6]);

    //Gets spam folder information
    spamStats = Gmail.Users.Labels.get('me', 'SPAM');
    console.log(spamStats);
    //The argument for the thread, so that it comes from the SPAM folder
    var arg = {
      labelIds : ['SPAM'],
    };
    //makes a list of all of the threads in the SPAM folder
    thread = Gmail.Users.Threads.list('me',arg).threads;

    //Gets the ID of the specific email thread that you want to respond to
    /*var textInput = CardService.newTextInput()
    .setFieldName("text_input_form_input_key")
    .setTitle("Which email do you want to reply to?")
    .setHint("Input a number, 1 being the top email, and " + String.toString(spamStats['messagesTotal']-1) + "as the bottom one.");
    */
    //input = HtmlService.createHtmlOutputFromFile('index');
    //processForm(input);
    

    //calls the function to make the response and return it!
    // Makes it into a draft email to send!
    //Takes in the thread id of the email that is being responded to, and the generated reply message
    //response = spamResponse(id, reply);

//-------------------------------------------------------------------------------------------------------
    
    
    //var buttonSet = CardService.newButtonSet();
    //buttonSet.addButton(sendSpamButton);
    //var action = CardService.newAction().setFunctionName('spamResponse');
    //var buttonForMessage = CardService.newTextButton().setText('Generate Funny Response!').setOnClickAction(action);
    

    /*var cardSection = CardService.newCardSection()
        .setHeader("Section header")
        .addWidget(buttonForMessage)
        .addWidget(textInput);*/
    

    
    id = thread[0]['id'];

    //Makes up the reply -- should incorporate the LLM to come up with a funny response!
    reply = "Test message omg!!!"

    
    
    
    



  } catch (err) {
    console.log('API failed with error %s', err.toString());
  }
}

function processForm(input) {
  console.log(input);
  Logger.log(input);
  // You can add your Gmail functionality here, such as sending an email.
}

function spamResponse(id, reply) {
  //makes the action with a button and links to composing email function
  
  var action = CardService.newAction().setFunctionName('composeEmailCallback');
    CardService.newTextButton()
      .setComposeAction(action, CardService.ComposedEmailType.REPLY_AS_DRAFT);

  //composes the email
  function composeEmailCallback() {
    var thread2 = GmailApp.getThreadById(id);
    var draft = thread2.createDraftReply(reply);
    return CardService.newComposeActionResponseBuilder()
        .setGmailDraft(draft)
        .build();
  }
  return composeEmailCallback();
}


function main() {

}




