function onOpen() {
  const ui = SpreadsheetApp.getUi()
  ui.createMenu("Minimum clicks")
    .addItem("Find answer", "uiFunction")
    .addToUi()
}

function uiFunction() {
  const ui = SpreadsheetApp.getUi()
  const userQuestion = ui.prompt("Enter your question", ui.ButtonSet.OK_CANCEL)
  if (userQuestion.getSelectedButton() == ui.Button.OK) {
    const result = getFormula(userQuestion.getResponseText())
    ui.alert(result)
  }
}

function getFormula(val) {
  if (val == "") {
    result = ""
    return result
  }

  const apiKey = "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"

  const data = {
    prompt:
      'Create a Google Sheet formula to count the number of rows in cells A2:B20 with a value greater than 20\n=COUNTIF(A2:B20,">20")\n\nCreate a Google Sheet formula to split the text in cell A2 where the "/" symbol appears into two columns\n=SPLIT(A2,"/")\n\nCreate a Google Sheet formula which takes the date range from cells A2 to A18 and the values from cells B2 to B18 and forecasts those values five years ahead\n=FORECAST.LINEAR(A2:A18,B2:B18,5)\n\n' +
      val +
      "\n",

    temperature: 0.7,
    max_tokens: 64,
    top_p: 1,
    best_of: 2,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["\n\n"],
  }
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(data),
    headers: {
      Authorization: "Bearer " + apiKey,
    },
  }

  const response = UrlFetchApp.fetch("https://api.openai.com/v1/engines/text-davinci-001/completions", options)

  const result = JSON.parse(response.getContentText())["choices"][0]["text"]
  Logger.log(result)

  return result
}
