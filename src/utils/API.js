import axios from "axios";
const BASEURL = "https://randomuser.me/api/?results=200&nat=us";
const APIKEY = "&apikey=6WTW-8POB-DZOK-LW3Q";

export default {
  search: function(query) {
    return axios.get(BASEURL + query + APIKEY);
  }
};