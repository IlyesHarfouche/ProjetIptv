/**
 * Cette fonction exécute la commande dvblast pour démarrer le flux.
 * Les paramètres spécifiés par le client sont :
 * l'adaptateur ("-a"), la fréquence ("-f") et le protocole ("-U" pour UDP)
 */

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const ModeData = require('./Freq.json');
const Mode = ModeData.Mode;
const RTP = Mode||RTP

const Modeadapter = require('./Freq.json');
const Adapt = Modeadapter.mode;
const adapter = Adapt||0

const freqData = require('./Freq.json');
const frequence = freqData.frequence;
const freq = frequence || 586166000


exports.lancerFlux = async function (req) {
    try {
        if (RTP === 'RTP') {
            console.log("RTP")
            const { stdout, stderr } = await exec(`dvblast -a ${adapter} -f ${freq} -c channels.conf -m QAM_64 -b 8 -e`)
            return stderr
        } else {
            console.log("UDP")
            const { stdout, stderr } = await exec(`dvblast -a ${adapter} -f ${freq} -c channels.conf -m QAM_64 -b 8 -e -U`)
            return stderr
        }
    } catch (err) {
        throw err
    }
}

