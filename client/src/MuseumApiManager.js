import { useState } from "react";
const url = "https://jsonplaceholder.typicode.com/users";
// const url = "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=musees-de-france-base-museofile&q=ville_m%3DMarseille"
const MuseumApiManager = {
  fetchMuseums: async () => {
    const returnFetch = await fetch(url);
    if(returnFetch.status === 200){
      const museumsJson = await returnFetch.json();
      // console.log(museumsJson.records);
      // return await museumsJson.records;
      // console.log(museumsJson);
      return  museumsJson;
    }else{
   return ({msg:'error 404'});
    }

  },
  returnCoucou: () => {
    return "coucou";
  },
};
export default MuseumApiManager;
