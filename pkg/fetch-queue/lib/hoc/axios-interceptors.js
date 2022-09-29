import axios, { AxiosError, AxiosResponse } from 'axios';
import { PENDING_STATUS_CODE } from '../CONSTANTS';
import EE from './event-emitter';
import FetchResponseEventName from '../dto/FetchResponseEventName';
import FetchResponseMessageData from '../dto/FetchResponseMessageData';

/**
 * @param {AxiosResponse} response
 * @constructor
 */
export function ResponseInterceptorFullfiled(response) {
  if (response.status === PENDING_STATUS_CODE) {
    return new Promise((resolve, reject) => {
      EE.once(
        FetchResponseEventName.create({ url: response.config.url, method: response.config.method }).toString(),
        async (res) => {
          const fetchRes = FetchResponseMessageData.fromObject(res);
          switch (fetchRes.contentType) {
            case 'text/html':
              response.data = fetchRes.body;
              break;
            case 'application/json':
              response.data = JSON.parse(fetchRes.body);
              break;
          }
          response.status = fetchRes.status;

          if (res.status !== 200) {
            return reject(new AxiosError('error', null, response.config, response.request, response));
          }
          return resolve(response);
        }
      );
    });
  }

  return response;
}
