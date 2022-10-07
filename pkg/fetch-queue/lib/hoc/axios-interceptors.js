import axios, { AxiosError, AxiosResponse } from 'axios';
import { NOT_MODIFIED_STATUS_CODE, ACCEPTED_STATUS_CODE } from '../CONSTANTS';
import EE from './event-emitter';
import FetchResponseEventName from '../dto/FetchResponseEventName';
import FetchResponseMessageData from '../dto/FetchResponseMessageData';

/**
 * @param {AxiosResponse} response
 * @constructor
 */
export function ResponseInterceptorFullfilled(response) {
  if (response.status === ACCEPTED_STATUS_CODE) {
    return new Promise((resolve, reject) => {
      EE.once(
        FetchResponseEventName.create({ url: response.request.responseURL, method: response.config.method }).toString(),
        async (res) => {
          const fetchRes = FetchResponseMessageData.fromObject(res);
          if (fetchRes.error) {
            response.status = fetchRes.status;
            return reject(new AxiosError('error', null, response.config, response.request, response));
          }

          switch (fetchRes.contentType) {
            case 'text/html':
              response.data = fetchRes.body;
              break;
            case 'application/json':
              response.data = JSON.parse(fetchRes.body);
              break;
          }
          response.status = fetchRes.status;

          if (fetchRes.status !== 200) {
            return reject(new AxiosError('error', null, response.config, response.request, response));
          }

          return resolve(response);
        }
      );
    });
  }

  return response;
}

/**
 * @param {AxiosError} err
 * @constructor
 */
export function ResponseInterceptorRejected(err) {
  const { response } = err;
  if (response.status === NOT_MODIFIED_STATUS_CODE) {
    return new Promise((resolve, reject) => {
      EE.once(
        FetchResponseEventName.create({ url: response.request.responseURL, method: response.config.method }).toString(),
        async (res) => {
          const fetchRes = FetchResponseMessageData.fromObject(res);
          if (fetchRes.error) {
            response.status = fetchRes.status;
            return reject(new AxiosError('error', null, response.config, response.request, response));
          }

          switch (fetchRes.contentType) {
            case 'text/html':
              response.data = fetchRes.body;
              break;
            case 'application/json':
              response.data = JSON.parse(fetchRes.body);
              break;
          }
          response.status = fetchRes.status;

          if (fetchRes.status !== 200) {
            return reject(new AxiosError('error', null, response.config, response.request, response));
          }

          return resolve(response);
        }
      );
    });
  }

  return Promise.reject(err);
}
