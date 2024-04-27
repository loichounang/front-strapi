
import {addYears, addMonths, addDays, subDays} from 'date-fns';

const _ = () => {

    const generateRandomColor = () : string => {
        const r = Math.floor(Math.random() * 256); // Random value for red (0 to 255)
        const g = Math.floor(Math.random() * 256); // Random value for green (0 to 255)
        const b = Math.floor(Math.random() * 256); // Random value for blue (0 to 255)
        return `rgb(${r},${g},${b})`; // Return the color as an RGB string
      };
        
      const capitalizeFirstLetter = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

      const range = (start: number, length: number): number[]  => 
        Array.from({ length }, (_, index) => start + index);
    

      // date function
      const getNextMonthFirstDay = () : Date => {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;

        if(month > 11) {
            month = 0;
            year++;
        }

        return new Date(year, month, 1)
      }

      const getExpirationDate = (effectiveDate: Date, duration: number, durationUnit: 'D' | 'M' | 'Y') : Date => {
        switch(durationUnit) {
            case 'D' : return subDays( addDays(effectiveDate, duration), 1);
            case 'M' : return subDays(addMonths(effectiveDate, duration), 1);
            case 'Y' : return subDays(addYears(effectiveDate, duration), 1);
            default: return subDays(addYears(effectiveDate, 1), 1);
        }
      }


    return {
        generateRandomColor,
        capitalizeFirstLetter,

        range,


        getNextMonthFirstDay,
        getExpirationDate
    }

}

export default _;