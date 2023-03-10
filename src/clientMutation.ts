import axios, { AxiosError } from "axios";
import https from "https";
import fs from "fs";

const getRequestWithCertificate = async () => {
  try {
    const cert = fs.readFileSync("certs/tls-server.crt");
    const key = fs.readFileSync("certs/tls-server.key");
    const hostName = "test.24hbongda.com";
    const httpsAgent = new https.Agent({
      cert,
      key,
      rejectUnauthorized: false,
    });

    const response = await axios.get(`https://${hostName}/`, {
      httpsAgent,
    });
    // console.log(response.data);
    console.log("succeccfull");
    console.log({ response });
  } catch (e: any) {
    const error = e as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
      console.log("native error");
      // when it throws native error
      // console.log(error);
    } else {
      // when it throws axios error
      if (error.request) {
        console.log("request error");
        // console.log(error.request);
        //when requested but there is no response from server
      }
      if (error.response) {
        console.log("response error");
        // the request was made and server responsed tiwh a status code
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
      }
    }
  }
};

setTimeout(() => {
  getRequestWithCertificate();
}, 1000);
