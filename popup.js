$(function() {
  isOn = $('#cb5').is(":checked")
  chrome.storage.sync.get(['isOn'], function(data) {
    if (isOn != data.isOn) {
      $('#cb5').click()
    }
  })
  $('#cb5').click(function(){
    isOn = $('#cb5').is(":checked")
    chrome.storage.sync.set({'isOn': isOn})
  })
})