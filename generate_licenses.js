const fs = require('fs');
const licenseChecker = require('license-checker');

licenseChecker.init({
  start: './node_modules',
}, function (err, packages) {
  if (err) {
    console.error('Error al generar licencias:', err);
    return;
  }

  const licensesMd = Object.keys(packages).map(pkgName => {
    const pkg = packages[pkgName];
    return `### ${pkgName}\n- License: ${pkg.licenses}\n- Homepage: ${pkg.homepage || 'No disponible'}\n- URL: ${pkg.repository ? pkg.repository.url : 'No disponible'}\n\n`;
  }).join('');

  fs.writeFileSync('LICENSES.md', licensesMd, 'utf8');
  console.log('Licencias generadas en LICENSES.md');
});
