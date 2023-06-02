import React, { useEffect } from 'react';

const SearchBar = ({musees, setMusees}) => {

    useEffect(() => {
        const fetchMusee = async () => {
            const  returnFetch = await  fetch('https://data.culture.gouv.fr/api/records/1.0/search/?dataset=musees-de-france-base-museofile&q=ville_m=Marseille')
            const fetchjson = await returnFetch.json()
            setMusees(fetchjson.records)
            // console.log(fetchjson.records)
        }

        fetchMusee();
    }, []);
    
    return (
        <div style={{zIndex:'1000'}}>
            
        </div>
    );
};

export default SearchBar;