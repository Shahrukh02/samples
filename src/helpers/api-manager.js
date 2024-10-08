import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CLIENT_ID, baseUrl } from '../globals';
import moment from 'moment';

let noTokenRequiredPaths = ['oauth/token']

async function ApiManager(method = '', path = '', params = {}, headerOpt = {}) {
  return new Promise(async function (myResolve, myReject) {

    const isTokenRequired = path.indexOf(noTokenRequiredPaths) == -1;
    let token_info = await AsyncStorage.getItem('token_info');
    token_info = token_info ? JSON.parse(token_info) : token_info;
    let header;
    const refresh_params = {
      "client_id": CLIENT_ID,
      "grant_type": "refresh_token",
      "refresh_token": token_info?.refresh_token
    };
    
    getHeaders = (token = null) => {
      if (token) {
        return header = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...headerOpt,
          },
        };
      }

      return header = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...headerOpt,
        },
      };
    }

    api = async () => {
      if (method === 'post' || method === 'put') {
        axios[method](baseUrl + path, params, header)
          .then(response => {
            return myResolve(response);
          })
          .catch(err => {
            return myReject(err);
          });
      } else {
        axios[method](baseUrl + path, header)
          .then(response => {
            return myResolve(response);
          })
          .catch(err => {
            return myReject(err);
          });
      }
    }

    refresh_token = () => {
      header = getHeaders(token_info.refresh_token);
      return axios.post(baseUrl + 'oauth/token', refresh_params, header).then(async (data) => {
        AsyncStorage.setItem("token_info", JSON.stringify(data?.data));
        header = getHeaders(data?.data?.access_token)
        api();
      }).catch(err => {
        return myReject(err);
      })
    }

    if (isTokenRequired) {
      if (token_info && (moment().unix() - (token_info?.created_at + token_info?.expires_in - 60)) > 0) {
        refresh_token();
      }
      header = getHeaders(token_info?.access_token);
      api();
    } else {
      header = getHeaders();
      return api();
    }
  });
}

export default ApiManager;
