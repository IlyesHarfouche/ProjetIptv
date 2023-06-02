const freqData = require('./Freq.json');
const frequence = freqData.frequence;

exports.getUserChannels = function (req, obj) {
  try {
      var userChannels = {}
      for (channel in obj) {
          if (obj[channel].frequency === frequence) {
              userChannels[`${channel}`] = obj[channel]
              userChannels[`${channel}`].ip = ''
          }
      }

      return userChannels

  } catch (err) {
      throw err
  }
}

const {getUserChannels} = require('./ConvertJson.js')
const { readFileSync, writeFileSync } = require('fs')


exports.ConvertJson = function () {
  try {
    /**
     * Each line of the file corresponds to a channel
     * We store the lines in an array of strings
     */
    var line = readFileSync('chaines.conf').toString().split("\n")
    // The following array will include all the lines converted into objects
    var array = []
    /**
     * We iterate over the array of lines
     * The parameters on a line are separate by a ':'
     * We store them in variables 
     */
    for (i in line) {
      let [        name,        frequency,        inversion,        bandwidth,        innerFec,        fec,        modulation,        transmissionMode,        guardInterval,        hierarchy,        vpid,        audio,        sid,       ] = line[i].split(':')
      /**
       * The following object represents the line at index i
       * It includes all the variables created above
       */
      let obj = {
        name,
        frequency,
        inversion,
        bandwidth,
        innerFec,
        fec,
        modulation,
        transmissionMode,
        guardInterval,
        hierarchy,
        vpid,
        audio,
        sid,
        ip: ''
      }
      array.push(obj)
    }

    // Call the getUserChannels function and pass the array of channel objects as an argument
    var channels = getUserChannels(frequence, array)

    // This object is stored in a JSON file
    var json = JSON.stringify(channels, null, 2);
    writeFileSync('channels.json', json)

    return channels
  } catch (err) {
    throw err
  }
}
