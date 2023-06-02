const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.checkDvblastProcess = async function (req) {
  try {
    // Ajouter un délai de X seconde
    await new Promise(resolve => setTimeout(resolve, 0000));
    //const { stdout, stderr } = await exec(`ps aux | grep dvblast | grep -v '/bin/sh' | grep -v grep | cut -d' ' -f2`);//Il faut soit utiliser f2 soit f3 si le process n'est pas trouvé
  const { stdout, stderr } = await exec(`ps aux | grep dvblast | grep -v '/bin/sh' | grep -v grep | cut -d' ' -f3`);//Il faut soit utiliser f2 soit f3 si le process n'est pas trouvé
    const pid = stdout.trim();
    // Ajouter un message de débogage pour vérifier si le pid est vide ou non
    console.log('pid:', pid);
    if (pid !== '') {
      await exec(`kill -9 ${pid}`);
      return 'PURGE, LE STREAM EST FINITO';


    } else {
      return 'ok, pas de stream';
    }
  } catch (err) {
    throw err;
  }
};
