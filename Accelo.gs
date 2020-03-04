//initiate ScriptProperties to store secrets
var scriptProps = PropertiesService.getScriptProperties();

//get an access token and store it in PropertyServices
//run this manually or scheduled on a trigger
function getAccessToken() {
  //get client ID and secret from Script Properties
  var clientId = scriptProps.getProperty("acceloClientId");
  var clientSecret = scriptProps.getProperty("acceloClientSecret");
  
  var clientCredentials = Utilities.base64Encode(clientId + ":" + clientSecret);
  var headers = {
    "Authorization": "Basic " + clientCredentials,
    "Content-Type": "application/x-www-form-urlencoded"
  };
  
  var body = "grant_type=client_credentials";
  
  var params = {
    "method": "post",
    "payload": body,
    "headers": headers
  };
  
  //POST credentials to oauth2 endpoint
  //replace INSTANCE with your Accelo instance
  var response = UrlFetchApp.fetch("https://INSTANCE.api.accelo.com/oauth2/v0/token", params);  
  var text = response.getContentText();
  var data = JSON.parse(text);
  //this is your access token
  var accessToken = data.access_token;
  
  //push access token to Script Properties
  scriptProps.setProperty("accessToken", accessToken);
}

//count tickets opened or closed in a given timeframe
//status options are "opened", "closed"
function countTickets(status, startDate, endDate) {
  //get access token from Script Properties
  var accessToken = scriptProps.getProperty("accessToken");

  var headers = {
    "Authorization": "Bearer " + accessToken,
  };
  
  var params = {
    "method": "get",
    "headers": headers
  };
  
  //make a GET request to the Count Issues endpoint
  //filter by Date Opened or Date Closed
  var response = UrlFetchApp.fetch("https://INSTANCE.api.accelo.com/api/v0/issues/count?_filters=date_" + status + "_after(" + startDate + "),date_" + status + "_before(" + endDate + ")", params);
  var text = response.getContentText();
  var data = JSON.parse(text);
  //convert string to integer
  var count = parseInt(data.response.count);
  return count;
}
