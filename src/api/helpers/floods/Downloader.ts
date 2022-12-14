import fs from "fs";
import { Client } from "basic-ftp";


export class Downloader {
  async download(key: string) {
    const client = new Client();
    client.ftp.verbose = true;

    try {
      await client.access({
        host: "ftp.bom.gov.au",
        secure: false,
      });

      await client.cd("/anon/gen/fwo/");

      const files = await client.list();

      for (var file in files) {
        if (files[file].name.endsWith(".amoc.xml")) {
          if (`${key}.amoc.xml` == files[file].name) {
            await client.download(`./src/downloads/${key}.xml`, files[file].name);
          }
        }
      }

      client.close();

      const data = this.readData(key);
      return data;
    } catch (err) {
      console.log(key + " file not found");
      client.close();
      return "";
    }
  }

  readData(key: string): string {
    return fs.readFileSync(`./src/downloads/${key}.xml`, { encoding: "utf-8" });
  }

  async downloadText(key: string) {
    let warningText = "";
    const client = new Client();
    client.ftp.verbose = true;

    try {
      await client.access({
        host: "ftp.bom.gov.au",
        secure: false,
      });

      await client.cd("/anon/gen/fwo/");

      await client.downloadTo(`./src/downloads/${key}.txt`, key + ".txt");

      warningText = fs.readFileSync(`./src/downloads/${key}.txt`, {
        encoding: "utf-8",
      });
    } catch (err) {
      console.log(key + " file not found");
      client.close();
      return "";
    }

    client.close();
    return warningText;
  }
}
