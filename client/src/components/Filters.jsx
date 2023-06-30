import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setFilterMuseums, setFilterGardens} from '../features/museum/recordsAPISlice';
import styled from 'styled-components';
import RangeBar from "./RangeBar";
import Weather from "./Weather/Weather";
import WeatherForecast from "./Weather/WeatherForecast";
import {MdOutlineMuseum} from 'react-icons/md';
import { LuFlower2 } from "react-icons/lu";

const Filters = ({perimeter, setPerimeter}) => {
    const filterMuseums = useSelector(state => state.records.filterMuseums);
    const filterGardens = useSelector(state => state.records.filterGardens);
    const center = useSelector((state) => state.mapbox.center);
    const [warning, setWarning] = useState(false);
    const [warningText, setWarningText] = useState('');
    const [toggleWeather, setToggleWeather] = useState({
      enable: false,
      days : [
        {enable: true},
        {enable: false},
        {enable: false},
        {enable: false},
        {enable: false},
        {enable: false}
      ]
    });
    const [weather5Days, setWeather5Days] = useState();
    const dispatch = useDispatch();

    const filterMuseumsGardens = (elementToFilter, stateOfElement, stateOfOther) => {
        if(stateOfOther){
          setWarning(false);
          if(elementToFilter == 'museums'){
            dispatch(setFilterMuseums({filterMuseums: !stateOfElement}));
          }
          if(elementToFilter == 'gardens'){
            dispatch(setFilterGardens({filterGardens: !stateOfElement}));
          }
        }else{
          setWarning(true);
          setWarningText('You must select one filter at least');
          setTimeout(() => {
            setWarning(false);
          }, 5000);
        }
      }
    
      useEffect(() => {
        if(toggleWeather.enable){
          const weatherDayIndex = toggleWeather.days.map(day => day.enable).indexOf(true);
          if(weatherDayIndex != -1 && weather5Days[weatherDayIndex].weather[0].id < 800){
            dispatch(setFilterMuseums({filterMuseums: true}));
            dispatch(setFilterGardens({filterGardens: false}));
            setWarning(true);
            setWarningText('We recommand you to not visit gardens this day');
            setTimeout(() => {
              setWarning(false);
            }, 5000);
          }else{
            setWarning(false);
          }
        }
      }, [toggleWeather]);

    return (
        <>
            <FiltersWrapper>
                <BoxFilterContainer
                    onClick={() => filterMuseumsGardens('museums',filterMuseums,filterGardens)}
                    style={filterMuseums ? {backgroundColor: '#12B5CB', color: 'white'} : {}}
                >
                    <MdOutlineMuseum />
                    Musées
                </BoxFilterContainer>
                <BoxFilterContainer
                    onClick={() => filterMuseumsGardens('gardens',filterGardens,filterMuseums)}
                    style={filterGardens ? {backgroundColor: '#12B5CB', color: 'white'} : {}}
                >
                    <LuFlower2 />
                    Jardins
                </BoxFilterContainer>
                <RangeBar perimeter={perimeter} setPerimeter={setPerimeter} />
                <Weather
                    toggleWeather={toggleWeather}
                    setToggleWeather={setToggleWeather}
                    center={center}
                />
            </FiltersWrapper>
            <div style={toggleWeather.enable ? {display: "block"} : {display: "none"}}>
                <WeatherForecast toggleWeather={toggleWeather} setToggleWeather={setToggleWeather} weather5Days={weather5Days} setWeather5Days={setWeather5Days} center={center} />
            </div>
            <Alert style={warning ? {animationName: 'appear'} : {}}>
                {warningText}
            </Alert>
        </>
    );
};

export default Filters;

const FiltersWrapper = styled.div`
  display: flex;
  margin: 10px 0;
`;
const BoxFilterContainer = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 20px;
  &:hover{
      cursor: pointer;
  }
`;

const Alert = styled.div`
  background-color: #FFF3CD;
  color: #755D16;
  padding: 10px;
  border-radius: 20px;
  width: auto;
  margin-top: 10px;
  margin-right: auto;
  visibility: hidden;
  opacity: 0;
  animation-duration: 5s;
  animation-iteration-count: 1;
  @keyframes appear {
    0%{
      visibility: hidden;
      opacity: 0;
    }
    50%{
      visibility: visible;
      opacity: 1;
    }
    100%{
      visibility: hidden;
      opacity: 0;
    }
  }
`;
