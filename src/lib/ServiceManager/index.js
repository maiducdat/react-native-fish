import axios from 'axios';
import Config from '../../constants/Config';
import ServiceConstants from '../../constants/ServiceConstants';
/**********************************************************************************************************************/

const axiosInstance = axios.create({
    baseURL: Config.BASE_SERVICE_URL,
    timeout: Config.REQUEST_TIME_OUT,
    // headers: {'X-Custom-Header': 'foobar'}
});

export default {
    getUser(params, successCallback, failCallback) {
        doGet(params, ServiceConstants.GET_USER, successCallback, failCallback);
    },
    createUser(params, successCallback, failCallback) {
        doPost(params, ServiceConstants.CREATE_USER, successCallback, failCallback);
    },
    register(params, successCallback, failCallback) {
        doPost(params, ServiceConstants.REGISTER, successCallback, failCallback);
    }
};

const doGet = (params, apiURL, successCallback, failCallback) => {
    axiosInstance.get(apiURL, {
            params
        })
        .then(function (response) {
            doCallBack(successCallback, response);
        })
        .catch(function (error) {
            doCallBack(failCallback, error);
        }
    );
};

const doPost = (params, apiURL, successCallback, failCallback) => {
    axiosInstance.post(apiURL, {
            params
        })
        .then(function (response) {
            doCallBack(successCallback, response);
        })
        .catch(function (error) {
            doCallBack(failCallback, error);
        }
    );
};

const doCallBack = (callback, value) => {
    if (callback && typeof(callback) == 'function') {
        callback(value);
    } else {
        console.log("callback is not define or is not a function", value);
    }
};
