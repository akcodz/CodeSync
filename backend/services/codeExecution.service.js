import 'dotenv/config.js'
import axios from "axios";
import {getFileName,normalizeResponse} from "../utils/codeExecution.js"
const ONECOMPILER_URL = "https://api.onecompiler.com/v1/run";

export const executeCode = async ({ code, language, stdin }) => {
  try {
    const response = await axios.post(
      ONECOMPILER_URL,
      {
        language,
        stdin,
        files: [
          {
            name: getFileName(language),
            content: code,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": process.env.ONECOMPILER_API_KEY,
        },
        timeout: 10000,
      }
    );

    return normalizeResponse(response.data);
  } catch (error) {
    return handleError(error);
  }
};