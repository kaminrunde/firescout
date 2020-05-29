import fs from 'fs'
import config from './config'

export default function findInFiles (matchers:string[]):Promise<string[]> {
  return new Promise((resolve,reject) => {
    fs.readdir(config.widgetFolder, function(err, filenames) {
      if (err) {
        reject(err);
        return;
      }
      resolve(filenames)
      // filenames.forEach(function(filename) {
      //   fs.readFile(dirname + filename, 'utf-8', function(err, content) {
      //     if (err) {
      //       onError(err);
      //       return;
      //     }
      //     onFileContent(filename, content);
      //   });
      // });
    })
  })
}